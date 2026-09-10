

const {createApp, ref, computed} = Vue;

const app = createApp({
    setup() {
        const nameChapter = ref('Глава 1')
        const textChapter = ref('')
        const chapters = ref([
            {id: '1', value: 'Глава 1', published: false},
            {id: '2', value: 'Глава 2', published:true},
            {id: '3', value: 'Глава 3', published: false},
            {id: '4', value: 'Глава 4', published: false},
            {id: '5', value: 'Глава 5', published:true},
            {id: '6', value: 'Глава 6', published:true},
        ])

        const myEditor = ref(null);
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
            if (myEditor.value) {
                myEditor.value.setHTML('');
            }
        };

        const moveUp = index => {
            if (index === 0) return
            const temp = chapters.value[index]
            chapters.value[index] = chapters.value[index -1]
            chapters.value[index -1] = temp
        }

        const moveDown = index => {
            if (index === chapters.value.length - 1) return
            const temp = chapters.value[index]
            chapters.value[index] = chapters.value[index +1]
            chapters.value[index +1] = temp
        }

        const deleteChapter = id =>{
            chapters.value = chapters.value.filter(ch => ch.id !== id)
        }

        const editChapter = chapter => {
            console.log('Редактируем: ', chapter)
        }

        return {
            nameChapter,
            textChapter,
            myEditor,
            editorOptions,
            characterCountText,
            chapters,
            resetForm,
            moveUp,
            moveDown,
            deleteChapter,
            editChapter
        };
    }
});
app.component('QuillEditor', VueQuill.QuillEditor);
app.mount('#app');