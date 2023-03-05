import React from "react";

const BrandCards = (CompanyName, table) => {
  return (
    <div className="col-md-6 my-3">
      <div className="h-100 p-5 bg-light border rounded-3">
        <h2 className="fw-bolder mb-4 fs-2">{CompanyName}</h2>
        <div>{table}</div>
        <div className="buttonsContBrandCard mt-5">
          <button className="btn SaveBtnCard" type="button">
            More Info
          </button>
          <button className="btn SaveBtnCard  mx-3" type="button">
            Save
          </button>
          <button className="btn SaveBtnCard " type="button">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCards;
