// Создаем переменную высоты, для меню и модальных окон для ios
function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}
window.addEventListener("resize", appHeight);
appHeight();

// Открытие / закрытие модальных окон
function modalOpen() {
    const modalBtns = document.querySelectorAll("[data-modal]"),
        modals = document.querySelectorAll(".modal-wrapper"),
        closeBtns = document.querySelectorAll(".close");

    modalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let modalName = btn.dataset.modal;
            document.querySelector("body").classList.add("no-scroll");

            modals.forEach((modal) => {
                // Удаляем класс, если открыто еще одно модальное окно
                modal.classList.contains("open")
                    ? modal.classList.remove("open")
                    : "";
            });
            document.querySelector("#" + modalName).classList.add("open");
        });
    });

    function hideModal() {
        modals.forEach((modal) => {
            modal.classList.remove("open");
        });
        document.querySelector("body").classList.remove("no-scroll");
    }

    closeBtns.forEach((close) => {
        close.addEventListener("click", () => {
            hideModal();
        });
    });

    // modals.forEach((modal) => {
    //     modal.addEventListener("click", (e) => {
    //         let classesClick = e.target.attributes.class.value;

    //         if (!classesClick.indexOf("modal-wrapper")) {
    //             hideModal();
    //         }
    //     });
    // });
}

modalOpen();

function labelPassword() {
    let allInputs = document.querySelectorAll(".label-password");

    if (!allInputs) return;

    allInputs.forEach((item) => {
        let btn = item.querySelector("button"),
            input = item.querySelector("input");

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            btn.classList.toggle("password-open");

            if (btn.classList.contains("password-open")) {
                input.type = "text";
            } else {
                input.type = "password";
            }
        });
    });
}

labelPassword();

// Находим все контейнеры с загрузчиками файлов
document.querySelectorAll(".file-upload-wrapper").forEach((wrapper) => {
    const label = wrapper.querySelector(".custom-file-label");
    const input = wrapper.querySelector('input[type="file"]');
    const fileNameText = wrapper.querySelector(".file-name");

    // Клик по label открывает окно выбора файла
    label.addEventListener("click", () => input.click());

    // При выборе файла меняем текст
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        fileNameText.textContent = file ? `${file.name}` : "Файл не выбран";
    });
});

function resultsToggle() {
    let allItems = document.querySelectorAll(".result-item");

    allItems.forEach((item) => {
        let toggle = item.querySelector(".result-item__head");
        toggle.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });
}

resultsToggle();

// document.querySelector(".add-access").addEventListener("click", function () {
//     const container = document.getElementById("access-forms");

//     // Берём первую форму и клонируем
//     const firstForm = container.querySelector(".details-element__grid-element");
//     const newForm = firstForm.cloneNode(true);

//     // Очищаем все поля внутри формы
//     newForm.querySelectorAll("input, textarea").forEach((el) => {
//         el.value = "";
//     });

//     // Меняем заголовок (опционально, если нужно различать формы)
//     newForm.querySelector("h3").innerText = "Новый доступ";

//     // Добавляем в контейнер перед кнопкой
//     container.appendChild(newForm);
// });


function initPasswordToggle(form) {
  if (!form) {
    return;
  }
  form.querySelectorAll(".toggle-pass").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const input = toggle.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });
}

// Инициализация для первой формы
initPasswordToggle(document.querySelector(".details-element__grid-element"));

if (document.querySelector(".add-access")) {
    document.querySelector(".add-access").addEventListener("click", function () {
        const container = document.getElementById("access-forms");
        const firstForm = container.querySelector(".details-element__grid-element");
        const newForm = firstForm.cloneNode(true);

        // Добавляем форму ПЕРЕД кнопкой "Добавить доступ"
        container.insertBefore(newForm, document.querySelector("#access-button"));

        // Подключаем переключение пароля для новой формы
        initPasswordToggle(newForm);
    });
}