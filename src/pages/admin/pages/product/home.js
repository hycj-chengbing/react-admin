/**
 * Product 默认子路由组件
 */
import React, { PureComponent } from 'react'
import LinkButton from '@/components/link-button'
import {
    PlusOutlined,
} from '@ant-design/icons';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'
import { reProducts, reSearchProductsByDesc, reSearchProductsByName, reUpdataStatus } from '@/services'
import { PAGE_SIZE } from '@/utils/constants'
const Option = Select.Option
export default class ProductHome extends PureComponent {
    constructor(props) {
        super()
        this.state = {
            total: 0,//商品种的数量
            loading: false,
            searchName: '', //搜索关键字
            searchType: 'searchByName',//搜索的类型
            products: [],
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'name',
                },
                {
                    title: '商品描述',
                    dataIndex: 'desc',
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    render: (price) => {
                        return '¥' + price //当前指定了对应的属性,传入的是对应的属性值
                    }
                },
                {
                    title: '状态',
                    // dataIndex: 'status',
                    width: 100,
                    render: (product) => {
                        const { status, id } = product
                        const newStatus=status===1?2:1
                        return (
                            <span>
                                <Button type='primary' onClick={e =>  this.updataStatus (id,newStatus) }>{status === 1 ? '下架' : '上架'}</Button>
                                <span>{status === 1 ? '在售' : '已下架'}</span>
                            </span>
                        )
                    }
                },
                {
                    title: '操作',
                    width: 100,
                    render: (product) => {
                        return (
                            <span>
                                {/* 将product对象使用state传递给目标路由组件 */}
                                <LinkButton onClick={() => this.props.history.push('/admin/product/detail', { product })}>详情</LinkButton>
                                <LinkButton onClick={() => this.props.history.push('/admin/product/addupdate',  product )}>修改</LinkButton>
                            </span>
                        )
                    }
                },
            ]
        }
    }

    /**
     * 获取指定的列表数据显示
     */
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({
            loading: true
        })

        const { searchName, searchType } = this.state
        //如果search有值,说明是要做搜索分页
        let res
        if (searchName) {
            if (searchType === 'searchByName') { //按名称
                res = await reSearchProductsByName({ searchName, pageNum, pageSize: PAGE_SIZE })
            } else {
                res = await reSearchProductsByDesc({ searchName, pageNum, pageSize: PAGE_SIZE })
            }
        } else {
            res = await reProducts({ pageNum, pageSize: PAGE_SIZE })
        }

        this.setState({
            loading: false
        })

        if (res.status === 200) {
            const { total, list } = res.data
            console.log(list);
            this.setState({
                total,
                products: list
            })
        }
    }
    // 更新商品的状态
    updataStatus = async (productId, status) => {
        const res = await reUpdataStatus(productId, status)
        if (res.status === 200) {
            message.success('商品更新成功')
            this.getProducts(this.pageNum)
        }
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total, columns, loading, searchType, searchName } = this.state

        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='searchByName'>按名称搜索</Option>
                    <Option value='searchByDesc'>按描述搜索</Option>
                </Select >
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                ></Input>
                <Button type='primary' onClick={e => { this.getProducts(1) }}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'onClick={e=>{this.props.history.push('/admin/product/addupdate')}} >
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table
                        bordered={true}
                        rowKey='id'
                        loading={loading}
                        dataSource={products}
                        columns={columns}
                        pagination={{
                            current:this.pageNum,
                            total,
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            onChange: (pageNum) => { this.getProducts(pageNum) }
                        }}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}
