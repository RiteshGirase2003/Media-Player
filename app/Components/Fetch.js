
'use client'
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

function Fetch({ onUrlsUpdate }) {
  const [data, setData] = useState([]);

  

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("https://api.audioshots.app/audio");
        
      if (!response.statusCode==200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.data);
      setData(response.data);
      onUrlsUpdate(data);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default Fetch;