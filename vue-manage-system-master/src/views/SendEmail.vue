<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <i class="el-icon-lx-mail"></i> 邮件发送
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="container">
          <div class="plugins-tips">
            <div class="email-title">
               地址：<el-input v-model="email.address" style="width: 90%" placeholder="邮箱地址" />
            </div>
            <div class="email-title">
               主题：<el-input v-model="email.title" style="width: 90%" placeholder="邮件主题" />
            </div>
          </div>
          <div class="mgb20" ref='editor' @input="handleInput"></div>
          <el-button type="primary" @click="syncHTML">发送</el-button>
      </div>
  </div>
</template>

<script>
import WangEditor from "wangEditor";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { sendEmail } from "../api/email";
import { ElMessage } from "element-plus";
export default {
  name: "editor",
  setup() {

      
    //发送邮件
    const handleInput = (value) => {
        // console.log(value.data);
        email.inp = value.data
    }
    const email = reactive({
        inp: '',
        address: '',
        title: ''
    })
    


      const editor = ref(null);
      const content = reactive({
          html: "",
          text: "",
      });
      let instance;
      onMounted(() => {
          instance = new WangEditor(editor.value);
          instance.config.zIndex = 1;
          instance.create();
      });
      onBeforeUnmount(() => {
          instance.destroy();
          instance = null;
      });
      const syncHTML =async () => {
        content.html = instance.txt.html();
        // console.log(content.html);
        email.inp = content.html
        const res = await sendEmail(email.address , email.title, email.inp)
        // console.log(res);
        if(res.code == 200) {
            ElMessage.success("发送成功")
        }else {
            ElMessage.error("发送失败，不存在该邮箱！")
        }

      };
      return {
        handleInput,
        email,
          syncHTML,
          editor,
          content,
      };
  },
};
</script>

<style>
.email-title {
    margin: 5px 0;
}
</style>