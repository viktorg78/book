// Добавить главу к книге

const {ref} = Vue;

export function addChapter() {
    const nameChapter = ref('');
    const textChapter = ref('ddddddddddd');

    return {
        nameChapter,
        textChapter
    };
};