import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComparisonGame4 = ({language}) => {
    const [flour, setFlour] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [feedback, setFeedback] = useState("");
    const navi=useNavigate();

    const translations = {
        en: {
            title: "Robot Chef's Recipe Adventure",
            help: "Help the robot chef by following the recipe rule:",
            milk: "milk",
            eggs: "eggs",
            checkRecipe: "Check Recipe",
            next: "next",
            success: "Great job! eggs are equal to milk or milk equal zero!",
            failure: "Oops! eggs must equal milk or milk equal zero. Try again!"
        },
        ar: {
            title: "مغامرة وصفة الطاهي الآلي",
            help: "ساعد الطاهي الآلي باتباع قاعدة الوصفة:",
            milk: "حليب",
            eggs: "بيض",
            checkRecipe: "تحقق من الوصفة",
            next: "التالي",
            success: "عمل رائع! البيض يساوي الحليب أو الحليب يساوي صفر!",
            failure: "عذراً! يجب أن يكون البيض مساوياً للحليب أو الحليب يساوي صفر. حاول مرة أخرى!"
        }
    };

    const t = translations[language] || translations.en;

    const checkComparison = () => {
        if (flour == sugar || flour == 0) {
            setFeedback(t.success);
        } else {
            setFeedback(t.failure);
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", position:"absolute", left:"50%", transform:"translateX(-50%)", top:"100px", textAlign: "center", marginTop: "50px" }}>
            <h1>{t.title}</h1>
            <p>{t.help}</p>
            <h2>{t.eggs} == {t.milk} || {t.milk} ==0</h2>

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
            {feedback.includes(language === 'ar' ? 'رائع' : 'Great') && 
                <button onClick={()=>{navi("/")}}
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

export default ComparisonGame4;
