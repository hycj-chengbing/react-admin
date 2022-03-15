import React, { memo, useEffect } from 'react'
import {
    Form,
    Input,
    Select
} from 'antd'
export default memo(function UserForm(props) {
    const [form] = Form.useForm()

    useEffect(() => {
        props.getForm(form)
    })
    const formItemLayout = {
        labelCol: { span: 4 }, //左侧 label 宽度
        wrapperCol: { span: 16 }, //右侧包裹(输入框)宽度
    }
    const { user } = props
    return (
        <Form form={form}   {...formItemLayout}>
            <Form.Item
                label="用户名"
                name='name'
                initialValue={user.name}
            >
                <Input placeholder="请输入用户名称"></Input>
            </Form.Item>
            {
                user.id ? null : (
                    <Form.Item
                        label="密码"
                        name='password'
                        initialValue={user.password}
                    >
                        <Input type='password' placeholder="请输入密码"></Input>
                    </Form.Item>
                )
            }
            <Form.Item
                label="手机号"
                initialValue={user.phone}
                name='phone'
            >
                <Input placeholder="请输入手机号"></Input>
            </Form.Item>
            <Form.Item
                label="邮箱"
                initialValue={user.email}
                name='email'
            >
                <Input placeholder="请输入邮箱"></Input>
            </Form.Item>
            <Form.Item
                label="角色"
                initialValue={user.roleId}
                name='roleId'
            >
                <Select placeholder="请选择角色" >
                    <Select.Option value='1'>运维</Select.Option>
                    <Select.Option value='2'>经理</Select.Option>
                    <Select.Option value='3'>客户</Select.Option>
                    <Select.Option value='4'>老板</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
})

