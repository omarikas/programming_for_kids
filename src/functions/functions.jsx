import React, { useState } from "react";
import { Link } from "react-router-dom";

const CircleGrid = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
function move(){
    document.getElementById("circle").style.transform=`translate(${position.x * 4}px, ${position.y * 4}px)`
}
  return (
    <div style={{ padding: "20px" }}>
        الداله هي شي ياخد معلومات و يقوم بتنفيذ مهمه مثال:
        move(int,int)
        <br></br>
        <div style={{display:"flex",justifyContent:"space-between"}}>


        <button onClick={move} > move</button>
     
        <Link  style={{textDecoration:"none",color:'white'}} to="/functions2">Next</Link>

        </div>
        
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    
          move(
          <input
            type="number"
            name="x"
            onChange={handleInputChange}
            style={{ marginLeft: "5px" }}
        />,
        
          <input
            type="number"
            name="y"
            onChange={handleInputChange}
            style={{ marginLeft: "5px" }}
          />)
      </div>
      <div
        style={{
          position: "relative",
          width: "80vw",
          height: "90vh",
          border: "1px solid white",
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
        }}
      >
        <div id="circle"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            backgroundColor: "blue",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
          }}

        ></div>
      </div>
    </div>
  );
};

export default CircleGrid;
