/**
 * @author yangling
 * @date 2021/12/10 9:05 AM
 */
module.exports = {
    publicPath : "./",
    devServer : {
        port : 9999,
        host : "localhost",
        https : false,
        open : true,
        proxy : {
            [process.env.VUE_APP_BASE_API]: {
                target : "http://demonuxtapi.dishait.cn",
                changeOrigin : true,
                pathRewrite : {
                    ["^" + process.env.VUE_APP_BASE_API] : ""
                }
            }
        }
    },
    lintOnSave : false
}