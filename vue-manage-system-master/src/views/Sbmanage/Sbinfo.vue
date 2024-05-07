<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 设备信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="设备ID" class="handle-select mr10" @change="selecionChange">
                    <el-option key="1" label="设备ID" :value="1"></el-option>
                    <el-option key="2" label="设备名称" :value="2"></el-option>
                    <!-- <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                </el-select>
                <el-input v-model="query.name" placeholder="请输入您要查询用户ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch(query.name)">搜索</el-button>
                <!-- <el-button type="primary" @click="addshow">新增设备</el-button> -->
                <!-- <el-button type="primary" @click="isVisible = !isVisible">批量删除</el-button> -->

            </div>
            <el-table :data="currentPageData"  border class="table" ref="multipleTable"
                header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column v-if="isVisible" type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="设备ID" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="设备名称"></el-table-column>
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template #default="scope">
                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
                        </el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="type" label="设备类型"></el-table-column>
                <el-table-column prop="situation" label="维修状态"></el-table-column>

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
                <el-table-column label="操作" fixed="right">
                    <template #default="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope)">删除</el-button>
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
            <!-- 分页 -->
            <el-pagination
                background
                @current-change="handlePageChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                :total="totalItems"
            />
            

            <!-- 分页 -->
            <!-- <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户手机">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="登录账号">
                    <el-input v-model="form.loginAct"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="form.loginPwd"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="账号过期时间">
                    <div class="block">
                        <el-date-picker
                            v-model="addform.expireTime"
                            type="datetime"
                            placeholder="选择日期和时间"
                            value-format="YYYY-MM-DD h:m:s"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="query.auth" placeholder="选择权限" class="handle-select mr10" 
                    @change = "handleAuthChange">
                        <el-option key="1" label="超级管理员" value="1"></el-option>
                        <el-option key="2" label="藏品管理员" value="2"></el-option>
                        <el-option key="3" label="安保管理员" value="3"></el-option>
                    </el-select>
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
                <el-form-item label="用户名">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="用户手机">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
                <el-form-item label="登录账号">
                    <el-input v-model="addform.loginAct"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="addform.loginPwd"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input v-model="addform.email"></el-input>
                </el-form-item>
                <el-form-item label="账号过期时间">
                    <div class="block">
                        <el-date-picker
                            v-model="addform.expireTime"
                            type="datetime"
                            placeholder="选择日期和时间"
                            value-format="YYYY-MM-DD HH:mm:ss"
                        />
                        </div>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="query.auth" placeholder="选择权限" class="handle-select mr10" 
                    @change = "handleAuthChange">
                        <el-option key="1" label="超级管理员" value="1"></el-option>
                        <el-option key="2" label="藏品管理员" value="2"></el-option>
                        <el-option key="3" label="安保管理员" value="3"></el-option>
                    </el-select>
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
import { ref, reactive, onMounted ,computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api/index";
import { searchuserall, deleteUser, searchuser, adduser, editUser, delUserBySelect } from "../../api/user";
import { getSBInfoById, getSbList } from "../../api/sbmanage";

export default {
    name: "yonghuinfo",
    setup() {
        onMounted(() => {
            getData()
        });
        const getData = async () => {
            await getSbList().then(res => {
                // console.log(res)
                tableData.value = res.data
                // console.log(tableData.value)
                pageTotal.value = tableData.value.length;
                // console.log(tableData.value.length);
            })
        }
        const query = reactive({
            address: "",
            key: '1',
            name: "",
            pageIndex: 1,
            pageSize: 10,
            ids: '',
            date: '',
            auth: ''
        });
        const tableData = ref([]);
        

        // 查询操作
        const selecionChange = (val) =>{
            query.key = val
        }
        const handleSearch = async (text) => {
            // query.pageIndex = 1;
            // getData();
            // console.log(e)
            
                if(text === "") {
                    ElMessage.error("输入文本为空， 已为你返回全部信息！！！");
                    getData();
                }else {
                    if(query.key == '1') {
                        await getSBInfoById(text).then(res => {
                        if(res.code == 200 && res.data.length > 0) {
                            // console.log(res);
                            tableData.value = res.data
                            ElMessage.success("查询成功");
                        }else {
                            ElMessage.error("查询失败,不存在该设备ID！！！");
                        } 
                    })  
                    }else if(query.key == '2') {
                        //名称查询
                        // 使用正则表达式构建模糊匹配的规则
                        const regex = new RegExp(text,'i'); // 'i' 表示不区分大小写
                        tableData.value = tableData.value.filter((item) => regex.test(item.name))
                        console.log(tableData.value);
                        if(tableData.value.length != 0) {
                            ElMessage.success('查询成功!')
                            // console.log(res.data.current);                        
                        }else {
                            ElMessage.error('该设备不存在！');
                        }
                    }
                }
            }
        // 分页导航
        const pageIndex = ref(1);
        const pageSize =  ref(10); // 每页显示的行数
        const pageTotal = ref(0);
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

        // 删除操作
        const handleDelete = (scope) => {
            // 二次确认删除
            console.log(scope.row.id)
            console.log(scope.$index)

            // console.log(row)
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {

                    deleteUser(scope.row.id).then(res => {
                        ElMessage.success("删除成功");
                        console.log(res)
                        tableData.value.splice(scope.$index, 1);
                    }).catch(err => {
                        ElMessage.error("删除失败");
                        console.log(err)
                    })

                })
                .catch(() => { });
        };

        //批量删除
        const isVisible = ref(false);
        const isOK = ref(false);
        // const idList  = ref([])
        const handleSelectionChange = (selection) => {
            query.ids = selection.map(e => e.id).join(",")
            // console.log(query.ids);
            // idList.value = ids
            // console.log(idList.value);
        }
        const handleConfirm = async () => {
            try {
                isOK.value = false
                await delUserBySelect(query.ids)
                ElMessage.success("删除成功");
                getData();
            } catch (error) {
                console.log(error);
            }
            
            // console.log(res);
        }
        const handleCancel = () => {
            isOK.value = false
        }

        //新增用户时弹窗和保存
        //状态菜单
        let startId = reactive({
            id: ''
        })
        const handleAuthChange = (value) => {
            startId.id = value
            console.log(startId.id);
        }

        const addVisible = ref(false);
        let addform = reactive({
            loginAct: '',
            loginPwd: '',
            name: "",
            phone: "",
            email: "",
            expireTime: "",
            state: "",
        })
        const addshow = () => {
            // console.log("123")
            addVisible.value = true;
            
            // console.log(addVisible.value)
        };
        const saveAdd =async () => {
            addVisible.value = false
            // console.log()
            addform.state = startId.id
            console.log(addform.expireTime);
            // addform.expireTime = `${addform.expireTime.getFullYear()}:${(addform.expireTime.getMonth() + 1).toString().padStart(2, '0')}:${addform.expireTime.getDate().toString().padStart(2, '0')}`;
            // console.log(addform.expireTime);
            // console.log(addform.state);
            await adduser(addform.loginAct, addform.loginPwd, addform.name,
                addform.phone,
                addform.email,
                addform.expireTime,
                addform.state
            ).then(res => {
                // console.log(123)
                console.log(res)
                getData()
            }).catch(err => {
                console.log(err)
            })
        }
        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            id: "",
            name: "",
            loginAct: "",
            loginPwd: "",
            phone: "",
            email: "",
            date: "",
            state: ""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            // console.log(row[item])
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            //缺少token
            form.state = startId.id
            
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            console.log(form.state);
            editUser(form).then(res => {
                // console.log(form.id)
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
            ElMessage.success(`修改 id为 ${form.id} 的用户信息成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        return {
            handleAuthChange,
            pageIndex,
            totalItems,
            totalPages,
            currentPageData,
            isOK,
            isVisible,
            handleCancel,
            handleConfirm,
            handleSelectionChange,
            query,
            tableData,
            pageTotal,
            editVisible,
            addVisible,
            form,
            addform,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            addshow,
            saveAdd,
            selecionChange
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
