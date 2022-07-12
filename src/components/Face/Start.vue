
<template>

  <div class="kaishi">
    <img src="../../assets/polan.png">
    <h1>欢迎使用北京化工大学自助注册系统</h1>
    <h2 v-if="wenben">请将校园卡放置于读卡区以继续注册</h2>
    <h2 v-else>请看向摄像头</h2>

    <div class="box" v-if="wenben" style="height:400px;">
      <div style="display: table-cell;vertical-align:middle;text-align:center;">
        <img src="../../assets/xyk.png">
      </div>
    </div>
    <div class="box" v-else>
      <div class="div-v">
        <video id="videoCamera"  class="canvas" :width="videoWidth" :height="videoHeight" :z-index="1" autoPlay></video>
      </div>
      <div class="div-c">
        <canvas id="canvasCamera" align class="canvas" :width="videoWidth" :height="videoHeight" :z-index="2"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
//拍照上传组件
//父组件通过函数 getImg 获取照片路径,如 @getImg="getImg"
const Address = require('../../assets/logo.png');//图片上传地址
export default {
  name: "TakePhotos",
  data() {
    return {
      imgSrc: "",
      wenben:true,
      loading: false,//上传按钮加载
      open: false,//控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 400,
      videoHeight: 400
    }
  },
  methods: {

    onTake() {
      this.getCompetence();
    },
    onCancel() {//关闭人脸识别界面
      this.resetCanvas();
      this.stopNavigator();
      this.wenben = true;
    },
    face() {
      this.wenben = false;
      this.onTake();
    },

    // 调用摄像头权限
    getCompetence() {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this;
        this.open = false;//切换成关闭摄像头
        this.thisCancas = document.getElementById('canvasCamera');
        this.thisContext = this.thisCancas.getContext('2d');
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
    },
    //绘制图片
    drawImage() {
      // 点击，canvas画图
      this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight);
      // 获取图片base64链接
      this.imgSrc = this.thisCancas.toDataURL('image/png');
    },
    //base64转文件

    //清空画布
    clearCanvas(id) {
      let c = document.getElementById(id);
      let cxt = c.getContext("2d");
      cxt.clearRect(0, 0, c.width, c.height);
    },
    //重置画布
    resetCanvas() {
      this.imgSrc = "";
      this.clearCanvas('canvasCamera');
    },
    //关闭摄像头
    stopNavigator() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        this.open = true;//切换成打开摄像头
      }
    },
  },
  beforeDestroy() {
    this.stopNavigator()
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
  margin: 0 10px;
}
a {
  color: #42b983;
}

.box {
  display: flex;
  justify-content: center;
  height: 800px;

}


.canvas {
  border: 1px solid #e8e8e8;
  border-radius: 100%;
}
.div-v{
  position:absolute;
  left:325px;
  top:60px;
  width:400px;
  height:200px;
  z-index: var(--dv);
}
.div-c{
  position:absolute;
  left:325px;
  top:60px;
  width:400px;
  height:200px;
  z-index: 1;
}
</style>
