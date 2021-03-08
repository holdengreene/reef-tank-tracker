<template>
  <li class="flex w-full justify-center">
    <a
      :href="link"
      class="flex flex-col justify-center items-center pt-2 pb-1 w-full h-full"
    >
      <slot></slot>
      <span class="block text-xs">{{ name }}</span>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '/',
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>
