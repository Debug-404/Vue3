<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="介绍" name="1">
        <div>
          基于vue3实现的学生信息管理系统
        </div>
      </el-collapse-item>
      <el-collapse-item title="功能1" name="2">
        <div>
          还没想好
        </div>
      </el-collapse-item>
      <el-collapse-item title="功能2" name="3">
        <div>
          还没想好
        </div>
      </el-collapse-item>
      <el-collapse-item title="功能3" name="4">
        <div>
          还没想好
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])


</script>