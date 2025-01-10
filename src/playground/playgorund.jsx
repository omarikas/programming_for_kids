import React, { useState, useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import * as BlocklyJS from 'blockly/javascript';
import { Link } from 'react-router-dom';

const ScratchClone = () => {
  const [styles, setStyles] = useState({
  });
  const workspaceRef = useRef(null);

  const workspaceSetup = () => {
    // Define custom blocks using JSON
    Blockly.defineBlocksWithJsonArray([
      {
        type: 'set_background_color',
        message0: 'set background color to %1',
        args0: [
          {
            type: 'input_value',
            name: 'COLOR',
            check: 'String',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
        tooltip: 'Change the background color.',
        helpUrl: '',
      },
        {
        type: 'set_font_color',
        message0: 'set font color to %1',
        args0: [
          {
            type: 'input_value',
            name: 'COLOR',
            check: 'String',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 200,
        tooltip: 'Change the font size.',
        helpUrl: '',
      },
    ]);
  
    // Define the JavaScript code generation for custom blocks
    BlocklyJS.javascriptGenerator.forBlock['set_background_color'] = function (block) {
      const color = BlocklyJS.javascriptGenerator.valueToCode(block, 'COLOR', BlocklyJS.javascriptGenerator.ORDER_ATOMIC) || "'#ffffff'";
      return `updateStyles({ backgroundColor: ${color} });\n`;
    };
  
  BlocklyJS.javascriptGenerator.forBlock['set_font_color'] = function (block) {
      const size = BlocklyJS.javascriptGenerator.valueToCode(block, 'COLOR', BlocklyJS.javascriptGenerator.ORDER_ATOMIC) || '16';
      return `updateStyles({ color: ${size} });\n`;
    };
  
    // Define the toolbox with all blocks
    const toolbox = {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'set_background_color' },
        { kind: 'block', type: 'set_font_color' },
      ],
    };
  
    // Initialize the Blockly workspace
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox,
      trashcan: true,
    });
  
    return workspace;
  };
  const updateStyles = (newStyles) => {
    setStyles((prevStyles) => ({ ...prevStyles, ...newStyles }));
  };

  const generateCode = () => {
    if (workspaceRef.current) {
      const code = BlocklyJS.javascriptGenerator.workspaceToCode(workspaceRef.current);
        try {
        const sandbox = { updateStyles };
        const safeFunction = new Function('updateStyles', code);
        safeFunction(sandbox.updateStyles);
      } catch (error) {
        console.error('Error executing code:', error);
      }
    }
  };

  useEffect(() => {
    workspaceRef.current = workspaceSetup();
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);

  return (
      <div  style={{marginTop:"100px",}} >
           <h1 style={{color:"white"}} >set the background color to gold and fontcolor to black</h1>
 
    <div className="scratch-clone" style={{ backgroundColor:"black",padding: '20px', ...styles }}>
      <div id="blocklyDiv" style={{ zIndex:"-1",height: '480px', width: '80vw', border: '1px solid #ccc' }}></div>
      <button onClick={generateCode}>Run Code</button>
     <p>  text that should be black</p> 
    </div>
      {styles.backgroundColor==="gold"&&styles.color==="black"&&
      
      <button>



        <Link to="/">Finish</Link>
      </button>}
      </div>
  );
};

export default ScratchClone;
