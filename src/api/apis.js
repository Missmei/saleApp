
// 所有请求封装文件
import axios from "axios"

// 创建请求对象
let req = axios.create({
    baseURL: "http://localhost:3000",    //基本路径
    timeout: 8000  //请求10s,如果10s还没有亲求导，则提示超时！！
})

// 超时
// 封装接口
// 商家请求
export function getSeller() {
    return req.get('/api/seller')
}

// 商品请求
export function getGoods() {
    return req.get('/api/goods')
}
// 评论请求
export function getRatings() {
    return req.get('/api/ratings')
}