const train = document.getElementById('train');
const person1 = document.getElementById('person1');
const person2 = document.getElementById('person2');
const blood1 = document.getElementById('blood1');
const blood2 = document.getElementById('blood2');
const collisionSound = document.getElementById('collisionSound'); // Получаем элемент аудио

let position = 0;   // Позиция поезда по оси X
let isMoving = true; // Флаг, который контролирует, двигается ли поезд

// Позиция, до которой должен двигаться поезд
const maxPosition = window.innerWidth / 2 - train.width / 2;

function moveTrain() {
    // Проверяем, если поезд еще не достиг цели
    if (isMoving && position < maxPosition) {
        position += 2;  // Поезд двигается вправо
        train.style.transform = `translateX(${position}px)`; // Двигаем поезд
    }

    // Когда поезд достигает середины, сбиваем людей
    if (position >= maxPosition && isMoving) {
        isMoving = false; // Останавливаем движение поезда

        // Воспроизводим звук столкновения
        collisionSound.play();

        // Показываем кровь непосредственно под людьми
        showBlood(person1, blood1);  // Кровь для первого человека
        showBlood(person2, blood2);  // Кровь для второго человека

        // Поднимаем людей
        person1.classList.add('dead'); // Добавляем анимацию "подпрыгивания" для первого человека
        person2.classList.add('dead'); // Добавляем анимацию "подпрыгивания" для второго человека
    }
}


// Функция для появления крови под людьми
function showBlood(person, blood) {
    const personRect = person.getBoundingClientRect();
    const bloodLeft = personRect.left + personRect.width / 2 - blood.offsetWidth / 2; // Центрируем кровь относительно человека
    const bloodTop = personRect.bottom + 10; // Смещаем кровь немного выше (10px от нижней части)

    blood.style.left = `${bloodLeft}px`;
    blood.style.top = `${bloodTop}px`;
    blood.style.opacity = 1; // Активируем видимость крови
}

// Запускаем анимацию
setInterval(moveTrain, 20); // Каждые 20 миллисекунд обновляется позиция (замедленный интервал)