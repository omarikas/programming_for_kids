import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css"
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


    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };
    return (
    <div style={containerStyle} >
            <div className="card" onClick={navigateToDataTypes}>
                <img 
                    src="/images/data-types.png" 
                    alt="Data Types" 
                    className="card-image"
                />
                <span>{text.dataTypes}</span>
            </div>
            <div className="card" onClick={() => navigateToFunctions("variables")}>
                <img 
                    src="/images/variables.png" 
                    alt="Variables" 
                    className="card-image"
                />
                <span>{text.variables}</span>
            </div>
            <div className="card" onClick={() => navigateToFunctions("operators")}>
                <img 
                    src="/images/operators.png" 
                    alt="Operators" 
                    className="card-image"
                />
                <span>{text.operators}</span>
            </div>
            <div className="card" onClick={() => navigateToFunctions("functions")}>
                <img 
                    src="/images/functions.png" 
                    alt="Functions" 
                    className="card-image"
                />
                <span>{text.functions}</span>
            </div>
        </div>
    );
};

export default Home;

