<template>
  <span>张青平</span>
  <div id="score">
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import {onMounted} from "vue";
import {selScore} from "../../utils/http.js";

onMounted(async () => {
  const data = await selScore()
  const curriculum = data["data"].map((val) => {
    return ["课程" + val["curriculum_id"]]
  })
  const dataList = data["data"].map(val =>
      val["gradeNumber"]
  )
  const Score = echarts.init(document.querySelector("#score"));
  Score.setOption({
    xAxis: {
      type: 'category',
      data: curriculum
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: dataList,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]

  })
})
</script>

<style>
#score {
  margin: 0;
  padding: 0;
  height: 90%;
}

</style>