import React, { useState, useEffect } from 'react';
import { Block, f7 } from 'framework7-react';
import { PopupHome } from './popup';
import { getDevice } from 'framework7';


const FloatingImage = ({ onClose, onInstallBtnClicked }) => (
  <div className="floating-image">
    <div onClick={onInstallBtnClicked}>
      {/* <img src={icon} alt="" /> */}
    </div>
    <div className="close-button" onClick={onClose}>
      {/* <img src={close} alt="Close" /> */}
    </div>
  </div>
);

const Floating = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [floatingImageVisible, setFloatingImageVisible] = useState(true);
  const [modalIos, setModalIos] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setFloatingImageVisible(true);
  }
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {  
      setFloatingImageVisible(false);
   }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, [deferredPrompt]);

  const onInstallBtnClicked = async () => {
  const device = getDevice();
  if(device.ios){
    setModalIos(true);
    f7.popup.open(PopupHome);
  }else{
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice
        .then(() => {
          setFloatingImageVisible(false);
          setDeferredPrompt(null);
        });
    } else {
      setFloatingImageVisible(false);
    }
  }


  };
  

  return (
    <Block className='floating'>
      {floatingImageVisible && (
        <>
            <FloatingImage
              onClose={() => setFloatingImageVisible(false)}
              onInstallBtnClicked={onInstallBtnClicked}
            />
        </>
      )}
      {modalIos && <PopupHome  show={modalIos}
          onClose={() => setModalIos(false)}/>}
    </Block>
  );
};

export { Floating };
