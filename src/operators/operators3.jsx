import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComparisonGame3 = ({language}) => {
    const [flour, setFlour] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [feedback, setFeedback] = useState("");
    const navi = useNavigate();

    const translations = {
        en: {
            title: "Robot Chef's Recipe Adventure",
            help: "Help the robot chef by following the recipe rule:",
            milk: "milk",
            eggs: "eggs",
            checkRecipe: "Check Recipe",
            next: "next",
            successMessage: "Great job! eggs are equal to milk and milk not equal zero!",
            failMessage: "Oops! eggs must equal milk and milk not equal zero. Try again!"
        },
        ar: {
            title: "مغامرة وصفة الشيف الآلي",
            help: "ساعد الشيف الآلي باتباع قاعدة الوصفة:",
            milk: "حليب",
            eggs: "بيض",
            checkRecipe: "تحقق من الوصفة",
            next: "التالي",
            successMessage: "عمل رائع! البيض يساوي الحليب والحليب لا يساوي صفر!",
            failMessage: "عذراً! يجب أن يكون البيض مساوياً للحليب والحليب لا يساوي صفر. حاول مرة أخرى!"
        }
    };

    const t = translations[language];

    const checkComparison = () => {
        if (flour == sugar && sugar > 0) {
            setFeedback(t.successMessage);
        } else {
            setFeedback(t.failMessage);
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor:"rgba(1,1,1,0.4)",position:"absolute", left:"50%", transform:"translateX(-50%)", top:"100px", textAlign: "center", marginTop: "50px", direction: language === 'ar' ? 'rtl' : 'ltr' }}>
            <h1>{t.title}</h1>
            <p>{t.help}</p>
            <h2>milk == eggs && milk !=0</h2>

            <div style={{ margin: "20px 0" }}>
                <div>
                    <label>
                        <strong>{t.milk}: </strong>
                        {flour}l
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={flour}
                        onChange={(e) => setFlour(Number(e.target.value))}
                        style={{ margin: "0 10px" }}
                    />
                </div>
                <div>
                    <label>
                        <strong>{t.eggs}: </strong>
                        {sugar}l
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sugar}
                        onChange={(e) => setSugar(Number(e.target.value))}
                        style={{ margin: "0 10px" }}
                    />
                </div>
            </div>

            <button
                onClick={checkComparison}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                {t.checkRecipe}
            </button>

            {feedback && <p style={{ marginTop: "20px", fontSize: "18px" }}>{feedback}</p>}
            {feedback.includes(language === 'ar' ? 'رائع' : 'job') && 
                <button onClick={() => {navi("/operators4")}}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    {t.next}
                </button>
            }
        </div>
    );
};

export default ComparisonGame3;
