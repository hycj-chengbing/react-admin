/*
Product 添加更新的子路由
*/
import React, { memo, useEffect, useState, useRef } from 'react'
import LinkButton from '@/components/link-button'
import PicturesWall from './picture-wall'
import RichTextEditor from './rich-text-editor'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { reCategorys, reAddProduct, reUpdateProduct } from '@/services'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message,
} from 'antd'
const { Item } = Form
const { TextArea } = Input



export default memo(function ProductAddUpdate(props) {

    const pw = useRef();
    const editor = useRef();
    const [form] = Form.useForm()
    const [options, setOptions] = useState([])
    const product = props.location.state || {}
    // console.log(product);
    const isUpdate = Object.keys(product).length === 0 ? false : true
    const { pcategoryId, categoryId, imgs, detail } = product
    const categoryIds = []
    if (isUpdate) {
        if (pcategoryId === '0') { //一级分类
            categoryIds.push(pcategoryId)
        } else {//二级分类
            categoryIds.push(parseInt(pcategoryId))
            categoryIds.push(parseInt(categoryId))
        }

    }


    useEffect(() => {
        getCategorys('0')

    }, [])


    const formItemLayout = {
        labelCol: { span: 2 }, //左侧 label 宽度
        wrapperCol: { span: 7 }, //右侧包裹(输入框)宽度
    }
    const title = (
        <span>
            <LinkButton onClick={() => { props.history.goBack() }}>
                <ArrowLeftOutlined
                    style={{ marginRight: '10px', fontSize: '20px' }}
                // onClick={() => { props.history.goBack() }}
                />
            </LinkButton>
            <span>{isUpdate ? '修改商品' : '添加商品'}</span>
        </span>
    )

    const submit = () => {
        form.validateFields().then(
            async (values) => {
                // 收集数据
                const { name, desc, price, categoryIds } = values
                let pcategoryId, categoryId
                if (categoryIds.length === 1) {
                    pcategoryId = '0'
                    categoryId = categoryIds[0]
                } else {
                    pcategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = pw.current.getImgs()
                const detail = editor.current.getDetail()
                const Product = { name, desc, price, imgs, detail, pcategoryId, categoryId }
                //如果是更新
                if (isUpdate) {
                    // 添加商品
                    const id = product.id                   
                    console.log(id);
                    const result = (await reUpdateProduct(id,product)).data
                    console.log( result);
                    // 更新商品
                    if (result.status === 0) {
                        message.success('商品更新成功')
                        props.history.goBack()
                    } else {
                        message.error('商品更新失败')
                    }
                } else {
                    // 添加商品
                    const result = (await reAddProduct(Product)).data
                    // 更新商品
                    if (result.status === 0) {
                        message.success('商品添加成功')
                        props.history.goBack()
                    } else {
                        message.error('商品添加失败')
                    }
                }
            },

            (error) => {
                message.error('提交失败')
                console.log(error)
            }

        )
    }

    const getCategorys = async (parentId) => {
        // async 返回值是一个新的promise对象,promise的结果和值有async的结果来决定
        const result = (await reCategorys(parentId)).data
        // console.log(result);
        if (result.status === 0) {
            const categorys = result.data
            // 如果是一级分类
            if (parentId === '0') {
                initOptions(categorys)
            } else { //否则之间返回categorys 用于获取二级列表
                return categorys
            }
        }
    }

    const initOptions = async (categorys) => {
        //根据categorys 生成 option数组
        const options = categorys.map(item => {

            return ({
                value: item.id,
                label: item.name,
                isLeaf: false,
            })
        }
        )
        // 如果是二级分类
        const { pcategoryId } = product
        if (isUpdate && pcategoryId !== '0') {
            // 获取二级分类
            const subCategorys = await getCategorys(pcategoryId)
            // console.log(subCategorys);
            //生成二级分类下拉列表
            if (subCategorys) {
                const childOptions = subCategorys.map(cItem => ({
                    value: cItem.id,
                    label: cItem.name,
                    isLeaf: true,
                }))
                //关联到对应一级option
                console.log(pcategoryId);
                console.log(options);
                const targetOption = options.find(option => option.value == pcategoryId)
                // console.log(targetOption);
                if (targetOption) {
                    targetOption.children = childOptions
                }
            }

        }

        //更新options状态
        setOptions(options)
    }
    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        //根据选中的分类,请求获取二级分类
        const subCategorys = await getCategorys(targetOption.value)
        targetOption.loading = false //隐藏loading
        if (subCategorys && subCategorys.length > 0) {
            const childOptions = subCategorys.map(cItem => ({
                value: cItem.id,
                label: cItem.name,
                isLeaf: true,
            }))
            //关联到当前option
            targetOption.children = childOptions
        } else {
            // 当前选中分类中没有二级分类
            targetOption.isLeaf = true
        }
        setOptions([...options]);
    };
    return (

        <Card title={title}>
            <Form {...formItemLayout} form={form}>
                <Item label='商品名称'
                    name="name"
                    initialValue={product.name}
                    rules={[
                        // 声明式验证
                        { required: true, message: '商品名称必须输入!', },
                    ]}
                >
                    <Input placeholder='请输入商品名称'></Input>
                </Item>
                <Item label='商品描述'
                    name="desc"
                    initialValue={product.desc}
                    rules={[
                        // 声明式验证
                        { required: true, message: '商品描述必须输入!' },

                    ]}
                >
                    <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }}>
                    </TextArea>
                </Item>
                <Item label='商品价格'
                    name="price"
                    initialValue={product.price}

                    rules={[
                        // 声明式验证
                        { required: true, message: '商品价格必须输入!' },
                        {
                            validator(_, value) {
                                if (value * 1 > 0) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('价格必须大于0'));
                            },
                        },
                    ]}
                >
                    <Input type='number' placeholder='请输入商品价格' prefix="￥" suffix="RMB"></Input>
                </Item>
                <Item label='商品分类'
                    name="categoryIds"
                    initialValue={[categoryIds]}
                    rules={[
                        // 声明式验证
                        { required: true, message: '商品分类必须输入!', },
                    ]}
                >

                    <Cascader
                        options={options}
                        loadData={loadData}

                        changeOnSelect
                        placeholder="请选择商品分类"
                    />
                </Item>
                <Item label='商品图片'>
                    <PicturesWall ref={pw} imgs={imgs} />
                </Item>
                <Item label='商品详情' labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                    < RichTextEditor ref={editor} detail={detail} />
                </Item>
                <Item >
                    <Button type='primary' onClick={e => { submit() }}>提交</Button>
                </Item>
            </Form>
        </Card >
    )
})
