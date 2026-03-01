// Закрытия модальноео окна "Авторизация"
document.getElementById('modal-entry').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('close-modal-entry').click()
    }
});

document.getElementById('modal-error').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('close-modal-error').click()
    }
});



document.getElementById('modal-loop').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('close-modal-loop').click()
    }
});

document.getElementById('modal-add-chapter').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('close-modal-add-chapter').click()
    }
});

// Вспомогательные функции для отображения сообщений
function showError(message) {
    const errorElement = document.getElementById('textError');
    if (errorElement) {
        errorElement.textContent = message; // Безопасное присвоение текста
        errorElement.style.display = 'block';
        openModal.click(); // Показываем модальное окно с ошибкой
    }
}

function showSuccess(message) {
    const openModalNotification = checkElementById('openModalNotification')
    const notificationElement = checkElementById('textNotification');
    const modalNotification = checkElementById('modal-notification');
    const closeModalNotification = checkElementById('close-modal-notification');

    notificationElement.textContent = message;
    notificationElement.style.display = 'block';
    openModalNotification.click();

    modalNotification.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModalNotification.click()
        }
    });

}

// Проверка на существования элемента
function checkElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element; // Возвращаем элемент для дальнейшего использования
    } else {
        console.warn(`❌ Элемент с ID "${elementId}" не найден в DOM`);
        return null;
    }
}
