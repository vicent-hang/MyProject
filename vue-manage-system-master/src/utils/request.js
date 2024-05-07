import axios from 'axios';

const service = axios.create({
    baseURL: "/trans",
    timeout: 5000
});

// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );


// 2. 请求拦截器

service.interceptors.request.use(config => {
    // 应用实例 向header中自动添加token
    const token = localStorage.getItem("token")
    // console.log(token);
    if (token) {
        config.headers['token'] = token
        config.headers.platform = 'H5'
    }

    return config;
    
}, error => {
    Promise.reject(error);
});

// 3. 响应拦截器
service.interceptors.response.use(response => {
    //返回请求值的data
    return response.data;
})

export default service;
