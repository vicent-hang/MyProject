<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:523px;position: relative;">
                    <div class="user-info">
                        <img :src="imgObj.url" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role.role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{ newDate }}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>
                            <i class="el-icon-lx-location" >天津</i>
                        </span>
                    </div>
                    <div style="margin-top: 30px;position:absolute;bottom: 30px;">
                        <img src="../assets/icon/博物馆.png" style="width: 278px;height: 150px;">
                    </div>
                </el-card>
                <!-- <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>藏品详情</span>
                        </div>
                    </template>
                    战争遗物
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>艺术品
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>自然史文物
                    <el-progress :percentage="13.7"></el-progress>古代书籍
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card> -->
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <!-- <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col> -->
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ 321+messageCount }}</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ count }}</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="handleEdit">添加</el-button>
                        </div>
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                        <el-form label-width="70px">
                            <el-form-item label="添加事项">
                                <el-input v-model="form.text"></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="editVisible = false">取 消</el-button>
                                <el-button type="primary" @click="saveEdit">确 定</el-button>
                            </span>
                        </template>
                    </el-dialog>
                    </template>

                    <el-container style="max-height: 400px;">
                        <el-table :show-header="false" :data="todoList" max-height="300px" height="500px" style="width:100%;">
                            <el-table-column width="40">
                                <template #default="scope">
                                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template #default="scope">
                                    <div class="todo-item" :class="{
                                            'todo-item-del': scope.row.status,
                                        }">{{ scope.row.title }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column width="60">
                                <template>
                                    <i class="el-icon-edit"></i>
                                    <i class="el-icon-delete"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-container>
                </el-card>
                
            </el-col>
        </el-row>
        <el-row style="width: 100%;" >
            <el-col style="width: 100%;">
                <el-card shadow="hover" class="weaher-show" style="background-color: #e1e1e1;width: 100%;">
                    <el-container style="width: 100%;">
                        <div class="today">
                            <div style="margin-bottom: 20px">
                                <span>
                                    <i class="el-icon-lx-location" style="color: #fff;font-size: 25px;" >天津</i>
                                </span>
                            </div>
                            <div  style="margin-bottom: 20px">
                                <div style="display: inline-block;margin-right: 40px;color: white;">

                                    <span>今天：</span><span>{{ queryParams.weather }}</span>
                                </div>
                                <div style="display: inline-block;margin-left: 40px;color: #ffffff;">{{ queryParams.date }}</div>
                            </div>
                            <div style="margin-bottom: 20px;color: white">
                                <span style="font-size: 40px;margin-right: 10px;font-weight: 900;">{{ queryParams.temperature }}</span><span style="margin-right: 10px;"></span><span style="margin-right: 10px;">{{ queryParams.direct }}</span><span style="margin-right: 10px;"></span>
                            </div>
                        </div>
                    </el-container>
                    <el-container>
                        <el-table :data="tableData" table-layout="fixed" style="width: 100%; opacity: 0.85;">
                            <el-table-column prop="date" label="日期"   />
                            <el-table-column prop="temperature" label="温度"  />
                            <el-table-column prop="weather" label="天气"  />
                            <el-table-column prop="direct" label="风向" />
                        </el-table>
                    </el-container>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { ref,reactive,onMounted, computed,watch } from "vue";
import { remindWork } from "../utils/remaind";
import { getRelicAll } from "../api/collection";
import { useStore } from 'vuex';
import { getWeatherList } from '../api/weather/weather'
export default {
    name: "dashboard",
    components: { Schart },
    setup() {
        //数量渲染
        const store = useStore();
        // const relicCount = ref(3040);
        const count = ref(3040);
        const getRelicList = async () => {
            const { data } = await getRelicAll();
            count.value+=data.length
        }; 
        onMounted(() => {
            getRelicList();
            getWeatherListMethod();
            getWeatherListData();
        })
        const relicCount = computed(() => store.state.relicList.relicList.length )
        watch(relicCount, (newValue, oldValue) => {
            console.log('relicCount changed:', newValue);
            if(newValue > oldValue) {
                count.value++
            }else {
                count.value--
            }
        });
        const messageCount = computed({
            get: () => { 
                return store.state.systemMessage.unread.length
            },
            set: (val) => {

            }
        })

        
        

       


        let name = localStorage.getItem("ms_userName");
        const roleList = [
            {id: 1, role: '超级管理员'},
            {id: 2, role: '藏品管理员'},
            {id: 3, role: '安保管理员'},
        ]
        const role = roleList.find(item => item.role === localStorage.getItem('ms_roleName'))
        //  role = template.role

        const imgList = [
            {id: 1,role: '超级管理员', url: '/src/assets/icon/超级管理员.png'},
            {id: 2,role: '藏品管理员', url: '/src/assets/icon/管理员.png'},
            {id: 3,role: '安保管理员', url: '/src/assets/icon/用户.png'}
        ]
        const imgObj = imgList.find(item => item.role === localStorage.getItem('ms_roleName'))
        

        const data = reactive([
            {
                name: "2018/09/04",
                value: 1083,
            },
            {
                name: "2018/09/05",
                value: 941,
            },
            {
                name: "2018/09/06",
                value: 1139,
            },
            {
                name: "2018/09/07",
                value: 816,
            },
            {
                name: "2018/09/08",
                value: 327,
            },
            {
                name: "2018/09/09",
                value: 228,
            },
            {
                name: "2018/09/10",
                value: 1065,
            },
        ]);
        const options = {
            type: "bar",
            title: {
                text: "最近一周各级文物展览量",
            },
            xRorate: 25,
            labels: ["周一", "周二", "周三", "周四", "周五"],
            datasets: [
                {
                    label: "一级文物",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "二级文物",
                    data: [164, 178, 190, 135, 160],
                },
                {
                    label: "三级文物",
                    data: [144, 198, 150, 235, 120],
                },
            ],
        };
        const options2 = {
            type: "line",
            title: {
                text: "最近几个月各级文物展览趋势图",
            },
            labels: ["6月", "7月", "8月", "9月", "10月"],
            datasets: [
                {
                    label: "一级文物",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "二级文物",
                    data: [164, 178, 150, 135, 160],
                },
                {
                    label: "三级文物",
                    data: [74, 118, 200, 235, 90],
                },
            ],
        };
        const todoList = reactive([
            {
                title: "刘大爷带来的祖传碗鉴定",
                status: false,
            },
            {
                title: "张馆长提出建议",
                status: false,
            },
            {
                title: "刘秘书提出线上开发的新策略",
                status: false,
            },
            {
                title: "张先生提出坐馆帮忙鉴定",
                status: false,
            },
            {
                title: "有几个工人帮忙修水电",
                status: true,
            },
            {
                title: "小四哥今天做导游",
                status: true,
            },
        ]);

        //显示登录日期
        const date = new Date()
        const newDate =  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

        //页面渲染完 显示提醒
        onMounted(() => {
            remindWork()
        }) 


        //添加事项
        const form = reactive({
            text: ''
        })
        const editVisible = ref(false);
        const handleEdit = () => {
            editVisible.value = true;
        };
        const saveEdit = () => {
            todoList.push({
                title: form.text,
                status: false
            })
            // console.log(111);
            editVisible.value = false;
        }


        //天气数据
        let city = '天津'
        city = encodeURI(city)
        const tableData = ref([])
        const queryParams = reactive({
            date: '',
            temperature:'',
            direct: '',
            weather: '',
            count: '0'
        })
        
        const getWeatherListMethod =async () => {
            const { result: { future } } =  await getWeatherList(city);
            // console.log(future);
            localStorage.setItem('future', JSON.stringify(future))
            // console.log(result);
            
        }
        const getWeatherListData = () => {
            tableData.value =  JSON.parse(localStorage.getItem('future'))
            console.log(tableData.value);
            queryParams.date = tableData.value[0].date
            queryParams.temperature = tableData.value[0].temperature
            queryParams.direct = tableData.value[0].direct
            queryParams.weather = tableData.value[0].weather
        }
        

        return {
            count,
            relicCount,
            form,
            editVisible,
            saveEdit,
            handleEdit,
            newDate,
            name,
            data,
            options,
            options2,
            todoList,
            role,
            messageCount,
            tableData,
            queryParams,
            imgObj,
        };
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 16px;
    color: #999;
    line-height: 25px;
    margin-bottom: 20px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.today {
    width: 100%;
    .weather-row {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
}

.weaher-show {
    background-image: url('../assets/img/夜空.jpg');
}

</style>
