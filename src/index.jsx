import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({language}) => {
    const history = useNavigate();

    const navigateToDataTypes = () => {
        history('/datatypes');
    };

    const navigateToFunctions = (string) => {
        history('/'+string);
    };

    const translations = {
        en: {
            dataTypes: "Data Types",
            variables: "Variables",
            functions: "Functions",
            operators:"operators"
        },
        ar: {
            dataTypes: "أنواع البيانات",
            variables: "المتغيرات",
            functions: "الدوال",
            operators:"المقارانات"
        }
    };

    const text = translations[language] || translations.en;

    return (
        <div style={{ display: 'flex', width:"100vw", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <button onClick={navigateToDataTypes} style={{ marginBottom: '10px' }}>
                {text.dataTypes}
            </button>
            <button onClick={() => navigateToFunctions("variables")}  style={{ marginBottom: '10px' }}>
                {text.variables}
            </button>
            <button onClick={() => navigateToFunctions("operators")} style={{ marginBottom: '10px' }}>
                {text.operators}
            </button>
            <button onClick={() => navigateToFunctions("functions")} style={{ marginBottom: '10px' }}>
                {text.functions}
            </button>
        </div>
    );
};

export default Home;