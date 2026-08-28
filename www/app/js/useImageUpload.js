// Отвечает только за картинку.
// Нам нужно передавать функцию showError снаружи, чтобы модуль не зависел от того, как именно вы выводите ошибки
// (через alert или кастомный логгер).

// useImageUpload.js
const { ref } = Vue;

export function useImageUpload(showError) {
    const imageUrl = ref('');

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Проверка на тип файла
        if (!file.type.startsWith('image/')) {
            showError('Разрешено загружать только изображения.');
            e.target.value = '';
            return;
        }

        // 2. Проверка на вес файла (не более 5 МБ)
        const maxSizeInBytes = 5 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            showError('Файл не может превышать 5мб.');
            e.target.value = '';
            return;
        }

        // 3. Проверка разрешения (пикселей)
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width < 200 || img.height < 285) {
                showError('Размер изображения должен быть не менее 200 пикселей в ширину и 285 в высоту.');
                e.target.value = '';
                URL.revokeObjectURL(img.src);
                return;
            }
            imageUrl.value = img.src;
        };

        img.onerror = () => {
            showError('Не удалось прочитать изображение. Возможно, файл поврежден.');
            e.target.value = '';
            URL.revokeObjectURL(img.src);
        };
    };

    return {
        imageUrl,
        handleFileChange
    };
}
