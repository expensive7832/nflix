import {useState, useEffect} from "react";
import axios from "../axios";
import request from "../request";
import {FaFlag, FaYoutube} from "react-icons/fa";




function Hero() {

    const [Movies, setMovies] = useState({});

    const getRandomMovie = async () => {
        const res = await axios?.get(request?.fetchSciFi)
        .then((res) => {
            setMovies(
                res?.data?.results[Math?.floor(Math?.random() * res?.data?.results?.length) + 1]
              );
        })
        .catch((err) => console.log(err))
          

        return res;
        
    }

    useEffect(() => {
        
        getRandomMovie();

        return() =>{
            getRandomMovie();
        }
        
    }, []);

    
    const baseImageUrl = "https://image.tmdb.org/t/p/original/";

    const heroStyling = {
        display: "grid",
        placeItems: "center",
        backgroundImage: `url(${baseImageUrl}${Movies?.poster_path})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
    }
   
    return (
        <div className="top" style={heroStyling}>
            <section className="container-fluid hero">
                <div className="row">
                    <div className="col-12 col-md-6 text-center" style={{paddingTop: "7rem"}}>
                    <h2 data-aos="flip-right" className="display-6 fw-bold text-white">{Movies?.name || Movies?.title}</h2>
                        <div className="d-flex justify-content-center">
                            <button className="btn text-white mx-3"><FaYoutube />Watch Now</button>
                            <button className="btn text-white mx-3"><FaFlag/>Save For Later</button>
                        </div>
                        <p data-aos="flip-down" className="pt-3 text-white m-auto">{Movies?.overview}</p>
                    </div>
                </div>
            </section> 
            <div className="bottom-hero-overlay"></div> 
        </div>
        
        
    )
}


export default Hero
