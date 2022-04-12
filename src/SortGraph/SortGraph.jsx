import './SortGraph.css'
import { useState, useEffect } from 'react'


const SortGraph = () => {
  
  const [arr, setArr] = useState([])

  useEffect(() => {
    resetArray()
  }, [])
  
  const resetArray = () => {
    const array = []
    
    for (let i = 0; i< 50; i++) {
      array.push(getRandomNumber(5, 200))
    }
    setArr(array)
  } 
  
  

  const mappedArray = arr.map((num, i) => {
    // return <div className='wrapper-num'><p className='numbers' key={i} style={{ height: `${num * 2.5}px` }}>{num}</p><div className='bar'></div></div>
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 2}px`}}></div><p className='numbers'>{num}</p></div>
  })

    // <p>{num}<p/>

  return (
    <>
      <div className='visualizer-space'>
        <div className='visualizer-wrapper'>
          <div className='header-wrapper'> 
            <h2>This will be space for sort graph visualizer</h2>
          </div>
          
          <div className='bars-wrapper'>
            {mappedArray}
          </div>

          <div className='button-wrapper'>
            <button onClick={resetArray}>new array</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SortGraph

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// function for random number generater
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
