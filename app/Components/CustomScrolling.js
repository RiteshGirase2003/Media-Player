"use client";

import React, { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import style from "./CustomScrolling.module.css";
import CardFetch from "./CardFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faMessage } from '@fortawesome/free-solid-svg-icons';

const CustomScrolling = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedData, setSelectedCardData] = useState([]);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://api.audioshots.app/audio?limit=100");
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);




  

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

  


  const handleUrlsUpdate = (fetchData) => {
    setData(fetchData.data);
    setResponse(fetchData);
  };

 

  //----------------------------------------------------------------
  const windowHeight = window.innerHeight;
  let position = 0;

  const handleScroll = () => {

    const scrollPosition = window.scrollY;
    const pos =Math.floor(scrollPosition / windowHeight);
    // setSelectedCardData(data[pos]);
    // setPlaying(true);
    const scrPos = Math.abs(scrollPosition - (pos * windowHeight));
    const threshold = scrPos > (windowHeight * 0.25) && scrPos < (windowHeight * 0.75) ? true : false; 
    const scrollDirection = scrollPosition > position ? 0 : 1;
    if ( threshold === true)
    {
      // console.log(" true threshold");
      // console.log(' window height : '+windowHeight);
      // console.log('scroll pos : '+scrollPosition);
      // console.log("- pos : "+pos);
      // console.log("scrPos : " + scrPos);
      // console.log(" dir : "+scrollDirection);


      
      if (scrollDirection ===0)
      {
        window.scrollTo(0, (pos + 1) * windowHeight);
      }
      else if (scrollDirection ===1)
      {
        window.scrollTo(0, pos * windowHeight);
      }
    }
   
    position=scrollPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={style.body}>

      <CardFetch url={url} onFetchData={handleUrlsUpdate} />

     

      <div className={style.cards_container}>
        {data.map((item, index) => (
          <div
            key={index}
            className={style.cards}
            
          >

            <div className={style.card}>
              <div className={style.avatarContainer} >

                {/* <Avatar
                  className={style.AvatarClass}
                  alt={data.title}
                  src={
                    isPlaying && item._id === selectedData._id
                      ? "https://media.giphy.com/media/XMaB779YCmP9m/giphy.gif?cid=ecf05e47bcrrqf57fuhre5n2n51mc7lj5acke27b5xs7kz79&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                      : item?.bannerImage
                  }
                  
                  sx={{ mr: 2, "&:hover": { cursor: "pointer" } }}
                /> */}

                
                {isPlaying && item._id === selectedData._id ? (
                  <img
                    className={style.ImgClass}
                    alt={data.title}
                    src="https://media.giphy.com/media/XMaB779YCmP9m/giphy.gif?cid=ecf05e47bcrrqf57fuhre5n2n51mc7lj5acke27b5xs7kz79&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    onClick={() => handleCardClick(item)}
                  />
                ) : (
                  <img
                    className={style.ImgClass}
                    alt={data.title}
                    src={item?.bannerImage}
                    onClick={() => handleCardClick(item)}
                  />
                )}
                  
                

                
                <p className={style.overlayText}> <h4 className={style.Author}>{item.createdBy.firstName} {item.createdBy.lastName} <span>{item.isFollowing ? 'Subscribed' : 'Subscribe'}</span></h4><br></br>{item.title}</p>
              </div>

              <div className={style.icons}>
                  <div className={style.icon}>
                    <h1 className={` ${item.isLiked ? style.blue : style.white}`}><FontAwesomeIcon icon={faThumbsUp} /></h1>
                    <h3>{item.likesCount}</h3>
                  </div>
                  <div className={style.icon}>
                    <h1 ><FontAwesomeIcon icon={faMessage} /></h1>
                    <h3>{item.commentsCount} </h3>
                  </div>
              </div>

            </div> 


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

 
    </div>
  );
};

export default CustomScrolling;
