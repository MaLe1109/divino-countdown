
/* 1. TEST-ZUGANGSDATEN */
const TEST_USERNAME = "divino";
const TEST_PASSWORD = "Divino2026!";

/* 2. HTML-ELEMENTE FINDEN */
const loginPage = document.getElementById("loginPage");
const countdownPage = document.getElementById("countdownPage");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logoutButton");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const statusElement = document.getElementById("status");

/* 3. RELEASE-DATUM */
// Monat 9 bedeutet Oktober.
// Der Countdown endet am 30.10.2026 um 00:00 Uhr.
const releaseDate = new Date(2026, 9, 30, 0, 0, 0).getTime();

/* 4. TIMER-VARIABLE */
let timer = null;

/* 5. LOGIN */
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
        loginPage.hidden = true;
        countdownPage.hidden = false;
        loginError.textContent = "";

        clearInterval(timer);
        updateCountdown();

        if (releaseDate > Date.now()) {
            timer = setInterval(updateCountdown, 1000);
        }
    } else {
        loginError.textContent = "Benutzername oder Passwort ist falsch.";
    }
});

/* 6. ABMELDEN */
logoutButton.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;

    countdownPage.hidden = true;
    loginPage.hidden = false;

    loginForm.reset();
    loginError.textContent = "";
});

/* 7. COUNTDOWN BERECHNEN */
function updateCountdown() {
    const now = Date.now();
    const difference = releaseDate - now;

    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        statusElement.textContent = "DER RELEASE-TERMIN IST ERREICHT!";

        clearInterval(timer);
        timer = null;
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    statusElement.textContent = "DIE ZEIT LÄUFT.";
}
