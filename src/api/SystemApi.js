import request from "../utils/request"
import bc from "./BusinessCode"

bc.serBusinesseCode(request , bc.system_businesse_code)

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
    }
}