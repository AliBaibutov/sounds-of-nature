interface CardsData {
  id: number;
  imgSrc: string;
  soundSrc: string;
  btnImgSrc: string;
  isPaused: boolean;
}

const cardsData: CardsData[] = [
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

function renderCardsList(cardsList: CardsData[]) {
  const title = document.querySelector("h1");
  title?.insertAdjacentHTML("afterend", `<div class="card-container"></div>`);

  const cardsContainer = document.querySelector(".card-container");

  // Отрисовка карточек
  cardsList.forEach((card) => renderCard(card, cardsContainer));

  // Добавления регулировки громкости
  cardsContainer?.insertAdjacentHTML(
    "afterend",
    `
    <div class = volume-control>
      <input id="range" min="0" max="100" value="50" type="range">
    </div>
    `
  );

  // Слушатели кликов по иконке
  const icons = document.querySelectorAll(".card__img-btn");

  icons.forEach((icon, i) => {
    icon.addEventListener("click", () => {
      handleIconClick(cardsData, i);
    });
  });
}

// Функция отрисовки карточки
function renderCard(card: CardsData, targetContainer: Element | null) {
  const { id, imgSrc, btnImgSrc } = card;
  // const btnImg = card.isPaused ? btnImgSrc : "./files/assets/icons/pause.svg";

  targetContainer?.insertAdjacentHTML(
    "beforeend",
    `<div id=${id} class="card">
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
    </div>`
  );
}

// Функция обработчик для смены иконки при клике
function handleIconClick(cardsList: CardsData[], i: number) {
  cardsList[i].isPaused = !cardsList[i].isPaused;

  const targetContainer = document.querySelector(".card-container");
  const volumeControl = document.querySelector(".volume-control");

  targetContainer?.remove();
  volumeControl?.remove();

  renderCardsList(cardsList);

  const cards = document.querySelectorAll(".card");
  const audioElems = targetContainer?.querySelectorAll("audio");

  audioElems?.forEach((audioElem) => audioElem.remove());

  cards[i].insertAdjacentHTML(
    "afterbegin",
    `<audio src=${cardsList[i].soundSrc}></audio>
    `
  );
  changeIcon(cards, i, cardsList);

  // Изменение громкости
  const volumeControlRange = document.getElementById(
    "range"
  ) as HTMLInputElement;

  const audioElement: HTMLAudioElement | null = document.querySelector("audio");

  volumeControlRange?.addEventListener("change", () => {
    audioElement
      ? (audioElement.volume = Number(volumeControlRange.value) / 100)
      : null;
  });
}

// Функция для проверки наличия audio элемента и замены иконки
function changeIcon(
  cards: NodeListOf<Element>,
  i: number,
  cardsList: CardsData[]
) {
  const isPaused = cardsList[i].isPaused;

  const audioElem = cards[i].querySelector("audio");
  const icon = cards[i].querySelector(".card__img-btn");

  if (!isPaused) {
    audioElem?.play();
    (icon as HTMLImageElement).src = "./files/assets/icons/pause.svg";
  } else {
    audioElem?.pause();
    (icon as HTMLImageElement).src = cardsList[i].btnImgSrc;
  }
}
