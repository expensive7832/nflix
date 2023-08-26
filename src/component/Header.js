import { useState, useEffect } from "react";
import Logo from "./assets/logo192.png";

function Header() {

  const [showHeader, setshowHeader] = useState(false);

  function checkMovement(){
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
          setshowHeader(true)
      }else{
        setshowHeader(false);
      }
     
    })
  }


useEffect(() =>{
 
  checkMovement()

  return()=>{
    checkMovement()
  }
})

    return (
        <div>
            <div>
                {/*  bottom Header */}
                <nav className={showHeader && "nav_bg" }>
                  <a href="" className="nav-logo">Moviescene</a>
                  <a href="" className="nav-right-image"><img src={Logo} alt="smile topbar image" /></a>
                </nav>
            </div>
        </div>
    )
}

export default Header
