from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pandas as pd
from prophet import Prophet
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from waitress import serve

app = Flask(__name__)
CORS(app)


FILE_PATH = "data.csv"

@app.route('/api/prediction', methods=['GET'])
def getMedicinePredictions():
    medicineName = request.args.get('medicine')
    modelName = request.args.get('model')
        
    if not medicineName:
        return jsonify({"error": "No medicine provided"}), 400

    if not modelName:
        return jsonify({"error": "No model provided"}), 400

    try:
        predictions = predictMedicine(medicineName, modelName)
        return jsonify(predictions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def predictMedicine(medicine, model):
    data = pd.read_csv(FILE_PATH, parse_dates=['date_time'])

    # Convert date_time to year-month format
    data['year_month'] = data['date_time'].dt.to_period('M')

    # Filter for non-empty medication entries
    data = data[data['Medication'].notna()]
    data['Medication'] = data['Medication'].str.lower()
    
    data['Medication'] = data['Medication'].str.replace("'", '', regex=False)
    data['Medication'] = data['Medication'].str.replace('.', '', regex=False)
    data['Medication'] = data['Medication'].str.replace('-', '', regex=False)
    data['Medication'] = data['Medication'].str.replace(' ', '_', regex=False)
    data['Medication'] = data['Medication'].str.replace(r"^[\s_]+|[\s_]+$", '', regex=True)

    if data.empty:
        return {"error": "No data available for the provided medicine."}

    # Aggregate monthly counts for the current medication
    medData = data[data['Medication'] == medicine].groupby('year_month').size()
    
    if model == 'generalized_additive_model':
        return predictProphet(medData)
    
    elif model == 'standard_time_series_model':
        return predictHotWinters(medData)


# model_prophet
def predictProphet(medData):
    # Aggregate monthly counts for the current medication
    medData = medData.asfreq('M', fill_value=0).reset_index()
    medData.columns = ['ds', 'y']  # Prophet expects columns to be named as 'ds' and 'y'
    
    # Prepare the DataFrame for Prophet
    medData['ds'] = medData['ds'].dt.to_timestamp()
    
    # Split the data into training and testing sets 
    train_data = medData[medData['ds'] <= pd.Timestamp('2021-06-01')]
    test_data = medData[medData['ds'] > pd.Timestamp('2020-06-01')]

    # Initialize and fit the Prophet model on training data
    model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
    model.fit(train_data)

    # Create future dataframe for forecasting
    future = model.make_future_dataframe(periods=len(test_data), freq='M')
    forecast = model.predict(future)

    # Extract the forecast and the confidence intervals
    forecasted_values = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(4)
    
    # Returning structured results
    return {
        'history': medData.to_dict("records"),
        'forecast': forecasted_values.to_dict("records")
    }


# model hot winters
def predictHotWinters(medData):
    # Create time series object
    ts_data = medData.asfreq('M', fill_value=0)
    
    if isinstance(ts_data.index, pd.PeriodIndex):
        ts_data.index = ts_data.index.to_timestamp()
    
    historyData = ts_data.reset_index()
    historyData.columns = ['ds', 'y']
    
    # Split data into training and test sets
    train = ts_data[:'2020-12']
    test = ts_data['2021-01':'2021-04']
    
    # Fit Holt-Winters model
    # For actual data, change to: trend='add', seasonal='add', seasonal_periods=12
    model = ExponentialSmoothing(train, trend='add', seasonal_periods=None)
    fitted_model = model.fit()
    
    # Forecast future values
    forecast_periods = len(test)
    forecast = fitted_model.forecast(forecast_periods)
    
    forecast_df = pd.DataFrame({
        'ds': pd.date_range(start=ts_data['2021-01':].index.min(), periods=forecast_periods, freq='M'),
        'yhat': forecast
    })
    
    return {
        'history': historyData.to_dict("records"),
        'forecast': forecast_df.to_dict("records"),
    }


@app.route('/api/medications', methods=['GET'])
def getMedicines():
    try:
        medications = getUniqueMedications()
        return jsonify({
            "medicines": medications
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


def getUniqueMedications():
    data = pd.read_csv(FILE_PATH)
    
    if 'Medication' in data.columns:
        top20MedsIndices = data['Medication'].value_counts().nlargest(25)
        top20Meds = []
        for med in top20MedsIndices.index:
            top20Meds.append(med)
        return list(top20Meds)
    else:
        raise ValueError("The file does not contain a 'Medication' column.")


if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080)