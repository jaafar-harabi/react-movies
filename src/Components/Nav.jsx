import React, { useState } from "react";
import {
  Navbar,
  

} from "@material-tailwind/react";







import {logo} from '../assets'
 
export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  
  
    

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 dark" >
      <div className="container mx-auto flex flex-wrap items-center justify-between">
      
            <img alt="img" src={logo} className="w-36 h-16"/>
        
      
      
      
  
      </div>
      
    </Navbar>
  );
}