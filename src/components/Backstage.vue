<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader/>
      </el-header>
      <el-main>
        <el-row :gutter="10" style="min-height: 100vh">
          <el-col :lg="4" :md="6">
            <MyNav/>
          </el-col>
          <el-col :lg="20" :md="18">
            <MyContent/>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import MyContent from "./MyContent.vue";
import MyNav from "./MyNav.vue";
import MyHeader from "./MyHeader.vue";</script>

<style scoped>
.el-main {
  --el-main-padding: 10px;
}
</style>