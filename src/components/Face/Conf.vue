<template>
<div>
  <el-container>
    <el-main style="background: #454b47" >
      <el-row :gutter="5">
        <el-col :span="18" style="background: #84cdd4;height: 650px">
          <div>
            <h1>请确认您的个人信息,若信息有误请重新认证</h1>
            <el-button @click="restart" type="warning" style="margin-top: 20px; font-size: 30px" >重新认证</el-button>
            <el-row :gutter="5" style="margin-top: 30px">
              <el-col :span="14">
                <el-table :data="this.getValues()" style="width: 70%;float: right ; border: 2px black;" :show-header="false" class="mytable">
                  <el-table-column
                    v-for="(item, index) in this.getHeaders()"
                    :key="index"
                    :prop="item"
                  >
                  </el-table-column>
<!--                  <el-table-column prop="name" align="center"></el-table-column>-->
<!--                  <el-table-column prop="info" align="left"></el-table-column>-->
                </el-table>
              </el-col>
              <el-col :span="10" style="height: 450px">
                <div style="display: flex" >
                  <img src="../../assets/stupic.png" alt="" width="40%" style="margin-right: 40px;border-style: solid;border-width: 5px;border-color: #42b983" >
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" style="background: #7ea5a8;height: 650px">
          <div>
            <h1 style="margin-top: 90px">确认无误后请将学生证放入指定位置</h1>
            <el-image
              style="width: 400px; height: 400px;margin-top:30px;"
              :src='xsz'
              :fit='fit'></el-image>

            <el-button type="success"
              @click="xsz_enter">
              已放好
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        footer-hide="true"
        :visible="modalshow"
        :show-close="false"
        append-to-body
        height="200"
        width="200">
        <running></running>
      </el-dialog>


    </el-main>
  </el-container>
</div>
</template>

<script>
import cookie from "../../js/cookie";
import {postAxios} from "../../js/http";
import running from "./Running";
export default {
  "name": "Conf",
  components:{
    running
  },
  "data"(){
    return{
      "xsz":'../static/img/xsz.png',
      modalshow:false,
      headers:[
        {
          prop:'sid',
          label:'学号'
        },
        {
          prop:'sname',
          label:'姓名'
        },
        {
          prop:'college',
          label:'学院'
        },
        {
          prop:'major',
          label:'专业'
        },
        {
          prop: 'classinfo',
          label: '班级'
        },
        {
          prop: 'semester',
          label: '学期'
        }
      ],
      tableData: [
        {
          sid: '2019030160',
          sname: '徐鹤翔',
          college: '计算机科学与技术学院',
          major: '计算机科学',
          classinfo: '计科1903',
          semester: '大四上学期'
        }
      ],
      "fit":'contain',
    }
  },
  mounted() {
    var predata = cookie.getToken();
    var aftdata= new Array();

    var midjson = eval("(" + predata + ")");
    aftdata[0]=midjson;
    this.tableData = aftdata;
    console.log(this.tableData);
  },
  computed:{

  },
  methods:{
    getHeaders() {
      // this.tableData = cookie.getToken();
      console.log(this.tableData);

      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.headers.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, {['value' + index]: cur[item.prop]}), {'title': item.label,});
      });
    },
    async xsz_enter(){ //检测到成功放入校园卡后调用
      this.modalshow=true;
      var stuinfo = this.tableData[0];
      var stuid = stuinfo.sid;
      console.log(stuid)
      var result = await postAxios('/register',"222");

      if(result.data.code == 1){
        this.$router.push('/scanface/success');
      }
      else {
        alert(result.data.msg);
      }


    },
    restart(){ //重新注册
      this.$router.push('/scanface/scan')
    },
  },

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
</style>
