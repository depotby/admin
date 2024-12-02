<script setup lang="ts">
import { useId, computed } from 'vue';
import UiText from '@/components/ui/text.vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password';
    error?: string | string[];
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
    required: false,
  },
);

const model = defineModel({ required: true });

const id = useId();

const errors = computed(() => (Array.isArray(props.error) ? props.error.join(', ') : props.error));
</script>

<template>
  <section :class="$style['ui-form-input']">
    <UiText v-if="props.label" tag="label" :for="id" :class="$style['ui-form-input__label']">
      {{ props.label }}
    </UiText>

    <input
      v-model="model"
      :id
      :name="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :class="$style['ui-form-input__input']"
    />

    <UiText
      v-if="errors"
      variant="underline"
      color="color-red"
      :class="$style['ui-form-input__error']"
    >
      {{ errors }}
    </UiText>
  </section>
</template>

<style module lang="scss">
.ui-form-input {
  display: flex;
  flex-direction: column;

  &__label {
    align-self: flex-start;
    margin-block-end: 0.5rem;
    cursor: pointer;
  }

  &__input {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid $color-border;
    appearance: none;
    background-clip: padding-box;

    &:focus {
      outline: 0;
      border-color: $color-border-active;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  }

  &__error {
    margin-block-start: 0.25rem;
  }
}
</style>
