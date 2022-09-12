<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="介绍">
        <div>
          基于vue3实现的学生信息管理系统
        </div>
      </el-collapse-item>
      <el-collapse-item name="2" title="功能1">
        <el-link type="primary">
          <router-link to="/backstage/">信息</router-link>
        </el-link>
        <br>
        <el-link type="primary">
          <router-link to="/backstage/score">成绩</router-link>
        </el-link>
      </el-collapse-item>
      <el-collapse-item name="3" title="功能2">
        <div>
          还没想好
        </div>
      </el-collapse-item>
      <el-collapse-item name="4" title="功能3">
        <div>
          还没想好
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const activeNames = ref(['1'])


</script>
<style scoped>
.el-link {
  margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>