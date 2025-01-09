<script setup lang="ts">
import { computed, useId, useCssModule } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const model = defineModel<boolean>({ default: false });

const id = useId();
const style = useCssModule();

const componentClasses = computed(() => ({
  [style['ui-form-switch']]: true,
  [style['ui-form-switch--disabled']]: props.disabled,
}));
</script>

<template>
  <section :class="componentClasses">
    <input
      v-model="model"
      :id
      :disabled="props.disabled"
      type="checkbox"
      role="switch"
      :class="$style['ui-form-switch__input']"
    />

    <label v-if="props.label" :for="id" :class="$style['ui-form-switch__label']">
      {{ props.label }}
    </label>
  </section>
</template>

<style module lang="scss">
.ui-form-switch {
  $component-class: &;

  padding-inline-start: 0.25rem;
  min-height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__input {
    float: left;
    width: 2.5rem;
    height: 1.25rem;
    border-radius: 2rem;
    border: 1px solid $color-border;
    background-image: url('@/assets/images/svg/switch/inactive.svg?inline');
    background-repeat: no-repeat;
    background-size: contain;
    transition: background-position $duration-fast ease-in-out;
    appearance: none;

    &:not(:checked):not(:focus) {
      background-position: left center;
    }

    &:focus {
      background-image: url('@/assets/images/svg/switch/focus.svg?inline');
      border-color: $color-border-active;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    &:checked {
      background-image: url('@/assets/images/svg/switch/active.svg?inline');
      background-position: right center;
      background-color: $color-blue;
      border-color: $color-blue;
    }
  }

  &__label {
    cursor: pointer;
  }

  &--disabled {
    #{$component-class} {
      &__input,
      &__label {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
}
</style>
