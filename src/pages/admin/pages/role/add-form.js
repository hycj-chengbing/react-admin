import React, { memo, useEffect } from 'react'
import {
    Form,
    Input
} from 'antd'
export default memo(function AddForm(props) {
    const [form] = Form.useForm()

    useEffect(() => {
        props.getForm(form)
    })
    const formItemLayout = {
        labelCol: { span: 4 }, //左侧 label 宽度
        wrapperCol: { span: 16 }, //右侧包裹(输入框)宽度
    }
    return (
        <Form form={form} >

            <Form.Item
                label="角色名称"
                {...formItemLayout}
                name='roleName'
                rules={[
                    // 声明式验证
                    { required: true, message: '角色名称必须输入!' },

                ]}
            >
                <Input placeholder="请输入角色名称"></Input>
            </Form.Item>
        </Form>
    )
})

