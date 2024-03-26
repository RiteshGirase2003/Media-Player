'use client'
import { useEffect,useState } from "react";
import { useLocalStorage } from "./Components/useLocalStorage";
import MainScreen from "./Components/MainScreen";

import Login from "./Components/Login";
import CustomScrolling from "./Components/CustomScrolling";




export default function Home() {
  const[accessToken, setAccessToken] =useState('');
  const [refreshToken, setRefreshToken] = useState('');
 
  useEffect(()=>{
    localStorage.setItem("token", JSON.stringify(accessToken))
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken))

  },[accessToken,refreshToken])

  const handleTokens = (tokens) =>{
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
  }
  return (
    <div>
      
      
      {/* {
        accessToken.length>0?<MainScreen/>:<Login onFetchTokens={handleTokens}/>
      } */}

     

      {
        accessToken.length>0?<CustomScrolling/>:<Login onFetchTokens={handleTokens}/>
      }
      
    </div>
  );
}
