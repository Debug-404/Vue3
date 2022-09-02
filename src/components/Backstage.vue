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
import MyContent from "~/components/MyContent.vue";
import MyNav from "~/components/MyNav.vue";
import MyHeader from "~/components/MyHeader.vue";</script>

<style scoped>
#My-el-aside {
  margin-top: 10px;
}
</style>