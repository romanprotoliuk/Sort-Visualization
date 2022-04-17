import './Body.css'
import CodeBlock from '../CodeBlock/CodeBlock'
import SortGraphV3 from '../../SortGraphV3/SortGraphV3'
import { useState, useEffect } from 'react'


const Body = () => {
  const [arr, setArr] = useState([])

  useEffect(() => {
    resetArray()
  }, [])

  const arrays = [1,3,4,5,6,7,3,2,1,3]

  const resetArray = () => {
    const array = []
    // const barss = document.querySelectorAll('.color-block')
    // barss.forEach((bar) => {
    //   bar.style.backgroundColor = 'cadetblue'
    // })

    for (let i = 0; i< 100; i++) {
      array.push(getRandomNumber(1, 99))
    }
    setArr(array)
  }

  const mappedArrays = arr.map((bar) => {
    return <div className='bar' style={{ height: `${bar}%`}}></div>
  })

  return (
    <>
      <div className='wrapper'>
        <div className='body-wrapper'>
         
          <div className='left-side-wrapper'>
            <div className='title-wrapper'>
              <h1>Merge Sort Algorithm</h1>
            </div>
            <CodeBlock />
          </div>

          <div className='graph-wrapper'>
            {/* <SortGraphV3 /> */}
            <div className='visualizer-space'>
              {mappedArrays}
              
            </div>
          </div>
        </div>
        <div className='controll-bar'>
          
        </div>
      </div>
    </>
  )
}

export default Body 


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

