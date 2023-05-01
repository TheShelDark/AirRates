from fastapi import FastAPI, Depends
from fastapi.security.api_key import APIKey
import auth
from decouple import config
import requests
from countryinfo import CountryInfo
from datetime import date, timedelta
from pyairports.airports import Airports
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/secure")
async def info(api_key: APIKey = Depends(auth.get_api_key)):
    return {
        "default variable": api_key
    }

@app.get("/profitableflights/{iata_code}")
async def get_profitable_flights(iata_code: str, api_key: APIKey = Depends(auth.get_api_key)):
    airports = Airports()

    today = date.today()
    yesterday = today - timedelta(1)

    arrival_airport_code = iata_code
    api_key = config('FLIGHT_API_KEY')

    countries_list = []
    currencies_list = []

    flight_api_endpoint = f"https://airlabs.co/api/v9/schedules?arr_iata={arrival_airport_code}&api_key={api_key}&_fields=dep_estimated_utc,dep_iata,airline_iata"

    scheduled_flights_request = requests.request("GET", flight_api_endpoint)

    scheduled_flights = scheduled_flights_request.json()

    flight_list = scheduled_flights["response"]

    arrival_airport_country = airports.airport_iata(arrival_airport_code).country
    arrival_currency = CountryInfo(arrival_airport_country).currencies()[0]

    for flight in flight_list[:100]:
        department_airport_code = flight["dep_iata"]

        if (department_airport_code != "DSS") and (department_airport_code != "PKX") and (department_airport_code != "ZYI"):
            department_airport_country = airports.airport_iata(department_airport_code).country

        if department_airport_country != 'burma':
            countries_list.append(department_airport_country)

    countries_list_without_duplicates = list(dict.fromkeys(countries_list))


    for country in countries_list_without_duplicates:
        if country != 'burma':
            currency = CountryInfo(country).currencies()[0]
            if currency != arrival_currency:
                currencies_list.append(currency)
        else:
            pass

    currency_symbol_string = f""
    for currency in currencies_list:
        if currency != currencies_list[-1]:
            currency_symbol_string += f"{currency},"
        else:
            currency_symbol_string += f"{currency}"


    currency_api_endpoint = f"https://api.apilayer.com/exchangerates_data/fluctuation?base={arrival_currency}&start_date={yesterday}&end_date={today}&symbols={currency_symbol_string}"

    payload = {}
    headers= {
    "apikey": config('CURRENCY_API_KEY')
    }

    response = requests.request("GET", currency_api_endpoint, headers=headers, data = payload)

    status_code = response.status_code
    result = response.json()

    currencies_with_positve_change = []

    for currency_value in result["rates"]:
        if result["rates"][currency_value]["change_pct"] > 0:
            currencies_with_positve_change.append(currency_value)

    flights_with_profit = []
    for flight in flight_list[:100]:
        airport_code = flight["dep_iata"]
        if airport_code != "DSS":
            airport_country = airports.airport_iata(airport_code).country
            airport_currency = CountryInfo(airport_country).currencies()[0]
        if airport_currency in currencies_with_positve_change:
            flight["currency"] = airport_currency
            flights_with_profit.append(flight)

    return flights_with_profit
    