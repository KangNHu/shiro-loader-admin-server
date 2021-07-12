import request from '../utils/request';

export default{
    getPageList(query){
       return  request({
            url: '/admin/user/page',
            method: 'post',
            data: query
        });
    },
    getCurrentUser(){
        return request({
            url:"/admin/user/userInfo",
            method:"get"
        })
    },
    login(userInfo){
        return request(
            {
                url:'/login',
                method:'post',
                data:userInfo
            }
        )
    }
}
