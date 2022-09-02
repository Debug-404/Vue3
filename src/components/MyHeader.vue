<template>
  <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu-demo"
      menu-trigger="click"
      mode="horizontal"
  >
    <el-menu-item index="0">学生信息管理系统</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item index="1" @click="handleSelect">{{
        adminiName
      }}
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>设置</template>
      <el-menu-item index="2-1" @click="Modify">修改密码</el-menu-item>
      <el-menu-item index="2-2">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from 'vuex'

const router = useRouter();
const store = useStore()
const activeIndex = ref("1");
let adminiName = ref(`管理员${store.state.user}`);
const handleSelect = () => {
  alert("欢迎使用学生信息管理系统");
};
const Modify = () => {
  router.push({
    path: "/backstage/admin",
  });
};
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>