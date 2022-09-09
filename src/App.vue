<template>
  <router-view></router-view>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import {ElLoading} from 'element-plus'

let loadingInstance = null

const loading = ref(false)

onBeforeMount(() => {
  loadingInstance = ElLoading.service({
    text: "加载中"
  })
})

onMounted(() => {
  loadingInstance.close()
})


</script>
<style>
* {
  padding: 0;
  margin: 0;
}

html, body, #app {
  height: 100%;
}
</style>
