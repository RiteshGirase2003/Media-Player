

// 'use client';

// import React, { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player';

// const MainScreen = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <div>
//       <h1>{isClient ? 'My Video Page (Client)' : 'My Video Page (Server)'}</h1>
//       {isClient && <ReactPlayer url='https://youtu.be/iu-LBY7NXD4?si=gROiJbdQsVvP14EY' />}
//     </div>
//   );
// };

// export default MainScreen;


//--------------------------

// 'use client';

// import React from 'react';
// import ReactPlayer from 'react-player';

// const MainScreen = () => {
//   return (
//     <div>
//       <h1 suppressHydrationWarning={true}>My Video Page</h1>
//       <ReactPlayer
//         url='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
//         controls={true} // You can include controls if needed
//         width='60%'
//         height='100%'
//       />
//     </div>
//   );
// };

// export default MainScreen;

//---------------------


'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import FetchingData from './FetchingData';
import style from './MainScreen.module.css'
import Fetch from './Fetch';

const MainScreen = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [URL, setURL] = useState('');
  const [playlist,setPlaylist] = useState([]);
  // const playlist = [
  //   { 'file': 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  //   { 'file': 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  // ];

  useEffect(() => {
    setIsClient(true);
    setURL(playlist[videoIndex])
  }, []);

  useEffect(() => {
    setURL(playlist[videoIndex])
  }, [videoIndex]);

  

  const handleNext = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setVideoIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleUrlsUpdate = (updatedUrls) => {
    setPlaylist(updatedUrls);
  };

  return (
    <div className={style.body}>
      <h1 className={style.title} suppressHydrationWarning={true}>My Video Page</h1>
      {/* <FetchingData onUrlsUpdate={handleUrlsUpdate} /> */}
      <Fetch onUrlsUpdate={handleUrlsUpdate} />

      <div className={style.video_container}>
        <h1 className={style.index}>{videoIndex} / {playlist.length}</h1>

        {isClient && (
          <>
            <ReactPlayer className={style.video} url={URL} controls={true} playing={true} width='69%' height='100%' />
            <div className={style.controls}>
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
            <h3>{URL}</h3>

          </>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
