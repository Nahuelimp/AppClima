import { useState } from 'react';
import './App.css'
import {API_KEY,URL_API} from './dataApi'



function App() {
  const [ciudad,setCiudad]=useState(""); 
  const [dataClima,setDataClima]=useState(null);



  const handleChange = (e) => { 
    setCiudad(e.target.value);
  
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) getClima()
  }

  const getClima = async () => {
    try{
          const respuesta = await fetch(`${URL_API}?q=${ciudad}&appid=${API_KEY}`)
          const data = await respuesta.json();
          setDataClima(data);
    } catch (error)
     { console.error("Ocurrio un error")}
  }
    

  return (
    <div className='container'>
       <h1>CieloClear </h1>
       <form onSubmit={onSubmit}>
          <input type="text" 
          value={ciudad}
          onChange={handleChange}/>
       <button type='submit'>Buscar</button>
       </form>
        
        {
        dataClima && ( 
          <div className='data-clima'>
          <h2>{dataClima.name}</h2>
          <p>Temperatura : {parseInt(dataClima?.main?.temp  - 273.15)} °C</p>
          <p>Humedad : {dataClima?.main?.humidity} %</p>
          <p>Viento : {dataClima?.wind?.speed} m/s</p>
          <p>Cantidad de nubes : {dataClima?.clouds?.all} %</p>
          <img src={ `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Clima-Icono" />
          </div>
          )
        }
     
    </div>
  )
}

export default App
