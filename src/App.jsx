import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './datatypes/datatypes';
import DatatypesPlayground from './datatypes/datatypesplayground';
import CircleGrid from './functions/functions';
import CircleGrid2 from './functions/functions2';
import Home from './index.jsx';

const App = () => {
  return (
    <Router>
      <nav style={{position:"fixed",top:"0",width:"100vw",justifyContent:"center",display:"flex"}}>
       
            <Link  style={{textDecoration:"none",color:'white'}} to="/">Home</Link>
        
          
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/datatypes" element={<Profile />} />
        <Route path="/datatypes/playground" element={<DatatypesPlayground />} />
        <Route path='/functions' element={<CircleGrid/>}/>
        <Route path='/functions2' element={<CircleGrid2/>}/>
      </Routes>
    </Router>
  );
};

export default App;
