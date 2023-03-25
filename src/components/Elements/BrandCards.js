import React from "react";

const BrandCards = ({ data, col }) => {
  return (
    <div className={`col-md-${col} my-3`}>
      <div className="h-100 p-5 bg-light border rounded-3">
        <h2 className="fw-bolder mb-4 fs-2">{data.brand}</h2>
        <div>
          <table>
            <tr>
              <td>Brand :</td>
              <td>{data.brand}</td>
            </tr>
            <tr>
              <td>Name Of Product:</td>
              <td>{data.nameofproduct}</td>
            </tr>
            <tr>
              <td>Need Influencer Category:</td>
              <td>{data.category}</td>
            </tr>
            <tr></tr>
            <tr>
              <th> Influencers requierment</th>
              <th></th>
            </tr>
            <tr>
              <td>Min-follwers :</td>
              <td>{data.minFollowers}</td>
            </tr>
            <tr>
              <td> Social Media Active :</td>
              <td>{data.socialMedia}</td>
            </tr>
            <tr>
              <td>Experience :</td>
              <td>{data.experience}</td>
            </tr>
            <tr className="mt-5">
              <th>Offers Price</th>
              <th>{data.offerPrice}</th>
            </tr>
          </table>
        </div>
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
