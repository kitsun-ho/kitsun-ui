<script setup lang="ts">
import type { BasicShape, BasicSize, BasicType, BasicVariant } from '@/interface/Global';
import BasicButton from '@/components/Basic/Button.vue';

const basicButtonList: BasicType[] = ['default', 'primary', 'success', 'warning', 'danger'];
const sizeList: BasicSize[] = ['tiny', 'small', 'medium', 'large'];
const variantList: BasicVariant[] = ['default', 'ghost', 'text'];
const shapeList: BasicShape[] = ['rect', 'round', 'circle'];
const customColorButtonList: string[] = ['pink', 'Purple', 'rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)', 'hsl(39, 100%, 50%)', 'hsla(39, 100%, 50%, 0.5)'];

const variant = ref<BasicVariant>('default');
const size = ref<BasicSize>('medium');
const shape = ref<BasicShape>('rect');
</script>

<template>
  <div class="flex flex-col w-full my-10px">
    <p class="mb-10px">
      Button
    </p>
    <div class="flex mb-10px">
      <div class="b-1px b-solid b-gray rd-0.3em mr-10px p-5px">
        <label for="size-select" class="pr-10px">
          Size:
        </label>
        <select id="size-select" v-model="size" class="outline-none pr-10px">
          <option v-for="item in sizeList" :key="`variant-select-${item}`" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="b-1px b-solid b-gray rd-0.3em mr-10px p-5px">
        <label for="variant-select" class="pr-10px">
          Variant:
        </label>
        <select id="variant-select" v-model="variant" class="outline-none pr-10px">
          <option v-for="item in variantList" :key="`variant-select-${item}`" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="b-1px b-solid b-gray rd-0.3em mr-10px p-5px">
        <label for="size-select" class="pr-10px">
          Shape:
        </label>
        <select id="size-select" v-model="shape" class="outline-none pr-10px">
          <option v-for="item in shapeList" :key="`variant-select-${item}`" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <BasicButton v-for="item in basicButtonList" :key="`basic-button-${item}`" :type="item" :size="size" :variant="variant" :shape="shape">
        {{ item }}
      </BasicButton>
    </div>
  </div>
  <div class="flex flex-col w-full my-10px">
    <p class="mb-10px">
      Custom Color Button
    </p>
    <div>
      <BasicButton v-for="item in customColorButtonList" :key="`custom-button-${item}`" :type="item">
        {{ item }}
      </BasicButton>
    </div>
  </div>
</template>
