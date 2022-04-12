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
      array.push(getRandomNumber(5, 100))
    }
    setArr(array)
  } 
  
  const MergeSortRun = () => {
    
    const MergeSort = (arr) => {
      if (arr.length === 1) {
        return arr;
      }
  
      const center = Math.floor(arr.length / 2);
      const left = arr.slice(0, center);
      const right = arr.slice(center);
  
      return Merge(MergeSort(left), MergeSort(right));
    }

    const Merge = (left, right) => {
      const results = [];
  
      while (left.length && right.length) {
        if (left[0] < right[0]) {
          results.push(left.shift());
        } else {
          results.push(right.shift());
        }
      }
      return[ ...results, ...left, ...right ];
    }
    
    setArr(MergeSort(arr))
  }



  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 4}px`}}></div><p className='numbers'>{num}</p></div>
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
