<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 藏品分类和标签管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="plugins-tips">
                vue-schart：vue.js封装sChart.js的图表组件。
                访问地址：
                <a href="https://github.com/lin-xin/vue-schart" target="_blank">vue-schart</a>
            </div> -->
        <div>
            <div class="content-sort">
                <div class="container"> 
                    <div class="content-title">各类藏品分类图</div>
                    <div class="header-container">
                        <div class="form-table">
                        <el-table :data="sortOptions.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                            <el-table-column prop="id" label="ID"  align="center"></el-table-column>
                            <el-table-column prop="name" label="分类" align="center"></el-table-column>
                            <el-table-column prop="count" label="分类" align="center"></el-table-column>    
                        </el-table>
                        </div>
                        <div class="schart-box">
                            <schart class="schart" canvasId="pie" :options="sortOptions"></schart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-sort">
                <div class="container"> 
                    <div class="content-title">文物损坏状况柱状图</div>
                    <div class="header-container">
                        <div class="form-table">
                            <el-table :data="badOptions.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                            <el-table-column prop="id" label="ID"  align="center"></el-table-column>
                            <el-table-column prop="situation" label="状况" align="center"></el-table-column>
                            <el-table-column prop="count" label="数量" align="center"></el-table-column>    
                        </el-table>
                        </div>
                        <div class="schart-box">
                            <schart class="schart" canvasId="bar" :options="badOptions"></schart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-sort">
                <div class="container"> 
                    <div class="content-title">文物等级分类环形图</div>
                    <div class="header-container">
                        <div class="form-table">  
                        <el-table :data="levelOptions.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                            <el-table-column prop="id" label="ID"  align="center"></el-table-column>
                            <el-table-column prop="level" label="等级" align="center"></el-table-column>
                            <el-table-column prop="count" label="数量" align="center"></el-table-column>       
                        </el-table>
                        </div>
                        <div class="schart-box">
                            <schart class="schart" canvasId="ring" :options="levelOptions"></schart>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="schart-box">
                <div class="content-title">折线图</div>
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>  -->
            
            <!-- <div class="content-title">文物损坏状况柱状图</div> -->
            <!-- <div class="schart-box">
                <div class="content-title">各类藏品分类图</div>
                <schart class="schart" canvasId="pie" :options="sortOptions"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">文物等级分类环形图</div>
                <schart class="schart" canvasId="ring" :options="levelOptions"></schart>
            </div> -->
        </div>
    </div>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { ref, reactive, onMounted, computed} from "vue";
import { fetchData } from "../../api/index";
import { useStore } from "vuex";
import store from "../../store";
import { getRelicSortAll } from "../../api/sort";
export default {
    name: "cpflmanage",
    components: {
        Schart,
    },
    setup() {

        const badOptions = {
            type: "bar",
            title: {
                text: "文物损坏状况柱状图",
            },
            bgColor: "#fbfbfb",
            labels: ["严重破损", "完全破损", "完好无损", "轻微破损"],
            datasets: [
                {
                    data: [13, 9, 62 , 156]
                }
            ],
            data: [
                {id: '0', situation: '严重破损', count: '13'},
                {id: '1', situation: '完全破损', count: '9'},
                {id: '2', situation: '完好无损', count: '62'},
                {id: '3', situation: '轻微破损', count: '156'}
            ]
        };
        const options2 = {
            type: "line",
            title: {
                text: "最近几个月各品类销售趋势图",
            },
            bgColor: "#fbfbfb",
            labels: ["6月", "7月", "8月", "9月", "10月"],
            datasets: [
                {
                    label: "家电",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "百货",
                    data: [164, 178, 150, 135, 160],
                },
                {
                    label: "食品",
                    data: [114, 138, 200, 235, 190],
                },
            ],
        };

        //藏品分类
        const sortOptions = {
            type: "pie",
            title: {
                text: "各类藏品分类图",
            },
            legend: {
                position: "left",
            },
            bgColor: "#fbfbfb",
            labels: [
                "玉石类",
                "木漆类",
                "书画类",
                "陶瓷类",
                "民族文物",
                "奇形怪状类",
                "其他"
            ],
            datasets: [
                {
                    data: [33, 27, 19, 23, 26, 20, 14],
                },
            ],
            data: [
                {id: '0',name: '玉石类',count: '33'},
                {id: '1',name: '木漆类',count: '27'},
                {id: '2',name: '书画类',count: '19'},
                {id: '3',name: '陶瓷类',count: '23'},
                {id: '4',name: '民族文物',count: '26'},
                {id: '5',name: '奇形怪状类',count: '20'},
                {id: '6',name: '其他',count: '14'},
            ]
        };
        // sortOptions.labels = tableSortData.value
        
        




        const levelOptions = {
            type: "ring",
            title: {
                text: "文物等级分类图",
            },
            showValue: true,
            legend: {
                position: "bottom",
                bottom: 40,
            },
            bgColor: "#fbfbfb",
            labels: ["珍贵一级", "珍贵二级", "珍贵三级","一般文物", "珍惜文物"],
            datasets: [
                {
                    data: [11, 24, 32,44, 26],
                },
            ],
            data: [
                {id: '0', level: '珍贵一级' , count: '11'},
                {id: '1', level: '珍贵二级' , count: '24'},
                {id: '2', level: '珍贵三级' , count: '32'},
                {id: '3', level: '一般文物' , count: '44'},
                {id: '4', level: '珍惜文物' , count: '26'}
            ]
        };
        // 获取表格数据
        //分类
        const tableSortData = ref([]);
        const getSortDataList =async () => {
            await getRelicSortAll().then(res => {
                console.log(res);
                tableSortData.value = res.data
            })
        }


        onMounted(async () => {
            getSortDataList()
            // getWorkList()
        })


        

        
        
        

        return {
            tableSortData,
            badOptions,
            options2,
            sortOptions,
            levelOptions,
            getSortDataList,
        };
    },
};
</script>

<style scoped>
.content-sort {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中子元素在水平方向上 */
}

.header-container {
  display: flex;
  justify-content: center; /* 居中子元素在水平方向上 */
  align-items: center; /* 居中子元素在垂直方向上 */
}

.content-title {
    text-align: center;
    margin-top: 10px; /* 调整标题与内容之间的间距 */
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.container {
  display: flex;
  justify-content: space-between; /* 确保子元素在容器中左右对齐 */
}
.schart-box {
    display: flex;
    flex-direction: column;
    margin: 20px;

}
.schart {
    width: 600px;
    height: 400px;
}
</style>