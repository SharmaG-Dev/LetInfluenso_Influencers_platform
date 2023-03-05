
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/Home/home'
import Authentications from '../src/components/Auth/index'
import BrowseInfluencer from '../src/components/searchPage/browseInfluencer'
import BrandLogin from './components/Auth/BrandLogin';
import InfluencerLogin from './components/Auth/InfluencerLogin';
import BrowseBrand from './components/BrandBrosePage/BrowseBrand';
import Modal from './components/Elements/Modal';
import BrandProfile from './components/Profile/Brand/BrandProfile';
import InfluencerProfile from './components/Profile/Influencers/InfluencerProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="" />
        <Route element={<Authentications />} path="auth" />
        <Route element={<BrowseInfluencer />} path="browse" />
        <Route element={<BrandLogin />} path="brandauth" />
        <Route element={<BrandProfile />} path="brandpro" />
        <Route element={<InfluencerProfile />} path="influpro" />
        <Route element={<InfluencerLogin />} path="influencerauth" />
        <Route element={<BrowseBrand />} path="brandbrowse" />
        <Route element={<Modal />} path="mu" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
