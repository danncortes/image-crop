import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DragResize from './DragResize'
import './ImageCrop.css'
import landscape from '../assets/landscape.jpeg';

ImageCrop.propTypes = {

};

const borders = 4

function ImageCrop(props) {

  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const canvasRef = React.useRef(null)
  const imageElement = React.useRef(null)

  const onChange = (data) => {
    setCanvasWidth(data.width)
    setCanvasHeight(data.height)
    setTop(data.top)
    setLeft(data.left)
  }

  useEffect(() => {
    let imageContext = canvasRef.current && canvasRef.current.getContext('2d')

    imageContext.drawImage(
      imageElement.current,
      left,
      top,
      canvasWidth,
      canvasHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  })


  return (
    <div className="image-crop">
      <img src={landscape} className="image-crop__img" ref={imageElement} />
      <DragResize onChangeFrame={onChange}>
        <canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          className="image-crop__canvas"
          ref={canvasRef}
        ></canvas>
      </DragResize>
    </div>
  );
}

export default ImageCrop;