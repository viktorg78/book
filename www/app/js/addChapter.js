// Добавить главу к книге

const {createApp, ref, computed} = Vue;

const app = createApp({
    setup() {
        const nameChapter = ref('Глава 1')
        const textChapter = ref('')

        const editorOptions = {
            modules: {
                toolbar: [
                    // Группа 1: Жирный, Курсив, Подчеркнутый, Зачеркнутый
                    ['bold', 'italic', 'underline', 'strike'],

                    // Группа 2: Выравнивание текста (лево, центр, право, по ширине)
                    [{ 'align': [] }],

                    // Группа 3: Заголовки (полезно для подзаголовков внутри главы)
                    [{ 'header': [1, 2, 3, false] }],

                    // Группа 4: Списки (нумерованный и маркированный)
                    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],

                    // Группа 5: Очистить форматирование (удаляет выделение, если текст скопирован откуда-то)
                    ['clean']
                ]
            },
            placeholder: 'Начните писать главу...'
        }

        // Точный счетчик символов (вырезает HTML-теги)
        const characterCountText = computed(() => {
            const cleanText = textChapter.value
                .replace(/<\/?[^>]+(>|$)/g, "")
                .replace(/&nbsp;/g, " ");
            const count = cleanText.length;

            let word = 'символов';
            const absoluteCount = Math.abs(count) % 100;
            const lastDigit = absoluteCount % 10;

            if (absoluteCount > 10 && absoluteCount < 20) {
                word = 'символов';
            } else if (lastDigit > 1 && lastDigit < 5) {
                word = 'символа';
            } else if (lastDigit === 1) {
                word = 'символ';
            }

            return `Введено ${count} ${word}`;
        });

        const resetForm = () => {
            nameChapter.value = '';
            textChapter.value = '';
        };

        return {
            nameChapter,
            textChapter,
            editorOptions,
            characterCountText,
            resetForm
        };
    }
});
app.component('QuillEditor', VueQuill.QuillEditor);
app.mount('#app');