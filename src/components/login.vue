<template>
  <el-row justify="space-between" style="min-height: 100vh; background-image: url('../public/img/01.jpg')">
    <el-col :lg="18" :md="12" class="flex items-center justify-center">
      <div>
        <div class="font-semibold text-6xl text-yellow-500 mb-4">欢迎使用</div>
        <div class="text-yellow-500">学生信息管理系统WEB页面</div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" class="flex items-center justify-center flex-col">
      <h1 class="text-gray-500 text-3xl mb-6">-账号密码登录-</h1>
      <el-form ref="ruleFormRef" :inline="false" :model="formInline" :rules="rules" class="demo-form-inline"
               label-position="left" label-width="auto"
               style="width: 300px">
        <el-form-item label="账号" prop="user">
          <el-input v-model="formInline.user" placeholder="user" prefix-icon="User"/>
        </el-form-item>
        <el-form-item label="密码" prop="region">
          <el-input v-model="formInline.region" placeholder="password" prefix-icon="Lock" show-password
                    type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" round type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row class="row-bg" justify="center"></el-row>
</template>
<script setup>
import {ref} from "vue";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {login} from "../utils/http.js";
import {setToKen} from "../utils/userCookie.js";

let router = useRouter();
const stops = useStore();
const formInline = ref({
  user: "",
  region: "",
});

//表单验证
const rules = {
  user: [
    {required: true, message: "用户名不能为空", trigger: "blur"},
    {min: 3, max: 5, message: "用户名长度是3-5", trigger: "blur"},
  ],
  region: [
    {required: true, message: "密码不能为空", trigger: "blur"},
    {min: 6, max: 20, message: "密码长度是6-20", trigger: "blur"},
  ],
};

let ruleFormRef = ref();

//登录提交表单并且设置token
const onSubmit = () => {
  ruleFormRef.value.validate((val) => {
    if (val) {
      login(formInline.value["user"], formInline.value["region"])
          .then((data) => {
            if (data["code"]) {
              stops.commit("setUser", formInline.value["user"]);
              setToKen(data["token"])
              router.push({path: "/backstage"});
              ElNotification({
                title: formInline.value["user"],
                message: data["msg"],
                type: "success",
              });
            } else {
              ElNotification({
                title: "Error",
                message: data["msg"],
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  });
};
</script>

<style scoped>

.el-main {
  --el-main-padding: 10px;
}
</style>