import React, { useState, useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import * as BlocklyJS from 'blockly/javascript';
import { Link } from 'react-router-dom';

const Ifplayground= () => {
  const [styles, setStyles] = useState({
  });
  const workspaceRef = useRef(null);
const [bgcolor,setbgcolor]=useState("black")
    useEffect(()=>{
        generateCode()
  BlocklyJS.javascriptGenerator.forBlock['get_background_color'] = function (block) {
 
return [`'${bgcolor}'`, BlocklyJS['javascriptGenerator'].ORDER_ATOMIC];

  };
    },[bgcolor])
  const workspaceSetup = () => {
    // Define custom blocks using JSON
    Blockly.defineBlocksWithJsonArray([
      
  {
        type: 'get_background_color',
        message0: 'background color',
        output: 'String',
        colour: 160,
        tooltip: 'Get the current background color.',
        helpUrl: '',
      },
        {type: 'set_background_color',
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
    }  
 
  BlocklyJS.javascriptGenerator.forBlock['set_font_color'] = function (block) {
      const size = BlocklyJS.javascriptGenerator.valueToCode(block, 'COLOR', BlocklyJS.javascriptGenerator.ORDER_ATOMIC) || '16';
      return `updateStyles({ color: ${size} });\n`;
    };
 const initialXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if" id="(bZ3+[LHn2(0]G9Nef-4" x="263" y="163">
    <mutation else="1"></mutation>
    <value name="IF0">
      <block type="logic_compare" id="6kUX^+c2o^2E.3l(]Cp">
        <field name="OP">EQ</field>
        <value name="A">
          <block type="get_background_color" id="l,@xkNPMI])aT|Q/x.Kp">
            <field name="TEXT"></field>
          </block>
        </value>
      </block>
    </value>
    <statement name="ELSE">
    </statement>
  </block>
</xml>`    // Define the toolbox with all blocks
    const toolbox = {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'get_background_color' },
        { kind: 'block', type: 'set_font_color' },
          {kind:"block",type:"controls_if"}

      ],
    };
  
    // Initialize the Blockly workspace
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox,
      trashcan: true,
    });

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(initialXml, "text/xml");

Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDoc.documentElement,workspace);
    return workspace;
  };
  const updateStyles = (newStyles) => {
    setStyles((prevStyles) => ({ ...prevStyles, ...newStyles }));
  };

  const generateCode = () => {
    if (workspaceRef.current) {
      const code = BlocklyJS.javascriptGenerator.workspaceToCode(workspaceRef.current);
        try {
            console.log(code);
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
           <h1>make the text always readable hint:make the font opposite to the background color</h1>
                <button onClick={()=>{setbgcolor("black")}}> black </button>
                      <button onClick={()=>{setbgcolor("white")}}> white</button> 

    <div className="scratch-clone" style={{ backgroundColor:bgcolor,padding: '20px', ...styles }}>
      <div id="blocklyDiv" style={{ zIndex:"-1",height: '480px', width: '600px', border: '1px solid #ccc' }}></div>
      <button onClick={generateCode}>Run Code</button>
     <p> Test text </p> 
    </div>
      {styles.backgroundColor==="gold"&&styles.color==="black"&&<Link to="/">Finish</Link>}
      </div>
  );
};

export default Ifplayground;
