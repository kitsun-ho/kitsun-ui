<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

type Booleanish = boolean | 'true' | 'false';
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'default';

export interface Props {
  autofocus?: ButtonHTMLAttributes['autofocus']
  disabled?: ButtonHTMLAttributes['disabled']
  form?: ButtonHTMLAttributes['form']
  formaction?: ButtonHTMLAttributes['formaction']
  formenctype?: ButtonHTMLAttributes['formenctype']
  formmethod?: ButtonHTMLAttributes['formmethod']
  formnovalidate?: ButtonHTMLAttributes['formnovalidate']
  formtarget?: ButtonHTMLAttributes['formtarget']
  type?: ButtonHTMLAttributes['type'] | ButtonType
  name?: ButtonHTMLAttributes['name']
  value?: ButtonHTMLAttributes['value']
  ariaLabel?: string
  circle?: Booleanish
  round?: Booleanish
}
interface Emits {
  (e: 'click'): void
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const slots = useSlots();

/** button type change class name */
const typeClass = computed(() => {
  const base = 'cursor-pointer b-1px b-solid hover:(text-white)';
  switch (props.type) {
    case 'primary':
      return `${base} b-$primary text-$primary-dark bg-$primary-lightest hover:(bg-$primary-lighter) active:(bg-$primary)`;
    case 'success':
      return `${base} b-$success text-$success-dark bg-$success-lightest hover:(bg-$success-lighter) active:(bg-$success)`;
    case 'warning':
      return `${base} b-$warning text-$warning-dark bg-$warning-lightest hover:(bg-$warning-lighter) active:(bg-$warning)`;
    case 'danger':
      return `${base} b-$danger text-$danger-dark bg-$danger-lightest hover:(bg-$danger-lighter) active:(bg-$danger)`;
    default:
      return `${base} b-$default text-$default-dark bg-$default-lightest hover:(bg-$default-lighter) active:(bg-$default)`;
  }
});

/** button type Format */
const type = computed(() => {
  switch (props.type) {
    case 'primary':
    case 'success':
    case 'warning':
    case 'danger':
    case 'default':
      return undefined;
    default:
      return props.type;
  }
});

/** button class name format */
const buttonClass = computed(() => {
  const basic = 'px-4 py-2 first-letter:uppercase sibling:ml-2';
  return [
    basic,
    typeClass.value,
    props.circle ? 'rd-1.5em' : props.round ? 'rd-1.5em' : 'rd-md',
  ].join(' ');
});

/** button aria-label format */
const ariaLabel = computed(() => {
  if (props.ariaLabel)
    return props.ariaLabel;

  if (slots.default)
    return slots.default({})[0].children as string;

  return '';
});

/** button click event */
function handleClick() {
  emits('click');
}
</script>

<template>
  <button
    :autofocus="props.autofocus"
    :disabled="props.disabled"
    :form="props.form"
    :formaction="props.formaction"
    :formenctype="props.formenctype"
    :formmethod="props.formmethod"
    :formnovalidate="props.formnovalidate"
    :formtarget="props.formtarget"
    :name="props.name"
    :type="type"
    :value="props.value"
    :circle="props.circle"
    :round="props.round"
    :ariaLabel="ariaLabel"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="postcss" scoped>

</style>
