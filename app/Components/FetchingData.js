// 'use client'

// import React,{useEffect,useState} from 'react'
// function FetchingData() {
//   const [products,setProducts]= useState([]);
//   useEffect(async ()=>{
//     let data = await fetch("https://dummyjson.com/products");
//     data = await data.json();
//     setProducts(data.products);
//     console.log(data);
//   },[])
//   return (
//     <div>
//       <div>FetchingData</div>
//       {
//         products.map((product)=>(
//           <h3>{product.title}</h3>
//         ))
//       }
//     </div>
//   )
// }

// export default FetchingData


// ------------- working 
// 'use client' 

// import React, { useEffect, useState } from 'react';

// function FetchingData() {
//   const [products, setProducts] = useState([]);
//   const fetchData = async () => {
//     try {
//       let data = await fetch("https://dummyjson.com/products");
//       if (!data.ok) {
//         throw new Error(`HTTP error! Status: ${data.status}`);
//       }
//       const jsonData = await data.json();
//       setProducts(jsonData.products);
//       console.log(jsonData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
    

//     fetchData();


//   }, []);

//   return (
//     <div>
//       <div>FetchingData</div>
//       {products.map((product) => (
//         <h3 key={product.id}>{product.title}</h3>
//       ))}
//     </div>
//   );
// }

// export default FetchingData;


// ----------------------------------- working 
// 'use client'
// import React, { useEffect, useState } from 'react';

// function FetchingData() {
//   const [channels, setChannels] = useState([]);

//   const parseM3U = (m3uData) => {
//     // Implement your M3U parser logic here
//     // You need to extract relevant information such as channel names, logos, and stream URLs
//     // For now, this example assumes a basic extraction
//     const lines = m3uData.split('\n');
//     const channelsData = [];

//     lines.forEach((line) => {
//       if (line.startsWith('#EXTINF:')) {
//         // Extract information from the #EXTINF line
//         const match = /tvg-name="([^"]+)" tvg-logo="([^"]+)" tvg-id="([^"]+)"/.exec(line);
//         if (match) {
//           const [, name, logo, id] = match;
//           channelsData.push({ name, logo, id });
//         }
//       }
//     });

//     return channelsData;
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8");
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const m3uData = await response.text();
//       const parsedChannels = parseM3U(m3uData);
//       setChannels(parsedChannels);
//       console.log(parsedChannels);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div>FetchingData</div>
//       {channels.map((channel) => (
//         <div key={channel.id}>
//           <h3>{channel.name}</h3>
//           <img src={channel.logo} alt={`${channel.name} logo`} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FetchingData;


//------------------- working
'use client'
import React, { useEffect, useState } from 'react';

function FetchingData({ onUrlsUpdate }) {
  const [urls, setUrls] = useState([]);

  const extract = (m3uData) => {
    const lines = m3uData.split('\n');
    const extractedUrls = [];

    lines.forEach((line) => {
      if (line.startsWith('http')) {
        const url = line.trim();
        extractedUrls.push(url);
      }
    });

    return extractedUrls;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://iptv-org.github.io/iptv/categories/weather.m3u");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const Data = await response.text();
      const extractedUrls = extract(Data);
      setUrls(extractedUrls);
      // console.log(extractedUrls);
      onUrlsUpdate(extractedUrls);
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

export default FetchingData;