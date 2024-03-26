
'use client'
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

function CardFetch({url, onFetchData }) {


  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(url);
        
      if (!response.statusCode==200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.data);

      onFetchData(response.data);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div>
      
    </div>
  );
}

export default CardFetch;