import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();

    const navigateToDataTypes = () => {
        history('/datatypes');
    };

    const navigateToFunctions = () => {
        history('/functions');
    };

    return (
        <div style={{ display: 'flex',width:"100vw", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <button onClick={navigateToDataTypes} style={{ marginBottom: '10px' }}>Datas Types</button>
            <button onClick={navigateToFunctions}>Functions</button>
        </div>
    );
};

export default Home;