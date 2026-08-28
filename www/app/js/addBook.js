

const { createApp, ref, computed, watch } = Vue;

const app = createApp({
    setup() {
        const imageUrl = ref ('')
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
        const nameBook = ref('');
        const descriptionText = ref('');
        // Жанры
        const genreId = ref(0);
        const genres = ref([
            { id: 1, name: 'Фантастика' },
            { id: 2, name: 'Детектив' }
        ]);

        // Циклы
        const cycleId = ref(0);
        const cycles = ref([
            { id: 1, cycle: 'Цикл 1' },
            { id: 2, cycle: 'Цикл 2' }
        ]);

        // Теги
        const tagsText = ref('');

        const tagsCount = computed(() => {
            const text = tagsText.value.trim();
            if (!text) return 0;
            return text.split(/\s+/).length;
        });

        // Ограничение на 5 тегов
        watch(tagsText, newValue => {
            const words = newValue.split(/(\s+)/);
            let count = 0;
            let cutoffIndex = words.length;

            for (let i = 0; i < words.length; i++) {
                if (words[i].trim() !== '') {
                    count++;
                }
                if (count > 5) {
                    cutoffIndex = i;
                    break;
                }
            }
            if (count > 5) {
                tagsText.value = words.slice(0, cutoffIndex).join('').trim();
            }
        });

        // Единая функция для вывода ошибок
        const showError = message => {
            window.showError(message);
        };

        // Единая функция для вывода сообщений
        const showSuccess = message => {
            window.showSuccess(message)
        };

        const resetForm = () => {
            if (nameBook.value) nameBook.value = '';
            if (descriptionText.value) descriptionText.value = '';
            if (genreId !== 0) genreId.value = 0;
            if (tagsText.value) tagsText.value = '';
            if (cycleId !== 0) cycleId.value = 0;
            if (imageUrl.value) imageUrl.value = ''
        }

        // проверка обязательных полей.
        const isCheck = () => {
            const emptyFields = [];
            if (!nameBook.value) emptyFields.push('Название книги');
            if (genreId.value === 0) emptyFields.push('Жанр');
            if (!tagsText.value) emptyFields.push('Тэги для поиска');
            if (!descriptionText.value) emptyFields.push('Краткое описание книги');

            if (emptyFields.length > 0){
                const message = `Не заполнены следующие поля:
                 `+ emptyFields.join(`
                 `);
                showError(message)
                return false
            }
         return true
        }

        // Возвращаем все переменные и методы в HTML шаблон
        return {
            imageUrl,
            handleFileChange,
            nameBook,
            descriptionText,
            genres,
            genreId,
            cycles,
            cycleId,
            tagsText,
            tagsCount,
            showError,
            showSuccess,
            resetForm,
            isCheck
        };
    }
});

app.mount('#app');
