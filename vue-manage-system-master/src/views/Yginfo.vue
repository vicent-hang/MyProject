<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 员工信息
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
                <el-button type="primary" @click="addshow">新增员工</el-button>
                <el-button type="primary" @click="isVisible = !isVisible">批量删除</el-button>
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
                        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="name" label="用户名"></el-table-column>
                        <el-table-column prop="userId" label="员工号"  align="center"></el-table-column>
                        <el-table-column prop="phone" label="电话"></el-table-column>
                        <el-table-column label="账户余额">
                            <template #default="scope">￥{{ scope.row.salary }}</template>
                        </el-table-column>
                        <!-- <el-table-column label="头像(查看大图)" align="center">
                            <template #default="scope">
                                <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
                                </el-image>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="positionName" label="职位"></el-table-column>
                        <el-table-column prop="roleName" label="担任角色"></el-table-column>
                        <el-table-column prop="email" label="地址"></el-table-column>
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
        
                        <el-table-column prop="workTime" label="工作时间"></el-table-column>
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
                <el-form-item label="员工号">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="工资">
                    <el-input v-model="form.salary"></el-input>
                </el-form-item>
                <el-form-item label="所在岗位">
                    <el-select v-model="form.workPosition" placeholder="选择岗位" class="handle-select mr10" 
                    @change = "handlePositionChange">
                    <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"    :value="item.id"/>
                        <!-- <el-option key="1" label="用户ID" value="1"></el-option>
                        <el-option key="2" label="用户ID" value="2"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="form.auth" placeholder="选择权限" class="handle-select mr10" 
                    @change = "handleAuthChange">
                        <el-option key="1" label="超级管理员" value="1"></el-option>
                        <el-option key="2" label="藏品管理员" value="2"></el-option>
                        <el-option key="3" label="安保管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上班时间">
                    <el-time-select
                        v-model="form.workTime"
                        style="width: 240px"
                        start="08:30"
                        step="00:15"
                        end="18:30"
                        placeholder="选择上班时间"
                    />
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
        <el-dialog title="新增用户" v-model="addVisible" width="30%">
            <el-form label-width="70px">
                <!-- <el-form-item label="id">
                    <el-input v-model="addform.id"></el-input>
                </el-form-item> -->
                <el-form-item label="员工号">
                    <el-input v-model="addform.userId"></el-input>
                </el-form-item> 
                <el-form-item label="工资">
                    <el-input v-model="addform.salary"></el-input>
                </el-form-item>
                <el-form-item label="所在岗位">
                    <el-select v-model="query.position" placeholder="选择岗位" class="handle-select mr10" 
                    @change = "handlePositionChange">
                    <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"    :value="item.id"/>
                        <!-- <el-option key="1" label="用户ID" value="1"></el-option>
                        <el-option key="2" label="用户ID" value="2"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="query.auth" placeholder="选择权限" class="handle-select mr10" 
                    @change = "handleAuthChange">
                        <el-option key="1" label="超级管理员" value="1"></el-option>
                        <el-option key="2" label="藏品管理员" value="2"></el-option>
                        <el-option key="3" label="安保管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上班时间">
                    <el-time-select
                        v-model="query.time"
                        style="width: 240px"
                        start="08:30"
                        step="00:15"
                        end="18:30"
                        placeholder="选择上班时间"
                    />
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
import { ref, reactive, onMounted, computed, popScopeId } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import { useStore } from "vuex";
import { addNewEmployee, delEmployeesInfoBySelect, deleteEmployeeInfo, getEmployeeInfoByPage, getEmployeeAll, getEmployeeById, setEmpoyeeInfo } from "../api/employee";
import store from "../store";
export default {
    name: "yginfo",
    mounted () {
    },
    setup() {
        // 获取表格数据
        const getDataList =async () => {
            await getEmployeeAll().then(res => {
                // console.log(res);
                const ygInfoList = res.data.map((e) => {
                    return {
                        id: e.id,
                        name: e.name,
                        positionName: e.positionName,
                        roleName: e.roleName,
                        phone: e.phone,
                        email: e.email,
                        workTime: e.workTime,
                        // state: e.state,
                        salary: e.salary,
                        userId: e.userId
                    }
                })
                tableData.value = ygInfoList
                // console.log(res.data.length)
                pageTotal.value = tableData.value.length;
                // setTimeout(() => {
                // },1000)
            })
        }

        //获取职工信息
        const positionList = ref([])
        //获取用户表信息
        const userList = ref([])
        onMounted(async () => {
            getDataList()
            // getWorkList()
            const store = useStore();
            store.dispatch('workposition/getpositionList').then(() => {
            const res   =  store.state.workposition.positionList 
            // console.log(res);
            positionList.value = res.map((e) => {
                return {
                    id: e.id,
                    positionName: e.positionName
                }
            })
            // console.log(positionList.value);
            })
        })

        //模糊查询
        const selectOptions = ref([
            {id: 0, name: 'ID', value: 'ID'},
            {id: 1, name: '名字', value: 'name'},
            {id: 2, name: '电话', value: 'phone'},
            {id: 3, name: '邮箱', value: 'email'},
            {id: 4, name: '所在岗位', value: 'positionName'},
            {id: 5, name: '上班时间', value: 'workTime'},
            {id: 6, name: '最低工资', value: 'minSalary'},
            {id: 7, name: '最高工资', value: 'maxSalary'},
            {id: 8, name: '权限名', value: 'roleName'}
        
        ])
        const tags = ref([])

        const queryList = reactive({
            name: '', 
            phone: '', 
            email: '', 
            positionName: '', 
            workTime: '', 
            minSalary: '', 
            maxSalary: '', 
            roleName: '', 
        }) 
        const clearQueryList = () => {      
            queryList.name = '', 
            queryList.phone = '', 
            queryList.email = '', 
            queryList.positionName = '', 
            queryList.workTime = '', 
            queryList.minSalary = '', 
            queryList.maxSalary = '', 
            queryList.roleName = ''
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
                        const res = await getEmployeeById(text)
                        // console.log(res);
                        if(res.data.length !== 0) {
                            tableData.value = res.data
                            ElMessage.success("查询成功");
                        }else {
                            ElMessage.error("查询失败,不存在该员工信息！！！");
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
                    const { data : { dataList } } = await getEmployeeInfoByPage(queryList.name,queryList.phone,queryList.email,queryList.positionName,queryList.workTime,
                    queryList.minSalary,queryList.maxSalary,queryList.roleName)
                    // const res = await getEmployeeInfoByPage(queryList.name,queryList.phone,queryList.email,queryList.positionName,queryList.workTime,
                    // queryList.minSalary,queryList.maxSalary,queryList.roleName)
                    // console.log(dataList);
                    if(dataList.length > 0) {
                        tableData.value = dataList
                        ElMessage.success("查询成功");
                    }else {
                        ElMessage.error("查询失败");
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
                    const res = await deleteEmployeeInfo(parseInt(row.id , 10))
                    console.log(res);
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
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
        //岗位下拉菜单
        const positionId = reactive({
            id: ''
        })
        const handlePositionChange = (value) => {
            positionId.id = value
            console.log( positionId.id);
        }
        const authId = reactive({
            id: ''
        })
        const handleAuthChange = (value) => {
            authId.id = value
            console.log(authId.id);
        }

        const addVisible = ref(false);
       
        // console.log(userList); 
        let addform = reactive({
            // id: '',
            userId: '',
            salary: '',
            workTime: '',
            workPosition: '',
            auth: ''
        })
        const addshow = () => {
            // console.log("123")
            addVisible.value = true;
            
            // console.log(addVisible.value)
        };
        const saveAdd = async () => {

            addform.workPosition = positionId.id
            addform.auth = authId.id
            addform.workTime = query.time
            console.log(query.time);
            // console.log(addform.workPosition);
            await addNewEmployee(addform.userId,addform.salary, addform.workTime,
                addform.workPosition,
                addform.auth,
            ).then(async res => {
                // console.log(123)
                // console.log(res)
                if(res.code !== 200) {
                    ElMessage.error("增添失败!!! 未找到该员工的用户ID或已存在!")
                }else {
                    //刷新列表
                    ElMessage.success("增添成功!!!")
                    await getEmployeeAll().then(res => {
                        tableData.value = res.data
                    })
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
            userId: '',
            salary: '',
            workPosition: '',
            auth: '',
            workTime: ''
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
            await setEmpoyeeInfo(form.id,form.userId,form.salary,form.workPosition,form.auth,form.workTime).then(res => {
                // console.log(form)
                // console.log(res)
                getDataList()
            }).catch(err => {
                console.log(err)
            })

            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        return {
            removeTag,
            selectOptions,
            tags,
            queryList,
            handleAuthChange,
            positionList,
            handlePositionChange,
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
