import { useState } from 'react';
import '../App.css';
import string from '/src/assets/string.png';
import int from '/src/assets/int.png';
import boolean from '/src/assets/boolean.png';
import array from '/src/assets/array.png';
import { useNavigate } from 'react-router-dom';

function App({ language }) {
    const datatypes = ['string', 'int', 'boolean', 'array'];
    const navigate = useNavigate();
    const images = [string, int, boolean, array];
    const [current, setcurr] = useState(datatypes[0]);
    const [text, settext] = useState('');

    const prompts = {
        en: ['Enter your name', 'Enter your age', 'Are you young? Yes or No', 'Enter all the above, e.g., omar,22,no'],
        ar: ['ادخل اسمك', 'ادخل عمرك', 'هل انت صغير؟ نعم ام لا', 'ادخل كل ما سبق مثال عمر,22,لا']
    };

    const alerts = {
        en: {
            string: 'Do not use numbers',
            int: 'Do not use letters or Arabic numbers',
            boolean: 'Write Yes or No',
            array: 'Use a comma'
        },
        ar: {
            string: 'لا تستخدم ارقام',
            int: 'لا تستخدم حروف او ارقام عربيه',
            boolean: 'اكتب نعم او لا',
            array: 'استخدم فصله'
        }
    };

    function handlesubmit() {
        let cont = true;
        if (current === 'string') {
            text.split('').forEach((letter) => {
                if (!isNaN(Number(letter))) {
                    alert(alerts[language].string);
                    cont = false;
                }
            });
        }

        if (current === 'int') {
            if (isNaN(Number(text))) {
                alert(alerts[language].int);
                cont = false;
            }
        }

        if (current === 'boolean') {
            if (text !== (language === 'ar' ? 'نعم' : 'Yes') && text !== (language === 'ar' ? 'لا' : 'No')) {
                alert(alerts[language].boolean);
                cont = false;
            }
        }

        if (current === 'array') {
            if (!text.includes(language === 'ar' ? '،' : ',')) {
                alert(alerts[language].array);
                cont = false;
            }
        }

        if (cont) {
            setcurr(datatypes[datatypes.indexOf(current) + 1]);
            if (current === 'array') {
                navigate('/datatypes/playground');
            }
        }

        settext('');
    }

    return (
        <>
            <div id="datatypes">
                <h1>{current}</h1>
                <h2>{prompts[language][datatypes.indexOf(current)]}</h2>
                <img src={images[datatypes.indexOf(current)]} />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handlesubmit();
                    }}
                >
                    <button type="submit">{language === 'ar' ? 'ادخل' : 'Submit'}</button>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                        required
                    ></input>
                </form>
            </div>
        </>
    );
}

export default App;
