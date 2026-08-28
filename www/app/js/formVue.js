// formVue.js
import { useImageUpload } from './useImageUpload.js';
import { useBookForm } from './useBookForm.js';
import { useResetForm } from './useResetForm.js';
import { addChapter } from './addChapter.js';

const { createApp } = Vue;

const app = createApp({
    setup() {
        // Единая функция для вывода ошибок (сейчас alert, можно заменить на тостер/уведомление)
        const showError = (message) => {
            alert(message);
        };

        // Подключаем модуль картинки и передаем туда обработчик ошибок
        const { imageUrl, handleFileChange } = useImageUpload(showError);

        // Подключаем модуль полей формы книги
        const {
            nameBook,
            descriptionText,
            genres,
            genreId,
            cycles,
            cycleId,
            tagsText,
            tagsCount
        } = useBookForm();

        const { resetForm } = useResetForm();

        const handleClear = () => {
            resetForm({
                nameBook,
                descriptionText,
                genreId,
                tagsText,
                cycleId,
                imageUrl
            })
        }

        const {
            nameChapter,
            textChapter
        } = addChapter();

        // Возвращаем все переменные и методы в HTML шаблон
        return {
            imageUrl,
            handleFileChange,
            genres,
            genreId,
            nameBook,
            tagsCount,
            tagsText,
            descriptionText,
            cycles,
            cycleId,
            handleClear,
            nameChapter,
            textChapter
        };
    }
});

app.mount('#app');
