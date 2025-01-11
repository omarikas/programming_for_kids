

import React, { useState } from "react";
import { Link } from "react-router-dom";

const CircleGrid = ({language}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const translations = {
    functionDescription: {
      en: "A function is something that takes information and\n performs a task:",
      ar: "الداله هي شي ياخد معلومات و يقوم بتنفيذ مهمه مثال:"
    },
    next: {
      en: "Next",
      ar: "التالي"
    },
    move: {
      en: "Move",
      ar: "تحريك"
    }
  };
  // Get current language texts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleGridClick = (x, y) => {
    setPosition({ x, y });
  };

  const move = () => {
    
      document.getElementById("red").style.transform = `translate(${(position.x )* 40}px, ${(position.y )* 40}px)`;
    
  };

  return (
    <div style={{ position:"absolute",backgroundColor:"rgba(241, 241, 241, 0.4)",transform:"translateX(-50%)",left:"50%",top:"100px",fontFamily: "Arial, sans-serif" }}>
     
      <div style={{ marginBottom: "15px", fontSize: "16px" }}>
    {translations.functionDescription[language]}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <span>move(</span>
        <input
          type="number"
          name="x"
          value={position.x}
          onChange={handleInputChange}
          style={{
            width: "60px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        ,
        <input
          type="number"
          name="y"
          value={position.y}
          onChange={handleInputChange}
          style={{
            width: "60px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        ,
       
        <span>)</span>
        <button
          onClick={move}
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Move
        </button>
      </div>
      <div
        style={{
          position: "relative",
          width: "400px",
          maxWidth: "600px",
          height: "400px",
          maxHeight: "600px",
          border: "2px solid #ddd",
          backgroundColor: "",
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          gap: "1px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {[...Array(10)].map((_, rowIndex) =>
          [...Array(10)].map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: "black",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
              onClick={() => handleGridClick(colIndex, rowIndex)}
            ></div>
          ))
        )}
      
        <div
          id="red"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            backgroundColor: "red",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
          }}
        ></div>
      </div>


      <Link to={"/functions2"}>
      <button>
      
      
      Next
      
      
      </button>
      </Link>
    </div>
  );
};

export default CircleGrid;
