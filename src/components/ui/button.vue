<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { RouterLink } from 'vue-router';
import UiIcon from '@/components/ui/icon.vue';
import type { ElementColor } from '@/types/assets/colors';

const styles = useCssModule();

interface Props {
  variant?: 'default' | 'outlined' | 'text';
  color?: ElementColor;
  size?: 'small' | 'small-compact' | 'medium' | 'medium-compact' | 'large' | 'large-compact';
  to?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  color: 'color-blue',
  size: 'medium',
  loading: false,
  disabled: false,
});

const style = computed(() => ({
  color: `var(--color-white)`,
  background: `var(--${props.color})`,
  hover: `var(--${props.color}-hover)`,
  active: `var(--${props.color}-active)`,
}));

const componentTag = computed(() => (props.to ? RouterLink : 'button'));

const componentClasses = computed(() => ({
  [styles['ui-button']]: true,
  [styles[`ui-button--variant-${props.variant}`]]: props.variant,
  [styles[`ui-button--size-${props.size}`]]: props.size,
  [styles['ui-button--disabled']]: props.disabled,
}));
</script>

<template>
  <component
    :is="componentTag"
    :to="props.to"
    :target="props.target"
    :type="componentTag === 'button' ? props.type : undefined"
    :class="componentClasses"
  >
    <UiIcon
      v-if="props.loading"
      name="loading"
      size="1.1em"
      color="color-inherit"
      :class="animations.spinner"
    />

    <slot v-else />
  </component>
</template>

<style module="animations" src="@/assets/styles/modules/animations.scss" />

<style module lang="scss">
.ui-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  cursor: pointer;
  padding: var(--padding-block) var(--padding-inline);
  font-size: var(--font-size);
  border-radius: var(--border-radius);
  transition-property: color, background-color, border-color;
  transition-duration: $duration-medium;
  transition-timing-function: ease-in-out;

  &--variant {
    &-default {
      color: v-bind('style.color');
      background-color: v-bind('style.background');
      border-color: v-bind('style.background');

      &:hover {
        background-color: v-bind('style.hover');
        border-color: v-bind('style.hover');
      }

      &:active {
        background-color: v-bind('style.active');
        border-color: v-bind('style.active');
      }
    }

    &-outlined {
      color: v-bind('style.background');
      background-color: $color-transparent;
      border-color: v-bind('style.background');

      &:hover {
        color: v-bind('style.color');
        background-color: v-bind('style.hover');
        border-color: v-bind('style.hover');
      }

      &:active {
        background-color: v-bind('style.active');
        border-color: v-bind('style.active');
      }
    }

    &-text {
      background: $color-transparent;
      border-color: $color-transparent;
      color: v-bind('style.background');
      font-weight: 700;

      &:hover {
        color: v-bind('style.hover');
      }

      &:active {
        color: v-bind('style.active');
      }
    }
  }

  &--size {
    &-small {
      &,
      &-compact {
        --padding-block: 0.25rem;
        --font-size: 0.875rem;
        --border-radius: 0.25rem;
      }

      & {
        --padding-inline: 0.5rem;
      }

      &-compact {
        --padding-inline: 0.25rem;
      }
    }

    &-medium {
      &,
      &-compact {
        --padding-block: 0.375rem;
        --font-size: 1rem;
        --border-radius: 0.375rem;
      }

      & {
        --padding-inline: 0.75rem;
      }

      &-compact {
        --padding-inline: 0.375rem;
      }
    }

    &-large {
      &,
      &-compact {
        --padding-block: 0.5rem;
        --font-size: 1.25rem;
        --border-radius: 0.5rem;
      }

      & {
        --padding-inline: 1rem;
      }

      &-compact {
        --padding-inline: 0.5rem;
      }
    }
  }

  &:disabled,
  &--disabled {
    pointer-events: none;
    filter: opacity(0.5);
  }
}
</style>
