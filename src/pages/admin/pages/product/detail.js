/**
 * Product 详情页路由组件
 */
import React, { PureComponent } from 'react'
import {
    Card,
    List
} from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import LinkButton from '@/components/link-button'
import { reCategory } from '@/services'
const Item = List.Item
export default class ProductDetail extends PureComponent {
    constructor() {
        super()
        this.state = {
            cName1: '',//一级分类
            cName2: '' //二级分类
        }
    }
    async componentDidMount() {

        // 得到当前商品的分类id

        const { id, categoryId } = this.props.location.state.product
        if (id === '0') { //一级分类
            const res = await reCategory(id)

            const cName1 = res.data.name
            this.setState({ cName1 })


        } else { //二级分类
            // 一次性发送多个请求
            const res = await Promise.all([reCategory(id), reCategory(categoryId)])

            const cName1 = res[0].data.name
            const cName2 = res[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        //读取上一级路由传递过来的数据
        const { name, desc, price, detail, images } = this.props.location.state.product
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        style={{ marginRight: '10px', fontSize: '20px' }}
                        onClick={() => { this.props.history.goBack() }}
                    />
                </LinkButton>
                <span>商品详情</span>

            </span>

        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{cName1} {cName2 ? '-->' + cName2 : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>

                            <img
                                className="product-img"
                                src={images}
                                alt='img'
                            />
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
