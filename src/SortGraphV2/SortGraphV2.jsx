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
    
    const barss = document.querySelectorAll('.color-block')
    barss.forEach((bar) => {
      bar.style.backgroundColor = 'cadetblue'
    })

    for (let i = 0; i< 50; i++) {
      array.push(getRandomNumber(5, 100))
    }
    setArr(array)
  } 
  

  const MergeSortRun = () => {
    // this gives us history of animations 
    // [ [[0,1],[0,1] ...], [[0,1],[0,1] ...], [[0,1],[0,1] ...]]
    // first number represents the before index the second swap index
    const animations = algorithms.MergeSort(arr);
    // console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i])
      const arrayBars = document.getElementsByClassName('color-block');
      // here we are dealing with a value change
      // every three value we have a new start of a new animation 
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        
        // desctructuring of animation history
        const [barOneIdx, barTwoIdx] = animations[i];

        // aplying styles to each bar inside the graph
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        
        // if we are the first of the triplet value change the color to red 
        // if its the second value change it to cadetblue
        const color = i % 3 === 0 ? 'red' : 'cadetblue'
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          // setTimeout(() => {
          //   barOneStyle.backgroundColor = 'blue'
          // }, i * 5)
        //   if(animations.length - 1 === i) {
        //     console.log('loop ends');
        //     barOneStyle.backgroundColor = 'pink'
        // }
        }, i * 20);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * 4}px`;
          // barOneStyle.backgroundColor = 'cadetblue'
          
          // setTimeout(() => {
          //   barOneStyle.backgroundColor = 'blue'
          // }, i * 5)
          if(animations.length - 1 === i) {
            console.log('loop ends');
            const barss = document.querySelectorAll('.color-block')
            console.log(barss)
            barss.forEach((bar) => {
              bar.style.backgroundColor = 'orange'
            })
            console.log(barss)
            // barOneStyle.backgroundColor = 'pink'
        }
        }, i * 20);
      }
      // figure out how to put sorted values in purple 

      // check if all is sorted then change colors of "color-block" to one color to show that evrything is correct

      
    }
  }


  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 4}px`}}></div></div>
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


// disable button while the animation is going 