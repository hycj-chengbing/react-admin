import request from './axios'
import axios from 'axios';

//登录
export function reLogin(loginurl) {
    return request.post("/api/user/login",
        loginurl
    )
}
//添加用户
export function reAddUser(userUrl) {
    return request.post("/manage/user/add",
        userUrl
    )
}

//获取一级/二级分类的列表
export function reCategorys(categorysUrl) {
    return request(`/api/category/list/${categorysUrl}`,
    )
}
//根据Id获取一个分类
export function reCategory(id) {
    return request(`/api/category/findCategoryById/${id}`,
    )
}


//添加分类
export function reAddCategory(addCategoryUrl) {
    return request.post("/api/category/add",
        addCategoryUrl
    )
}

//更新分类
export function reUpdateCategory(updateCategoryUrl) {
    return request.put("/api/category/update",
        updateCategoryUrl
    )
}

// 获取商品分页列表
export function reProducts(reProductUrl) {
    return request.post("/api/products/list",
        reProductUrl
    )
}

//搜描述索商品分页
export function reSearchProductsByDesc(reSearchProductUrl) {

    const url2 = '/' + reSearchProductUrl.searchName + '/' + reSearchProductUrl.pageNum + '/' + reSearchProductUrl.pageSize

    const url = 'http://159.75.128.32:5000/api/products/searchByDesc'
    return axios.get(url + url2
    )
}

//按名称搜索商品分页
export function reSearchProductsByName(reSearchProductUrl) {
    return request.get('/api/products/searchByName', {
        params: {
            name: reSearchProductUrl.searchName,
            pageNum: reSearchProductUrl.pageNum,
            pageSize: reSearchProductUrl.pageSize
        }
    }
    )
}
// 更新商品的状态(上架/下架)
export function reUpdataStatus(id, status) {
    return request.put(`/api/products/updateStatus/${id}`,
        {
            status
        }
    )
}

//删除图片
export function reDeleteImg(filename) {
    return request.delete(`deleteFile/${filename}`
    )
}

//添加商品
export function reAddProduct(url) {
    return request.post("/api/products/addProduct",
        url
    )
}

//修改商品
export function reUpdateProduct(id, url) {
    return request.put(`/api/products/updateProduct/${id}`,
        url
    )
}
// 获取角色
export function reGetRoles() {
    return request.get('/api/role/getRoles',

    )
}

// 添加角色
export function reAddRole(roleName) {
    return request.post('/api/role/createRoleByName',
        roleName
    )
}
// 更新角色
export function reUpdataRole(id, url) {
    return request.post(`/api/role/updateRole/${id}`,
        url
    )
}

//获取用户列表
export function reGetUsers() {
    return request.get('/api/user/getUsers'
    )
}

//根据id找到角色
export function reFindRole(id) {
    return request.get(`/api/role/get/${id}`
    )
}

//获取用户列表
export function reDeleteUser(id) {
    return request.delete(`/api/user/delete/${id}`
    )
}
//添加用户
export function reAddUsers(userName) {
    return request.post('/api/user/add',
    userName
    )
}

//更新用户
export function reUpdateUser(id) {
    return request.put(`/api/user/add/${id}`
    )
}


//请求天气
export function reWeather(city) {
    const url = 'https://restapi.amap.com/v3/weather/weatherInfo'
    return axios.get(url, {
        params: {
            key: '1d6135421b13b0f3577c5046bda365ff',
            city: city
        }
    })
}



