import '../SortGraph/SortGraph.css'
import { useState, useEffect } from 'react'
import * as algorithms from '../algorithms/Algorithms'
import Box from '@mui/material/Box';
import { SpeedSlider } from '../components/SpeedSlider';
import Slider from '@mui/material/Slider';


const SortGraph = () => {
  
  const [arr, setArr] = useState([])
  const [sliderValue, setSlideValue] = useState(3)
  const [valueMatrices, setValueMatrices] = useState({
    entries: 50,
    width: 15,
    speed: 50,
  })



  const valueSetter = (target) => {
    setSlideValue(target)

    changeGraph()
    resetArray()
  }

  const changeGraph = () => {
    switch (sliderValue) {
      case 1:
        return setValueMatrices({ entries: 10, width: 50, speed: 150 })
      case 2:
        return setValueMatrices({ entries: 25, width: 25, speed: 100 })
      case 3:
        return setValueMatrices({ entries: 50, width: 15, speed: 50 })
      case 4:
        return setValueMatrices({ entries: 100, width: 8, speed: 30 })
      case 5:
        return setValueMatrices({entries: 175, width: 4, speed: 10})
    }
  }
  console.log(valueMatrices)

  // 10 entires, 50px wide, 150ms speed    
  // 25 entries, 25px wide, 100ms speed
  // 50 entries, 15px wide, 50ms speed
  // 100 entries, 8px wide, 30ms speed
  // 175 entries, 4px wide, 10ms speed

  useEffect(() => {
    resetArray()
  }, [])
  
  const resetArray = () => {
    const array = []
    
    const barss = document.querySelectorAll('.color-block')
    
    barss.forEach((bar) => {
      bar.style.backgroundColor = 'cadetblue'
    })

    for (let i = 0; i< valueMatrices.entries; i++) {
      array.push(getRandomNumber(5, 125))
    }
    setArr(array)
  } 
  
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
        }, i * valueMatrices.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          // const bartwoStyleUpdated = arrayBars[newHeight].style;
          // bartwoStyleUpdated.backgroundColor = 'green'
          barOneStyle.height = `${newHeight * 3.5}px`;
          if(animations.length - 1 === i) {
            // console.log('loop ends');
            const barss = document.querySelectorAll('.color-block')
            barss.forEach((bar) => {
              bar.style.backgroundColor = 'orange'
            })
        }
        }, i * valueMatrices.speed);
      }
    }
  }


  

  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 3.5}px`, width: valueMatrices.width }}></div></div>
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
                    marks
                    // step={1}
                    min={1}
                    max={5}
                    
                    onChange={(value) => valueSetter(value.target.value)}
                    // onChange={(value) => setSlideValue(value.target.value)}
                  />
              </Box>
              </div>
            </div>
            
            <div className='all-buttons-wrapper'>
              {sliderValue}
              <button className='btn-sort btn-newarr' onClick={MergeSortRun}>Merge Sort</button>
              <button onClick={changeGraph}>click</button>
              {/* <button className='btn-sort'>Quick Sort</button>
              <button className='btn-sort'>Heap Sort</button>
              <button className='btn-sort'>Bubble Sort</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SortGraph

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// disable button while the animation is going 

// timer 
// Big o times 

// disable buttons on merge sort