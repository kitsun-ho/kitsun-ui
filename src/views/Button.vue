<script setup lang="ts">
import type { Props as ButtonProps } from '@/components/Basic/Button.vue';

const basicButtonList: ButtonProps[] = [
  { type: 'default' },
  { type: 'primary' },
  { type: 'success' },
  { type: 'warning' },
  { type: 'danger' },
];
</script>

<template>
  <div class="flex flex-col w-full my-10px">
    <p class="mb-10px">
      Basic Button
    </p>
    <div>
      <BasicButton v-for="item in basicButtonList" :key="`basic-button-${item.type}`" :type="item.type">
        {{ item.type }}
      </BasicButton>
    </div>
  </div>
  <div class="flex flex-col w-full my-10px">
    <p class="mb-10px">
      Round Button
    </p>
    <div>
      <BasicButton v-for="item in basicButtonList" :key="`basic-button-${item.type}`" :type="item.type" round>
        {{ item.type }}
      </BasicButton>
    </div>
  </div>
  <div class="flex flex-col w-full my-10px">
    <p class="mb-10px">
      Circle Button
    </p>
    <div>
      <BasicButton v-for="item in basicButtonList" :key="`basic-button-${item.type}`" :type="item.type" circle>
        {{ item.type?.slice(0, 1) }}
      </BasicButton>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
