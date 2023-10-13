import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [throphy, setThrophy] = useState([]);
  const items = [];

  useEffect(() => {
    console.log('Effect triggered');
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('https://swapi.dev/api/starships')
      .then(result=>result.json()).then(result => {
        
        let count = 0;
        const filteredData = result['results'].filter(data => {
          if(count < data['films'].length){
            count = data['films'].length;
          }
          return data['crew'] < 10 
        });

        filteredData.sort((a, b) => {
          // Replace 'name' with the property you want to sort by
          return b['films'].length - a['films'].length;
        });
        setThrophy(count);
        console.log(throphy);
          console.log(filteredData);
        setData(filteredData);
      })
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  data.map((res, index)=>{
    items.push(
      <div key = {index} className='starwars-container'>
          <h3 className='text-left'>{res['name']} {throphy===res['films'].length?<FontAwesomeIcon icon={faTrophy} size={"2x"}/>:""}</h3>
          <div className='row col-12 table-data'>
            <div className="col-md-6 col-sm-12">
              <p>Model</p>
              <p>{res['model']}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <p>Number of films</p>
              <p>{res['films'].length}</p>
            </div>
          </div>
      </div>
    );
  })
  
  return (
    <div className="container">
        <p className='text-center'>The starship that has featured in the most films will show as 
        <FontAwesomeIcon icon={faTrophy} size={"2x"}/></p>
        {items}
    </div>
  );
}

export default App;
