import React, { PureComponent } from 'react'
import { Card, Table, Button, message, Modal } from 'antd';
import LinkButton from '@/components/link-button'
import {
    PlusOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { reCategorys, reAddCategory, reUpdateCategory } from '@/services';
import AddForm from './add-form'
import UpDateForm from './update-form'
export default class Category extends PureComponent {
    constructor() {
        super()
        this.state = {
            isloading: false,//是否正在获取数据
            showStatus: 0,//添加标识.更新确认框是否显示 0:都不显示 1:显示添加 2 显示更新
            parentId: '0',
            parentName: '',
            subCategorys: [],
            categorys: [], //一级分类列表
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                },
                {
                    title: '操作',
                    width: 300,
                    render: (category) => (
                        <span>
                            <LinkButton onClick={() => { this.showUpdate(category) }}>修改分类</LinkButton>
                            {
                                this.state.parentId === "0" ? <LinkButton onClick={(e) => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null
                            }
                        </span>
                    )
                }
            ],
        }
    }
    // 异步获取一级或二级分类
    //  parentId :如果没有传根据转态中的parentId请求,指定了根据指定的请求
    getCategorys = async (parentId) => {
        parentId = parentId || this.state.parentId
        //发请求前.显示loading
        this.setState({ isloading: true })
        //发异步AJAX请求,获取数据
        const res = (await reCategorys(parentId)).data
        this.setState({ isloading: false })
        if (res.status === 0) {
            const categorys = res.data
            if (parentId === '0') {
                //获取一级
                this.setState({
                    categorys: categorys
                })
            } else {
                //获取二级
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    //重新显示一级分类
    showCateGorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }
    //显示对应点击的二级分类列表
    showSubCategorys = (category) => {
        this.category = category
        //更新转态
        this.setState({
            parentId: category.id,
            parentName: category.name
        }, () => {//setState 在状态更新且重新render()之后执行；
            // console.log(this.state.parentId);
            // console.log(this.state.parentName);
            this.getCategorys()
        })
    }
    // 添加分类
    addCategory =  () => {
        this.form.validateFields().then( async (values) => {
            //隐藏确认框
            this.setState({
                showStatus: 0
            })
            // 收集数据
            console.log(this.category);
            // const categoryName = this.category ? "二级分类" : '一级分类'
            const name = this.form.getFieldValue('name')
            const parentId = this.form.getFieldValue('parentId')
            const parentName = this.category ? this.category.name : null
            console.log({ name, parentId, parentName });
            // 2. 发送更新请求
            const res = (await reAddCategory({ name, parentId, parentName })).data
            if (res.status === 0) {
                //3. 重新显示列表(添加分类就是当前分类)
                if (parentId === this.state.parentId) {
                    this.getCategorys()
                } else if (parentId === "0") {
                    // 在二级分类添加一级分类 ,重新获取一级分类,但是不需要返回显示
                    this.getCategorys('0')
                }
            }
        }).catch(()=>{

        })
    }
    //更新分类
    updateCategory = () => {

        this.form.validateFields().then(async (values) => {
            //1. 隐藏确定框
            this.setState({
                showStatus: 0
            })
            //准备数据
            const categoryName = this.category.categoryName
            const id = this.category.id
            const name = this.form.getFieldValue('name')
            const parentId = this.category.parentId
            const parentName = this.category.parentName
            // 2. 发送更新请求
            const res = (await reUpdateCategory({ categoryName, id, name, parentId, parentName })).data
            console.log({ categoryName, id, name, parentId, parentName });
            if (res.status === 0) {
                //3. 重新显示列表
                this.getCategorys()
            }
        }).catch(() => {

        })
    }

    //取消模态框  0:都不显示 1:显示添加 2 显示修改
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    showUpdate = (category) => {
        this.category = category
        this.setState({
            showStatus: 2
        })
    }
    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const { isloading, parentId, parentName, categorys, subCategorys, columns, showStatus } = this.state
        //读取指定分类
        const category = this.category || "" //如果没有指定空对象

        const title = parentId === '0' ? "一级分类列表" : (
            <span>
                <LinkButton onClick={this.showCateGorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ margin: '5px' }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered={true}
                    loading={isloading}
                    rowKey='id'
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={columns}
                    pagination={{ defaultPageSize: 7, showQuickJumper: true }}
                />
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    destroyOnClose={true}
                    onCancel={this.handleCancel}>
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        getForm={(values) => { this.form = values }}
                    ></AddForm>
                </Modal>
                <Modal
                    title="更新分类"
                    height={250}
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    destroyOnClose={true}
                    onCancel={this.handleCancel}
                    style={{ position: 'relative' }}
                // footer={[
                //     <Button 
                //     key="cancel" 
                //     onClick={this.handleCancel}
                //     >
                //         Cancel
                //     </Button>
                // ]}

                >
                    <UpDateForm
                        name={category.name}
                        getForm={(values) => { this.form = values }}
                    ></UpDateForm>
                </Modal>
            </Card>

        )
    }
}
