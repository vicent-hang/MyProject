<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 员工工作汇报审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-select v-model="query.address" placeholder="用户ID" class="handle-select mr10">
                    <el-option key="1" label="用户ID" value="1"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="query.name" placeholder="请输入您要查询员工ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch(query.name)">搜索</el-button>
                <el-button type="primary" @click="addshow">新增职工</el-button>
            </div>
            <el-table :data="currentPageData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="positionName" label="职位"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="handlePageChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                :total="totalItems"
            />
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="form.positionName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 新增用户弹出框 -->
        <el-dialog title="新增员工职务信息" v-model="addVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="职位">
                    <el-input v-model="addform.positionName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore  } from 'vuex'
import { fetchData } from "../api/index";
import { addNewEmployeeWork, deleteWorkInfoById, editWorkInfo, getWorkInfoById, getWorkList } from "../api/empwork";

export default {
    name: "ygwork",
    setup() {
         // 获取表格数据
         const  getDataList =async () => {
            const { data } = await getWorkList()
            tableData.value = data
         } 
         const getData =  () => {
            const store =  useStore();
             store.dispatch('workposition/getpositionList').then(() => {
                // console.log(store.state.workposition.positionList);
                tableData.value = store.state.workposition.positionList
            })
         }
         // 通过 store.state 访问状态
        // const positionList = ref([]);
         onMounted(() => {
            getData();
            // console.log(tableData.value)
            // pageTotal.value = res.pageTotal || 50;
             // console.log(data);  
        })
        


        const query = reactive({
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        // const pageTotal = ref(0);


        // 查询操作
        const handleSearch = async (id) => {
            // query.pageIndex = 1;
            if(id === "") {
                ElMessage.error("查询id为空 ， 已为你返回全部信息！！！");
                getDataList();
            }else {
                try {
                    // 检索是否id为数字
                    if((/^[0-9]+$/).test(id)) {
                        const { data } = await getWorkInfoById(id)
                        const list = [];
                        list.push(data)
                        if(data != null) {
                            tableData.value = list
                            // if(res.data)
                            ElMessage.success("查询成功");
                        }else {
                            ElMessage.error("查询失败,不存在该职务信息！！！");
                        }
                    }else {
                        ElMessage.error("输入错误，请输入要查找的员工ID");
                    }                  
                } catch (error) {
                    // 检索是否id为数字
                    console.log(error);  
                }
                // if(res.data.length !== 0) {
                    
                //     // tableData.value = res.data
                //     // ElMessage.success("查询成功");
                // }else {
                //     ElMessage.error("查询失败,不存在该员工信息！！！");
                // }
            }
        };

        // 分页导航
        const pageIndex = ref(1);
        const pageSize =  ref(10); // 每页显示的行数
        const pageTotal = ref(0);
        
        // 分页导航
        const currentPageData = computed(() => {
        const start = (pageIndex.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return tableData.value.slice(start, end);
        });
        const totalItems = computed(() => tableData.value.length);
        const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
        
        // const handlePageChange = (val) => {
        //     pageIndex.value = val;
        //     // getData();
        // };
        const handlePageChange = (val) => {
            pageIndex.value = val;
            // getData();
        };

        // 删除操作
        const handleDelete = (index, row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(async () => {
                    // console.log(row.id);
                    const id = row.id;
                    const res = await deleteWorkInfoById(id)
                    // console.log(res);
                    if(res.code == 200){
                        ElMessage.success("删除成功");
                    // tableData.value.splice(index, 1);
                        await getWorkList().then(res => {
                            tableData.value = res.data
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        //新增职工
        const addVisible = ref(false);
        let addform = reactive({
            positionName: '',
        })
        const addshow = () => {
            // console.log("123")
            addVisible.value = true;
            // console.log(addVisible.value)
        };
        const saveAdd = async () => {
            console.log(addform)
            await addNewEmployeeWork(addform.positionName).then(async res => {
                // console.log(123)
                // console.log(res)
                // const { data } = getEmployeeAll()
                // tableData = data
                //刷新列表
                await getWorkList().then(res => {
                    tableData.value = res.data
                })
            }).catch(err => {
                console.log(err)
            })
            addVisible.value = false
        }

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            id: "",
            positionName: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = async () => {
            const res = await editWorkInfo(form.id,form.positionName); 
            console.log(res);
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        

        return {
            getDataList,
            totalItems,
            pageIndex,
            totalPages,
            currentPageData,
            getData,
            addshow,
            addVisible,
            addform,
            saveAdd,
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
