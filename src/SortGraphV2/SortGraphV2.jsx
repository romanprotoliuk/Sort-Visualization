import '../SortGraph/SortGraph.css'
import { useState, useEffect } from 'react'
import * as algorithms from '../algorithms/Algorithms'
import Box from '@mui/material/Box';
import { SpeedSlider } from '../components/SpeedSlider';
import Slider from '@mui/material/Slider';


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

    for (let i = 0; i< 175; i++) {
      array.push(getRandomNumber(5, 125))
    }
    setArr(array)
  } 
  
  // 10 entires, 50px wide, 150ms speed    
  // 25 entries, 25px wide, 100ms speed
  // 50 entries, 15px wide, 50ms speed
  // 100 entries, 8px wide, 30ms speed
  // 175 entries, 4px wide, 10ms speed


  const MergeSortRun = () => {
    // this gives us history of animations 
    // [ [[0,1],[0,1] ...], [[0,1],[0,1] ...], [[0,1],[0,1] ...]]
    // first number represents the before index the second overwritten index
    const animations = algorithms.MergeSort(arr);
    // console.log(animations)
    for (let i = 0; i < animations.length; i++) {
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
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * 3}px`;
          if(animations.length - 1 === i) {
            // console.log('loop ends');
            const barss = document.querySelectorAll('.color-block')
            barss.forEach((bar) => {
              bar.style.backgroundColor = 'orange'
            })
        }
        }, i * 10);
      }
    }
  }


  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 3}px`}}></div></div>
  })

  // 10 entires, 50px wide, 150ms speed    
  // 25 entries, 25px wide, 100ms speed
  // 50 entries, 15px wide, 50ms speed
  // 100 entries, 8px wide, 30ms speed
  // 175 entries, 4px wide, 10ms speed
  
    // if value is 1 = 10 entires, 50px wide, 150ms speed    
    // if value is 2 = 25 entries, 25px wide, 100ms speed
    // if value is 3 = 50 entries, 15px wide, 50ms speed
    // if value is 4 = 100 entries, 8px wide, 30ms speed
    // if value is 5 = 175 entries, 4px wide, 10ms speed

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

            <div className='wrapper-bottom-section'>
              <div className='btn-and-slider-wrapper'>
                <div className='button-wrapper'>
                  <button className='btn-newarr' onClick={resetArray}>Generate array</button>
              </div>

              <div>
                <Box sx={{ width: 100 }}>
                  <SpeedSlider
                    aria-label="Temperature"
                    defaultValue={3}
                    // getAriaValueText={valuetext}
                    // valueLabelDisplay="auto"
                    // aria-label="Restricted values"
                    // defaultValue={20}
                    // valueLabelFormat={valueLabelFormat}
                    // getAriaValueText={valuetext}
                    // step={null}
                    // valueLabelDisplay="auto"
                    marks
                    min={1}
                    max={5}
                    onChange={(value) => console.log(value.target)}
                  />

                {/* <Slider
                  aria-label="Custom marks"
                  defaultValue={20}
                  getAriaValueText={valuetext}
                  step={null}
                  valueLabelDisplay="auto"
                  marks={marks}
                /> */}
              </Box>
              </div>
            </div>
            
            <div className='all-buttons-wrapper'>
              <button className='btn-sort btn-newarr' onClick={MergeSortRun}>Merge Sort</button>
              <button className='btn-sort'>Quick Sort</button>
              <button className='btn-sort'>Heap Sort</button>
              <button className='btn-sort'>Bubble Sort</button>
            </div>
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

// timer 
// Big o times 