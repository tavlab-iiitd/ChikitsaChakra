"use client";

import Graph from "@/components/Graph";
import SearchBox from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, ChevronDown, TextSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

enum ModelType {
  Prophet = "Prophet",
  HotWinters = "Hot Winters",
}

export default function Home() {
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>(
    ModelType.Prophet
  );

  const { data: medications, status } = useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      const { data } = await axios.get("api/medications");
      const { medicines } = data;
      return medicines as string[];
    },
  });

  return (
    <div className="sm:mt-8 mt-4 flex flex-col">
      <div className="flex items-center gap-48 px-2 md:px-6 lg:px-12 xl:px-16 pt-40 pb-60">
        <div className="flex flex-col mx-auto lg:mx-0">
          <p className="xl:text-4xl lg:text-3xl text-4xl text-center text-zinc-700 font-semibold mb-20 lg:text-left">
            A{" "}
            <span className="bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-transparent">
              Digital Process Optimization
            </span>{" "}
            Intervention for Resource Management in PHCs
          </p>
          <Link
            href="#test-models"
            className="px-24 flex py-3 rounded-lg text-white items-center bg-blue-500 w-fit hover:bg-blue-600 gap-2 transition-all lg:mx-0 mx-auto"
          >
            Test Our Models <ArrowRight className="text-white size-4" />
          </Link>
        </div>
        <svg
          className="w-[640px] hidden lg:block"
          viewBox="0 0 574 501"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M544.321 307.08C543.666 308.375 542.982 309.648 542.276 310.914C515.221 359.372 452.284 389.466 346.144 373.538C285.878 364.064 260.212 398.814 235.36 434.408C234.935 435.023 234.51 435.637 234.078 436.251C208.052 473.577 182.286 511.006 117.859 498.565C49.5583 487.462 7.40611 430.448 0.883434 369.578C0.803989 368.838 0.732272 368.091 0.667239 367.351C-2.99713 327.886 8.32748 287.022 37.2185 256.172C54.6699 237.543 79.4645 227.647 105.058 227.958C112.764 228.105 120.467 227.518 128.067 226.204C129.745 225.9 131.372 225.567 132.956 225.19C165.562 217.529 180.587 194.755 189.802 166.962C190.018 166.303 190.234 165.645 190.443 164.978C211.602 98.698 201.818 5.66838 316.85 19.3538C419.786 27.1549 495.329 85.8341 532.384 153.536C532.752 154.217 533.119 154.898 533.479 155.579C543.663 174.364 550.931 194.669 555.019 215.76C555.25 216.944 555.459 218.129 555.653 219.313C560.894 250.755 557.46 281.315 544.321 307.08Z"
            fill="#F4F4F5"
          />
          <path
            d="M541 175.562C533.307 186.878 524.639 197.121 515.15 206.108C478.185 241.194 431.366 260.222 385.177 264.213C361.44 266.278 337.586 264.273 314.293 258.254C290.594 252.11 267.991 241.287 246.1 228.645C224.809 216.346 204.149 202.479 183 189.837C183.225 189.011 183.45 188.185 183.668 187.35C206.728 201.087 229.317 216.226 252.647 229.313C274.628 241.649 297.381 251.71 321.177 257.094C344.919 262.428 369.15 263.603 393.156 260.584C439.218 254.848 486.074 233.815 521.487 196.186C528.135 189.122 534.283 181.365 539.86 173C540.243 173.854 540.625 174.708 541 175.562Z"
            fill="white"
          />
          <path
            d="M342.172 0.821808C342.11 0.821808 342.047 0.823805 341.984 0.827805C275.768 4.97627 223.898 60.247 223.898 126.658C223.898 193.069 275.768 248.34 341.984 252.487C342.38 252.514 342.777 252.458 343.15 252.324C343.523 252.19 343.865 251.98 344.153 251.708C344.44 251.44 344.669 251.116 344.825 250.756C344.981 250.395 345.061 250.006 345.059 249.614V3.7016C345.058 2.93712 344.753 2.20454 344.211 1.66464C343.67 1.12474 342.937 0.821647 342.172 0.821808Z"
            fill="#CCCCCC"
          />
          <path
            d="M443.413 210.686C442.432 210.686 441.49 210.296 440.795 209.603L355.178 123.986C354.834 123.643 354.56 123.236 354.375 122.787C354.189 122.338 354.094 121.857 354.095 121.372V3.70166C354.093 3.19673 354.195 2.69686 354.396 2.23349C354.597 1.77011 354.891 1.35326 355.261 1.00915C355.631 0.660777 356.069 0.392169 356.548 0.219966C357.026 0.0477633 357.535 -0.0243622 358.043 0.00803686C424.691 4.18332 476.899 59.8146 476.899 126.658C476.901 157.02 466.015 186.377 446.219 209.399C445.886 209.785 445.478 210.098 445.018 210.319C444.559 210.54 444.06 210.664 443.55 210.684C443.505 210.686 443.459 210.686 443.413 210.686Z"
            fill="#CCCCCC"
          />
          <path
            d="M357.807 253.315C356.861 253.314 355.952 252.954 355.262 252.308C354.892 251.964 354.597 251.547 354.397 251.083C354.196 250.619 354.093 250.118 354.095 249.613V143.444C354.095 142.713 354.312 141.998 354.718 141.39C355.124 140.782 355.701 140.309 356.377 140.029C357.052 139.749 357.795 139.676 358.512 139.819C359.229 139.961 359.888 140.313 360.405 140.83L435.116 215.541C435.471 215.897 435.75 216.32 435.936 216.787C436.122 217.253 436.211 217.753 436.198 218.255C436.185 218.757 436.071 219.251 435.861 219.707C435.651 220.163 435.35 220.572 434.978 220.909C413.707 240.059 386.598 251.474 358.036 253.308C357.96 253.313 357.883 253.315 357.807 253.315Z"
            fill="#3B82F6"
          />
          <path
            d="M556 252.322C543.964 274.23 526.972 293.553 507.516 308.869C464.278 342.906 409.513 361.365 355.485 365.237C327.719 367.24 299.816 365.295 272.57 359.456C244.849 353.495 218.41 342.996 192.804 330.732C166.733 318.243 141.46 304.079 115.503 291.356C89.5724 278.642 62.922 267.801 35 260.705C37.044 260.336 39.0267 259.931 40.9564 259.471C42.7811 259.958 44.5999 260.462 46.4129 260.984C101.011 276.652 149.197 307.528 200.462 331.38C226.173 343.347 252.788 353.108 280.622 358.33C308.394 363.505 336.737 364.645 364.818 361.716C418.697 356.151 473.506 335.747 514.928 299.244C531.324 284.858 544.987 267.485 555.228 248C555.509 249.441 555.763 250.881 556 252.322Z"
            fill="white"
          />
          <path
            d="M329.883 306.187H248.813C247.645 306.187 246.524 305.723 245.698 304.897C244.871 304.071 244.407 302.95 244.407 301.781C244.407 300.613 244.871 299.492 245.698 298.666C246.524 297.839 247.645 297.375 248.813 297.375H329.883C331.052 297.375 332.172 297.839 332.999 298.666C333.825 299.492 334.289 300.613 334.289 301.781C334.289 302.95 333.825 304.071 332.999 304.897C332.172 305.723 331.052 306.187 329.883 306.187Z"
            fill="#CCCCCC"
          />
          <path
            d="M224.58 310.593C222.75 310.593 220.961 310.051 219.44 309.034C217.918 308.017 216.732 306.572 216.032 304.881C215.332 303.191 215.149 301.33 215.506 299.536C215.863 297.741 216.744 296.092 218.038 294.798C219.332 293.504 220.98 292.623 222.775 292.266C224.57 291.909 226.43 292.092 228.121 292.792C229.812 293.493 231.257 294.679 232.274 296.2C233.29 297.722 233.833 299.511 233.833 301.341C233.83 303.794 232.854 306.146 231.12 307.88C229.385 309.615 227.033 310.59 224.58 310.593Z"
            fill="#60A5FA"
          />
          <path
            d="M329.883 332.623H248.813C247.645 332.623 246.524 332.159 245.698 331.333C244.871 330.506 244.407 329.386 244.407 328.217C244.407 327.048 244.871 325.928 245.698 325.102C246.524 324.275 247.645 323.811 248.813 323.811H329.883C331.052 323.811 332.172 324.275 332.999 325.102C333.825 325.928 334.289 327.048 334.289 328.217C334.289 329.386 333.825 330.506 332.999 331.333C332.172 332.159 331.052 332.623 329.883 332.623Z"
            fill="#CCCCCC"
          />
          <path
            d="M224.58 337.029C222.75 337.029 220.961 336.486 219.44 335.47C217.918 334.453 216.732 333.008 216.032 331.317C215.332 329.627 215.148 327.766 215.505 325.971C215.862 324.177 216.744 322.528 218.038 321.234C219.332 319.94 220.98 319.059 222.775 318.702C224.57 318.345 226.43 318.528 228.121 319.228C229.812 319.929 231.257 321.114 232.273 322.636C233.29 324.158 233.833 325.947 233.833 327.776C233.83 330.23 232.854 332.581 231.12 334.316C229.385 336.051 227.033 337.026 224.58 337.029Z"
            fill="#60A5FA"
          />
          <path
            d="M329.883 359.059H248.813C247.645 359.059 246.524 358.595 245.698 357.769C244.871 356.942 244.407 355.822 244.407 354.653C244.407 353.485 244.871 352.364 245.698 351.538C246.524 350.711 247.645 350.247 248.813 350.247H329.883C331.052 350.247 332.172 350.711 332.999 351.538C333.825 352.364 334.289 353.485 334.289 354.653C334.289 355.822 333.825 356.942 332.999 357.769C332.172 358.595 331.052 359.059 329.883 359.059Z"
            fill="#CCCCCC"
          />
          <path
            d="M224.58 363.465C222.75 363.465 220.961 362.922 219.44 361.906C217.918 360.889 216.732 359.444 216.032 357.753C215.332 356.063 215.149 354.202 215.506 352.407C215.863 350.613 216.744 348.964 218.038 347.67C219.332 346.376 220.98 345.495 222.775 345.138C224.57 344.781 226.43 344.964 228.121 345.664C229.812 346.365 231.257 347.55 232.274 349.072C233.29 350.594 233.833 352.383 233.833 354.213C233.83 356.666 232.854 359.017 231.12 360.752C229.385 362.487 227.033 363.462 224.58 363.465Z"
            fill="#60A5FA"
          />
          <path
            d="M352.903 330H387.1C387.339 330 387.568 329.942 387.736 329.838C387.905 329.734 388 329.594 388 329.447V199.553C388 199.406 387.905 199.266 387.736 199.162C387.568 199.058 387.339 199 387.1 199C386.861 199 386.633 199.058 386.464 199.162C386.295 199.266 386.2 199.406 386.2 199.553V328.894H352.903C352.785 328.894 352.667 328.908 352.558 328.936C352.448 328.963 352.349 329.004 352.265 329.055C352.181 329.107 352.114 329.168 352.069 329.235C352.023 329.302 352 329.374 352 329.447C352 329.52 352.023 329.592 352.069 329.659C352.114 329.726 352.181 329.787 352.265 329.839C352.349 329.89 352.448 329.931 352.558 329.958C352.667 329.986 352.785 330 352.903 330Z"
            fill="#60A5FA"
          />
          <path
            d="M496.661 64.906C494.422 65.0863 492.18 64.5987 490.218 63.5047C488.256 62.4107 486.663 60.7595 485.639 58.7599C484.616 56.7603 484.208 54.5021 484.468 52.2708C484.728 50.0396 485.644 47.9355 487.099 46.2247C488.555 44.5139 490.485 43.2732 492.646 42.6594C494.807 42.0457 497.101 42.0865 499.239 42.7767C501.377 43.4669 503.262 44.7755 504.656 46.5371C506.05 48.2986 506.89 50.4339 507.07 52.673C507.312 55.6755 506.351 58.6511 504.399 60.9452C502.447 63.2394 499.664 64.6641 496.661 64.906ZM496.521 63.1643C498.416 63.0116 500.222 62.3006 501.713 61.1211C503.203 59.9416 504.311 58.3467 504.895 56.5379C505.479 54.7291 505.513 52.7877 504.994 50.9593C504.475 49.1309 503.425 47.4975 501.977 46.2657C500.53 45.0339 498.749 44.2591 496.861 44.0392C494.973 43.8192 493.063 44.1641 491.371 45.0301C489.679 45.8962 488.281 47.2445 487.356 48.9046C486.43 50.5647 486.017 52.462 486.17 54.3566C486.271 55.6146 486.619 56.8403 487.195 57.9638C487.77 59.0872 488.56 60.0864 489.521 60.9042C490.483 61.7221 491.595 62.3426 492.796 62.7304C493.997 63.1182 495.263 63.2656 496.521 63.1643Z"
            fill="#93C5FD"
          />
          <path
            d="M535.77 35.7631C539.63 35.7631 542.76 32.6339 542.76 28.7738C542.76 24.9137 539.63 21.7844 535.77 21.7844C531.91 21.7844 528.781 24.9137 528.781 28.7738C528.781 32.6339 531.91 35.7631 535.77 35.7631Z"
            fill="#93C5FD"
          />
          <path
            d="M570.125 10.4867C572.153 10.4867 573.797 8.8429 573.797 6.81523C573.797 4.78755 572.153 3.1438 570.125 3.1438C568.098 3.1438 566.454 4.78755 566.454 6.81523C566.454 8.8429 568.098 10.4867 570.125 10.4867Z"
            fill="#93C5FD"
          />
          <path
            d="M443.295 288.46C442.056 290.334 440.29 291.799 438.219 292.669C436.148 293.54 433.866 293.776 431.66 293.349C429.455 292.923 427.426 291.851 425.829 290.271C424.233 288.691 423.14 286.673 422.691 284.472C422.241 282.271 422.454 279.986 423.303 277.906C424.152 275.827 425.599 274.045 427.46 272.788C429.322 271.53 431.514 270.853 433.76 270.841C436.007 270.83 438.206 271.484 440.08 272.723C442.59 274.386 444.339 276.976 444.942 279.927C445.544 282.877 444.952 285.946 443.295 288.46ZM425.801 276.901C424.753 278.487 424.199 280.348 424.209 282.248C424.218 284.149 424.791 286.004 425.856 287.579C426.92 289.154 428.427 290.378 430.187 291.096C431.947 291.815 433.88 291.995 435.742 291.615C437.604 291.234 439.312 290.31 440.649 288.959C441.986 287.608 442.893 285.891 443.254 284.025C443.615 282.159 443.415 280.228 442.678 278.475C441.942 276.723 440.703 275.229 439.117 274.181C436.989 272.778 434.393 272.277 431.896 272.787C429.4 273.297 427.208 274.777 425.801 276.901Z"
            fill="#CCCCCC"
          />
          <path
            d="M456.901 330.23C460.761 330.23 463.89 327.101 463.89 323.241C463.89 319.381 460.761 316.252 456.901 316.252C453.041 316.252 449.912 319.381 449.912 323.241C449.912 327.101 453.041 330.23 456.901 330.23Z"
            fill="#CCCCCC"
          />
          <path
            d="M476.397 362.723C478.425 362.723 480.068 361.079 480.068 359.051C480.068 357.024 478.425 355.38 476.397 355.38C474.369 355.38 472.726 357.024 472.726 359.051C472.726 361.079 474.369 362.723 476.397 362.723Z"
            fill="#CCCCCC"
          />
          <path
            d="M161.278 97.7062C160.278 95.6946 159.897 93.4317 160.184 91.2037C160.47 88.9757 161.411 86.8827 162.887 85.1893C164.363 83.4959 166.308 82.2782 168.476 81.6902C170.644 81.1022 172.937 81.1703 175.067 81.8859C177.196 82.6015 179.065 83.9324 180.438 85.7103C181.811 87.4883 182.626 89.6334 182.78 91.8745C182.933 94.1156 182.419 96.3519 181.302 98.3007C180.185 100.249 178.515 101.823 176.503 102.823C173.805 104.16 170.687 104.372 167.832 103.413C164.978 102.454 162.621 100.401 161.278 97.7062ZM180.055 88.3751C179.209 86.6729 177.877 85.2598 176.228 84.3144C174.579 83.3691 172.687 82.9339 170.791 83.064C168.895 83.1941 167.08 83.8836 165.575 85.0453C164.071 86.207 162.944 87.7887 162.339 89.5904C161.733 91.3921 161.676 93.333 162.173 95.1674C162.671 97.0019 163.701 98.6476 165.134 99.8965C166.567 101.145 168.338 101.941 170.223 102.184C172.109 102.426 174.023 102.104 175.725 101.258C178.006 100.122 179.742 98.127 180.554 95.7118C181.366 93.2966 181.186 90.6581 180.055 88.3751Z"
            fill="#93C5FD"
          />
          <path
            d="M124.365 99.0109C128.225 99.0109 131.354 95.8817 131.354 92.0216C131.354 88.1615 128.225 85.0322 124.365 85.0322C120.505 85.0322 117.376 88.1615 117.376 92.0216C117.376 95.8817 120.505 99.0109 124.365 99.0109Z"
            fill="#93C5FD"
          />
          <path
            d="M83.6069 94.5865C85.6345 94.5865 87.2783 92.9428 87.2783 90.9151C87.2783 88.8874 85.6345 87.2437 83.6069 87.2437C81.5792 87.2437 79.9354 88.8874 79.9354 90.9151C79.9354 92.9428 81.5792 94.5865 83.6069 94.5865Z"
            fill="#93C5FD"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex mx-auto gap-2">
          <SearchBox
            value={selectedMedicine!!}
            setValue={setSelectedMedicine}
            medicines={medications || []}
            status={status}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                {selectedModel}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Models</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(ModelType).map((model) => (
                <DropdownMenuItem
                  onSelect={() => setSelectedModel(model)}
                  key={model}
                >
                  {model}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div id="test-models" className="sm:mt-20 mt-14">
          {!selectedMedicine && (
            <div className="border border-dashed rounded-lg w-full lg:w-[800px] mx-auto border-zinc-300 py-52 flex items-center justify-center text-zinc-500 gap-2">
              <TextSearch className="size-4 text-zinc-500" />
              Please select a medicine to view the prediction graph.
            </div>
          )}
          {selectedMedicine && (
            <Graph medicine={selectedMedicine} model={selectedModel} />
          )}
        </div>
      </div>
    </div>
  );
}
