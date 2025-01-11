import React, { useState } from "react";
import { Link } from "react-router-dom";

const DragAndDropCategories = ({language}) => {
  const [categories, setCategories] = useState({
    array: [],
    string: [],
    int: [],
    boolean: [],
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const [items ,setitem]= useState(
    language === 'ar' ? [
      { id: 1, type: "array", label: "١،٢،٣،٤" },
      { id: 2, type: "string", label: "احمد" },
      { id: 3, type: "int", label: "١١٢" },
      { id: 4, type: "boolean", label: "لا" },
    ] : [
      { id: 1, type: "array", label: "1,2,3,4" },
      { id: 2, type: "string", label: "ahmed" },
      { id: 3, type: "int", label: "112" },
      { id: 4, type: "boolean", label: "false" },
    ]
  );
  const [id,setid]=useState(5)
  const [text,settext]=useState("")

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };
function additem(){
var type=""
if(text.includes(",")){
  type="array"
}else if (!isNaN(Number(text))){

type="int"
}else if(text==="نعم"||text==="لا"){
  type="boolean"
}else{
  type="string"
}

const item={id,type,label:text}
settext(" ")
setid(id+1)
setitem([item,...items])
}
  const handleDrop = (category) => {
    if (draggedItem.type === category) {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [category]: [...prevCategories[category], draggedItem],
      }));
      console.log(draggedItem)
      setitem(items.filter((it)=>(it!=draggedItem)))
    }else{
        alert("نوع خطا")
    }
    setDraggedItem(null); // Clear the dragged item
  };

  return (
    <div  id="datatypes" style={{ display: "flex",gap:"20px" }}>
      {language!="ar"&&   <h1>   Drag and drop</h1>}
{language==="ar"&&   <h1>  حرك و ارمي</h1>}


      <div>
        <p>Items</p>
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
                width:"5vw", 
                wordWrap: "break-word", /* Allows words to break if necessary */
                whiteSppace: "normal", /* Allows text to wrap to the next line */
                overflow: "hidden" /* Optional: Ensures no overflow */
               
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
            backgroundColor: "white",
            width:"15vw"
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
{language!="ar" &&<h3> try yourself</h3>}
{language==="ar" &&<h3>او جرب بنفسك</h3>}
      <form  onSubmit={(e)=>{
        e.preventDefault()
        additem()
      }}> 
      <input required value={text} onChange={(e)=>{settext(e.target.value)}} ></input>

      </form>

    {items.length==0 &&  <Link to="/"> finish</Link>}
    </div>
  );
};

export default DragAndDropCategories;
