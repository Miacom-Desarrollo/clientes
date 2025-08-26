import React, { useState, useEffect } from 'react';
import {
  App,
  Views,
  View,
  Toolbar,
  Link,
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';
import {
  SkeletonBlock
} from 'framework7-react';
const MyApp = () => {

  const [activeTab, setActiveTab] = useState('home');
  const tabIcons = {
    // home: { on: homeOn, off: homeOff },
    // calendar: { on: calendarOn, off: calendarOff },
    // speakers: { on: speakersOn, off: speakersOff },
    // venue: { on: mapOn, off: mapOff },
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };


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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <App {...f7params}>

      {/* Views/Tabs container */}
      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <div>
          <Toolbar tabbar icons bottom>
            <Link
              tabLink="#view-home"
              tabLinkActive={activeTab === 'home'}
              onClick={() => handleTabChange('home')}
            >
              <span className={`tabbar-label ${activeTab === 'home' ? 'active-tab' : ''}`}>
                Home
              </span>
            </Link>
            <Link
              tabLink="#view-clientes"
              tabLinkActive={activeTab === 'clientes'}
              onClick={() => handleTabChange('clientes')}
            >
              <span className={`tabbar-label ${activeTab === 'clientes' ? 'active-tab' : ''}`}>
                Clientes
              </span>
            </Link>
          </Toolbar>
        </div>
        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
  <View id="view-home" main tab tabActive={activeTab === 'home'} url="/" />
  <View id="view-clientes" main tab tabActive={activeTab === 'clientes'} url="/clientes" />

      </Views>
    </App>
  )
}

export default MyApp;