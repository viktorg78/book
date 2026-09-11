const {createApp, ref, computed, onMounted, onUnmounted} = Vue;

const app = createApp({
    setup() {
        const nameBook = ref('Название книги')
        const content = ref([
            {
                id: 1,
                content: 'Глава 1',
                text: 'Глава 1 '.repeat(45)
            },
            {
                id: 2,
                content: 'Глава 2',
                text: 'Глава 2 '.repeat(65)
            },
            {
                id: 3,
                content: 'Глава 3',
                text: 'Глава 3 '.repeat(85)
            },
            {
                id: 4,
                content: 'Глава 4',
                text: 'Глава 4 '.repeat(105)
            },
        ])
        const currentChapter = ref(content.value[0])

        const selectChapter = chapter => {
            currentChapter.value = chapter
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const fontSize = ref(18);
        const minFontSize = 14;
        const maxFontSize = 30;

        const isMaxFont = computed(() => fontSize.value >= maxFontSize);
        const isMinFont = computed(() => fontSize.value <= minFontSize);

        const increaseFont = () => {
            if (!isMaxFont.value) fontSize.value += 2;
        };
        const reduceFont = () => {
            if (!isMinFont.value) fontSize.value -= 2;
        };

        const positionStyle = ref([
            {color: "#2e8c3e", backgroundColor: "#000000"},
            {color: "#ffffff", backgroundColor: "#000000"},
            {color: "#6d4231", backgroundColor: "#f5efdd"},
            {color: "#444444", backgroundColor: "#faf8f2"},
            {color: "#444444", backgroundColor: "#ffffff"},
        ])
        const positionBrightness = ref(3)

        const isMaxBrightness = computed(() => positionBrightness.value >= positionStyle.value.length - 1);
        const isMinBrightness = computed(() => positionBrightness.value <= 0);

        const increaseBrightness = () => {
            if (!isMaxBrightness.value) {
                positionBrightness.value++;
            }
        };

        const reduceBrightness = () => {
            if (!isMinBrightness.value) {
                positionBrightness.value--;
            }
        };

        const currentStyle = computed(() => {
            const activeColorTheme = positionStyle.value[positionBrightness.value];
            return {
                ...activeColorTheme,
                fontSize: fontSize.value + 'px'
            }
        })

        const isSidebarOpen = ref(false)
        const sidebarRef = ref(null)

        const toggleSidebar = (status) => {
            isSidebarOpen.value = status;
        };

        const handleClickOutside = (event) => {
            if (isSidebarOpen.value && sidebarRef.value && !sidebarRef.value.contains(event.target)) {
                if (!event.target.closest('.link-rider-content')) {
                    isSidebarOpen.value = false;
                }
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        const triggerNotification = () => {
            setTimeout(() => {
                if (window.location.hash === '#modal-notification') {
                    window.location.hash = '#close';
                }
            }, 3000);
        };

        return {
            content,
            currentChapter,
            selectChapter,
            currentStyle,
            increaseBrightness,
            reduceBrightness,
            isMaxBrightness,
            isMinBrightness,
            increaseFont,
            reduceFont,
            isMaxFont,
            isMinFont,
            isSidebarOpen,
            sidebarRef,
            toggleSidebar,
            nameBook,
            triggerNotification
        }
    }
})
app.mount('#app');
