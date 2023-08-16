import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [trains, setTrains] = useState([])
  useEffect(
    () => {
      try {
        const fetchingTrainData = async () => {
          const response = await axios.get('http://20.244.56.144:80/train/trains');
          setTrains(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.error("error while fetching the data...")
      }
      fetchingTrainData()
    },[])
  return (
    <>
      <ul>{
        trains.map(
          () => {
            
          }
        )}</ul>
    </>
  );
}

export default App;
