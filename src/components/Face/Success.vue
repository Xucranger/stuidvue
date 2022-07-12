<template>

  <div>
    <el-container>
      <el-main style="background: #454b47" >
        <el-row :gutter="5">

          <el-col :span="18" style="background: #84cdd4;height: 650px">
            <h1 style="margin-top:50px;">成功注册</h1>
            <img src="../../assets/chenggong.png">
          </el-col>

          <el-col :span="6" style="background: #7ea5a8;height: 650px">
            <div>
              <div class="block">
                <h1 style="font-size: 25px;margin-top:50%;">页面将于{{num()}}秒后进行跳转</h1>
              </div>
              <el-button @click="jieshu">
                结束注册
              </el-button>
            </div>
          </el-col>
        </el-row>




      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Success",
  data(){
    return{
      count:"",//倒计时
    }

  },
  mounted:function () {
    this.clickJump();
  },
  methods: {
  num:function (){
    return this.count;
  },
  clickJump(){//几秒后进入跳转页面
    const timejump =3;
    if(!this.timer){
      this.count = timejump ;
      this.show = false;
      this.timer = setInterval(()=>{
        if(this.count > 0 && this.count <= timejump ){
          this.count--;
        }else{
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
//跳转的页面写在此处
          this.$router.push('/Scanface/Scan');
        }
      }, 1000)
    }
  },
    jieshu(){
      this.$router.push('/Scanface/Scan')
    },
  }
}
</script>

<style scoped>

</style>
