import React, { memo, useState } from 'react'

import {
    Form,
    Input,
    Tree,
} from 'antd'


export default memo(function AuthForm(props) {

    const { role } = props
    const formItemLayout = {
        labelCol: { span: 4 }, //左侧 label 宽度
        wrapperCol: { span: 16 }, //右侧包裹(输入框)宽度
    }

    const treeData = [
        {
            title: '平台权限',
            key: '0-0',
            children: [
                {
                    title: '首页',
                    key: '/admin/home',

                },
                {
                    title: '商品',
                    key: '/admin/products',
                    children: [
                        {
                            title: '品类管理',
                            key: '/admin/category',

                        },
                        {
                            title: '商品管理',
                            key: '/admin/product',

                        },
                    ],
                },
                {
                    title: '用户管理',
                    key: '/admin/user',

                },
                {
                    title: '角色管理',
                    key: '/admin/role',

                },
                {
                    title: '图形图标',
                    key: '/admin/charts',
                    children: [
                        {
                            title: '柱形图',
                            key: '/admin/bar',

                        },
                        {
                            title: '折线图',
                            key: '/admin/line',

                        },
                        {
                            title: '饼图',
                            key: '/admin/pie',

                        },
                    ],
                },
            ],
        },
    ];
    const [checkedKeys, setcheckedKeys] = useState(role.menus)
    // const getMenus = () => checkedKeys
    const onCheck = (checkedKeys, info) => {

        setcheckedKeys(checkedKeys)
    };

  

    return (
        <Form >

            <Form.Item
                label="角色名称"
                {...formItemLayout}
            >
                <Input value={role.name}></Input>
            </Form.Item>
            <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                // defaultSelectedKeys={['0-0-0', '0-0-1']}
                // defaultCheckedKeys={role.menus}
                // onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
            />
        </Form>
    )
})

