import {useState, useEffect} from 'react'
import axios from "../axios"
import "./Row.css"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Modal,  ModalBody, ModalHeader } from 'reactstrap';

const Row = ({title, fetchUrl, isLarge}) => {

     const [toggle, setToggle] = useState(false)

    const [trailer, settrailer] = useState("");

    const watchVid = async(movies) => {
        if(trailer){
            settrailer("");
        }else{
           await movieTrailer(movies?.name || movies?.title || "" )
            .then( async(url) => {
                let youtubeID = url?.split("?")[1]?.split("=")[1]
               
            //     const urlSearch = new URLSearchParams(new URL(url)?.search);
            //    const youtubeID = urlSearch?.get("v");
               await settrailer(youtubeID);
              setToggle(((prev) => !prev))
            }).catch((e) =>{
                alert(e)
            })
        }
    }

    const [Movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovie = async() =>{
            const res = await axios?.get(fetchUrl);
            setMovies(res?.data?.results);
            return res;
        }
        getMovie();

        return() =>{
            getMovie()
        }
    },[fetchUrl]);

    const baseImageUrl = "https://image.tmdb.org/t/p/original/";

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      


    return (
        <div className="bg-dark text-white">
            <div className="d-flex flex-column align-items-center">
                <h3 className="align-self-start title py-2">{title}</h3>
                <div data-aos="zoom-up" data-aos-duration="2000" className="poster_image d-flex align-items-center">
                {Movies?.map((movie, index) => {
                   return  <img   onClick={() => watchVid(movie)} key={index} src={`${baseImageUrl}${isLarge ? movie?.poster_path : movie?.backdrop_path}`} loading="lazy" alt={movie?.name || movie?.title } className={isLarge && "large_img" } />
                })}
                </div>
            </div>
           
         
            
           
            <Modal isOpen={toggle} toggle={() => setToggle((prev) => !prev)}>
          <ModalHeader toggle={() => setToggle(false)}>Modal title</ModalHeader>
          <ModalBody>
          <YouTube videoId={trailer} opts={opts}  />
          </ModalBody>
          
        </Modal>
            
            
        </div>
        
    )
}

export default Row
