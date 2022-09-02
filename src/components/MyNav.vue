<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="介绍" name="1">
        <div>
          基于vue3实现的学生信息管理系统
        </div>
      </el-collapse-item>
      <el-collapse-item title="技术储备" name="2">
        <div>
          技术栈:HTML5,CSS3,JavaScript,
          <br>python,MySQL;
        </div>
      </el-collapse-item>
      <el-collapse-item title="框架" name="3">
        <div>
          Vue3,Vue router,axiso,element-ui,Flask;
        </div>
      </el-collapse-item>
      <el-collapse-item title="制作者" name="4">
        <div>
          20计科张寒
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])


</script>