<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useCssVariable } from '@/composables/use-css-variable.ts';
import type { Color } from '@/types/assets/colors';

const styles = useCssModule();

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'regular' | 'lead' | 'underline';
  tag?: 'div' | 'label';
  color?: Color;
  align?: 'start' | 'center' | 'end';
  breakWord?: boolean;
  fontWeight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'regular',
  color: 'color-black',
  align: 'start',
  breakWord: false,
});

const computedComponent = computed(
  () =>
    props.tag ??
    (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(props.variant) ? props.variant : 'div'),
);

const computedClasses = computed(() => ({
  [styles['ui-text']]: true,
  [styles[`ui-text--variant-${props.variant}`]]: props.variant,
  [styles[`ui-text--align-${props.align}`]]: props.align,
  [styles['ui-text--break-word']]: props.breakWord,
}));

const computedStyles = computed(() => ({
  color: useCssVariable(props.color).value,
}));
</script>

<template>
  <component :is="computedComponent" :class="computedClasses">
    <div v-if="$slots['start']">
      <slot name="start" />
    </div>

    <div :class="$style['ui-text__content']" :style="{ fontWeight: props.fontWeight }">
      <slot />
    </div>

    <div v-if="$slots['end']">
      <slot name="end" />
    </div>
  </component>
</template>

<style module lang="scss">
.ui-text {
  $component-class: &;

  gap: 0.25rem;
  color: v-bind('computedStyles.color');

  &,
  & > * {
    display: flex;
    align-items: center;
  }

  &--variant {
    &-h1,
    &-h2,
    &-h3,
    &-h4,
    &-h5,
    &-h6 {
      font-weight: 600;
    }

    &-h1 {
      font-size: calc(1.375rem + 1.5vw);
    }

    &-h2 {
      font-size: calc(1.325rem + 0.9vw);
    }

    &-h3 {
      font-size: calc(1.3rem + 0.6vw);
    }

    &-h4 {
      font-size: calc(1.275rem + 0.3vw);
    }

    &-h5 {
      font-size: 1.25rem;
    }

    &-h6 {
      font-size: 1rem;
    }

    &-regular {
      font-size: 1rem;
    }

    &-lead {
      font-size: 1.25rem;
      font-weight: 300;
    }

    &-underline {
      font-size: 0.875em;
    }
  }

  &--align {
    &-start {
      justify-content: flex-start;
      text-align: start;
    }

    &-center {
      justify-content: center;
      text-align: center;
    }

    &-end {
      justify-content: flex-end;
      text-align: end;
    }
  }

  &--break-word {
    #{$component-class} {
      &__content {
        word-break: break-all;
      }
    }
  }
}
</style>
