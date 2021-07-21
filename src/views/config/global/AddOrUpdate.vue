<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 全局元数据管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ titleDescribe }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="230px" :rules="rules" >
          <el-form-item label="租户Id" prop="tenantId">
            <el-input autosize placeholder="请输入租户Id" v-model="form.tenantId" :disabled="islook"/>
          </el-form-item>
          <el-form-item label="是否开启鉴权">
            <el-switch
              v-model="form.enableAuthentication"
              active-value="0"
              inactive-value="1"
              active-text="关闭"
              inactive-text="开启"
              :disabled="islook"
            />
          </el-form-item>
          <el-form-item label="是否开启授权">
            <el-switch
              v-model="form.enableAuthorization"
              active-value="0"
              inactive-value="1"
              active-text="关闭"
              inactive-text="开启"
              :disabled="islook"
            />
          </el-form-item>
          <el-form-item label="接口白名单">
            <el-scrollbar  height="10px"  wrap-style=" max-height: 220px" >
               <el-space
                v-for="(anon, index) in form.anons"
                :key="index"
                wrap
              >
              <el-input style="width:230px" v-model="form.anons[index]" placeholder="请输入白名单规则" :disabled="islook"/>
              <el-button
                  @click="addLine('anons')"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  v-if="!islook"
                ></el-button>
                <el-button
                  v-if="index > 0 &!islook"
                  @click="delLine(index,'anons')"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
               </el-space>
            </el-scrollbar> 
          </el-form-item>
          <el-form-item label="扩展字段" >
            <el-scrollbar height="10px" wrap-style=" max-height: 220px" >
              <el-space
                v-for="(extendFilde, index) in form.extend"
                :key="index"
                wrap
              >
                <el-input
                  style="width: 100px"
                  autosize
                  v-model="form.extend[index].key"
                  placeholder="key"
                  :disabled="islook"
                />
                <span>：</span>
                <el-input
                  style="width: 100px"
                  autosize
                  v-model="form.extend[index].value"
                  placeholder="vlaue"
                  :disabled="islook"
                />
                <el-button
                  @click="addLine('extend')"
                  type="primary"
                  icon="el-icon-edit"
                  v-if="!islook"
                  circle
                ></el-button>
                <el-button
                  v-if="index > 0 & !islook"
                  @click="delLine(index,'extend')"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-space>
            </el-scrollbar>
          </el-form-item>
          <el-form-item>
            <el-button  v-if="!islook" type="primary" @click="onSubmit">表单提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ca from "../../../api/ConfigApi";
import ou from "../../../utils/ObjectUtils"
export default {
  data() {
    return {
      form: {
        id: '',
        tenantId: "",
        enableAuthentication: 1,
        enableAuthorization: 1,
        anons: [""],
        extend: [
          {
            key: "",
            value: "",
          },
        ],
      },
      rules: {
        tenantId: [
          { required: true, message: "租户ID不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // 1 为新增 2为更新 3 查看
    if (this.action != 1) {
      this.getData();
    }
  },
  computed: {
    action() {
      return this.$route.params.action;
    },
    id() {
      return this.$route.params.id;
    },
    //是否查看操作
    islook(){
      return this.$route.params.action == 3;
    }
  },
  methods: {
    //详情 获取系统配置信息
    getData() {
      ca.getGlobal(this.id).then((global) => {
        if (global) {
          if (global.anons) {
            global.anons = global.anons.split(",");
          }else if(!this.islook){
            global.anons=[""]
          }
          if (global.extend) {
            let extend = [];
            let i = 0;
            for (let key in global.extend) {
              extend[i] = {
                key: key,
                value: global.extend[key],
              };
              i++;
            }
            global.extend = extend;
          }
          //如果没有则初始化一个
          if((!global.extend || global.extend.length == 0)&&!this.islook){
                global.extend = [{
                  key:"",
                  value:""
                }];
          }
          this.form = global;
        }
      });
    },
    //添加一行
    delLine(index,filed){
        if(filed === "anons"){
          this.form.anons.splice(index,1)
        }else{
          this.form.extend.splice(index,1);
        }
    },
    //删除一行
    addLine(filed){
      if(filed === "anons"){
          this.form.anons.push("")
        }else{
          this.form.extend.push({key:"",value:""});
        }
    },
    //关闭当前窗口
    cancel(){
        this.$store.commit("closeCurrentTag",this);
        this.$store.push("/globalMetadata");
    },
    //提交
    onSubmit() {
      console.log(this.form.extend);
      this.$refs.form.validate((vali) => {
        if (vali) {
          let global =ou.copyObject(this.form , (key , value) =>{
                  if(key === 'anons'){
                     return value.join(",");
                  }
                  if(key === 'extend'){
                    let extend = {};
                    value.forEach(item => {extend[item.key] = item.value})
                    return extend;
                  }
                  return value;
              }
          )
          //新增
          if(this.action == 1){
              ca.addGlobal(global).then(() => {
                this.$message.success("新增成功");
                this.$router.push("/globalMetadata")
              });
          }
          //编辑
          else if(this.action == 2){
              ca.updateGlobal(global).then(() => {
                this.$message.success("编辑成功");
                this.$router.push("/globalMetadata")
              });
          }
        }
      });
    },
    //处理计数器事件
    // name 字段名称
    // value 变更后的值
    handleChange(name, value) {
      console.log(name, value);
    },
  },
};
</script>
<style scoped>

</style>