import { useState } from 'react'
import '..//App.css'
import  string from "/src/assets/string.png"

import  int from "/src/assets/int.png"
import  boolean from "/src/assets/boolean.png"
import  array from "/src/assets/array.png"

import { useNavigate } from "react-router-dom";
function App() {
    const datatypes = ["string", "int", "boolean", "array"]
const navigate=useNavigate()
    const images = [string, int, boolean, array]
    const [current, setcurr] = useState(datatypes[0])
    const [played, setplayed] = useState(false)
    const [text,settext]=useState("")
    const prompts = ['ادخل اسمك', "ادخل عمرك", 'هل انت صغير؟نعم ام لا', "ادخل كل ما سبق مثال عمر,22,لا"]
    function handlesubmit(){
        var cont=true;
      if(current==="string"){
        text.split("").forEach((leter)=>{
if(!isNaN(Number(leter))){
alert("لا تستخدم ارفام")
cont=false
}
        })
      }

      if(current==="int"){
if(isNaN(Number(text))){
alert(" لا تستخدم حروف او ارقام عربيه")
cont=false
        }
      }


      if(current==="boolean"){
       if(text !="نعم"&& text!="لا"){
        alert("اكتب نعم او لا")
        cont=false;
       }
      }

      if(current==="array"){
        if(text.includes("،")){
            alert("استخدم فصله")
            cont=false
        }
       }
       if(cont){
        setcurr(datatypes[datatypes.indexOf(current)+1])
        if(current==="array"){
        navigate("/datatypes/playground")
        }
       }

settext("")

    }

    return (
        <>
            <div id="datatypes">
                <h1>{current}</h1>
                <h2>{prompts[datatypes.indexOf(current)]}</h2>
                <img src={images[datatypes.indexOf(current)]} />
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handlesubmit()
                }} >
                    <button type='submit' >ادخل</button>
                    <input type='text' value={text} onChange={(e)=>settext(e.target.value)} required ></input>
                </form>
            </div>
        </>
    )
}

export default App
