<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 藏品定期盘点记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="ID" class="handle-select mr10"
                @change = "handleSelectionKey">
                    <!-- <el-option key="0" label="ID查询" value="0"></el-option> -->
                    <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item"></el-option>
                    <!-- <el-option key="2" label="relicName" value="藏品名称"></el-option>
                    <el-option key="3" label="用户信息" value="3"></el-option> -->
                </el-select>
                <el-input v-model="query.name"  :placeholder="query.tips" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch(query.key,query.name)">搜索</el-button>
                <!-- <el-button type="primary" @click="addshow">新增定期盘点记录</el-button> -->
                <!-- <el-button type="primary" @click="isVisible = !isVisible">批量删除</el-button> -->
            </div>
            <!-- 显示标签 -->
            <div class="flex gap-2">
                <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" @close="removeTag(tag.id)">
                {{ tag.name }}
                </el-tag>
            </div>
            <div>
                <div>
                    <el-table :data="currentPageData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange">
                        <el-table-column v-if="isVisible" type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="ID"  align="center"></el-table-column>
                        <el-table-column prop="name" label="藏品名" align="center"></el-table-column>
                        <el-table-column prop="relicLevel" label="等级" align="center"></el-table-column>  
                        <el-table-column prop="relicState" label="藏品状态" align="center"></el-table-column>
                        <el-table-column prop="displayPosition" label="展览地点" align="center"></el-table-column>        
                        <el-table-column prop="displayTime" label="展览时间" align="center"></el-table-column> 
                        <el-table-column prop="maintContent" label="维修内容" align="center"></el-table-column> 
                        <el-table-column prop="maintTime" label="维修时间" align="center"></el-table-column> 
                        <!-- <el-table-column label="账户余额">
                            <template #default="scope">￥{{ scope.row.salary }}</template>
                        </el-table-column> -->
                        <!-- <el-table-column label="头像(查看大图)" align="center">
                            <template #default="scope">
                                <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
                                </el-image>
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="email" label="地址"></el-table-column> -->
                        <!-- <el-table-column label="状态" align="center">
                            <template #default="scope">
                                <el-tag :type="
                                        scope.row.state === '成功'
                                            ? 'success'
                                            : scope.row.state === '失败'
                                            ? 'danger'
                                            : ''
                                    ">{{ scope.row.state }}</el-tag>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="操作" width="180" align="center">
                            <template #default="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                                </el-button>
                                <el-button type="text" icon="el-icon-delete" class="red"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="popconfirm" v-show="isVisible">
                        <el-popover :visible="isOK" placement="top" :width="160">
                        <p>确定删除这些内容?</p>
                        <div style="text-align: right; margin: 0">
                        <el-button size="small" type="primary"  @click="handleCancel">取消</el-button>
                        <el-button size="small" type="danger"  @click="handleConfirm" >确定</el-button>
                        </div>
                        <template #reference>
                        <el-button type="danger" @click="isOK = !isOK">删除</el-button>
                        </template>
                        </el-popover>
                    </div>
                        <el-pagination
                            background
                            @current-change="handlePageChange"
                            :current-page="pageIndex"
                            :page-sizes="[5, 10, 20, 30]"
                            :page-size="10"
                            :total="totalItems"
                        />
                </div>
                
            </div>
        </div>
        

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item> 
                <el-form-item label="藏品ID">
                    <el-input v-model="form.relicId"></el-input>
                </el-form-item> 
                <el-form-item label="保养ID">
                    <el-input v-model="form.maintId"></el-input>
                </el-form-item> 
                <el-form-item label="展览ID">
                    <el-input v-model="form.displayId"></el-input>
                </el-form-item>
                <el-form-item label="仓库ID">
                    <el-input v-model="form.storeId"></el-input>
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
        <el-dialog title="新增藏品" v-model="addVisible" width="30%">
            <el-form label-width="70px">
                <!-- <el-form-item label="id">
                    <el-input v-model="addform.id"></el-input>
                </el-form-item> -->
                <el-form-item label="藏品ID">
                    <el-input v-model="addform.relicId"></el-input>
                </el-form-item> 
                <el-form-item label="保养ID">
                    <el-input v-model="addform.maintId"></el-input>
                </el-form-item> 
                <el-form-item label="展览ID">
                    <el-input v-model="addform.displayId"></el-input>
                </el-form-item>
                <el-form-item label="仓库ID">
                    <el-input v-model="addform.storeId"></el-input>
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
import { ref, reactive, onMounted, computed} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api/index";
import { useStore } from "vuex";
import { delEmployeesInfoBySelect} from "../../api/employee";
import store from "../../store";
import { getStockPlusAll, getStockPlisById,addStockTake, delStockTakeById, editStockTake, users } from "../../api/collection";
export default {
    name: "yginfo",
    mounted () {
    },
    setup() {
        // 获取表格数据
        const getDataList =async () => {
            await getStockPlusAll().then(res => {
                // console.log(res);
                tableData.value = res.data
                // console.log(res.data.length)
                pageTotal.value = tableData.value.length;
                // setTimeout(() => {
                // },1000)
            })
        }

        onMounted(async () => {
            getDataList()
            // getWorkList()
        })

        //标签模糊查询
        const selectOptions = ref([
            {id: 0, name: 'ID', value: 'ID'},
            {id: 1, name: '藏品名称', value: 'relicName'},
            {id: 2, name: '藏品等级', value: 'relicLevel'},
            {id: 3, name: '藏品状态', value: 'relicState'},
            {id: 4, name: '维修内容', value: 'maintContent'},
            {id: 5, name: '展览地点', value: 'displayPosition'}
            
        ])
        const tags = ref([])

        const queryList = reactive({
            relicName: '', 
            relicLevel: '', 
            relicState: '', 
            maintTimeStart: '', 
            maintTimeEnd: '', 
            maintContent: '', 
            displayPosition: '', 
            displayTimeStart: '', 
            displayTimeEnd: '', 
            stockTimeStart: '', 
            stockTimeEnd: ''
        }) 
        const clearQueryList = () => {      
            queryList.relicName = '', 
            queryList.relicLevel = '', 
            queryList.relicState = '', 
            queryList.maintTimeStart = '', 
            queryList.maintTimeEnd = '', 
            queryList.maintContent = '', 
            queryList.displayPosition = '', 
            queryList.displayTimeStart = '', 
            queryList.displayTimeEnd = '', 
            queryList.stockTimeStart = '', 
            queryList.stockTimeEnd = '' 
        }

        const removeTag = (id) => {
            tags.value = tags.value.filter(item => item.id !== id)
        };


        const query = reactive({
            key: "0",
            email: "",
            name: "",
            address: '',
            position: '',
            auth: '',
            time: '',
            tips: '请输入需要查询的ID'
        });
        const pageIndex = ref(1);
        const pageSize =  ref(10); // 每页显示的行数
        const tableData = ref([]);
        const pageTotal = ref(0);
        
        // 分页导航
        const currentPageData = computed(() => {
        const start = (pageIndex.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return tableData.value.slice(start, end);
        });
        const totalItems = computed(() => tableData.value.length);
        const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
        
        const handlePageChange = (val) => {
            pageIndex.value = val;
            // getData();
        };

        
        // 查询操作
        //获取标签key值
        const handleSelectionKey = (selectOptions) =>  {
            query.key = selectOptions.id
            // console.log(query.key);
            if(query.key !== 0) {
                query.tips = "查询多个标签，请用“,”隔开"
                const res = tags.value.find(item => item.id === selectOptions.id)
                if(res == null) {
                    tags.value.push({
                        id: selectOptions.id,
                        value: selectOptions.value,
                        name: selectOptions.name
                    })
                }else {
                    ElMessage.error("该标签已经添加！！！");
                }
            }else{
                query.tips = "请输入需要查询的ID"
                tags.value = []
            }
        }
        const handleSearch = async (key ,text) => {
            if(text === "") {
                ElMessage.error("输入文本为空， 已为你返回全部信息！！！");
                getDataList()
            }else {
                if(key == "0") {
                    try {
                        //藏品id查询
                        const res = await getStockPlisById(text)
                        // console.log(res);
                        const list = [];
                        list.push(res.data)
                        if(list.length !== 0 && res.data != null) {
                            tableData.value = list
                            ElMessage.success("查询成功");
                        }else {
                            ElMessage.error("查询失败,不存在该藏品信息！！！");
                        } 
                    } catch (error) {
                        console.log(error);
                        ElMessage.error("输入错误，请输入要查找的用户ID");
                    }
                }else {
                    // console.log(queryList['relicName']);
                    console.log(tags.value[0].value);
                    const values = query.name.split("，")
                    values.forEach((value, index) => {
                        if (tags.value[index]) {
                        queryList[tags.value[index].value] = value.trim();
                        }
                    });
                    const { data : { dataList } } = await users(queryList.relicName,queryList.relicLevel,queryList.relicState,queryList.maintTimeStart,queryList.maintTimeEnd,
                    queryList.maintContent,queryList.displayPosition,queryList.displayTimeStart,queryList.displayTimeEnd,queryList.stockTimeStart,queryList.stockTimeEnd,)
                    // console.log(res);
                    if(dataList.length > 0) {
                    tableData.value = dataList
                    ElMessage.success("查询成功")
                    }else {
                        ElMessage.error("查询失败，不存在该藏品信息");
                    }
                    clearQueryList()
                
                    // console.log(queryList);
                    // console.log(dataList);
                }
            }
        };

        
        
        

        // 删除操作
        const handleDelete = (index , row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(async () => {
                    // deleteEmployeeInfo()
                    // console.log(row.id);
                    const res = await delStockTakeById(parseInt(row.id , 10))
                    // console.log(res);
                    if(res.code == 200) {
                        ElMessage.success("删除成功");
                        getDataList()
                    }
                })
                .catch(err => {
                        ElMessage.error("删除失败");
                        console.log(err)
                    })
        };

        //批量删除
        const isVisible = ref(false);
        const isOK = ref(false);
        const ids = reactive({
            ids: '',
        })
        const handleSelectionChange = (selection) => {
            ids.ids = selection.map(e => e.id).join(",")
        }
        const handleConfirm = async () => {
            isOK.value = false
            const res = await delEmployeesInfoBySelect(ids.ids)
            // console.log(res);
            if(res.code == 200) {
                ElMessage.success("删除成功！！！")
                getDataList()
            }
        }
        const handleCancel = () => {
            isOK.value = false
        }

        

        //新增员工时弹窗和保存
        const addVisible = ref(false);
       
        // console.log(userList); 
        let addform = reactive({
            relicId: '',
            maintId: '',
            displayId: '',
            storeId: '',
        })
        const addshow = () => {
            // console.log("123")
            addVisible.value = true;
            // console.log(addVisible.value)
        };
        const saveAdd = async () => {
            // console.log(addform);
            await addStockTake(addform.relicId, addform.maintId,addform.displayId, addform.storeId
            ).then(res => {
                // console.log(123)
                console.log(res)
                if(res.code !== 200) {
                    ElMessage.error("增添失败!!! 未找到该藏品信息，请检查id是否正确!")
                    return
                }else {
                    //刷新列表
                    ElMessage.success("增添成功!!!")
                    getDataList()
                }
                // const { data } = getEmployeeAll()
                // tableData = data
                
               
            }).catch(err => {
                console.log(err)
            })
            addVisible.value = false
        }

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            id: '',
            relicId: '',
            maintId: '',
            displayId: '',
            storeId: '',
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            // console.log(row); 
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            // console.log(form);
            editVisible.value = true;
        };
        const saveEdit = async () => {
            editVisible.value = false;
            // console.log(form);
            await editStockTake(form.id, form.relicId , form.maintId, form.displayId, form.storeId).then(res => {
                // console.log(addform)
                // console.log(res)
                if(res.code == 200) {
                    ElMessage.success(`修改第 ${idx + 1} 行成功`);
                    getDataList()
                    
                    // console.log(addform);
                }else {
                    ElMessage.error("修改失败!!! 未找到该藏品信息，请检查id是否正确")
                }
            }).catch(err => {
                console.log(err)
            })
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        return {
            queryList,
            selectOptions,
            removeTag,
            tags,
            getDataList,
            totalPages,
            currentPageData,
            totalItems,
            handleSelectionKey,
            isOK,
            handleConfirm,
            handleCancel,
            isVisible,
            handleSelectionChange,
            pageIndex,
            pageSize,
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
            addshow,
            saveAdd,
            addVisible,
            addform
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
.popconfirm {
    margin: 20px 0;
}
</style>
