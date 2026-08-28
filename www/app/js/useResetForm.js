// Очистка формы книги

export function useResetForm() {
    const resetForm = formRefs => {
        if (formRefs.nameBook) formRefs.nameBook.value = '';
        if (formRefs.descriptionText) formRefs.descriptionText.value = '';
        if (formRefs.genreId !== 0) formRefs.genreId.value = 0;
        if (formRefs.tagsText) formRefs.tagsText.value = '';
        if (formRefs.cycleId !== 0) formRefs.cycleId.value = 0;
        if (formRefs.imageUrl) formRefs.imageUrl.value = ''
    };
    return {
        resetForm
    };
}