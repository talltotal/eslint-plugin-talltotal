# talltotal - eslint 插件



## `rules`


### `import-specifier-newline`
类似[`object-property-newline`](http://eslint.cn/docs/rules/object-property-newline)效果。


### `import-source-newline`
`from`和来源之间没有注释时，不能有空行。




## Installation
```
$ npm i eslint --save-dev
$ npm install eslint-plugin-talltotal --save-dev
```



## Usage

配置插件
```js
{
    "plugins": [
        "talltotal"
    ]
}
```

启用规则
```js
{
    "rules": {
        "talltotal/import-specifier-newline": 2,
        "talltotal/import-source-newline": 2,
    }
}
```

使用推荐配置
```js
{
    "extends": [
        "plugin:talltotal/recommended",
    ]
}
```