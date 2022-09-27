<template>
  <el-menu
      :router="true"
      class="el-menu-vertical-demo"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>信息管理</span>
      </template>
      <el-menu-item-group title="学生">
        <el-menu-item index="/backstage/">基本信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="学科">
        <el-menu-item index="/backstage/course">成绩汇总</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <setting/>
        </el-icon>
        <span>账号管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/backstage/admin">修改密码</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5" @click="userQuit">退出登录</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import {Menu as IconMenu,} from '@element-plus/icons-vue';
import {removeToKen} from "../../utils/userCookie.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const userQuit = () => {
  router.push({
    path: "/",
  });
  store.commit("removeUser");
  removeToKen();
};
</script>
<style scoped>

</style>
