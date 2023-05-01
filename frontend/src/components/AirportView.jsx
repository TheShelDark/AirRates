import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


function AirportView() {
    const {code} = useParams()
    const [loading, setLoading] = useState(true)
    const [airportData, setAirportData] = useState();

    async function fetchAirportData() {
        await fetch('http://localhost:8000/profitableflights/' + code,
            {
            headers: {
              'access_token': '1337-1054-9723-06103'
            }
          }) 
        .then((response) => response.json())
        .then((data) => {
            setAirportData(data)
            setLoading(false)
            console.log(data)
        });
        
      }

    useEffect(() => {
      fetchAirportData()
    }, [])
    
  return (
    <div className='flex flex-row justify-center w-full'>
        {
            loading ? <h1 className='text-xl font-bold text-white'>Loading...</h1>
        : airportData ?
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Flughafencode</th>
                        <th scope="col" className="px-6 py-3">Ankunftszeit</th>
                        <th scope="col" className="px-6 py-3">Airline</th>
                        <th scope="col" className="px-6 py-3">Währung</th>
                    </tr>
                </thead>
                <tbody>
                    {airportData.map((airport) => 
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{airport.dep_iata}</th>
                            <td className="px-6 py-4">{airport.dep_estimated_utc}</td>
                            <td className="px-6 py-4">{airport.airline_iata}</td>
                            <td className="px-6 py-4">{airport.currency}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
        :
        <>
        </>}
    </div>
  )
}

export default AirportView