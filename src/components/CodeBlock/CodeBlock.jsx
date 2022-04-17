import { CopyBlock, dracula, a11yDark } from "react-code-blocks";
import "./CodeBlock.css";
import { useState } from "react";


const CodeBlock = () => {
  const sample = {
    javascript: `function mergeSort(arr) {
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
  `,
  }
  const [language, changeLanguage] = useState("javascript");
  const [languageDemo, changeDemo] = useState(sample.javascript);


  return (
    <div className="container mx-auto p-4">
      
      
        <div className="demo">
          <CopyBlock
            language={language}
            text={languageDemo}
            showLineNumbers={true}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />      
      </div>
    </div>
  );
};

export default CodeBlock


