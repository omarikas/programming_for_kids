import React, { useState } from "react";
import { Link } from "react-router-dom";

const If = ({language}) => {
  const [position, setPosition] = useState({ x: 3, y: 4 });
  const [Finish,setfinish]=useState(false)
  const translations = {
    en: {
      title: "Interactive Grid Movement",
      example: `if(redpostion==blueposition){
      succes();
      
    }`,
      red: "red",
      blue: "blue"
    },
    ar: {
      title: "حركة الشبكة التفاعلية",
      example: `if(redpostion==blueposition){
      succes();
      
    }`,
      red: "أحمر",
      blue: "أزرق"
    }
  };

  // Get current language texts
  const t = translations[language] || translations.en;

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
  function getTranslationValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);

    // Extract translateX and translateY from the matrix
    return {
        x: matrix.m41,
        y: matrix.m42,
    };
}

function haveSameTranslation(element1, element2) {
    const translation1 = getTranslationValues(element1);
    const translation2 = getTranslationValues(element2);

    return translation1.x === translation2.x && translation1.y === translation2.y;
}






  const move = () => {
    const selectedElement = document.getElementById(
      document.getElementById("select").value
    );
    if (selectedElement) {
      selectedElement.style.transform = `translate(${(position.x )* 40}px, ${(position.y )* 40}px)`;
    }
       
    
    setTimeout(() => {
        let red=document.getElementById("red")
        let blue =document.getElementById("blue")
        setfinish(haveSameTranslation(red,blue))



    }, 1000);
    

  };

  return (
    <div style={{ position:"absolute",backgroundColor:"rgba(1,1,1,0.4)",transform:"translateX(-50%)",left:"50%",top:"100px",fontFamily: "Arial, sans-serif" }}>
      <h2>{t.title}</h2>
      <div style={{ marginBottom: "15px", fontSize: "16px" }}>
    {t.example}
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
        <select
          id="select"
          style={{
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option key="red" value="red">
         {t.red}
          </option>
          <option key="blue" value="blue">
          {t.blue}
          </option>
        </select>
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
          id="blue"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            backgroundColor: "blue",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
          }}
        ></div>
        <div
          id="red"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            backgroundColor: "red",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
            transform:`translate(${3* 40}px, ${4* 40}px)`
          }}
        ></div>
      </div>


  {Finish&& <button> <Link to="/if2"> next </Link></button> }
  
  
  
  
  </div>
  );
};

export default If;
