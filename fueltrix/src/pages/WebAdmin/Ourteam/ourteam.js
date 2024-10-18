import React from "react";
import Navbar from "../NavBarr/navbarr";
import Partners from "../Partners/partners";
import SRequest from '../ShedRequest/srequest'

function ourteam() {
  return (
    <div style={{backgroundColor:'white'}}>
      <Navbar />
      <SRequest/>
      <Partners />
    </div>
  );
}

export default ourteam;
