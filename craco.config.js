// 自定义主题
const CracoLessPlugin = require('craco-less');
// 配置别名
const path=require("path")
const resolve =dir =>path.resolve(__dirname,dir);
console.log(resolve("src"));
// 路径拼接
module.exports={
    webpack:{// 配置别名
        alias:{
            "@":resolve("src"),//  /src
            "components":resolve("src/components") //  /src/components
        }
    },
    plugins: [// 自定义主题
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: { '@primary-color': '#1DA57A' },
                javascriptEnabled: true,
              },
            },
          },
        },
    ],
}
