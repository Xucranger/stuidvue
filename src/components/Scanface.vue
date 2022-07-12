<template>

  <div id="hoho">
    <el-container>
      <el-header  height="150px"  >
        <img src="../assets/polan.png" style="float:left;margin-top:10px">
        <el-button
          @click="Ero"
          icon="el-icon-warning"
          type="warning"
          size="medium"
          style="float: right;margin-top:30px;font-size: 20px"
        >
          紧急停止
        </el-button>
        <h1 style="margin-right: auto;margin-left: auto;font-size: 50px;color:#2598ff" >欢迎使用北京化工大学自助注册系统</h1>

      </el-header>
    </el-container>
    <router-view> </router-view>
  </div>

</template>

<script>
export default {
  name: "Scanface"
}
</script>


<style scoped>
 .mytable >>> .el-table__row>td{
   border: none;
   background-color: transparent;
 }
.mytable::before {
  height: 0px;
  background-color: transparent;
}
.el-table,.el-table__expanded-cell{
  background-color: transparent;
}
.el-table th,
.el-table tr,
.el-table td{
  background-color: transparent;
}
.canvas {
  border: 1px solid #e8e8e8;
  border-radius: 100%;
  margin-top:50px;
}
h1 {

}
#hoho{
  background:url("../assets/hua.png");
  width:100%;
  heigth:100%;
  position:fixed;
  background-size: 100% 100%;
}

</style>
