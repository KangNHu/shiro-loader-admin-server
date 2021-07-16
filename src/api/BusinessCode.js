/**
 * 日志业务码常量
 */
const business_code_head = "x-business-code";
//用户登录
const user_login_businesse_code =1;
//系统配置管理
const system_businesse_code = 2;



export default{
    user_login_businesse_code,
    system_businesse_code,
    /**
     * 设置业务码
     * @param {*} request 请求对象
     * @param {*} bc  业务码
     */
    serBusinesseCode(request , bc){
        request.headersCall = function(){
            let headers = {};
            headers[business_code_head] = bc;
            return headers;
        }
    }
}