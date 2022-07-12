<template>
<div>
  <el-container>
    <el-main style="background: #454b47" >
      <el-row :gutter="5">
        <el-col :span="18" style="background: #84cdd4;height: 650px">
          <div class="div-v">
            <video id="videoCamera"  class="canvas" :width="videoWidth" :height="videoHeight" :z-index="1" autoPlay></video>
          </div>
          <div>
            <h1 style="font-size: 25px;" >{{this.tip}}</h1>
          </div>
          <div >
            <canvas hidden  id="canvas" :width="videoWidth" :height="videoHeight"></canvas>
          </div>
        </el-col>
        <el-col :span="6" style="background: #7ea5a8;height: 650px">
          <div>
            <div class="block">
              <el-image
                style="width: 400px; height: 400px;margin-top:50px;"
                :src="urll"
                :fit='fit'></el-image>
              <h1 style="font-size: 25px;">请看向摄像头</h1>
            </div>
          </div>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</div>
</template>

<script>
import {postAxios} from "../../js/http";
import {getAxios} from "../../js/http";
import cookie from "../../js/cookie";

export default {

  data() {
    return {
      stuinfo:null,
      tip:null,
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 400,
      videoHeight: 400,
      fit:'contain',
      urll:'../static/img/dalian.png',
    }
  },

  mounted:function () {
    this.Facelogin();
    this.getCompetence();
  },
  methods: {
    getFace() {
      var video = document.getElementById("videoCamera");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, 180, 150);
      let img=canvas.toDataURL('image/jpg')
      //获取完整的base64编码
      img=img.split(',')[1];
      return img;
    },
    async FaceMatch() {
      let img = this.getFace();
      var img1 = {
        "imgStr":img,
        "imgType":"BASE64"
      };
      img1 = JSON.stringify(img1);
      var data = { }
      data.img1 = img1;
      let result =await postAxios('/search',img1);

      data = result.data.data
      // console.log(JSON.stringify(data))
      this.tip = result.data.msg;
      if(result.data.code == 1){
        cookie.setToken(JSON.stringify(data))
        this.$router.push('/Scanface/Conf')
      }
      else {

        this.Facelogin()
      }

    },
    Facelogin() {
      var that = this;
      setTimeout(function () {
        that.FaceMatch();
      },500);
    },
    getCompetence() {
      // 摄像头必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this;
        this.open = false;//切换成关闭摄像头
        this.thisVideo = document.getElementById('videoCamera');
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: {width: _this.videoWidth, height: _this.videoHeight, transform: 'scaleX(-1)'}
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play()
          }
        }).catch(err => {
          this.$notify({
            title: '警告',
            message: '没有开启摄像头权限或浏览器版本不兼容.',
            type: 'warning'
          });
        });
      });
    }
  }
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
