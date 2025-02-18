
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = `AIzaSyBM2rq2o0iU4k1LbDyJi1dl8P4qKqI03eg`;
const API_URL = `https://www.googleapis.com/youtube/v3/search`;

function Youtubedata() {
      const [videos, setVideos] = useState([]);
        const [nextPageToken, setNextPageToken] = useState("");
      
      
        useEffect(()=>{
            fetchVideos("");
        }, []);
      
        const fetchVideos = (pageToken) => {
          // setLoading(true);
          axios
            .get(API_URL, {
              params: {
                key: API_KEY,
                q: ``, 
                type: "video",
                part: "snippet",
                maxResults: 10, // Adjust as needed
                pageToken: pageToken,
              },
            })
            .then((response) => {
              setVideos([...videos, ...response.data.items]);
              console.log(response);
              setNextPageToken(response.data.nextPageToken);
              // setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching data from YouTube API:", error);
              // setLoading(false);
            });
        };
      
        const handleScroll = () => {
          if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
          ) {
            if (nextPageToken) {
              fetchVideos(nextPageToken);
            }
          }
        };
      
        useEffect(() => {
          window.addEventListener("scroll", handleScroll);
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, [nextPageToken]);
      
      
      
        return (
          <div className="pl-56 pt-28 flex flex-wrap">
            {videos.map((item) => {
              return (
                <>
                  <div className="flex flex-col flex-wrap w-[30%] top-16 left-28 mx-2 overflow-hidden cursor-pointer">
                    <img
                      src={item.snippet.thumbnails.high.url}
                      alt=""
                      className="w-[100%] rounded-md h-48 object-cover"
                    />
                    <p className="w-96 text-xl">....{item.snippet.title.slice(0,30)}... </p>
                    <div className="flex py-2 pb-8">
                      <a href="" title="Profile">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                          >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                      </a>    
                            <h2 className="mx-2">{item.snippet.channelTitle} </h2>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        );
  
}

export default Youtubedata

