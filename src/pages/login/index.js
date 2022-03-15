import React, { PureComponent } from 'react'
import './style.less'
import logo from '@/assets/img/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'

import { reLogin } from '@/services'
import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'
export default class Login extends PureComponent {

    onFinish = async (values) => {
        console.log('Received values of form: ', values);
        // 请求登录

        const { name, password } = values
        const res = (await reLogin({ name, password })).data
        // console.log("请求成功", res);
        if (res.status === 0) {//登陆成功
            message.success('登陆成功')

            //保存users
            const user = res.data
            memoryUtils.user = user//保存在内存中
            storageUtils.saveUser(user)//保存到local中
            //跳转到管理页面(不需要回退)
            this.props.history.replace('/admin')

        } else {//登录失败
            message.error("登陆失败: 用户名或密码错误")
        }
    };
    onFinishFailed = (value) => {
        console.log("检验失败");
    }
    render() {
        //如果用户已经登录,自动跳转到登录页面
        const user = memoryUtils.user
        //如果内存中没有user ==>没有登录
        if (user && user.id) {
            return <Redirect to="/admin" />
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"></img>
                    <h1> React项目:后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        {/*  用户与密码
                        1. 必须输入
                        2. 必须大于四位
                        3. 必须小于12位
                        4. 必须是英文,数字下划线
                        */}
                        <Form.Item
                            name="name"
                            rules={[
                                // 声明式验证
                                { required: true, whitespace: true, message: '用户名必须输入!', },
                                { min: 5, message: "用户名至少5位" },
                                { max: 12, message: "用户名最多12位" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字、下划线" }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                style={{ color: 'rgba(0,0,0,0.25' }}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                // 声明式验证
                                { required: true, whitespace: true, message: '密码必须输入!', },
                                { min: 3, message: "密码至少3位" },
                                { max: 12, message: "密码最多12位" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "密码必须是英文、数字、下划线" }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                style={{ color: 'rgba(0,0,0,0.25' }}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>

                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
