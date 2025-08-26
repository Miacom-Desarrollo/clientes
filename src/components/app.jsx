import React, { useState, useEffect } from 'react';
import {
  App, View,
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';
import {
  SkeletonBlock
} from 'framework7-react';
const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'philips-events-app', // App name
    theme: 'auto', // Automatic theme detection
    // App store
    store: store,
    // App routes
    routes: routes,

    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV === 'production' ? {
      path: '/service-worker.js',
    } : {},
  };

  return (
    <App {...f7params}>
      {/* Main View */}
      <View main url="/" />
    </App>
  );
}

export default MyApp;