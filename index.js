"use strict";
const cardsData = [
    {
        id: 1,
        imgSrc: "./files/assets/summer-bg.jpg",
        soundSrc: "./files/assets/sounds/summer.mp3",
        btnImgSrc: "./files/assets/icons/sun.svg",
        isPaused: true,
    },
    {
        id: 2,
        imgSrc: "./files/assets/rainy-bg.jpg",
        soundSrc: "./files/assets/sounds/rain.mp3",
        btnImgSrc: "./files/assets/icons/cloud-rain.svg",
        isPaused: true,
    },
    {
        id: 3,
        imgSrc: "./files/assets/winter-bg.jpg",
        soundSrc: "./files/assets/sounds/winter.mp3",
        btnImgSrc: "./files/assets/icons/cloud-snow.svg",
        isPaused: true,
    },
];
// Отображение карточек
renderCardsList(cardsData);
// Функция рендера карточек
function renderCardsList(cardsList) {
    const title = document.querySelector("h1");
    title === null || title === void 0 ? void 0 : title.insertAdjacentHTML("afterend", `<div class="card-container"></div>`);
    const cardsContainer = document.querySelector(".card-container");
    // Отрисовка карточек
    cardsList.forEach((card) => renderCard(card, cardsContainer));
    // Добавления регулировки громкости
    cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.insertAdjacentHTML("afterend", `
    <div class = volume-control>
      <input id="range" min="0" max="100" value="50" type="range">
    </div>
    `);
    // Слушатели кликов по иконке
    const icons = document.querySelectorAll(".card__img-btn");
    icons.forEach((icon, i) => {
        icon.addEventListener("click", () => {
            handleIconClick(cardsData, i);
        });
    });
}
// Функция отрисовки карточки
function renderCard(card, targetContainer) {
    const { id, imgSrc, btnImgSrc } = card;
    // const btnImg = card.isPaused ? btnImgSrc : "./files/assets/icons/pause.svg";
    targetContainer === null || targetContainer === void 0 ? void 0 : targetContainer.insertAdjacentHTML("beforeend", `<div id=${id} class="card">
      <img
        src=${imgSrc}
        class="card__img-back"
        alt="Лето"
      />
      <img
        src=${btnImgSrc}
        class="card__img-btn"
        alt="Воспроизвести"
      />
    </div>`);
}
// Функция обработчик для смены иконки при клике
function handleIconClick(cardsList, i) {
    cardsList[i].isPaused = !cardsList[i].isPaused;
    const targetContainer = document.querySelector(".card-container");
    const volumeControl = document.querySelector(".volume-control");
    targetContainer === null || targetContainer === void 0 ? void 0 : targetContainer.remove();
    volumeControl === null || volumeControl === void 0 ? void 0 : volumeControl.remove();
    renderCardsList(cardsList);
    const cards = document.querySelectorAll(".card");
    const audioElems = targetContainer === null || targetContainer === void 0 ? void 0 : targetContainer.querySelectorAll("audio");
    audioElems === null || audioElems === void 0 ? void 0 : audioElems.forEach((audioElem) => audioElem.remove());
    cards[i].insertAdjacentHTML("afterbegin", `<audio src=${cardsList[i].soundSrc}></audio>
    `);
    changeIcon(cards, i, cardsList);
    // Изменение громкости
    const volumeControlRange = document.getElementById("range");
    const audioElement = document.querySelector("audio");
    volumeControlRange === null || volumeControlRange === void 0 ? void 0 : volumeControlRange.addEventListener("change", () => {
        audioElement
            ? (audioElement.volume = Number(volumeControlRange.value) / 100)
            : null;
    });
}
// Функция для проверки наличия audio элемента и замены иконки
function changeIcon(cards, i, cardsList) {
    const isPaused = cardsList[i].isPaused;
    const audioElem = cards[i].querySelector("audio");
    const icon = cards[i].querySelector(".card__img-btn");
    if (!isPaused) {
        audioElem === null || audioElem === void 0 ? void 0 : audioElem.play();
        icon.src = "./files/assets/icons/pause.svg";
    }
    else {
        audioElem === null || audioElem === void 0 ? void 0 : audioElem.pause();
        icon.src = cardsList[i].btnImgSrc;
    }
}
