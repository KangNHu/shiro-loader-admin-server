import request from "../utils/request"

export default{
    //全局元信息分页查询
    globalPage(pageRequest){
        return request({
            url:"/admin/config/global/page",
            method:"post",
            data:pageRequest
        })
    },
    //新增全局元信息
    addGlobal(global){
        return request({
            url:"/admin/config/global",
            method:"post",
            data:global
        })
    },
    //全局元信息详情
    getGlobal(id){
        return request({
            url:"/admin/config/global",
            method:"get",
            params:{id:id}
        })
    },
    //全局元信息删除
    deleteGlobal(id){
        return request({
            url:"/admin/config/global",
            method:"delete",
            params:{id:id}
        })
    },
    //全局元信息删除
    updateGlobal(global){
        return request({
            url:"/admin/config/global",
            method:"put",
            data:global
        })
    }
}