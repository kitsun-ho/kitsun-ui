<script setup lang="ts">
import type { BasicShape, BasicSize, BasicType, BasicVariant, Booleanish } from '@/interface/Global';
import type { ButtonHTMLAttributes } from 'vue';

export interface Props {
  autofocus?: ButtonHTMLAttributes['autofocus']
  disabled?: ButtonHTMLAttributes['disabled']
  form?: ButtonHTMLAttributes['form']
  formaction?: ButtonHTMLAttributes['formaction']
  formenctype?: ButtonHTMLAttributes['formenctype']
  formmethod?: ButtonHTMLAttributes['formmethod']
  formnovalidate?: ButtonHTMLAttributes['formnovalidate']
  formtarget?: ButtonHTMLAttributes['formtarget']
  type?: ButtonHTMLAttributes['type'] | BasicType | string
  name?: ButtonHTMLAttributes['name']
  value?: ButtonHTMLAttributes['value']
  size?: BasicSize
  variant?: BasicVariant
  shape?: BasicShape
  ariaLabel?: Booleanish
}

export interface Emits {
  (e: 'click'): void
}

export interface ButtonConfigs {
  [key: string]: {
    border: string
    background: string
    text: string
    hoverBorder: string
    hoverBackground: string
    hoverText: string
    activeBorder: string
    activeBackground: string
    activeText: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false,
  size: 'medium',
  variant: 'default',
  shape: 'rect',
});
const emits = defineEmits<Emits>();
const slots = useSlots();

const buttonConfigs: ButtonConfigs = {
  base: {
    border: 'b-$button-main',
    background: 'bg-$button-main',
    text: 'text-white',
    hoverBorder: 'hover:b-$button-light',
    hoverBackground: 'hover:bg-$button-light',
    hoverText: 'hover:text-white',
    activeBorder: 'active:b-$button-dark',
    activeBackground: 'active:bg-$button-dark',
    activeText: 'active:text-white',
  },
  ghost: {
    border: 'b-$button-main',
    background: 'bg-transparent',
    text: 'text-$button-main',
    hoverBorder: 'hover:b-$button-light',
    hoverBackground: 'hover:bg-transparent',
    hoverText: 'hover:text-$button-light',
    activeBorder: 'active:b-$button-dark',
    activeBackground: 'active:bg-transparent',
    activeText: 'active:text-$button-dark',
  },
  text: {
    border: 'b-transparent',
    background: 'bg-transparent',
    text: 'text-$button-main',
    hoverBorder: 'hover:b-transparent',
    hoverBackground: 'hover:bg-transparent',
    hoverText: 'hover:text-$button-light',
    activeBorder: 'active:b-transparent',
    activeBackground: 'active:bg-transparent',
    activeText: 'active:text-$button-dark',
  },
};

const type = computed(() => {
  switch (props.type) {
    case 'primary':
    case 'success':
    case 'warning':
    case 'danger':
    case 'info':
    case 'default':
      return props.type;
    default:
      return CSS.supports('color', props.type) ? props.type : 'default';
  }
});

/** button class */
const buttonClass = computed(() => {
  /** button base class */
  const baseClass = 'first-letter:uppercase sibling:ml-2 cursor-pointer b-1px b-solid';

  /** button round class */
  let roundClass = 'rd-0.4rem';
  switch (props.shape) {
    case 'round':
      roundClass = 'rd-2rem';
      break;
    case 'circle':
      roundClass = 'rd-50%';
      break;
  }

  /** button size class */
  let sizeClass = '';
  switch (props.size) {
    case 'tiny':
      if (props.shape !== 'circle')
        sizeClass = 'px-0.6rem lh-1.8rem text-size-$font-size-sm';
      else
        sizeClass = 'px-0.6rem lh-1.8rem text-size-$font-size-sm';
      break;
    case 'small':
      if (props.shape !== 'circle')
        sizeClass = 'px-1rem lh-2.6rem text-size-$font-size-md';
      else
        sizeClass = 'px-1rem lh-2.6rem text-size-$font-size-md';
      break;
    case 'medium':
      if (props.shape !== 'circle')
        sizeClass = 'px-1.4rem lh-3.4rem';
      else
        sizeClass = 'px-1rem h-3.4rem w-3.4rem overflow-hidden text-ellipsis';
      break;
    case 'large':
      if (props.shape !== 'circle')
        sizeClass = 'px-1.8rem lh-3.8rem text-size-$font-size-lg';
      else
        sizeClass = 'px-1.8rem lh-3.8rem text-size-$font-size-lg';
      break;
  }

  /** button type class */
  const { base, ghost, text } = buttonConfigs;
  let config = base;
  switch (props.variant) {
    case 'ghost':
      config = ghost;
      break;
    case 'text':
      config = text;
      break;
  }

  const buttonClass = `${config.border} ${config.background} ${config.text} ${config.hoverBorder} ${config.hoverBackground} ${config.hoverText} ${config.activeBorder} ${config.activeBackground} ${config.activeText}`;
  return [baseClass, roundClass, sizeClass, buttonClass].join(' ');
});

/** button style */
const buttonStyle = computed(() => {
  switch (type.value) {
    case 'primary':
    case 'success':
    case 'warning':
    case 'danger':
    case 'info':
    case 'default': {
      const buttonMain = `--button-main: var(--${type.value});`;
      const buttonLight = `--button-light: var(--${type.value}-light);`;
      const buttonDark = `--button-dark: var(--${type.value}-dark);`;
      return [buttonMain, buttonLight, buttonDark].join(' ');
    }
    default: {
      const buttonMain = `--button-main: ${type.value};`;
      const buttonLight = `--button-light: color-mix(in srgb, ${type.value} 80%, white);`;
      const buttonDark = `--button-dark: color-mix(in srgb, ${type.value} 80%, black);`;
      return [buttonMain, buttonLight, buttonDark].join(' ');
    }
  }
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
    :value="props.value"
    :ariaLabel="ariaLabel"
    :class="buttonClass"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
