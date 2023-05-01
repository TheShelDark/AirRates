import React, { useState } from 'react'
import Card from '../components/Card';
import CardSection from "../components/CardSection";
import { cities } from "../cities";

function Home() {
    const[citiesList, setCitiesList] = useState(cities)
  return (
    <>
        <h1 className="text-2xl font-bold text-white">Unsere Flughäfen</h1>
        <CardSection>
        {citiesList.map((city) => <Card key={city.name} label={city.label} image={city.image} name={city.name}/>)}
        
        </CardSection>
    </>
  )
}

export default Home