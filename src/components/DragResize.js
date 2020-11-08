import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './DragResize.css'

const DragResize = (props) => {
  const { onChangeFrame } = props

  const borderSize = `-${4}px`;

  const draggableBordersStyle = {
    left: borderSize,
    right: borderSize,
    top: borderSize,
    bottom: borderSize
  }

  const [frameRef] = useState(useRef())
  const [leftPos, setLeftPos] = useState(0)
  const [topPos, setTopPos] = useState(0)
  const [frameHeight, setFrameHeight] = useState(100)
  const [frameWidth, setFrameWidth] = useState(100)

  onChangeFrame({ width: frameWidth, height: frameHeight, top: topPos, left: leftPos })

  let initialGrabPosX
  let initialGrabPosY

  let limit = 0

  const stopDragg = () => {
    document.onmousemove = null
  }

  const startDraggFrame = function (e) {
    initialGrabPosX = window.event.layerX
    initialGrabPosY = window.event.layerY
    document.onmousemove = moveFrame
  }

  const moveFrame = (e) => {
    let { clientX, clientY } = e
    let left = clientX - initialGrabPosX
    let top = clientY - initialGrabPosY
    left = left < limit ? 0 : left
    top = top < limit ? 0 : top
    setLeftPos(left)
    setTopPos(top)
  }

  const setHeightFromTop = (clientY) => {
    const height = frameHeight + (topPos - clientY)
    if (height > 50) {
      setFrameHeight(height)
      setTopPos(clientY)
    }
  }

  const setWidthFromLeft = (clientX) => {
    const width = frameWidth + (leftPos - clientX)
    if (width > 50) {
      setFrameWidth(width)
      setLeftPos(clientX)
    }
  }

  const setHeightFromBottom = (clientY) => {
    const height = clientY - topPos
    if (height > 50) {
      setFrameHeight(height)
    }
  }

  const setWidthFromRight = (clientX) => {
    const width = clientX - leftPos
    if (width > 50) {
      setFrameWidth(width)
    }
  }

  const draggBorderTop = () => {
    document.onmousemove = (e) => {
      setHeightFromTop(e.clientY)
    }
  }

  const draggBorderRight = () => {
    document.onmousemove = (e) => {
      setWidthFromRight(e.clientX)
    }
  }

  const draggBorderLeft = () => {
    document.onmousemove = (e) => {
      setWidthFromLeft(e.clientX)
    }
  }

  const draggBorderBottom = () => {
    document.onmousemove = (e) => {
      setHeightFromBottom(e.clientY)
    }
  }

  const draggBorderTopRight = () => {
    document.onmousemove = (e) => {
      const { clientX, clientY } = e
      setHeightFromTop(clientY)
      setWidthFromRight(clientX)
    }
  }

  const draggBorderBottomRight = () => {
    document.onmousemove = (e) => {
      const { clientX, clientY } = e
      setHeightFromBottom(clientY)
      setWidthFromRight(clientX)
    }
  }

  const draggBorderBottomLeft = () => {
    document.onmousemove = (e) => {
      const { clientX, clientY } = e
      setHeightFromBottom(clientY)
      setWidthFromLeft(clientX)
    }
  }

  const draggBorderTopLeft = () => {
    document.onmousemove = (e) => {
      const { clientX, clientY } = e
      setHeightFromTop(clientY)
      setWidthFromLeft(clientX)
    }
  }

  return (
    <div
      className="draggable-container"
      style={{ left: leftPos, top: topPos, width: frameWidth, height: frameHeight }}
    >
      <div className="net">
        <div className="net-line right bottom"></div>
        <div className="net-line right bottom"></div>
        <div className="net-line bottom"></div>
        <div className="net-line right bottom"></div>
        <div className="net-line right bottom"></div>
        <div className="net-line bottom"></div>
        <div className="net-line right"></div>
        <div className="net-line right"></div>
      </div>
      <div
        className="draggable-box"
        ref={frameRef}
        onMouseDown={startDraggFrame}
        onMouseUp={stopDragg}
      ></div>
      <div
        className="draggable-borders"
        style={draggableBordersStyle}
      >

        {/* Top-Left */}
        <div
          onMouseDown={draggBorderTopLeft}
          onMouseUp={stopDragg}
          className="border top-left"></div>

        {/* Top */}
        <div
          onMouseDown={draggBorderTop}
          onMouseUp={stopDragg}
          className="border top"></div>

        {/* Top-Right */}
        <div
          onMouseDown={draggBorderTopRight}
          onMouseUp={stopDragg}
          className="border top-right"></div>

        {/* Right */}
        <div
          onMouseDown={draggBorderRight}
          onMouseUp={stopDragg}
          className="border right">
        </div>

        <div
          onMouseDown={draggBorderBottomRight}
          onMouseUp={stopDragg}
          className="border bottom-right"></div>

        <div
          onMouseDown={draggBorderBottom}
          onMouseUp={stopDragg}
          className="border bottom">
        </div>

        <div
          onMouseDown={draggBorderBottomLeft}
          onMouseUp={stopDragg}
          className="border bottom-left"></div>
        <div
          onMouseDown={draggBorderLeft}
          onMouseUp={stopDragg}
          className="border left">
        </div>
      </div>
      {props.children}
    </div>
  );
}

DragResize.propTypes = {

};

export default DragResize;