import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BrandCards from "./BrandCards";
import app_config from "../config";
import { useBlogContext } from "../../Context/Blogs_Requrement_context/BlogContext";
import { useBrandContext } from "../../Context/BrandsContext/BrandsContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  // backend url
  const url = app_config.backend_url;

  // data from backend 
  const { allRequrement } = useBlogContext();
  // allbrands 
  const { AllBrands } = useBrandContext();

  // Return Table
  const Table = (
    Brand,
    nameOfProduct,
    influecerCate,
    minFollowers,
    OnSocialMedia,
    Experience,
    PriceOffer
  ) => {
    return (
      <table>
        <tr>
          <td>Brand :</td>
          <td>{Brand}</td>
        </tr>
        <tr>
          <td>Name Of Product:</td>
          <td>{nameOfProduct}</td>
        </tr>
        <tr>
          <td>Need Influencer Category:</td>
          <td>{influecerCate}</td>
        </tr>
        <tr></tr>
        <tr>
          <th> Influencers requierment</th>
          <th></th>
        </tr>
        <tr>
          <td>Min-follwers :</td>
          <td>{minFollowers}</td>
        </tr>
        <tr>
          <td> Social Media Active :</td>
          <td>{OnSocialMedia}</td>
        </tr>
        <tr>
          <td>Experience :</td>
          <td>{Experience}</td>
        </tr>
        <tr className="mt-5">
          <th>Offers Price</th>
          <th>{PriceOffer}</th>
        </tr>
      </table>
    );
  };

  const ProfileCard = (category, image, name) => {
    return (
      < div className="col-md-6 " >
        <div
          style={{ height: "20rem" }}
          className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div className="col p-4 d-flex flex-column position-static bg-white">
            <strong className="d-inline-block mb-2 text-primary">
              {category}
            </strong>
            <h3 className="mb-0">{name}</h3>
            <div className="mb-1 text-muted">Nov 12</div>
            <p className="card-text mb-auto">
              Hello i am influencer who worked for you and make your brand
              famous So Hire me The Price should be negotiable
            </p>
            <div className="d-flex gap-3">
              <button className="FollowBtnCard">Follow</button>
              <button className="FollowBtnCard">Chat</button>
            </div>
          </div>
          <div
            className="col-auto d-none d-lg-block "
            style={{
              background:
                "linear-gradient(to right ,rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
            }}
          >
            <img
              className="bd-placeholder-img"
              width="200"
              style={{
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={url + "/uploads/" + image}
              alt="Thumbnail"
            />
          </div>
        </div>
      </div >
    );
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Brands" {...a11yProps(0)} />
          <Tab label="Requirement Posts" {...a11yProps(1)} />
          <Tab label="Saved" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ margin: "0 auto" }} className="row ">
          {AllBrands.map((br) =>
            ProfileCard(br.brandName, br.brandavatar, br.ownerName)
          )}
        </div>
      </TabPanel>
      <TabPanel style={{ overflowX: "auto" }} value={value} index={1}>
        <div className="row">

          {allRequrement.map((data) =>
            <BrandCards data={data} col={6} />
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
