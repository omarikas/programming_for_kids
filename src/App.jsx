import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './datatypes';
import DatatypesPlayground from './datatypesplayground';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />

        <Route path="datatypes/playground" element={<DatatypesPlayground />} />
      </Routes>
    </Router>
  );
};

export default App;
