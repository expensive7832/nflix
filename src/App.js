import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Hero from "./component/Hero";
import Row from "./component/Row";
import request from "./request"
import "./style.css"
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  
useEffect(() => {
 
  AOS.init(
    {
      duration: 3000,
      easing: 'ease-in-sine',
    }
  );
  AOS.refresh();

}, [])

  return (
    <div>
      <Header/>
      <Hero />
      <Row title="Trending" fetchUrl={request.fetchTrending} isLarge/>
      <Row title="Romantic" fetchUrl={request.fetchRomanceMovies}/>
      <Row title="Tv" fetchUrl={request.fetchTV}/>
      <Row title="Top Rated" fetchUrl={request.fetchTopRated}/>
      <Row title="Western" fetchUrl={request.fetchWestern}/>
      <div data-aos="zoom-up" data-aos-duration="2000" className="text-center text-success fw-bold text-capitalize py-3">&copy; <a href="http://esquireyusuf.ml" className="text-dark">Esq. Yusuf</a> {new Date().getFullYear()} </div>
    </div>
  );
  

}

export default App;
