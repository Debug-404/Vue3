<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :ellipsis="false" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="0">管理系统</el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="1">请登录</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple-light"/>
            <el-form
                ref="ruleFormRef"
                :inline="false"
                :model="formInline"
                :rules="rules"
                class="demo-form-inline"
                style="width: 300px"
            >
              <el-form-item label="账号" prop="user">
                <el-input v-model="formInline.user" placeholder="user"/>
              </el-form-item>
              <el-form-item label="密码" prop="region">
                <el-input
                    v-model="formInline.region"
                    placeholder="password"
                    show-password
                    type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button round type="primary" @click="onSubmit"
                >登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="row-bg" justify="center"></el-row>
      </el-main>
    </el-container>
  </div>
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
.flex-grow {
  flex-grow: 1;
}
</style>