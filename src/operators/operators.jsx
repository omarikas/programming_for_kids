import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
    en: {
        title: "Robot Chef's Recipe Adventure",
        instruction: "Help the robot chef by following the recipe rule:",
        rule: "Flour > Sugar",
        flour: "flour",
        sugar: "sugar",
        checkRecipe: "Check Recipe",
        success: "Great job! Flour is more than sugar!",
        failure: "Oops! Flour must be more than sugar. Try again!",
        next: "Next"
    },
    ar: {
        title: "مغامرة وصفة الشيف الروبوت",
        instruction: "ساعد الشيف الروبوت باتباع قاعدة الوصفة:",
        rule: "الدقيق > السكر",
        flour: "دقيق",
        sugar: "سكر",
        checkRecipe: "تحقق من الوصفة",
        success: "عمل رائع! الدقيق أكثر من السكر!",
        failure: "عفوًا! يجب أن يكون الدقيق أكثر من السكر. حاول مرة أخرى!",
        next: "التالي"
    }
};

const ComparisonGame2 = ({ language }) => {
    const [flour, setFlour] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [feedback, setFeedback] = useState("");
    const navi = useNavigate();

    const checkComparison = () => {
        if (flour > sugar) {
            setFeedback(translations[language].success);
        } else {
            setFeedback(translations[language].failure);
        }
    };

    const t = translations[language];

    return (
        <div style={{ fontFamily: "Arial, sans-serif", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "100px", textAlign: "center", marginTop: "50px" }}>
            <h1>{t.title}</h1>
            <p>{t.instruction}</p>
            <h2>{t.rule}</h2>

            <div style={{ margin: "20px 0" }}>
                <div>
                    <label>
                        <strong>{t.flour}: </strong>
                        {flour}g
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
                        <strong>{t.sugar}: </strong>
                        {sugar}g
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
            {feedback.includes(t.success.split(' ')[0]) && (
                <button
                    onClick={() => { navi("/operators2") }}
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
            )}
        </div>
    );
};

export default ComparisonGame2;
