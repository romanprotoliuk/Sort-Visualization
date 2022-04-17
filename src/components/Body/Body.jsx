import './Body.css'
import CodeBlock from '../CodeBlock/CodeBlock'


const Body = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='body-wrapper'>
          {/* <div className='left-side-wrapper'>
            
            <div className='code-space'>
              <pre>
               
                <div className='code-line-wrapper'><p><div><span className='function'>function</span> <span className='function-name'>mergeSort</span>(<span className='variable'>arr</span><span>) &#123; </span></div></p></div>
                <div className='code-line-wrapper-next'><p><div><span className='conditions'>if</span> (<span className='variable'>arr</span>.<span className='variable'>length</span> === <span className='numbers-code'>1</span>)<span> &#123; </span></div></p></div>
                <div className='code-line-wrapper-next'><p><div><span className='spacein'>return</span> <span className='variable'>arr</span>;</div></p></div>
                <div className='code-line-wrapper-next'><p><div>&#125;</div></p></div>
                <br />
                <div className='code-line-wrapper-next'><p><div><span className='function'>const</span> <span className='variable-name'>center</span>(<span className='variable'>arr</span><span>) &#123; </span></div></p></div>
        
              </pre>
            </div>
          </div> */}

          <div className='left-side-wrapper'>
            <div className='title-wrapper'>
              <h1>Merge Sort Algorithm</h1>
            </div>
            <CodeBlock />
          </div>

          <div className='graph-wrapper'>

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

function mergeSort(arr) {
	if (arr.length === 1) {
		return arr;
	}

	const center = Math.floor(arr.length / 2);
	const left = arr.slice(0, center);
	const right = arr.slice(center);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	const results = [];

	while (left.length && right.length) {
		if (left[0] < right[0]) {
			results.push(left.shift());
		} else {
			results.push(right.shift());
		}
	}

	return [ ...results, ...left, ...right ];
}