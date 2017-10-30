module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "parser": "babel-eslint",
  // 指定代码运行环境
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "jquery": true
  },
  "rules": {
    "camelcase": [1],
    "radix": [2, "as-needed"],
    "no-empty": [2, { "allowEmptyCatch": true }],
    "no-param-reassign": [2, { "props": false }],
    "no-shadow": [1],
    "no-underscore-dangle": [0],
    "no-useless-escape": [1],
    "no-unused-expressions": [2, { "allowShortCircuit": true }],
    "no-unused-vars": [1],
    "comma-dangle": [0],
    "max-len": [0],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "react/jsx-indent": [0],
    "react/jsx-indent-props": [0],
    "react/forbid-prop-types": [1],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/react-in-jsx-scope": [0],
    "react/forbid-prop-types": [0],
    "jsx-a11y/no-static-element-interactions": [0]
  }
};
