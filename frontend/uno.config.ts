import { defineConfig, presetUno, presetIcons, presetTypography } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetTypography(), presetIcons()],
  theme: {
    colors: {
      brand: '#6769ddff',      // Indigo
      accent: '#fd7515ff',     // Orange
      surface: '#eefcf5ff',    // Section background
    }
  }
})