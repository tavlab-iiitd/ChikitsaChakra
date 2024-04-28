from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pandas as pd
import numpy as np
from prophet import Prophet

app = Flask(__name__)
CORS(app)


FILE_PATH = "data.csv"

@app.route('/api/prediction', methods=['GET'])
def getMedicinePredictions():
    medicine_name = request.args.get('medicine')
    
    if not medicine_name:
        return jsonify({"error": "No medicine provided"}), 400

    try:
        predictions = predictMedicine(medicine_name)
        return jsonify(predictions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# model_prophet
def predictMedicine(medicine):
    data = pd.read_csv(FILE_PATH, parse_dates=['date_time'])

    # Convert date_time to year-month format
    data['year_month'] = data['date_time'].dt.to_period('M')

    # Filter for non-empty medication entries
    data = data[data['Medication'].notna()]
    data['Medication'] = data['Medication'].str.lower()

    if data.empty:
        return {"error": "No data available for the provided medicine."}

    # Aggregate monthly counts for the current medication
    med_data = data[data['Medication'] == medicine].groupby('year_month').size()
    med_data = med_data.asfreq('M', fill_value=0).reset_index()
    med_data.columns = ['ds', 'y']  # Prophet expects columns to be named as 'ds' and 'y'
    
    # Prepare the DataFrame for Prophet
    med_data['ds'] = med_data['ds'].dt.to_timestamp()

    # Initialize and fit the Prophet model
    model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
    model.fit(med_data)

    # Create future dataframe for forecasting next 4 months
    future = model.make_future_dataframe(periods=4, freq='M')

    # Predict
    forecast = model.predict(future)

    # Extract the forecast and the confidence intervals
    forecasted_values = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(4)
    
    # Returning structured results
    return {
        'history': med_data.to_dict("records"),
        'forecast': forecasted_values.to_dict("records")
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
        uniqueMedications = data['Medication'].dropna().unique()
        return list(uniqueMedications)
    else:
        raise ValueError("The file does not contain a 'Medication' column.")


if __name__ == '__main__':
    app.run(debug=True, port=8080)