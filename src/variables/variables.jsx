import React, { useState } from "react";

function TreasureApp({language}) {
    const [treasure, setTreasure] = useState(["Gold Coin", "Silver Necklace", "Ruby Ring"]);
    const [selectedItem, setSelectedItem] = useState("");
    const [name, setName] = useState("");
    const [stage, setStage] = useState(0);
    const [result, setResult] = useState([]);

    const text = {
        en: {
            title: "Treasure Chest",
            intro: "Variables are like treasures they start with a value we can modify then view later",
            next: "Next: Example",
            step1: "Step 1: View the Treasure",
            step2: "Step 2: Modify a Treasure Item",
            step3: "Step 3: Open the Treasure Chest",
            selectLabel: "Select an item to modify:",
            choosePlaceholder: "--Choose an item--",
            nameLabel: "Enter your name:",
            namePlaceholder: "Your name",
            modifyButton: "Modify Item",
            openButton: "Open Treasure Chest",
            contents: "Contents of the Treasure Chest:",
            alert: "Please select an item and enter your name."
        },
        ar: {
            title: "صندوق الكنز",
            intro: "المتغيرات مثل الكنوز تبدأ بقيمة يمكننا تعديلها ثم عرضها لاحقاً",
            next: "التالي: مثال",
            step1: "الخطوة 1: عرض الكنز",
            step2: "الخطوة 2: تعديل عنصر الكنز",
            step3: "الخطوة 3: فتح صندوق الكنز",
            selectLabel: "اختر عنصراً للتعديل:",
            choosePlaceholder: "--اختر عنصراً--",
            nameLabel: "أدخل اسمك:",
            namePlaceholder: "اسمك",
            modifyButton: "تعديل العنصر",
            openButton: "فتح صندوق الكنز",
            contents: "محتويات صندوق الكنز:",
            alert: "الرجاء اختيار عنصر وإدخال اسمك."
        }
    };

    const t = text[language || 'en'];

    const modifyItem = () => {
        if (selectedItem !== "" && name !== "") {
            const modifiedTreasure = treasure.map((item, index) =>
                index === parseInt(selectedItem) ? `${name}` : item
            );
            setTreasure(modifiedTreasure);
            setSelectedItem("");
            setName("");
            setStage(3);
        } else {
            alert(t.alert);
        }
    };

    const openTreasure = () => {
        setResult(treasure);
        setStage(4);
    };

    const containerStyle = {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        direction: language === 'ar' ? 'rtl' : 'ltr',
        width:"90vw"
    
    };

    return (
        <div style={containerStyle}>
            <h1>{t.title}</h1>
            {stage === 0 && (
                <div>
                    <h2>{t.intro}</h2>
                    <button onClick={() => setStage(1)} style={{ marginTop: "10px" }}>
                        {t.next}
                    </button>
                </div>
            )}
            {stage === 1 && (
                <div>
                    <h2>{t.step1}</h2>
                    <ul>
                        {treasure.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <button onClick={() => setStage(2)} style={{ marginTop: "10px" }}>
                        {t.next}
                    </button>
                </div>
            )}

            {stage === 2 && (
                <div>
                    <h2>{t.step2}</h2>
                    <div>
                        <label>
                            {t.selectLabel}
                            <select
                                value={selectedItem}
                                onChange={(e) => setSelectedItem(e.target.value)}
                            >
                                <option value="">{t.choosePlaceholder}</option>
                                {treasure.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            {t.nameLabel}
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t.namePlaceholder}
                            />
                        </label>
                    </div>
                    <button onClick={modifyItem} style={{ margin: "10px 5px" }}>
                        {t.modifyButton}
                    </button>
                </div>
            )}

            {stage === 3 && (
                <div>
                    <h2>{t.step3}</h2>
                    <button onClick={openTreasure} style={{ marginTop: "10px" }}>
                        {t.openButton}
                    </button>
                </div>
            )}

            {stage === 4 && (
                <div>
                    <h2>{t.contents}</h2>
                    <ul>
                        {result.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TreasureApp;
