import React, { useState } from "react";

const CircleGrid2 = ({language}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const translations = {
    en: {
      title: "Interactive Grid Movement",
      example: "Another example: move(int, int, string)",
      red: "red",
      blue: "blue"
    },
    ar: {
      title: "حركة الشبكة التفاعلية",
      example: "مثال اخر: move(int, int, string)",
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

  const move = () => {
    const selectedElement = document.getElementById(
      document.getElementById("select").value
    );
    if (selectedElement) {
      selectedElement.style.transform = `translate(${(position.x )* 40}px, ${(position.y )* 40}px)`;
    }
  };

  return (
    <div style={{ position:"absolute",transform:"translateX(-50%)",left:"50%",top:"100px",fontFamily: "Arial, sans-serif" }}>
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
                backgroundColor: "#e0e0e0",
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
          }}
        ></div>
      </div>
    </div>
  );
};

export default CircleGrid2;
