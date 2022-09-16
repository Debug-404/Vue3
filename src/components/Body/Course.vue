<template>
  <!--  <div id="course"></div>-->
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
import {getAllCourse} from "../../utils/http.js";
import {useRouter} from "vue-router";
//import * as echarts from "echarts";

// onMounted(async () => {
//   const data = await getAllCourse();
//   const Score = echarts.init(document.querySelector("#course"));
//   Score.setOption({
//     xAxis: {
//       name: "课程",
//       type: "category",
//       data: data["data"].map((val) => {
//         return val[0];
//       }),
//     },
//     yAxis: {
//       name: "人数",
//       type: "value",
//     },
//     series: [
//       {
//         data: data["data"].map((val) => {
//           return val[1];
//         }),
//         type: "bar",
//         showBackground: true,
//         itemStyle: {
//           color: " #79bbff",
//         },
//         backgroundStyle: {
//           color: "rgba(180, 180, 180, 0.2)",
//         },
//       },
//     ],
//   });
// });
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
