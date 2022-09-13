<template>
  <div>
    <el-descriptions
        :column="3"
        border
        class="margin-top"
        size="Default"
        title="With border"
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user/>
            </el-icon>
            学号
          </div>
        </template>
        {{ route.params.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <UserFilled/>
            </el-icon>
            名字
          </div>
        </template>
        待定
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <School/>
            </el-icon>
            学院
          </div>
        </template>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div>
    <el-table :data="studentData" border="ture" height="250" stripe style="width: 100%">
      <el-table-column label="课程" prop="course" width="180"/>
      <el-table-column label="成绩" prop="score" width="180"/>
      <el-table-column label="学分" prop="Num"/>
    </el-table>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router"
import {getOneStudentScore} from "../../utils/http.js";

const route = useRoute()
let studentData = ref()

getOneStudentScore(route.params.id).then(res => {
  console.log(res["data"])
  studentData.value = res["data"].map(val => {
    return {
      course: val[3],
      score: val[2],
      Num: val[4]
    }
  })
})
</script>

<style>

</style>