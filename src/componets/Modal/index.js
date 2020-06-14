import React, { useState, forwardRef, useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {ReactComponent as CloseIcon} from './close.svg';

const Backdrop = styled.section`
  position: fixed;
  z-index: 100;
  top:0;left:0;right:0;bottom:0;
`;

const ModalBox = styled.div`
  filter: none;
  position: relative;
  padding: 2em;
  top: 50%;
  left: 50%;
  min-height: 30%;
  width: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 999;
  overflow-y: auto;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Close = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

const Modal = forwardRef(({ children }, ref) => {
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close()
    }
  });

  const open = () => {
    setDisplay(true);
  }

  const close = () => {
    setDisplay(false);
  }

  if (display) {
    return ReactDOM.createPortal(
      <Backdrop>
        <ModalBox>
          <Close onClick={close}/>
          {children}
        </ModalBox>
      </Backdrop>,
      document.getElementById('modal-root')
    );
  }
  return null;
})

export default Modal;