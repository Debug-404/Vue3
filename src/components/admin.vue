<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            :ellipsis="false"
            class="el-menu-demo"
            menu-trigger="click"
            mode="horizontal"
        >
          <el-menu-item index="0">学生信息管理系统</el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="1" @click="router.push({ path: '/backstage' })"
          >返回
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-row class="row-bg" justify="center">
          <el-col :span="6">
            <div class="myDiv">
              <el-form
                  ref="ruleFormRef"
                  :label-position="labelPosition"
                  :model="data"
                  :rules="rules"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="当前密码" prop="currentPassword">
                  <el-input v-model="data.currentPassword" type="password"/>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword1">
                  <el-input v-model="data.newPassword1" type="password"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPassword2">
                  <el-input v-model="data.newPassword2" type="password"/>
                </el-form-item>
                <el-form-item>
                  <el-button
                      icon="Finished"
                      round
                      type="primary"
                      @click="submitData"
                  >确认修改
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {changePassword, login} from "../utils/http.js";
import {ElNotification} from "element-plus";

const store = useStore(); //vuex 状态
const ruleFormRef = ref();
const router = useRouter(); // 路由
const labelPosition = ref("right");
const data = ref({
  currentPassword: "",
  newPassword1: "",
  newPassword2: "",
});
//自定义校验规则
const currentPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入密码"));
  } else if (!login(store.state.user, value)["code"]) {
    callback(new Error("与当前密码不相同"));
  } else {
    callback();
  }
};
//自定义校验规则
const checkPassword1 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入密码"));
  } else if (data.value["currentPassword"] === data.value["newPassword1"]) {
    callback(new Error("新密码与旧密码一致"));
  } else {
    callback();
  }
};
//自定义校验规则
const checkPassword2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入密码"));
  } else if (data.value["newPassword1"] !== data.value["newPassword2"]) {
    callback(new Error("两次密码不相同"));
  } else {
    callback();
  }
};

//表单提交前的校验
const rules = {
  currentPassword: [
    {validator: currentPassword, required: true, trigger: "blur"},
    {min: 6, max: 20, message: "密码长度是6-20", trigger: "blur"},
  ],
  newPassword1: [
    {validator: checkPassword1, required: true, trigger: "blur"},
    {min: 6, max: 20, message: "密码长度是6-20", trigger: "blur"},
  ],
  newPassword2: [
    {validator: checkPassword2, required: true, trigger: "blur"},
    {min: 6, max: 20, message: "密码长度是6-20", trigger: "blur"},
  ],
};

//向后台提交
const submitData = () => {
  ruleFormRef.value.validate((val) => {
    if (val) {
      changePassword(store.state.user, data.value["newPassword1"])
          .then((data) => {
            if (data["code"]) {
              ElNotification({
                title: "Success",
                message: "修改成功",
                type: "success",
              });
              router.push({
                path: "/backstage",
              });
            } else {
              ElNotification({
                title: "Error",
                message: "操作失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      ElNotification({
        title: "warning",
        message: "操作失败,请重新确认",
        type: "warning",
      });
    }
  });
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.myDiv {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}

</style>
