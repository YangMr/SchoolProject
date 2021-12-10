<template>
  <div class="home">
    <div class="line">
      <div class="item">
        <h3>单一文件上传「FORM-DATA」</h3>
        <section class="upload_box">
          <input
            ref="upload_inp"
            @change="getUploadFile"
            type="file"
            class="upload_inp"
          />
          <div class="upload-button-box">
            <button class="upload_button select" @click="selectFile">
              选择文件
            </button>
            <button class="upload_button upload" @click="uploadFile">
              上传文件到服务器
            </button>
          </div>
          <div class="upload-tips" v-show="!showFile">
            只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB
          </div>
          <div class="upload_list" v-show="showFile">
            <span>文件：{{ file.name }}</span>
            <span><em @click="removeFile">移除</em></span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 1. 点击选择文件按钮，能够拉起选择文件的弹窗
 * 2. 获取到上传的文件信息
 * 3. 对上传的文件进行一些限制
 *  3.1 限定上传的文件格式
 *  3.2 限定上传的文件大小 (2M)
 *
 *    1 * 60 * 60 * 1000 = 360000
 *
 *    2 * 1024 * 1024
 */
export default {
  name: "Home",
  data: function () {
    return {
      file: {},
      showFile: false,
    };
  },
  components: {},
  methods: {
    //点击选择文件按钮的方法
    selectFile() {
      //触发input type="file" 这个按钮
      this.$refs["upload_inp"].click();
    },
    //监听文件上传的方法
    getUploadFile(event) {
      console.log(event.target.files);
      this.file = event.target.files[0];

      if (!this.file) return;
      this.showFile = true;
    },
    //上传文件到服务器的方法
    uploadFile() {
      //上传的文件不存在
      if (!this.file) {
        this.$message.warning("请选择要上传的文件");
        return;
      }

      //上传的文件大与2M
      if (this.file.size > 2 * 1024 * 1024) {
        this.$message.warning("上传的文件不能超过2MB");
        return;
      }

      //上传的文件类型
      const type = this.file.type;
      if (!/(PNG|JPG|JPEG)/i.test(type)) {
        this.$message.warning("上传的文件只能是 PNG/JPG/JPEG 格式的~~");
        return;
      }

      //1. 拿到上传的文件信息
      //2. 将上传的文件发送给后台
    },
    removeFile() {
      //1. 让文件清空
      this.file = {};
      //2. 隐藏显示的文件,显示描述的信息
      this.showFile = false;
    },
  },
};
</script>

<style scoped>
.line {
  padding: 20px 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.upload_box {
  width: 400px;
  padding: 10px;
  min-height: 150px;
  border: 1px dashed #ddd;
  box-sizing: border-box;
  margin-top: 20px;
  margin-right: 20px;
}
.upload_inp {
  display: none;
}
.upload_button {
  position: relative;
  box-sizing: border-box;
  margin-right: 10px;
  padding: 0 10px;
  min-width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  overflow: hidden;
}
.select {
  background: #409eff;
  color: #fff;
}
.upload {
  background: #67c23a;
  color: #fff;
}
.upload-tips {
  margin-top: 10px;
  line-height: 25px;
  color: #999;
  font-size: 12px;
}
.upload_list {
  margin-top: 10px;
  line-height: 25px;
  /*display: none;*/
}
.upload_list span {
  display: inline-block;
  margin-right: 10px;
  max-width: 70%;
  color: #999;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.upload_list span em {
  cursor: pointer;
}
</style>
