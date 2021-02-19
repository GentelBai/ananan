<template>
    <el-container class="is-vertical">
      <router-view name="mainHeader"/>
      <router-view name="mainBody"/>
      <router-view name="mainFooter"/>
    </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
