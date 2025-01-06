import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './datatypes/datatypes';
import DatatypesPlayground from './datatypes/datatypesplayground';
import CircleGrid from './functions/functions';
import CircleGrid2 from './functions/functions2';
import Home from './index.jsx';
import TreasureApp from './variables/variables.jsx';
import ComparisonGame from './operators/operators.jsx';
import ComparisonGame2 from './operators/operators2.jsx';
import ComparisonGame3 from './operators/operators3.jsx';
import ComparisonGame4 from './operators/operators4.jsx';
import ScratchClone from './playground/playgorund.jsx';

const translations = {
  en: {
    home: 'Home',
  },
  ar: {
    home: 'الصفحة الرئيسية',
  },
};

const App = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ar' : 'en'));
  };

  return (
    <Router>
      <nav style={{ position: "fixed", top: "0", width: "100vw", justifyContent: "space-between", display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#333", color: "white" }}>
    
          <div style={{ cursor: "pointer", marginRight: "15px" }}>
            <div style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }}></div>
            <div style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }}></div>
            <div style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }}></div>
          </div>
          <Link style={{ textDecoration: "none", color: 'white',position:"absolute", left:"50%", transform:"translateX(-50%)"}}  to="/">{translations[language].home}</Link>
        
        <button onClick={toggleLanguage} style={{ marginLeft: '10px', backgroundColor: "#444", color: "white", border: "none", cursor: "pointer" }}>
          {language === 'en' ? 'Arabic' : 'English'}
        </button>
      </nav>
      <Routes>
        <Route path='/' element={<Home  language={language}/>} />
        <Route path="/datatypes" element={<Profile language={language} />} />
        <Route path="/datatypes/playground" element={<DatatypesPlayground language={language} />} />
        <Route path='/functions' element={<CircleGrid language={language} />} />

        <Route path='/operators2' element={<ComparisonGame2  language={language}/>} />
        <Route path='/operators3' element={<ComparisonGame3  language={language}/>} />
        <Route path='/operators4' element={<ComparisonGame4  language={language}/>} />
                <Route path='/functions2' element={<CircleGrid2  language={language}/>} />

                <Route path='/playground' element={<ScratchClone  language={language}/>} />
        <Route path='/operators' element={<ComparisonGame  language={language}/>} />
        <Route path='/variables' element={<TreasureApp  language={language}/>} />
      </Routes>
    </Router>
  );
};

export default App;
