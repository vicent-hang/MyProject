<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">博物馆后台管理系统</div>
            <el-form :model="registerForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入你的用户名">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入你的用户名" v-model="registerForm.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwordAgain">
                    <el-input type="password" placeholder="请再次输入你的密码" v-model="registerForm.passwordAgain"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                
                <el-form-item prop="email">
                    <el-input type="email" placeholder="请输入你的邮箱" v-model="registerForm.email" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lx-mail"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <!-- <p class="login-tips"><router-link to="/login">已有帐号？进行登录</router-link></p> -->
                <router-link class="login-tips" to="/login">点我登录</router-link>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
    setup() {
        const router = useRouter();
        const registerForm = reactive({
            username: "",
            password: "",
        });

        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: '登陆密码不能为空', trigger: 'blur' },
                { min: 6, message: '登陆密码必须6位或以上', trigger: 'blur' },
            ],
            passwordAgain: [
                { required: true, message: '请再次输入登陆密码', trigger: 'blur' },

                {
                    validator: (rule, value, callback) => {
                        const password = registerForm.password // 这里需要用到第一次输入的密码值，可以根据实际情况修改
                        if (value !== password) {
                            callback(new Error('两次输入的密码不一致'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }
            ],

            email: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确', trigger: 'blur' }
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                    ElMessage.success("注册成功");
                    localStorage.setItem("ms_username", registerForm.username);
                    router.push("/");
                } else {
                    ElMessage.error("注册失败");
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        return {
            registerForm,
            rules,
            login,
            submitForm,
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>