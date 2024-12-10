<script setup lang="ts">
import { computed, watch, useTemplateRef, defineAsyncComponent } from 'vue';
import { useModal, ModalName } from '@/composables/use-modal.ts';
import UiIcon from '@/components/ui/icon.vue';

const { state, isOpen, close } = useModal();

const dialog = useTemplateRef<HTMLDialogElement>('dialog');

const modalComponent = computed(() => {
  switch (state.value.name) {
    case ModalName.DELETE_ROLE:
      return defineAsyncComponent(() => import('@/components/modal/delete-role.vue'));
    default:
      return 'div';
  }
});

const switchModal = (active: boolean) => {
  if (!dialog.value) return;

  if (active && !dialog.value.open) {
    dialog.value.showModal();
    dialog.value.addEventListener('mousedown', handleClickEvent);
  } else if (dialog.value.open) {
    dialog.value.close();
    dialog.value.removeEventListener('mousedown', handleClickEvent);
  }
};

const handleClickEvent = (event: MouseEvent) => {
  if (event.target === dialog.value) close();
};

watch(
  () => isOpen.value,
  (newValue) => switchModal(newValue),
);
</script>

<template>
  <dialog ref="dialog" :class="$style['app-modal']" @close="close">
    <div v-if="modalComponent" :class="$style['app-modal__inner']">
      <UiIcon
        name="close-rounded"
        size="2rem"
        :class="$style['app-modal__inner_close']"
        @click="close"
      />

      <component :is="modalComponent" v-bind="state.props" />
    </div>
  </dialog>
</template>

<style module lang="scss">
.app-modal {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border: none;
  animation: dialog-close $duration-medium forwards;
  transition:
    display $duration-medium allow-discrete,
    overlay $duration-medium allow-discrete;

  &[open] {
    animation: dialog-open $duration-medium forwards;
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 3rem 1rem 1rem;

    &_close {
      position: absolute;
      inset-block-start: 1rem;
      inset-inline-end: 1rem;
      cursor: pointer;
    }
  }

  @include media-query-tablet {
    max-width: 550px;
    max-height: calc(100% - 40px);
    width: 100%;
    height: fit-content;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;

    &__inner {
      height: fit-content;
      padding: 3rem;
    }
  }

  @keyframes dialog-open {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dialog-close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
