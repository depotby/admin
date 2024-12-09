import { ref, computed } from 'vue';

export enum ModalName {
  DELETE_ROLE = 'delete-role',
}

export interface ModalState {
  name: ModalName | undefined;
}

const state = ref<ModalState>({
  name: undefined,
});

export const useModal = () => {
  const isOpen = computed(() => !!state.value.name);

  const open = (name: ModalName) => {
    state.value.name = name;
  };

  const close = () => {
    state.value.name = undefined;
  };

  return {
    state,
    isOpen,
    open,
    close,
  };
};
