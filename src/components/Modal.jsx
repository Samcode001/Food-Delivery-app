import React from 'react'
import ReactDom from "react-dom";

const MODEL_STYLES={
    position:'fixed',
    top:'50%',
    left:'50%',
    backgroundColor:'White',
    transform:'translate(-50%,-50%)',
    zIndex:1000,
    height:'90%',
    width:'90%',
    overflow: 'scroll'
}

const OVERLAY_STYLES={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    zIndex:1000,
}

const Modal = ({children,onClose}) => {
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}>
        <div style={MODEL_STYLES}>
        <button className='btn  btn-invert' style={{marginLeft:'90%',marginTop:'-35px'}} onClick={onClose
    }>X</button>
    {children}
        </div>
    </div>
    </>,document.getElementById('cart-root')
  )
}

export default Modal