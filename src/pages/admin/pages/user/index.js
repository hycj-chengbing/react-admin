import React, { PureComponent } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import LinkButton from '@/components/link-button'
import { PAGE_SIZE } from '@/utils/constants'
import { reGetUsers, reFindRole, reDeleteUser, reAddUsers, reUpdateUser } from '@/services';
import UserForm from './user-form';
const { confirm } = Modal;
export default class User extends PureComponent {
    constructor() {
        super()
        this.state = {
            isShow: false,
            users: [], //初始用户列表
            roles: [],
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'name'
                },
                {
                    title: '邮箱',
                    dataIndex: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'phone'
                },
                {
                    title: '注册时间',
                    dataIndex: 'createTime'
                },
                {
                    title: '所属角色',
                    dataIndex: 'roleId',
                    // render: (roleId) => {
                    //     this.getRole(roleId)
                    //     console.log(this.state.roles);
                    //  return this.state.roles[roleId]
                    // }
                },

                {
                    title: '操作',
                    render: (user) => (
                        <span>
                            <LinkButton onClick={() => this.showUpdate(user)} >修改 </LinkButton>
                            <LinkButton onClick={() => { this.deleteUser(user) }}>删除</LinkButton>
                        </span>
                    )
                },
            ]
        }
    }
    getUsers = async () => {
        const result = await reGetUsers()
        if (result.status === 200) {
            console.log(result.data);
            const users = result.data
            this.setState({
                users
            })

        }
    }
    getRole = async (roleId) => {
        await reFindRole(roleId).then((res) => {
            let obj = []
            obj[roleId] = res.data.name
            console.log(res.data.name);
            this.setState({ roles: [...this.state.roles, obj] })
            console.log(this.state.roles);
        }).catch((err) => {

        });

    }
    //    删除用户
    deleteUser = (user) => {
        confirm({
            title: `确认删除${user.name}吗?`,
            onOk: async () => {
                const result = await reDeleteUser(user.id)
                console.log(result);
                if (result.status === 200) {
                    message.success("删除用户成功")
                    this.getUsers()
                }
            },

        });
    }
    // 显示修改页面
    showUpdate = (user) => {
        this.user = user
        this.setState({
            isShow: true
        })
    }
    showAdd=()=>{
        this.user=null
        this.setState({ isShow: true })
    }

    addOrUpdateUser = () => {
        this.form.validateFields().then(async values => {
            //隐藏确认框
            this.setState({
                isShowAdd: false
            })
            //收集数据
            console.log(values);
            this.form.resetFields()
            //请求添加
            if (this.user) {
                const {roleId}=values
                const result = (await reUpdateUser(roleId))
                // console.log(result);
                if (result.status === 200) {
                    message.success('修改用户成功')
                    this.getUsers()

                } else {
                    message.error('修改用户失败')
                }
            } else {
                const result = (await reAddUsers(values))
                // console.log(result);
                if (result.status === 200) {
                    message.success('添加用户成功')
                    this.getUsers()

                } else {
                    message.error('添加用户失败')
                }
            }

            //显示
        }).catch(() => {

        })
    }
    componentDidMount() {
        this.getUsers()

    }
    render() {
        const { users, columns, isShow } = this.state
        const user = this.user || {}
        const title = <Button type='primary' onClick={() => this.showAdd()}> 创建用户</Button>
        return (
            <Card title={title}>
                <Table
                    bordered={true}
                    rowKey='id'
                    dataSource={users}
                    columns={columns}
                    pagination={{ defaultPageSize: PAGE_SIZE, }}
                />
                <Modal
                    title={user.id ? "修改用户" : "添加用户"}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({ isShow: false })}>
                    <UserForm
                        getForm={(values) => { this.form = values }}
                        user={user}
                    ></UserForm >
                </Modal>
            </Card>
        )
    }
}
