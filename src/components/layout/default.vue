<template>
  <div :class="$style['layout-default']"><slot /></div>
</template>

<style module lang="scss">
.layout-default {
  min-width: 100dvw;
  min-height: 100dvh;
}
</style>
