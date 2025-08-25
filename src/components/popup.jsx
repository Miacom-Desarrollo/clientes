import React, { useRef, useEffect, useState } from 'react';
import {
  Navbar,
  Popup,
  Block,
  NavRight,
  Link,
} from 'framework7-react';
import Swiper from 'swiper/bundle';
// import close from '../../public/images/map/close.svg';


const PopupHome = ({show, onClose }) => {

  const [popupOpened, setPopupOpened] = useState(show);

  const swiperRef = useRef(null);
  useEffect(() => {
    setPopupOpened(show);
  }, [show]);
  const closePopup = () => {
    setPopupOpened(false);
    onClose(); 
  };
  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-popup', {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 80,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });


  }, []);


  return (
    <Popup
      className="PopupHome"
      opened={popupOpened}
      onPopupClosed={() => closePopup()}
    >
        <Navbar>
          <NavRight>
            <Link popupClose>
              <img src={close} alt="" />
            </Link>
          </NavRight>
        </Navbar>
        <Block>
      <div className="swiper-container swiper-popup" >
        <div className="swiper-wrapper">
            <div className="swiper-slide" >
              <div className='PopupHome__container'>
                <img src={step1} alt="" />

              </div>
            </div>
            <div className="swiper-slide" >
              <div className='PopupHome__container'>
                <img src={step2} alt="" />
              </div>
            </div>
            <div className="swiper-slide" >
              <div className='PopupHome__container'>
                <img src={step3} alt="" />

              </div>
            </div>

        </div>
        <div className="swiper-pagination"></div>
      </div>

        </Block>
    </Popup>
  );
};

export { PopupHome };
