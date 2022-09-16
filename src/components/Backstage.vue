<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader/>
      </el-header>
      <el-main>
        <el-row style="height: 100%">
          <el-col :lg="4" :md="6">
            <MyNav/>
          </el-col>
          <el-col :lg="20" :md="18">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import MyNav from "./Body/Nav.vue";
import MyHeader from "./Body/Header.vue";</script>

<style scoped>
.el-main {
  --el-main-padding: 10px;
}

</style>
