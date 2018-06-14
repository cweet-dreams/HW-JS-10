const timer = (function () {

    let countdown,
        timerDisplay,
        endTime,
        alarmSound;

    // Инициализация модуля
    function init(settings) {
        timerDisplay = document.querySelector(settings.timerDisplaySelector);
        endTime = document.querySelector(settings.endTimeSelector);
        alarmSound = new Audio(settings.alarmSound);
    }

    function start(seconds) {
        if (typeof seconds !== "number") return new Error('Please provide seconds!');

        const now = Date.now();
        const then = now + seconds * 1000;
        if (timerDisplay.textContent) stop();
        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                alarmSound.play();
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function startHours(seconds) {
        if (typeof seconds !== "number") return new Error('Please provide seconds!');

        const now = Date.now();
        const then = now + seconds * 1000;
        if (timerDisplay.textContent) stop();
        hoursTimeLeft(seconds);
        displayEndTime(then);


        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                alarmSound.play();
                return;
            }
            hoursTimeLeft(secondsLeft);
        }, 1000);
    }

    function startDays(seconds) {
        if (typeof seconds !== "number") return new Error('Please provide seconds!');

        const now = Date.now();
        const then = now + seconds * 1000;
        if (timerDisplay.textContent) stop();

        daysTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                alarmSound.play();
                return;
            }

            daysTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const reminderSeconds = seconds % 60;

        const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        timerDisplay.textContent = display;
        document.title = display;
    }

    function hoursTimeLeft(seconds) {
        const h = Math.floor(seconds / 3600);
        const rMinutes = seconds % 3600;
        const m = Math.floor(rMinutes / 60);
        const rSeconds = rMinutes % 60;

        const display = `${h}:${m < 10 ? '0' : ''}${m}:${rSeconds < 10 ? '0' : ''}${rSeconds}`;
        timerDisplay.textContent = display;
        document.title = display
    }

    function daysTimeLeft(seconds) {
        const days = Math.floor(seconds / 86400);
        const daysReminder = seconds % 86400;
        const hours = Math.floor(daysReminder / 3600);
        const minutesReminder = daysReminder % 3600;
        const minutes = Math.floor(minutesReminder / 60);
        const secondsReminder = minutesReminder % 60;

        const display = `${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secondsReminder < 10 ? '0' : ''}${secondsReminder}`;
        timerDisplay.textContent = display;
        document.title = display
    }

    function displayEndTime(timestamp) {
        const end = new Date(timestamp);
        const date = end.toLocaleString();
        const hour = end.getHours();
        const minutes = end.getMinutes();

        endTime.textContent = `Be back at ${date}`;
    }

    function stop() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        clearInterval(countdown);
        timerDisplay.textContent = '00:00';
        document.title = '00:00';
        endTime.textContent = '';
    }

    return {
        init,
        start,
        stop,
        startHours,
        startDays
    }
})();

const buttons = document.querySelectorAll('[data-time]');
const stopBtn = document.querySelector('.stop');
const form = document.querySelector('#custom');

timer.init({
    timerDisplaySelector: '.display__time-left',
    endTimeSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
    const seconds = Number(this.dataset.time);
    timer.start(seconds);
}

// Stop timer on click
function stopTimer(e) {
    timer.stop();
}

function inputTimer(e) {
    e.preventDefault();
    const seconds = Number(e.target.minutes.value * 60);
    seconds <= 3600 ? timer.start(seconds) : seconds <= 86400 ? timer.startHours(seconds) : timer.startDays(seconds);
}


buttons.forEach(btn => btn.addEventListener('click', startTimer));
stopBtn.addEventListener('click', stopTimer);
form.addEventListener('submit', inputTimer);








