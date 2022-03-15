import React, { memo, useEffect } from 'react'
import {
    Form,
    Select,
    Input
} from 'antd'
export default memo(function AddForm(props) {
    const [form] = Form.useForm()

    useEffect(() => {
        props.getForm(form)
    })
    return (
        <Form form={form} initialValues={{ parentId: props.parentId }}>
            <Form.Item
                name='parentId'>
                <Select
                >
                    <Select.Option value='0'>
                        一级分类
                    </Select.Option>
                    {
                        props.categorys.map(item => {
                            return (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name='name'
                rules={[
                    // 声明式验证
                    { required: true, message: '分类名称必须输入!'},

                ]}
            >
                <Input placeholder="请输入分类名称"></Input>
            </Form.Item>
        </Form>
    )
})

