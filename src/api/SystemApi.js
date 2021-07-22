import request from "../utils/request"


export default{
    //获取系统信息
    getSystemInfo(){
        return request({
            url:"/admin/system",
            method:"get",
        })
    },
    //更新系统信息
    update(systemInfo){
        return request({
            url:"/admin/system",
            method:"post",
            data:systemInfo
        })
    },
    //操作日志列表分页
    logsPage(page){
        return request({
            url:"/admin/system/logsPage",
            method:"post",
            data:page
        })
    },
    //获取所以字典
    getDicts(){
        return request({
            url:"/admin/common/dict/all",
            method:"get"
        })
    }
}