"use strict";
let isPaused = true;
// Отображение карточек
renderCardsList();
// Функция рендера карточек
function renderCardsList() {
    const title = document.querySelector("h1");
    title === null || title === void 0 ? void 0 : title.insertAdjacentHTML("afterend", `<div class="card-container"></div>`);
    const cardsContainer = document.querySelector(".card-container");
    // Отрисовка карточек
    cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.insertAdjacentHTML("beforeend", `<div class="card">
      <img
        src="./files/assets/summer-bg.jpg"
        class="card__back"
        alt="Лето"
      />
      <div
        class="card__weather card__summer-btn"
      >
      </div>
      <audio src="./files/assets/sounds/summer.mp3"></audio>
    </div>
    <div class="card">
      <img
        src="./files/assets/rainy-bg.jpg"
        class="card__back"
        alt="Дождь"
      />
      <div
        class="card__weather card__rain-btn"
      >
      </div>
      <audio src="./files/assets/sounds/rain.mp3"></audio>
    </div>
    <div class="card">
      <img
        src="./files/assets/winter-bg.jpg"
        class="card__back"
        alt="Зима"
      />
      <div
        class="card__weather card__winter-btn"
      >
      </div>
      <audio src="./files/assets/sounds/winter.mp3"></audio>
    </div>`);
    // Добавления регулировки громкости
    cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.insertAdjacentHTML("afterend", `
    <div class = volume-control>
      <input id="range" min="0" max="100" value="50" type="range">
    </div>
    `);
    // Изменение громкости
    const volumeControlRange = document.getElementById("range");
    const audioElems = cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.querySelectorAll("audio");
    audioElems === null || audioElems === void 0 ? void 0 : audioElems.forEach((audioElem) => {
        audioElem.volume = 0.5;
        volumeControlRange === null || volumeControlRange === void 0 ? void 0 : volumeControlRange.addEventListener("change", () => {
            audioElem.volume = Number(volumeControlRange.value) / 100;
        });
    });
    // Функция замены фона
    function changeBackground(icon) {
        const body = document.querySelector("body");
        const sound = icon.nextElementSibling;
        const soundSrc = sound.src.slice(22, sound.src.length + 1);
        console.log(soundSrc);
        switch (soundSrc) {
            case "files/assets/sounds/summer.mp3":
                body
                    ? (body.style.backgroundImage = "url('./files/assets/summer-bg.jpg')")
                    : null;
                break;
            case "files/assets/sounds/rain.mp3":
                body
                    ? (body.style.backgroundImage = "url('./files/assets/rainy-bg.jpg')")
                    : null;
                break;
            case "files/assets/sounds/winter.mp3":
                body
                    ? (body.style.backgroundImage = "url('./files/assets/winter-bg.jpg')")
                    : null;
                break;
        }
    }
    // Удаляем иконку паузы со всех карточек и ставим все аудио на паузу
    const icons = document.querySelectorAll(".card__weather");
    function removePauseAndActiveClasses() {
        icons.forEach((icon) => {
            const sound = icon.nextElementSibling;
            icon.classList.remove("pause");
            icon.classList.remove("active");
            sound.pause();
        });
    }
    // Слушатели кликов по иконке
    icons.forEach((icon) => {
        const sound = icon.nextElementSibling;
        icon.addEventListener("click", () => {
            changeBackground(icon);
            if (icon.classList.contains("pause")) {
                icon.classList.remove("pause");
                sound.pause();
                isPaused = true;
                return;
            }
            else {
                icon.classList.add("pause");
                sound.play();
                isPaused = false;
            }
            if (!icon.classList.contains("active")) {
                sound.currentTime = 0;
            }
            removePauseAndActiveClasses();
            if (!isPaused) {
                icon.classList.add("pause");
                icon.classList.add("active");
                sound.play();
            }
        });
    });
}
