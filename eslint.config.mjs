import eslint from '@eslint/js'

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**'],
  },
  eslint.configs.recommended,
]
