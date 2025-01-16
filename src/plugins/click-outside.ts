import type { App, DirectiveBinding } from 'vue';

type ClickOutsideHandler = (event: MouseEvent) => void;

interface ElWithHandler extends HTMLElement {
  __clickOutsideHandler?: ClickOutsideHandler;
}

const ClickOutsideDirective = {
  beforeMount(el: ElWithHandler, binding: DirectiveBinding) {
    el.__clickOutsideHandler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node) && typeof binding.value === 'function') {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.__clickOutsideHandler!);
  },
  unmounted(el: ElWithHandler) {
    if (el.__clickOutsideHandler) {
      document.removeEventListener('click', el.__clickOutsideHandler);
      el.__clickOutsideHandler = undefined;
    }
  },
};

export default {
  install(app: App): void {
    app.directive('click-outside', ClickOutsideDirective);
  },
};
