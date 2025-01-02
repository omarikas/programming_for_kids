import React, { useState } from "react";

const DragAndDropCategories = () => {
  const [categories, setCategories] = useState({
    array: [],
    string: [],
    int: [],
    boolean: [],
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const [items ,setitem]= useState([
    { id: 1, type: "array", label: "1,2,3,4" },
    { id: 2, type: "string", label: "ahmed" },
    { id: 3, type: "int", label: "112" },
    { id: 4, type: "boolean", label: "لا" },
  ]);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (category) => {
    if (draggedItem.type === category) {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [category]: [...prevCategories[category], draggedItem],
      }));
      setitem(items.filter((it)=>(it!=draggedItem)))
    }else{
        alert("نوع خطا")
    }
    setDraggedItem(null); // Clear the dragged item
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <h1>Drag and drop</h1>
      <div>
        <h3>Items</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              style={{
                padding: "8px",
                margin: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "move",
                backgroundColor: "#black",
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      {["array", "string", "int", "boolean"].map((category) => (
        <div
          key={category}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(category)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "150px",
            backgroundColor: "#black",
          }}
        >
          <h4>{category.toUpperCase()}</h4>
          <ul>
            {categories[category].map((item, index) => (
              <li key={index} style={{ margin: "4px 0" }}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragAndDropCategories;
