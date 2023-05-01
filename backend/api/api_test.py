import requests
from countryinfo import CountryInfo
from datetime import date, timedelta
from pyairports.airports import Airports

today = date.today()
yesterday = today - timedelta(1)

print(today)
print(yesterday)