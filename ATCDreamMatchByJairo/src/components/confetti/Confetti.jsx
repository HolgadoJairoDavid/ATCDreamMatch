import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import style from './confetti.module.css'

const Confetti = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
    })

    const detectSize = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.addEventListener('resize', detectSize)
        return () => window.removeEventListener('resize', detectSize)
    }, [windowDimensions])
    return (
        <div className={style.ReactConfetti}>
          <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          tweenDuration={2000}
          />
        </div>
    )
}

export default Confetti;