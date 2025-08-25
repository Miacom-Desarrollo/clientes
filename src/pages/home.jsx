import React from 'react';
import {
  Page,f7
} from 'framework7-react';
import {
  Banner
} from './../components/Banner';



import { Floating } from '../components/Floating.jsx';



const HomePage = () => {
  const isMobile = f7.device.ios || f7.device.android;
  return (
    <Page name="home">
      {isMobile && <Floating />}
      <Banner />
    </Page>
  );
};

export default HomePage;