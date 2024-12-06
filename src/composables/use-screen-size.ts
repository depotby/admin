import { computed, ref } from 'vue';

const width = ref(window.innerWidth);

window.addEventListener('resize', () => {
  width.value = window.innerWidth;
});

export const useScreenSize = () => {
  return {
    width: computed(() => width.value),
    tablet: computed(() => width.value >= 768),
    desktop: computed(() => width.value >= 1024),
    desktopXl: computed(() => width.value >= 1440),
  };
};
