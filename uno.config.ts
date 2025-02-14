import presetRemToPx from '@unocss/preset-rem-to-px';
import { defineConfig, presetIcons, presetMini, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetMini(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 10,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
