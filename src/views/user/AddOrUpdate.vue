<template>
    <el-dialog :title="titleDescribe" :value="open" fullscreen ="treu" modal = "true" modal-append-to-body = "treu" @open = "initData">
        <el-form
          :disabled="islook"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="用户昵称">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item v-show="isShowPassword" label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="islook" type="primary" @click="onSubmit"
              >表单提交</el-button
            >
            <el-button @click="open = false">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import userApi from "../../api/UserApi";
export default {
  data() {
    return {
      form: {
        nickname: "",
        username: "",
        password: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: [],
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请求输入昵称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    islook() {
      return this.actionSate === 1;
    },
    isShowPassword() {
      return this.actionSate === 1;
    },
  },
  // 1 新增 2 查看 3 更新
  props: ["actionSate","titleDescribe","open"],
  methods: {
    onSubmit() {
      this.$message.success("提交成功！");
    },
    //初始化表达数据
    initData() {
      //如果是查看或更新
      if (this.actionSate == 2 || this.actionSate == 3) {
        userApi.get().then((user) => {
          if (user) {
            this.form.username = user.username;
            this.form.nickname = user.nickname;
          }
        });
      }
    },
  },
};
</script>