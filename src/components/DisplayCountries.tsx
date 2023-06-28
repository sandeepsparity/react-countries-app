import React, { useEffect, useReducer } from 'react';
import countries from '../reducers/countries';

interface State {
  loading: boolean;
  error: null | string;
  data: any[];
}
const url = "https://restcountries.com/v3.1/all"

export default function DisplayCountries() {
  const initialState: State = {
    loading: false,
    error: null,
    data: []
  }
  const [state, dispatch] = useReducer(countries, initialState);

  useEffect(()=>{
    dispatch({type: 'FETCH_START'});
    const fetchData = async () => {
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw ('Something wrong with server'+ response);
        }
        const result = await response.json();
        console.log('result', result);
        dispatch({type: 'FETCH_SUCCESS', payload: result});
      }catch(e){
        dispatch({type: 'FETCH_END', payload: e});
      }
    }
 
    fetchData()
  }, []);

  const loadCountries = () => {
    return state.data.map((country: any)=>{
      const {name, population, region, capital, flags} = country;
      return <article className='country'>
        <img src={flags.png} alt={flags.alt}/>
        <div className="details">
          <h3>{name.common}</h3>
          <h4 className='population'>Population: {population}</h4>
          <h4 className='region'>Region: {region}</h4>
          <h4 className='capital'>Capital: {capital?.[0]}</h4>
        </div>
      </article>
    }) 
  }

  return (
    <section className='country-grid'>
      {
        state.loading ?
           <p>Loading...</p>
           : state.error ?
           <p>Error with API</p>
           : loadCountries()
      }
      
    </section>
  )
}



