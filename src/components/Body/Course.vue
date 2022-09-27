<template>
  <div style="display: flex">
    <div style="flex: 2">
      <el-table :data="AllCourseData" style="width: 100%" @cell-click="goCourse">
        <el-table-column label="课程名字" prop="name" width="180"/>
        <el-table-column label="课程编号" prop="id" width="180"/>
        <el-table-column label="人数" prop="Num"/>
      </el-table>
    </div>
    <div style="flex: 3">
    </div>
  </div>


</template>

<script setup>
import {onMounted, ref} from "vue";
import {getAllCourse} from "../../utils/api.js";
import {useRouter} from "vue-router";

let AllCourseData = ref()
const router = useRouter();
onMounted(async () => {
  const data = await getAllCourse();
  AllCourseData.value = data["data"].map(val => {
    return {
      name: val[0],
      id: val[1],
      Num: val[2]
    }
  })
})
const goCourse = (row) => {
  router.push({
    name: "courseScore",
    params: {
      id: row.id,
    },
  })
}
</script>

<style scoped>
</style>
