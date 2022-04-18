import './Body.css'
import CodeBlock from '../CodeBlock/CodeBlock'
import SortGraphV3 from '../../SortGraphV3/SortGraphV3'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import * as algorithms from '../../algorithms/Algorithms'
import { SpeedSlider } from '../SpeedSlider';
import { PrettoSlider } from '../SpeedSlider2';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Body = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [arr, setArr] = useState([])
  const [sliderValue, setSlideValue] = useState(3)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [openSide, setOpenSide] = useState(true) 
  const [valueMatrices, setValueMatrices] = useState({
    entries: 50,
    speed: 50,
  })
  

  const valueSetter = (target) => {
    if (target >= 1 && target <= 5) {
      setSlideValue(target)
      changeGraph()
      resetArray()
      console.log('speed', valueMatrices)
    }
  }

  const changeGraph = () => {
    switch (sliderValue) {
      case 1:
        return setValueMatrices({ entries: 10, speed: 300 })
      case 2:
        return setValueMatrices({ entries: 25, speed: 100 })
      case 3:
        return setValueMatrices({ entries: 50, speed: 50 })
      case 4:
        return setValueMatrices({ entries: 100, speed: 30 })
      case 5:
        return setValueMatrices({entries: 175, speed: 10})
    }
  }

  // useEffect(() => {
  //   setValueMatrices(valueMatrices)
  // }, [valueMatrices])
  
  const resetArrayAndSetState = () => {
    console.log('reset', valueMatrices)
    MergeSortRun()
    // setButtonClicked(true)
  }

  const resetArray = () => {
    const array = []

    const barss = document.querySelectorAll('.bar')
    barss.forEach((bar) => {
      bar.style.backgroundColor = 'cadetblue'
    })
    for (let i = 0; i< valueMatrices.entries; i++) {
      array.push(getRandomNumber(1, 99))
    }
    setArr(array)
  }
  
  const MergeSortRun = () => {
    // this gives us history of animations 
    // [ [[0,1],[0,1] ...], [[0,1],[0,1] ...], [[0,1],[0,1] ...]]
    // first number represents the before index the second overwritten index
    const animations = algorithms.MergeSort(arr);
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
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
          barOneStyle.height = `${newHeight}%`;
          if(animations.length - 1 === i) {
            const barss = document.querySelectorAll('.bar')
            barss.forEach((bar) => {
              bar.style.backgroundColor = 'orange'
            })
          }
        }, i * valueMatrices.speed);
      }
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    // console.log(target)
    if (event.target.value >= 1 && event.target.value <= 5) {
      setSlideValue(event.target.value)
      console.log(valueMatrices)
      changeGraph()
      resetArray()
    }
  }

  useEffect(() => {
    resetArray()
  }, [])

  const handleOnCickFold = () => {
    console.log('clicked')
    setOpenSide(!openSide)
    console.log(openSide)
    const leftSide = document.querySelector('.left-side-wrapper');
    const rightSide = document.querySelector('.graph-wrapper');

    if (!openSide) {
      // left side wrapper width to 1%
      leftSide.style.position = 'absolute'
      leftSide.style.left = '-30%'
      rightSide.style.width = '100%'
      console.log(leftSide)
      // graph-wrapper width to 99%
    } else {
      leftSide.style.position = 'relative'
      leftSide.style.width = '30%'
      leftSide.style.left = '0%'
      rightSide.style.width = '70%'
    }

  }

  const rangeSliderBtn = buttonClicked ? <SpeedSlider aria-label="Temperature" defaultValue={3} marks min={1} max={5} disabled onChange={(value) => valueSetter(value.target.value)}/> : <SpeedSlider aria-label="Temperature" defaultValue={3} marks min={1} max={5} onChange={handleChange} />

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
            <div onClick={handleOnCickFold} className='wapper-for-side-btn'>
              <img className='side-bar-btn' src="expand-sidebara.png" alt="side bar image" />
            </div>
          </div>

          <div className='graph-wrapper'>
            {/* <SortGraphV3 /> */}
            <div className='visualizer-space'>
              {mappedArrays}
              
            </div>
          </div>
        </div>
        <div className='controll-bar'>
          <div className='wrapper-bottom-section'>
            <div className='btn-and-slider-wrapper'>

              <div className='two-button-wrapper'>
                <div className='button-wrapper'>
                    <button className='btn-generatenew' onClick={resetArray}>Generate Array</button>
                  </div>
                  {/* <div className='button-wrapper'>
                    <button className='btn-generatenew' onClick={handleOpen}>Custom Array</button>
                  </div> */}
              </div>

              <div className='slider-wrapper'>
                <div className='size-wrapper'>
                  <h4 className='h4-size'>size & speed</h4>
                  <Box sx={{ width: 100 }}>
                    {rangeSliderBtn}
                  </Box>
                </div>
              </div>
              <div className='all-buttons-wrapper'>
                <button className='btn-run' onClick={resetArrayAndSetState}>Run</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      {/* Modal */}
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Enter Custom Array
            </Typography>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            
            {/* validate numbers */}
            <TextareaAutosize
              id='textarea-custom'  
              aria-label="minimum height"
              minRows={3}
              placeholder="1,5,6,2,3"
              style={{ width: '100%', marginTop: '20px', border: '1px solid #d9d9d9', padding: '4px 11px' }}
            />  
            <div className='modal-btn-wrapper'>
              <button className='btn-custom-arr' onClick={resetArrayAndSetState}>Generate</button>
            </div>  
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  )
}

export default Body 


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

