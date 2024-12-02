<template>
  <div :class="$style['layout-authentication']">
    <div>
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
.layout-authentication {
  min-width: 100dvw;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
