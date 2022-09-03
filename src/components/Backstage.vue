<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader/>
      </el-header>
      <el-container>
        <el-aside id="My-el-aside" width="200px">
          <MyNav/>
        </el-aside>
        <el-main>
          <MyContent/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MyContent from "./MyContent.vue";
import MyNav from "./MyNav.vue";
import MyHeader from "./MyHeader.vue";
</script>

<style scoped>
#My-el-aside {
  margin-top: 10px;
}
</style>