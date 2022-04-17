import '../SortGraph/SortGraph.css'
import { useState, useEffect } from 'react'
import * as algorithms from '../algorithms/Algorithms'
import Box from '@mui/material/Box';
import { SpeedSlider } from '../components/SpeedSlider';
import Slider from '@mui/material/Slider';


const SortGraph = () => {
  const [arr, setArr] = useState([])
  const [sliderValue, setSlideValue] = useState(3)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [valueMatrices, setValueMatrices] = useState({
    entries: 50,
    width: 15,
    speed: 50,
  })

  const valueSetter = (target) => {
    console.log(target)
    if (target >= 1 && target <= 5) {
      setSlideValue(target)
      changeGraph()
      resetArray()
    }
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

  useEffect(() => {
    resetArray()
  }, [])
  
  const resetArrayAndSetState = () => {
    MergeSortRun()
    // setButtonClicked(true)
  }

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
  console.log(buttonClicked)
  
  const MergeSortRun = () => {
    
    console.log('from inside', buttonClicked)
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
            // setButtonClicked(false)
            const barss = document.querySelectorAll('.color-block')
            barss.forEach((bar) => {
              bar.style.backgroundColor = 'orange'
            })
            
        }
        }, i * valueMatrices.speed);
      }
      // if (animations.length - 1 === i) {
      //   setButtonClicked(false)
      // }
      // setButtonClicked(true)
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    // console.log(target)
    if (event.target.value >= 1 && event.target.value <= 5) {
      setSlideValue(event.target.value)
      changeGraph()
      resetArray()
    }
  }

  const mappedArray = arr.map((num, i) => {
    return <div className='wrapper-forall'><div className='color-block' style={{height: `${num * 3.5}px`, width: valueMatrices.width }}></div></div>
  })


  const rangeSliderBtn = buttonClicked ? <SpeedSlider aria-label="Temperature" defaultValue={3} marks min={1} max={5} disabled onChange={(value) => valueSetter(value.target.value)}/> : <SpeedSlider aria-label="Temperature" defaultValue={3} marks min={1} max={5} onChange={handleChange} />

  return (
    <>
      <div className='visualizer-space'>
        <div className='visualizer-wrapper'>
          <div className='header-wrapper'> 
            <h2>This will be space for sort graph visualizer</h2>
            <code>hey this is codes for(let i = 0)</code>
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
                  {rangeSliderBtn}
                </Box>
              </div>
            </div>
            
            <div className='all-buttons-wrapper'>
              {/* {sliderValue} */}
              <button className='btn-sort btn-newarr' onClick={resetArrayAndSetState}>Merge Sort</button>
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
// disable buttons on merge sort

// reload page 