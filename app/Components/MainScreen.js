"use client";

import React, { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import style from "./MainScreen.module.css";
import CardFetch from "./CardFetch";

const MainScreen = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedData, setSelectedCardData] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [url, setUrl] = useState("https://api.audioshots.app/audio");
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [Page, setPage] = React.useState(1);
  const [pageStart, setPageStart] =useState(1);


  const listItems = [];
  for (let i = pageStart; i <= pageStart+5; i++) {
    listItems.push(  <button id={i} style={Page===i?{backgroundColor:'green'}:{backgroundColor:'#eee'}} className={style.button}  onClick={()=>handlePage(i)}>{i}</button>);
  }


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (item) => {
    setSelectedCardData(item);
    audioRef.current?.getInternalPlayer()?.play();
    if (item._id === selectedData._id && isPlaying) {
      setPlaying(!isPlaying);
    } else setPlaying(true);

  };

  useEffect(() =>{setUrl(
    `https://api.audioshots.app/audio?page=${Page}`
  );},[Page])


  const handleUrlsUpdate = (fetchData) => {
    setData(fetchData.data);
    setResponse(fetchData);
  };

  const handleNext = () => {
    if (response.pageData.last_page === response.pageData.page) {
      setUrl(`https://api.audioshots.app/audio?page=1`);
    } else
    {
       
      setPage(Page+1);
      if (response.pageData.page + 1 > pageStart+5)
      {
        setPageStart(Page);
      }
    }

  };
  
  const handlePrevious = () => {
    if (response.pageData.page === 1) {
      setUrl(
        `https://api.audioshots.app/audio?page=1`
      );
    } 
    else if (Page>0)
    {
      setPage(Page-1)
      if (response.pageData.page - 1  < pageStart)
      {
        setPageStart(response.pageData.page - 5);
      }
    }
  };

  const handlePage = (pageno) => {
    if (pageno === pageStart+5 && pageno < response.pageData.last_page )
      setPageStart(pageno);
    else if (pageno === pageStart && pageno>=6)
      setPageStart(pageno-5)
    
      setPage(pageno);
  }


  useEffect(() => {
    setUrl(url);
    
  }, [url]);

  

  return (
    <div className={style.body}>

      <CardFetch url={url} onFetchData={handleUrlsUpdate} />

      <h1 className={style.index}>
        {" "}
        Page : {response && response.pageData && response.pageData.page}
      </h1>

      <div className={style.cards_container}>
        {data.map((item, index) => (
          <div
            key={index}
            className={style.card}
            onClick={() => handleCardClick(item)}
          >

            <Avatar
              className={style.AvatarClass}
              alt={data.title}
              src={
                isPlaying && item._id === selectedData._id
                  ? "https://media.giphy.com/media/XMaB779YCmP9m/giphy.gif?cid=ecf05e47bcrrqf57fuhre5n2n51mc7lj5acke27b5xs7kz79&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                  : item?.bannerImage
              }
              sx={{ mr: 2, "&:hover": { cursor: "pointer" } }}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {!selectedData.length > 0 ? (
        <ReactPlayer
          className={style.video}
          ref={audioRef}
          url={
            "https://d11wy2bvtu57pr.cloudfront.net/" + selectedData.playlistFile
          }
          playing={isPlaying}
          controls={false}
        />
      ) : (
        ""
      )}

      

      <div className={style.controls}>
          <button onClick={handlePrevious}>Previous</button>

          
          {listItems}

          <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default MainScreen;
