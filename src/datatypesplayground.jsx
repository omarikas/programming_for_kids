import { useEffect, useState } from "react"
import "./App.css"
export default function DatatypesPlayground(){
const [text,settext]=useState("")
const [img,setimg]=useState()
useEffect(()=>{
    if(text.includes(",")){
        setimg("/src/assets/array.png")}

else if(text==="true" || text==="false"){


    setimg("/src/assets/boolean.png")
}else if(! isNaN(parseInt(text))){
    
    setimg("/src/assets/int.png")
 
}else{
    setimg("/src/assets/string.png")
}
},[text])
return (
    <div   >
        <h1>
            Arrays are sperated by , and boleans are true or false    </h1>
        <input   onChange={(e)=>settext(e.target.value)} placeholder="Try for yourself"   ></input>
        <img src={img}  ></img>
    </div>
)




}