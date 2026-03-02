// Закрытия модальноео окна "Авторизация"
document.getElementById('modal-entry').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('close-modal-entry').click()
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

// отображения сообщений об ошибке
function showError(message) {
    const openModalError = checkElementById('openModalError');
    const textError = checkElementById('textError');
    const modalError = checkElementById('modal-error');
    const closeModalError = checkElementById('close-modal-error');

    if (openModalError && textError && modalError && closeModalError) {
        textError.textContent = message;
        textError.style.display = 'block';
        openModalError.click();

        modalError.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModalError.click()
            }
        });
    }

}
// отображения сообщений
function showSuccess(message) {
    const openModalNotification = checkElementById('openModalNotification')
    const notificationElement = checkElementById('textNotification');
    const modalNotification = checkElementById('modal-notification');
    const closeModalNotification = checkElementById('close-modal-notification');

    if (openModalNotification && notificationElement && modalNotification && closeModalNotification){
        notificationElement.textContent = message;
        notificationElement.style.display = 'block';
        openModalNotification.click();

        modalNotification.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModalNotification.click()
            }
        });
    }


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
