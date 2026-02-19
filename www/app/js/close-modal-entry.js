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
