<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-cascades",
                index: "/manage",
                title: "系统管理",
            },
            {
                icon: "el-icon-lx-calendar",
                index: "101",
                title: "藏品管理",
                subs: [
                    {
                        index: "/Cpinfo",
                        title: "藏品信息管理",
                    },
                    // {
                    //     index: "/Cpflmanage",
                    //     title: "藏品分类和标签管理",
                    // },
                    {
                        index: "/Cpbymanage",
                        title: "藏品保养记录管理",
                    },
                    {
                        index: "/Cpshow",
                        title: "藏品展览记录管理",
                    },
                    // {
                    //     index: "/Cpckmanage",
                    //     title: "仓库管理",
                    // },

                ],
            },
            
            {
                icon: "el-icon-lx-settings",
                index: "102",
                title: "藏品保存管理",
                subs: [
                    
                    {
                        index: "/Inku",
                        title: "藏品入库审核",
                    },
                    {
                        index: "/Chuku",
                        title: "藏品出库审核",
                    },
                    {
                        index: "/Cppd",
                        title: "藏品定期盘点记录",
                    },

                ],
            },
            {
                icon: "el-icon-lx-people",
                index: "100",
                title: "人员管理",
                subs: [
                {
                        index: "/yonghuinfo",
                        title: "用户信息管理",
                    },
                    {
                        index: "/yginfo",
                        title: "员工信息管理",
                    },
                    // {
                    //     index: "/ygwork",
                    //     title: "员工工作汇报审核",
                    // },
                ],
            },
            {
                icon: "el-icon-lx-qrcode",
                index: "106",
                title: "设备管理",
                subs: [
                    {
                        index: "/Kfjk",
                        title: "库房环境监控",
                    },
                    {
                        index: "/sbinfo",
                        title: "设备信息管理",
                    },
                    // {
                    //     index: "/sbyuancheng",
                    //     title: "设备远程控制",
                    // },
                    {
                        index: "/sbwx",
                        title: "设备维修和保养管理",
                    },
                    // {
                    //     index: "/sbgz",
                    //     title: "设备故障和修复记录",
                    // },

                ],
            },
            {
                icon: "el-icon-lx-mail",
                index: "/email",
                title: "邮件",
            },


            
            // {
            //     icon: "el-icon-lx-cascades",
            //     index: "/table",
            //     title: "基础表格",
            // },
            // {
            //     icon: "el-icon-lx-copy",
            //     index: "/tabs",
            //     title: "tab选项卡",
            // },
            // {
            //     icon: "el-icon-lx-calendar",
            //     index: "3",
            //     title: "表单相关",
            //     subs: [
            //         {
            //             index: "/form",
            //             title: "基本表单",
            //         },
            //         {
            //             index: "/upload",
            //             title: "文件上传",
            //         },
            //         {
            //             index: "4",
            //             title: "三级菜单",
            //             subs: [
            //                 {
            //                     index: "/editor",
            //                     title: "富文本编辑器",
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // {
            //     icon: "el-icon-lx-emoji",
            //     index: "/icon",
            //     title: "自定义图标",
            // },
            // {
            //     icon: "el-icon-pie-chart",
            //     index: "/charts",
            //     title: "schart图表",
            // },
            // {
            //     icon: "el-icon-lx-global",
            //     index: "/i18n",
            //     title: "国际化功能",
            // },
            // {
            //     icon: "el-icon-lx-warn",
            //     index: "7",
            //     title: "错误处理",
            //     subs: [
            //         {
            //             index: "/permission",
            //             title: "权限测试",
            //         },
            //         {
            //             index: "/404",
            //             title: "404页面",
            //         },
            //     ],
            // },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
