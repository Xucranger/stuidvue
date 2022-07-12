
<template>
<div class="Hello">
 <img src="../assets/polan.png" style="margin-top:60px;">
<h1>{{ msg }} </h1>
<h2>连接测试</h2>
<el-button type="primary" @click="Scanface" style="font-size: 20px">开始注册</el-button>
  <div style="height: 900px">
    <router-view></router-view>
  </div>
</div>

</template>
<script>
export default {
name: 'hello',
data () {
  return {
    msg: '北京化工大学自助注册系统'
  }
},

  methods: {
    Scanface() {
      this.$router.push('/Scanface/Scan')
    },

  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
font-weight: normal;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
/*margin: 0 10px;*/
}
a {
color: #42b983;
}
</style>
