let isPaused = true;

// Отображение страницы
renderCardsList();

// Функция рендера карточек

function renderCardsList() {
  const title = document.querySelector("h1");
  title?.insertAdjacentHTML("afterend", `<div class="card-container"></div>`);

  const cardsContainer = document.querySelector(".card-container");

  // Отрисовка карточек
  cardsContainer?.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
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
    </div>`
  );

  // Добавления регулировки громкости
  cardsContainer?.insertAdjacentHTML(
    "afterend",
    `
    <div class = volume-control>
      <input id="range" min="0" max="100" value="50" type="range">
    </div>
    `
  );

  // Изменение громкости
  const volumeControlRange = document.getElementById(
    "range"
  ) as HTMLInputElement;

  const audioElems = cardsContainer?.querySelectorAll("audio");

  audioElems?.forEach((audioElem) => {
    audioElem.volume = 0.5;
    volumeControlRange?.addEventListener("change", () => {
      audioElem.volume = Number(volumeControlRange.value) / 100;
    });
  });

  // Функция замены фона
  function changeBackground(icon: Element) {
    const body = document.querySelector("body");

    if (icon.classList.contains("card__summer-btn")) {
      body
        ? (body.style.backgroundImage = "url('./files/assets/summer-bg.jpg')")
        : null;
    }

    if (icon.classList.contains("card__rain-btn")) {
      body
        ? (body.style.backgroundImage = "url('./files/assets/rainy-bg.jpg')")
        : null;
    }

    if (icon.classList.contains("card__winter-btn")) {
      body
        ? (body.style.backgroundImage = "url('./files/assets/winter-bg.jpg')")
        : null;
    }
  }

  // Удаляем иконку паузы со всех карточек и ставим все аудио на паузу
  const icons = document.querySelectorAll(".card__weather");

  function removePauseAndActiveClasses() {
    icons.forEach((icon) => {
      const sound = icon.nextElementSibling as HTMLAudioElement;
      icon.classList.remove("pause");
      icon.classList.remove("active");
      sound.pause();
    });
  }

  // Слушатели кликов по иконке
  icons.forEach((icon) => {
    const sound = icon.nextElementSibling as HTMLAudioElement;
    icon.addEventListener("click", () => {
      changeBackground(icon);

      if (icon.classList.contains("pause")) {
        icon.classList.remove("pause");
        sound.pause();
        isPaused = true;
        return;
      } else {
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
