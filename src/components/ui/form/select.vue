<script setup lang="ts">
import { ref, computed, useId, useTemplateRef, useCssModule } from 'vue';
import UiText from '@/components/ui/text.vue';
import UiIcon from '@/components/ui/icon.vue';

export interface UiFormSelectItem {
  name: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    items: UiFormSelectItem[];
    label?: string;
    error?: string | string[];
    multiple?: boolean;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    multiple: false,
    loading: false,
    disabled: false,
  },
);

const emits = defineEmits<{
  switchSelection: [value: string];
}>();

const styles = useCssModule();
const input = useTemplateRef('input');
const id = useId();
const open = ref(false);

const model = defineModel<string | string[]>({ required: true });

const componentClasses = computed(() => ({
  [styles['ui-form-select']]: true,
  [styles['ui-form-select--loading']]: props.loading,
}));
const preparedItems = computed(() =>
  props.items.map((item) => ({
    ...item,
    active:
      typeof model.value === 'string'
        ? model.value === item.value
        : model.value.includes(item.value),
  })),
);
const inputString = computed(() =>
  preparedItems.value
    .filter((item) => item.active)
    .map((item) => item.name)
    .join(', '),
);
const errors = computed(() => (Array.isArray(props.error) ? props.error.join(', ') : props.error));

const switchOpen = (state?: boolean) => {
  if (props.disabled) return;

  open.value = state ?? !open.value;
};

const handleChevronClick = () => {
  if (!open.value) input.value?.focus();
  switchOpen();
};

const selectItem = (item: UiFormSelectItem) => {
  if (props.multiple) {
    if (!Array.isArray(model.value)) model.value = [];

    const index = model.value.indexOf(item.value);

    if (index > -1) {
      model.value = model.value.filter((_, i) => index !== i);
    } else {
      model.value = [...model.value, item.value];
    }

    emits('switchSelection', item.value);
  } else {
    model.value = item.value;

    if (!props.multiple) open.value = false;
  }
};
</script>

<template>
  <section :class="componentClasses">
    <UiText v-if="props.label" tag="label" :for="id" :class="$style['ui-form-select__label']">
      {{ props.label }}
    </UiText>

    <div v-click-outside="() => switchOpen(false)" :class="$style['ui-form-select__field']">
      <input
        :value="inputString"
        ref="input"
        :id
        :disabled="props.disabled"
        type="text"
        readonly
        :class="$style['ui-form-select__field__input']"
        @click="() => switchOpen()"
      />

      <UiIcon
        name="chevron-left-rounded"
        :rotate="open ? 90 : 270"
        color="color-gray"
        rotate-transition
        :class="$style['ui-form-select__field__arrow']"
        @click="handleChevronClick"
      />

      <Transition
        :enter-active-class="$style['appear-enter-active']"
        :leave-active-class="$style['appear-leave-active']"
        :enter-from-class="$style['appear-enter-from']"
        :leave-to-class="$style['appear-leave-to']"
      >
        <ul v-show="open && !props.disabled" :class="$style['ui-form-select__field__list']">
          <li
            v-for="item in preparedItems"
            :key="item.value"
            :class="$style['ui-form-select__field__list__item']"
            @click="() => selectItem(item)"
          >
            <div :class="$style['ui-form-select__field__list__item__checkbox']">
              <UiIcon v-if="item.active" name="check-rounded" size="1rem" stroke-width="1" />
            </div>

            {{ item.name }}
          </li>
        </ul>
      </Transition>
    </div>

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
.ui-form-select {
  $component-class: &;

  position: relative;

  &__label {
    align-self: flex-start;
    margin-block-end: 0.5rem;
    cursor: pointer;
  }

  &__field {
    position: relative;

    &__input,
    &__arrow {
      cursor: pointer;
    }

    &__input {
      width: 100%;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 1rem;
      line-height: 1.5;
      border: 1px solid $color-border;
      background: $color-white;
      appearance: none;
      background-clip: padding-box;

      &:focus {
        outline: 0;
        border-color: $color-border-active;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      }
    }

    &__arrow {
      position: absolute;
      inset-block-start: 0.5rem;
      inset-inline-end: 0.5rem;
    }

    &__list {
      position: absolute;
      inset-block-start: calc(100% + 0.375rem);
      inset-inline-start: 0;
      width: 100%;
      padding-inline-start: 0;
      border-radius: 0.375rem;
      border: 1px solid $color-border;
      list-style: none;
      user-select: none;
      background: $color-white;

      &__item {
        padding: 0.375rem 0.75rem;
        gap: 0.5rem;
        cursor: pointer;
        transition: background-color $duration-medium ease-in-out;

        &,
        &__checkbox {
          display: flex;
          align-items: center;
        }

        &:hover {
          background-color: $color-border;
        }

        &:not(:last-of-type) {
          border-block-end: 1px solid $color-border;
        }

        &__checkbox {
          width: 1rem;
        }
      }
    }
  }

  &__error {
    margin-block-start: 0.25rem;
  }

  &--loading {
    #{$component-class} {
      &__field {
        &__input {
          pointer-events: all;
        }

        &__list {
          pointer-events: none;
          filter: opacity(75%);
        }
      }
    }
  }

  .appear {
    &-enter-active,
    &-leave-active {
      transition: opacity $duration-medium ease-in-out;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
