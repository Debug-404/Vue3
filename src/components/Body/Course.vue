<template>
  <div id="course">

  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {selectCourse} from "../../utils/http.js";
import * as echarts from "echarts";

onMounted(async () => {
  const data = await selectCourse()
  const Score = echarts.init(document.querySelector("#course"))
  Score.setOption({
    xAxis: {
      name: "课程",
      type: 'category',
      data: data["data"].map(val => {
        return val[0]
      })
    },
    yAxis: {
      name: "人数",
      type: 'value'
    },
    series: [
      {
        data: data["data"].map((val) => {
          return val[1]
        }),
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: " #79bbff"
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  })
})

</script>

<style>
#course {
  margin: 0;
  padding: 0;
  height: 400px;
  width: 70%;
}
</style>