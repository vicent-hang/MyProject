import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { ElMessage, ElMessageBox } from "element-plus";




const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "/ygwork",
                name: "ygwork",
                meta: {
                    title: '员工工作汇报'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Ygwork.vue")
            },
            {
                path: "/yginfo",
                name: "yginfo",
                meta: {
                    title: '员工信息'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Yginfo.vue")
            },
            {
                path: "/yonghuinfo",
                name: "yonghuinfo",
                meta: {
                    title: '用户信息'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/yonghuinfo.vue")
            },
            {
                path: "/cpinfo",
                name: "cpinfo",
                meta: {
                    title: '藏品信息'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpmanage/Cpinfo.vue")
            },
            {
                path: "/cpflmanage",
                name: "cpflmanaghe",
                meta: {
                    title: '藏品分类和标签管理'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpmanage/Cpflmanage.vue")
            },
            {
                path: "/cpbymanage",
                name: "cpbymanaghe",
                meta: {
                    title: '藏品保养记录管理'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpmanage/Cpbymanage.vue")
            },
            {
                path: "/cpshow",
                name: "cpshow",
                meta: {
                    title: '藏品展览管理'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpmanage/Cpshow.vue")
            },
            // {
            //     path: "/cpckmanage",
            //     name: "cpckmanaghe",
            //     meta: {
            //         title: '仓库管理'
            //     },
            //     component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Cpmanage/Cpckmanage.vue")
            // }, 
            {
                path: "/inku",
                name: "inku",
                meta: {
                    title: '藏品入库审核'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpsave/Inku.vue")
            },
            {
                path: "/chuku",
                name: "chuku",
                meta: {
                    title: '藏品出库审核'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpsave/Chuku.vue")
            },
            {
                path: "/cppd",
                name: "cppd",
                meta: {
                    title: '藏品定期盘点记录'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpsave/Cppd.vue")
            },
            {
                path: "/kfjk",
                name: "kfjk",
                meta: {
                    title: '库房环境监控'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Cpsave/Kfjk.vue")
            },
            {
                path: "/sbgz",
                name: "sbgz",
                meta: {
                    title: '设备故障和修复记录'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Sbmanage/Sbgz.vue")
            },
            {
                path: "/sbinfo",
                name: "sbinfo",
                meta: {
                    title: '设备信息管理'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Sbmanage/Sbinfo.vue")
            },
            {
                path: "/sbwx",
                name: "sbwx",
                meta: {
                    title: '设备维修和保养记录'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Sbmanage/Sbwx.vue")
            },
            {
                path: "/sbyuancheng",
                name: "sbyuancheng",
                meta: {
                    title: '设备远程控制'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Sbmanage/Sbyuancheng.vue")
            },
            {
                path: "/manage",
                name: "manage",
                meta: {
                    title: '系统管理'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Manage.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/email",
                name: "sendEmail",
                meta: {
                    title: '邮件'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/SendEmail.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Register.vue")
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});


//路由导航守卫
const normalPage = ['/dashboard', '/manage', '/email','/user'];

const rolePermissions = {
  '超级管理员': ['/dashboard', '/manage', '/email'],
  '藏品管理员': ['/Cpinfo', '/Cpflmanage', '/Cpbymanage', '/Cpshow', '/Inku', '/Chuku', '/Cppd', '/login', ...normalPage],
  '安保管理员': ['/sbinfo', '/sbwx', '/Kfjk', '/login', ...normalPage],
  // 其他角色的权限配置
};

const hasPermission = (role, path) => {
  const allowedPermissions = rolePermissions[role];
  return role === '超级管理员' || allowedPermissions.includes(path);
};

const beforeEachGuard = (to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path === '/login') {
    // 访问登录页面，直接放行
    next();
  } else if (token == null) {
    // 没有 token 且不是访问登录页面，跳转到登录页
    next('/login');
  } else {
    const role = localStorage.getItem('ms_roleName');

    if (hasPermission(role, to.path)) {
      // 有权限访问的页面，放行
      next();
    } else {
      // 没有权限访问的页面，跳转到首页并给予提示
      ElMessageBox.confirm(
        `您没有权限访问该页面`,
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        next(false);
      }).catch(() => {
        // 取消操作
        next(false);
      });
    }
  }
};

router.beforeEach(beforeEachGuard);

  



export default router;