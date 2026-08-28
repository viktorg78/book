// Сюда уходит вся текстовая информация,
// массивы жанров/циклов, вычисляемое количество тегов и ваш watch,
// который жестко ограничивает ввод до 5 тегов.
const { ref, computed, watch } = Vue;

export function useBookForm() {
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

    return {
        nameBook,
        descriptionText,
        genres,
        genreId,
        cycles,
        cycleId,
        tagsText,
        tagsCount
    };
}
