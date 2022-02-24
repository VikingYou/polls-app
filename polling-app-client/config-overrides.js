const {override, fixBabelImports, addLessLoader} = require('customize-cra');
const rewireLess = require('react-app-rewire-less');

module.exports = override(
    fixBabelImports("babel-plugin-import", {
        libraryName: "antd-mobile",
        style: true
    }),
    addLessLoader({
        ident: 'postcss'
    })
);
