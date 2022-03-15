import React, { PureComponent } from 'react'

import {
    Card,
    Button,
    Table,
    Modal,
    message,
} from 'antd'
import { PAGE_SIZE } from '@/utils/constants'
import { reGetRoles, reAddRole,/*reUpdataRole*/ } from '@/services';
import AddForm from './add-form'
import AuthForm from './auth-form'
export default class Role extends PureComponent {
    constructor() {
        super()
        this.state = {
            roles: [], //所有roles
            role: {},
            columns: [],
            isShowAdd: false, //是否添加显示角色
            isShowAuth: false,
            // authRef: React.forwardRef()
        }
    }
    initColumns = () => {
        this.setState({
            columns: [
                {
                    title: '角色名称',
                    dataIndex: 'name',
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '授权时间',
                    dataIndex: 'authTime',
                },
                {
                    title: '授权人',
                    dataIndex: 'authName',
                },
            ]
        })
    }
    getRoles = async () => {
        const result = (await reGetRoles()).data
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            }
        }
    }
    // 添加角色
    addRole = () => {

        this.form.validateFields().then(async values => {
            //隐藏确认框
            this.setState({
                isShowAdd: false
            })
            //收集数据
            // console.log(values);
            const { roleName } = values
            console.log(roleName);
            this.form.resetFields()
            //请求添加
            const result = (await reAddRole(roleName))
            // console.log(result);
            if (result.status === 200) {
                message.success('添加用户成功')
                this.getRoles()
                // const role = result.data
                //更新的数据基于原本数据更新 用函数更新
                // const roles = [...this.state.roles]
                // roles.push(role)
                // this.setState({
                //     roles
                // })

                // this.setState(state => ({
                //     roles: [...state.roles, role]
                // }))

            } else {
                message.error('添加用户失败')
            }
            //显示
        }).catch(() => {

        })

    }
    //更新jueshe
    updateRole = async () => {
        // const role=this.state.role
        // console.log(this.state.authRef.current);
        // const menus = this.state.authRef.current.getMenus()
        // role.menus=menus
        //请求更新
        //隐藏确认框
        this.setState({
            isShowAdd: false
        })
        // const result =(await reUpdataRole(role) ).data
        // if (result.status===0){
        //     message.success('设置权限成功')

        // }
    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role, columns, isShowAdd, isShowAuth } = this.state
        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role.id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
            </span>
        )

        return (
            <Card
                title={title}
            >
                <Table
                    bordered={true}
                    rowKey='id'
                    dataSource={roles}
                    columns={columns}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role.id],
                        onSelect: (role) => { //选择某个'radio 回调
                            this.setState({
                                role
                            })
                        }
                    }}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                    onRow={this.onRow}
                >
                </Table>
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({
                            isShowAdd: false

                        })
                        this.form.resetFields()
                    }}>
                    <AddForm

                        getForm={(values) => { this.form = values }}
                    ></AddForm>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({
                            isShowAuth: false

                        })

                    }}>
                    <AuthForm
                        role={role}
                    // ref={authRef}
                    >

                    </AuthForm>
                </Modal>
            </Card >
        )
    }
}
