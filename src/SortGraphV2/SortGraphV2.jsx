import '../SortGraph/SortGraph.css'
import { useState, useEffect } from 'react'
import * as algorithms from '../algorithms/Algorithms'


const SortGraph = () => {
  
  const [arr, setArr] = useState([])

  useEffect(() => {
    resetArray()
  }, [])
  
  const resetArray = () => {
    const array = []
    
    for (let i = 0; i< 10; i++) {
      array.push(getRandomNumber(5, 15))
    }
    setArr(array)
  } 
  

  const MergeSortRun = () => {
    const animations = algorithms.MergeSort(arr);
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('color-block');
      // here we are dealing with a value change
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'cadetblue'
        setTimeout(() => {
          console.log('animations[i]', animations[i])
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          // const [barOneIdx, newHeight] = animations[i];
          // document.getElementById("num").innerHTML = `${newHeight}`;
        }, i * 200);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * 8}px`;
          // document.getElementById("num").innerHTML = `${newHeight}`;
          barOneStyle.backgroundColor = 'hotpink'
        }, i * 200);
      }
      // figure out how to put sorted values in purple 

      // check if all is sorted then change colors of "color-block" to one color to show that evrything is correct
    }
  }


  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 8}px`}}></div><p id='num' className='numbers'>{num}</p></div>
  })

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
          <div className='all-buttons-wrapper'>
            <button className='btn-sort' onClick={MergeSortRun}>Merge Sort</button>
            <button className='btn-sort'>Quick Sort</button>
            <button className='btn-sort'>Heap Sort</button>
            <button className='btn-sort'>Bubble Sort</button>
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
