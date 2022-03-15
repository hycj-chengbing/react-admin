
import React, { memo, useEffect } from 'react'
// import PropTypes from 'prop-types'
import {
    Form,
    Input,
} from 'antd'

export default memo(function UpDateForm(props) {
    // console.log(props);
    const [form] = Form.useForm()
  
    useEffect(() => {
        props.getForm(form)
    })
    // static propTypes = {
    //     // name: PropTypes.string.isRequired,
    //     getForm: PropTypes.func.isRequired
    // }



    return (
        <Form
            form={form}
            initialValues={{
                name: props.name,
            }}
        >
            <Form.Item 
            name='name'
            rules={[
                // 声明式验证
                { required: true, message: '分类名称必须输入!'},
                
            ]}
             >
                <Input placeholder='请输入分类名称'></Input>
            </Form.Item>
        </Form>
    )
})

