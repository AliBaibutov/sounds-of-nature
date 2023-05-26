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
    const btnImg = card.isPaused ? btnImgSrc : "./files/assets/icons/pause.svg";
    targetContainer === null || targetContainer === void 0 ? void 0 : targetContainer.insertAdjacentHTML("beforeend", `<div id=${id} class="card">
      <img
        src=${imgSrc}
        class="card__img-back"
        alt="Лето"
      />
      <img
        src=${btnImg}
        class="card__img-btn"
        alt="Воспроизвести"
      />
    </div>`);
}
// Функция обработчик для смены иконки при клике
function handleIconClick(cardsList, i) {
    cardsList[i].isPaused = !cardsList[i].isPaused;
    const targetContainer = document.querySelector(".card-container");
    targetContainer === null || targetContainer === void 0 ? void 0 : targetContainer.remove();
    renderCardsList(cardsList);
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card === null || card === void 0 ? void 0 : card.insertAdjacentHTML("afterbegin", `<audio src=${cardsList[i].soundSrc}></audio>`);
    });
    const audio = document.querySelector("audio");
    !cardsList[i].isPaused ? audio === null || audio === void 0 ? void 0 : audio.play() : audio === null || audio === void 0 ? void 0 : audio.pause();
}
