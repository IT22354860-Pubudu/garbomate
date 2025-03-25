import React, { useState } from "react";
import { getTruckDetails } from "../../../api/truckApi";
import { useNavigate } from "react-router";

const TruckAuth = () => {
  const [driverName, setDriverName] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [error, setError] = useState(null); // Add error state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await getTruckDetails({ truckNumber, driverName });
      console.log("Login successful", response);
      // Redirect to dashboard or home page
      if (response) {
        navigate("/driver");
      } else {
        navigate("/truck");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to check schedules
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin} method="POST">
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Driver Name
              </label>
              <div className="mt-2">
                <input
                  id="driverName"
                  name="driverName"
                  type="text"
                  autoComplete="name"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="truckNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Truck Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="truckNumber"
                  name="truckNumber"
                  type="text" // Use text input for truck number
                  autoComplete="off" // Remove password autocomplete
                  required
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error} {/* Display error message */}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TruckAuth;
