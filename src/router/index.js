import React from 'react'
import { Redirect } from 'react-router-dom'

const Login = React.lazy(() => import("@/pages/login"));
const Admin = React.lazy(() => import("@/pages/admin"));


const Home = React.lazy(() => import("../pages/admin/pages/Home"));
const Category = React.lazy(() => import("../pages/admin/pages/category"));
const Product = React.lazy(() => import("../pages/admin/pages/product"));
const ProductAddUpdate  = React.lazy(() => import('../pages/admin/pages/product/add-update'));
const ProductHome  = React.lazy(() => import("../pages/admin/pages/product/home"));
const ProductDetail  = React.lazy(() => import("../pages/admin/pages/product/detail"));

const Role = React.lazy(() => import("../pages/admin/pages/role"));
const User = React.lazy(() => import("../pages/admin/pages/user"));
const Bar = React.lazy(() => import("../pages/admin/pages/charts/bar"));
const Pie = React.lazy(() => import("../pages/admin/pages/charts/pie"));
const Line = React.lazy(() => import("../pages/admin/pages/charts/line"));




const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to="/login" /> /* 重定向    注意:箭头函数的括号为()小括号   省略的return*/
        )
    },
    {
        path: "/login",
        exact: true,
        component: Login,

    },
    {
        path: "/admin",
        // exact: true, //不能精确匹配
        component: Admin,
        routes: [
            {
                path: "/admin",
                exact: true,
                render: () => (
                    <Redirect to="/admin/home" /> /* 重定向    注意:箭头函数的括号为()小括号   省略的return*/
                )
            },
            {
                path: "/admin/home",
                exact: true,
                component: Home,

            },
            {
                path: "/admin/category",
                exact: true,
                component: Category,
            },
            {
                path: "/admin/product",
                component: Product,
                routes: [
                    {
                        path: "/admin/product",
                        exact: true,
                        render: () => (
                            <Redirect to="/admin/product/home" /> /* 重定向    注意:箭头函数的括号为()小括号   省略的return*/
                        )
                    },
                     {
                        path: "/admin/product/home",
                        exact: true,
                        component: ProductHome,

                    },
                    {
                        path: "/admin/product/addupdate",
                        exact: true,
                        component: ProductAddUpdate,
                    },
                    {
                        path: "/admin/product/detail",
                        exact: true,
                        component: ProductDetail,
                    },
                ]
            },
            {
                path: "/admin/role",
                exact: true,
                component: Role,
            },
            {
                path: "/admin/bar",
                exact: true,
                component: Bar,
            },
            {
                path: "/admin/line",
                exact: true,
                component: Line,
            },
            {
                path: "/admin/pie",
                exact: true,
                component: Pie,
            },
            {
                path: "/admin/user",
                exact: true,
                component: User,
            },

        ]
    },
];
export default routes