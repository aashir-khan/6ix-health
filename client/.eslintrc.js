module.exports = {
  plugins: ['jest'],
  extends: ['airbnb-typescript-prettier'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/no-cycle': ['off'],
    'import/prefer-default-export': 'off',
    'no-console': ['off'],
    'func-names': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  overrides: [
    {
      // due to redux-toolkit relying on immer under the hood to do mutation of passed in state
      // in reducer, turn off this eslint setting for those places
      files: ['*reducers.ts'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js'],
};
