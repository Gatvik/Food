function timer() {
    //Timer

    const daysSpan = document.querySelector('#days'),
        hoursSpan = document.querySelector('#hours'),
        minutesSpan = document.querySelector('#minutes'),
        secondsSpan = document.querySelector('#seconds'),
        promotionEndDate = "2022-08-17T14:13:00.00Z";

    const getTimeRemaining = (endDate) => {
        const timeRemaining = Date.parse(endDate) - new Date(),
            days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeRemaining / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((timeRemaining / 1000 / 60) % 60),
            seconds = Math.floor((timeRemaining / 1000) % 60);

        return {
            'total': timeRemaining,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    };

    let timerId = 0;
    const updatePage = () => {
        const timeRemaining = getTimeRemaining(promotionEndDate);

        daysSpan.textContent = timeRemaining['days'].toString().length === 1 ? "0" + timeRemaining['days'].toString() : timeRemaining['days'].toString();
        hoursSpan.textContent = timeRemaining['hours'].toString().length === 1 ? "0" + timeRemaining['hours'].toString() : timeRemaining['hours'].toString();
        minutesSpan.textContent = timeRemaining['minutes'].toString().length === 1 ? "0" + timeRemaining['minutes'].toString() : timeRemaining['minutes'].toString();
        secondsSpan.textContent = timeRemaining['seconds'].toString().length === 1 ? "0" + timeRemaining['seconds'].toString() : timeRemaining['seconds'].toString();

        if (timeRemaining.total <= 0 ) {
            clearInterval(timerId);
        }
    }
    updatePage();

    timerId = setInterval(updatePage, 1000);
}

export default timer;