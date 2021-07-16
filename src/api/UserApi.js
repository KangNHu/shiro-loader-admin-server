import request from '../utils/request';
import bc from "./BusinessCode"
import userutil from "../utils/userUtils"
bc.serBusinesseCode(request , bc.user_login_businesse_code);
//设置用户管理的业务码
export default{
    //用户管理列表
    getPageList(query){
       return  request({
            url: '/admin/user/page',
            method: 'post',
            data: query
        });
    },
    //用户管理详情
    get(id){
        return request({
            url:"/admin/user",
            method:"get",
            params:{userId:id}
        })
    },
    //用户新增
    add(user){
        return request({
            url:"/admin/user",
            method:"post",
            data:user
        })
    },
    //用户更新
    update(user){
        return request({
            url:"/admin/user",
            method:"put",
            data:user
        })
    },
    //删除用户
    delete(userId){
        return request({
            url:"/admin/user",
            method:"delete",
            params:{userId:userId}
        })
    },
    //修改当前用户密码
    updatePassword(passwordInfo){
        //设置当前用户id
        passwordInfo.userId = userutil.getCurrentUserId()
        return request({
            url:"/admin/user/updatePassword",
            method:"put",
            data:passwordInfo
        })
    },
    //获取当前用户信息
    getCurrentUser(){
        return request({
            url:"/admin/user/userInfo",
            method:"get"
        })
    },
    //登录
    login(userInfo){
        return request(
            {
                url:'/login',
                method:'post',
                data:userInfo
            }
        )
    },
    //获取当前用户的登录日志
    getCurrentUserloginLog(page){
        return request({
            url:"/admin/user/getCurrentUserLogs",
            method:"post",
            data:page
        })
    }
}
