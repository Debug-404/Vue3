<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="介绍">
        <div>
          基于vue3实现的学生信息管理系统
        </div>
      </el-collapse-item>
      <el-collapse-item name="2" title="功能1">
        <div>
          还没想好
        </div>
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