
var video = document.getElementById("videoCamera");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
function getFace() {
  context.drawImage(video, 0, 0, 180, 150);
  this.img=canvas.toDataURL('image/jpg')
  //获取完整的base64编码
  this.img=img.split(',')[1];

  return this.img;
}
function Facelogin() {
  setTimeout(function () {
    let img = getFace();
    FaceMatch();
  },500);
}

function FaceMatch() {
  let img = getFace();
  var v = $("#Imgstr").val();
  var img1 = {
    "imgStr":img,
    "imgType":"BASE64"
  };
  img1 = JSON.stringify(img1);
  var img2 = {
    "imgStr":v,
    "imgType":"BASE64"
  }
  img2 = JSON.stringify(img2);

  var data = { }
  data.img1 = img1;
  data.img2 = img2;
  $.ajax({
    type:"post",
    url:"http://localhost:8080/matchface",//后台接口
    data:img1,
    dataType:"json",
    contentType: 'application/json; charset=UTF-8',
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    success:function (data) {
      console.log(data);
      //匹配成功，前往下一个网页
      if(data["success"]==true){
        var tosecond = document.getElementById('tosecond');
        tosecond.click();
      }
      //匹配失败，继续匹配
      else {
        Facelogin();
      }
    },
    error:function (e) {
    },
    async:true
  })
}
export {
  Facelogin,
  FaceMatch
}
