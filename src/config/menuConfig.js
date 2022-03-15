import {
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    ToolOutlined,
    BarsOutlined,
} from '@ant-design/icons';
const menuList = [
    {
        title: '首页', //对应标题名
        path: '/admin/home', //对应path
        icon: <HomeOutlined />, //图标
        isPublic:true//公开
    },
    {
        title: '商品',
        path: '/admin/products',
        icon: <AppstoreOutlined />,
        children: [
            {
                title: '品类管理',
                path: '/admin/category',
                icon: <BarsOutlined />
            },
            {
                title: '商品管理',
                path: '/admin/product',
                icon: <ToolOutlined />
            }

        ]
    },
    {
        title: '用户管理',
        path: '/admin/user',
        icon: <UserOutlined />,
    },
    {
        title: '角色管理',
        path: '/admin/role',
        icon: <SafetyOutlined />,
    },
    {
        title: '图表',
        path: '/admin/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: '柱形图',
                path: '/admin/bar',
                icon: <SafetyOutlined />,
            },
            {
                title: '折线图',
                path: '/admin/line',
                icon: <SafetyOutlined />,
            },
            {
                title: '饼图',
                path: '/admin/pie',
                icon: <SafetyOutlined />,
            },
        ]
    },
]
export default menuList