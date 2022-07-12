<template>

  <div>
    <el-container>
      <el-main style="background: #454b47" >
        <el-row :gutter="5">

          <el-col :span="18" style="background: #84cdd4;height: 650px">
            <h1 style="margin-top:50px;">请稍候</h1>
            <img src="../../assets/jiazaigif.gif">
          </el-col>

<!--          <el-col :span="6" style="background: #7ea5a8;height: 650px">-->
<!--            <div>-->
<!--              <div class="block">-->
<!--                <h1 style="font-size: 25px;margin-top:50%;">机器正在运行中...</h1>-->
<!--              </div>-->
<!--              <el-button @click="jixu">-->
<!--                下一步-->
<!--              </el-button>-->
<!--            </div>-->
<!--          </el-col>-->
        </el-row>


        <el-dialog
          title="成功注册"
          :visible.sync="visit"
          :modal-append-to-body='false'
          @close="onCancell">
          <!--width="560px"-->
          >
          <img src="../../assets/chenggong.png">
          <el-button @click="jieshu">
            结束注册
          </el-button>
        </el-dialog>


      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  name:"running",
  comments:{},
  data(){
    return{
    }

  },
  methods:{
    jixu(){
      this.$router.push('/Scanface/Success')
    },
  }
}
</script>

<style scoped>

</style>
