import React from "react";
import BasicTabs from "../Elements/Tabs";
// import BrandCards from "../Elements/BrandCards";


const BrowseBrand = () => {
  return (
    <>
      {/* <Animatedbackground />
       */}
      <div className="container-fluid" style={{width:"100%",height:"100vh",overflow:"auto",paddingTop:"60px"}}>
        <div className="browse_searchBar">
          <input
            type="text"
            name="browse_search"
            id="browse_search"
            placeholder="Search The Brand"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="BrwoseBrandTabs  p-0">
          <BasicTabs />
        </div>
      </div>
    </>
  );
};

export default BrowseBrand;
