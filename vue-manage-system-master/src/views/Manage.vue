<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 系统管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
                    <el-table :data="state.unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template #default="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="allRead">全部标为已读</el-button>
                        <el-button type="primary" @click="addMessage">添加消息</el-button>
                    </div>
                    <!-- 添加消息 -->
                    <el-dialog
                        v-model="messageVisible"
                        title="添加系统消息"
                        width="500px"
                    >
                        <span><el-input v-model="queryParams.message"></el-input></span>
                        <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="messageVisible = false">取消</el-button>
                            <el-button type="primary" @click="saveEdit">
                            提交
                            </el-button>
                        </div>
                        </template>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="state.read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template #default="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${state.recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="state.recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template #default="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="footer-button">
            <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>巡查提醒</span>
                        </div>
                    </template>
                    <el-button type="primary" @click="startReminder">开始每天9点提醒</el-button>
                    <el-button type="primary" @click="stopReminder">停止提醒</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
export default {
    name: "manage",
    setup() {
        const message = ref("first");
        const store = useStore();
        const state = reactive({
            unread: [  ],
            read: [  ],
            recycle: [ ],
        });
        onMounted(() => {
            // console.log(store.state.systemMessage.unread);
            // if(s)
            store.commit('systemMessage/setUnReadList')
            state.unread = store.state.systemMessage.unread
            state.read = store.state.systemMessage.read
            state.recycle = store.state.systemMessage.recycle
        })

        //消息管理
        const queryParams = reactive({
            message: ''
        })

        

        const messageVisible = ref(false)
        const addMessage = () => {
            messageVisible.value = true
        }
        //添加消息
        const date = new Date();
        const saveEdit = () => {
            const time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
            state.unread.push({
                date: time,
                title: '【系统消息】'+queryParams.message
            })
            //存入store
            store.commit('systemMessage/updateUnReadList', state.unread)
            messageVisible.value = false
        }

        const handleRead = (index) => {
            const item = state.unread.splice(index, 1);
            console.log(item);
            store.commit('systemMessage/updateUnReadList', state.unread)
            state.read = item.concat(state.read);
        };
        const allRead = () =>{
            // state.unread.forEach(element => {
            //     state.read = element.concat(state.read)
            // });
            state.read = state.unread.concat(state.read)
            state.unread = []
        }
        const handleDel = (index) => {
            const item = state.read.splice(index, 1);
            state.recycle = item.concat(state.recycle);
        };

        const handleRestore = (index) => {
            const item = state.recycle.splice(index, 1);
            state.read = item.concat(state.read);
        };

        //巡查提醒
        const reminderIntervalId = ref(null);
        const startReminder = () => {
        reminderIntervalId.value = setInterval(() => {
            // 获取当前时间
            const now = new Date();
            // 检查是否为每天早上9点
            if (now.getHours() >= 9 && now.getMinutes() >= 0 && now.getSeconds() >= 0) {
                showReminderDialog();
            }
        }, 1000); // 每秒检查一次
        };


        const stopReminder = () => {
        clearInterval(reminderIntervalId.value);
        console.log('提醒功能已停止');
        };

        const showReminderDialog = () => {
        clearInterval(reminderIntervalId.value);
        ElMessageBox.confirm(
            '现在是巡查提醒时间，进行巡查任务吧！',
            '巡查提醒',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info',
            center: true,
            }
        )
            .then(() => {
            // 用户点击确定按钮后的逻辑
            console.log('用户点击了确定按钮');
            })
            .catch(() => {
            // 用户点击取消按钮后的逻辑
            console.log('用户点击了取消按钮');
            });
        };

        return {
            startReminder,
            stopReminder,
            showReminderDialog,
            message,
            state,
            handleRead,
            handleDel,
            handleRestore,
            allRead,
            addMessage,
            messageVisible,
            saveEdit,
            queryParams,
        };
    },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
.footer-button {
    margin-top: 30px;
}
</style>

