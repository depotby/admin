<script setup lang="ts">
import main from '@/assets/sprites/main.svg';
import { useCssModule, computed } from 'vue';
import { useCssVariable } from '@/composables/use-css-variable.ts';
import type { Color } from '@/types/assets/colors';
import type { Icon } from '@/types/assets/icons';

const styles = useCssModule();

interface Props {
  name: Icon;
  size?: number | string;
  strokeWidth?: number | string;
  color?: Color;
  rotate?: 0 | 90 | 180 | 270 | '0' | '90' | '180' | '270';
  rotateTransition?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  size: 24,
  strokeWidth: 0,
  color: 'color-black',
  backgroundShape: 'circle',
  rotate: 0,
  rotateTransition: false,
});

const style = computed(() => ({
  color: useCssVariable(props.color).value,
  size: isNaN(+props.size) ? props.size : `${props.size}px`,
  strokeWidth: props.strokeWidth,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : 'none',
}));

const classes = computed(() => ({
  [styles['ui-icon']]: true,
  [styles['ui-icon--rotate-transition']]: props.rotateTransition,
}));
</script>

<template>
  <svg :class="classes">
    <use :xlink:href="`${main}#${props.name}`" :class="$style['ui-icon__use']" />
  </svg>
</template>

<style module lang="scss">
.ui-icon {
  width: v-bind('style.size');
  height: v-bind('style.size');
  stroke-width: v-bind('style.strokeWidth');
  color: v-bind('style.color');
  transform: v-bind('style.transform');

  &--rotate-transition {
    transition: transform $duration-medium;
  }

  &__use {
    color: $color-inherit;
  }
}
</style>
