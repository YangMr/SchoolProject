<template>
  <div class="upload_container">
    <h3>单一文件上传「FORM-DATA」</h3>

    <div class="upload_box">
      <input id="upload_ipu" @change="getFile" type="file" class="upload_ipu" />
      <div class="upload_button_group">
        <button
          class="upload_button select"
          :class="uploadStatus ? 'disabled' : ''"
          @click="selectFile"
        >
          选择文件
        </button>
        <button
          class="upload_button upload"
          :class="uploadStatus ? 'loading' : ''"
          @click="uploadFile"
        >
          上传到文件服务器
        </button>
      </div>
      <div class="upload_tips" v-if="!showFile">
        只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB
      </div>
      <div class="upload_list" v-if="showFile">
        <span>文件：{{ file.name }}</span>
        <span><em @click="removeFile">移除</em></span>
      </div>
    </div>

    <div class="image_box" v-if="imgUrl">
      <img :src="imgUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { uploadSingle } from "../api/upload";
export default {
  name: "Home",
  data: function () {
    return {
      showFile: false,
      file: "",
      imgUrl: "",
      uploadStatus: false,
    };
  },
  methods: {
    //方法做的事情： 拉起选择文件弹窗
    selectFile() {
      let uploadIpu = document.getElementById("upload_ipu");
      uploadIpu.click();
    },
    //方法做的事情： 获取选择上传的文件
    getFile(event) {
      this.file = event.target.files["0"];
      if (this.file) {
        this.showFile = true;
      }
    },
    //方法做的事情： 移除选择上传的文件
    removeFile() {
      this.file = "";
      this.showFile = false;
    },
    //方法做的事情： 1. 对上传的文件进行大小的限制以及类型的限制 2. 将选择的文件上传到后台
    async uploadFile() {
      //限制上传文件的大小不能超过2MB

      if (this.file.size > 2 * 1024 * 1024) {
        this.$message.warning("上传的文件不能大于2MB哦😯");
        return;
      }

      //限制上传文件文件只能是图片, 格式为 png|jpg|jpeg|.gif
      let type = this.file.type;
      if (!/(PNG|JPEG|JPG|GIF)/i.test(type)) {
        this.$message.warning("上传的文件类型不正确");
        return;
      }

      this.uploadStatus = true;

      //将选择的文件上传到服务器
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("filename", this.file.name);
      try {
        let res = await uploadSingle(formData);
        this.$message.success("上传文件成功");
        this.imgUrl = res.data.servicePath;
        this.uploadStatus = false;
        return Promise.reject();
      } catch (error) {
        this.$message.error("上传文件失败");
      }
      this.file = "";
      this.showFile = false;
      this.uploadStatus = false;
    },
  },
};
</script>

<style scoped>
.upload_container {
  padding: 40px;
}
.upload_container h3 {
  font-size: 18px;
  font-weight: 700;
}
.upload_box {
  border: 1px dashed #ddd;
  padding: 20px;
  width: 340px;
  min-height: 120px;
}
.upload_button {
  border: none;
  background: antiquewhite;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  margin-right: 10px;
  cursor: pointer;
}
.select {
  background: mediumpurple;
}
.upload {
  background: darkkhaki;
  position: relative;
}
.upload_tips {
  color: #3d3d3d;
  font-size: 12px;
  margin-top: 10px;
}
.upload_list {
  font-size: 12px;
  color: #3d3d3d;
  margin-top: 10px;
}
.upload_list em {
  margin-left: 10px;
  color: darkkhaki;
  cursor: pointer;
  vertical-align: middle;
  font-style: normal;
}
.upload_ipu {
  display: none;
}
.image_box {
  border: 1px dashed #ddd;
  padding: 20px;
  width: 340px;
  margin: 10px 0;
}
.disabled {
  background: #ccc;
}
.loading:after {
  position: absolute;
  content: "loading...";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #ddd url("../assets/css/loading.gif") no-repeat 10px center;
  z-index: 999;
}
</style>
