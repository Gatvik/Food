function calculator() {
    //Calculator

    const calculatorField = document.querySelector('.calculating__field'),
        genderChoose = calculatorField.querySelector('.calculating__choose'),
        constitutionChoose = calculatorField.querySelector(".calculating__choose_medium"),
        activityChoose = calculatorField.querySelector('.calculating__choose_big'),
        resultSpan = document.querySelector(".calculating__result span"),
        activitiesEnum = {
            'Низкая активность': 1.375,
            'Невысокая активность': 1.55,
            'Умеренная активность': 1.725,
            'Высокая активность': 1.9
        };

    const removeActiveClass = (nodeList) => {
        for (let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].nodeName === '#text') continue;
            nodeList[i].classList.remove('calculating__choose-item_active');
        }
    };

    //Set values from local storage
    let userGender = localStorage.getItem('gender') !== null ? localStorage.getItem('gender') : genderChoose.querySelector(".calculating__choose-item_active").textContent,
        userActivity = localStorage.getItem('activity') !== null ? localStorage.getItem('activity') : activityChoose.querySelector(".calculating__choose-item_active").textContent,
        userHeight = localStorage.getItem('height') !== null ? localStorage.getItem('height') : '',
        userWeight = localStorage.getItem('weight') !== null ? localStorage.getItem('weight') : '',
        userAge = localStorage.getItem('age') !== null ? localStorage.getItem('age') : '';

    for (let node of genderChoose.childNodes) {
        if (node.textContent === userGender && node.nodeName !== '#text') {
            removeActiveClass(genderChoose.childNodes);
            node.classList.add('calculating__choose-item_active');
            break;
        }
    }

    for (let node of activityChoose.childNodes) {
        if (node.textContent === userActivity && node.nodeName !== '#text') {
            removeActiveClass(activityChoose.childNodes);
            node.classList.add('calculating__choose-item_active');
            break;
        }
    }

    constitutionChoose.querySelector('#height').value = userHeight;
    constitutionChoose.querySelector('#weight').value = userWeight;
    constitutionChoose.querySelector('#age').value = userAge;
    calculate();

    //Gender form
    genderChoose.addEventListener("click", e => {
        if (e.target === genderChoose) return;

        removeActiveClass(genderChoose.childNodes);
        e.target.classList.add('calculating__choose-item_active');

        userGender = e.target.textContent;
        localStorage.setItem('gender', userGender);
        calculate();
    });

    //Activity form
    activityChoose.addEventListener("click", e => {
        if (e.target === activityChoose) return;

        removeActiveClass(activityChoose.childNodes);
        e.target.classList.add('calculating__choose-item_active');

        userActivity = e.target.textContent;
        localStorage.setItem('activity', userActivity);
        calculate();
    });

    //Constitution form


    constitutionChoose.addEventListener("input", e => {
        const inputValue = e.target.value;
        if (inputValue.match(/\D/g)) {
            e.target.style.border = '1px solid red';
            return;
        }
        else e.target.style.border = 'none';
        switch (e.target.getAttribute('id')) {
            case 'height':
                userHeight = +inputValue;
                localStorage.setItem('height', userHeight);
                break;
            case 'weight':
                userWeight = +inputValue;
                localStorage.setItem('weight', userWeight);
                break;
            case 'age':
                userAge = +inputValue;
                localStorage.setItem('age', userAge);
                break;
        }

        calculate();
    });

    //Display results & change the kkal field

    function calculate() {
        let result;
        if (userGender === 'Мужчина') {
            result = (88.36 + (13.4 * userWeight) + (4.8 * userHeight) - (5.7 * userAge)) * activitiesEnum[userActivity];
        } else {
            result = 447.6 + (9.2 * userWeight) + (3.1 * userHeight) - (4.3 * userAge) * activitiesEnum[userActivity];
        }

        displayResults(result);
    }

    function displayResults(result) {
        if (!Number.isNaN(result) && userHeight !== 0 && userWeight !== 0 && userAge !== 0) {
            resultSpan.textContent = Math.round(result).toString();
            return;
        }

        resultSpan.textContent = '0';
    }
}

export default calculator;