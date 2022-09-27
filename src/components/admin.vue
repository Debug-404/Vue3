<template>
  <div class="myDiv">
    <el-form
        ref="ruleFormRef"
        :model="data"
        :rules="rules"
        :status-icon="true"
        label-position="right"
        label-width="auto"
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
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {changePassword, login} from "../utils/api.js";
import {ElNotification} from "element-plus";

const store = useStore(); //vuex 状态
const ruleFormRef = ref();
const router = useRouter(); // 路由
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

.myDiv {
  width: 300px;
  padding: 20px;
}

</style>
