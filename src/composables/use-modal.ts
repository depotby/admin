import { ref, computed } from 'vue';

export enum ModalName {
  DELETE_ROLE = 'delete-role',
}

export interface ModalState {
  name: ModalName | undefined;
  props: any | undefined;
}

const state = ref<ModalState>({
  name: undefined,
  props: undefined,
});

export const useModal = () => {
  const isOpen = computed(() => !!state.value.name);

  const open = (name: ModalName, props?: any) => {
    state.value = {
      name,
      props,
    };
  };

  const close = () => {
    state.value = {
      name: undefined,
      props: undefined,
    };
  };

  return {
    state,
    isOpen,
    open,
    close,
  };
};
