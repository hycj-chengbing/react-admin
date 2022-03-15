import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import { renderRoutes } from "react-router-config"

import memoryUtils from '@/utils/memoryUtils'

import LeftNav from '@/components/left-nav'
import Header from '@/components/header'

// import Home from '../admin/pages/Home'
// import Category from '../admin/pages/category'
// import Product from '../admin/pages/product'
// import Role from '../admin/pages/role'
// import User from '../admin/pages/user'
// import Bar from '../admin/pages/charts/bar'
// import Line from '../admin/pages/charts/line'
// import Pie from '../admin/pages/charts/pie'




const { Footer, Sider, Content } = Layout;
export default class Admin extends PureComponent {
    render() {
        const user = memoryUtils.user
        //如果内存中没有user ==>没有登录
        if (!user || !user.id) {
            return <Redirect to="/login" />
        }
        return (
            
            <Layout style={{ minHeight: '100%' }} > 
            
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{margin:'20px' ,backgroundColor: 'white' }}>                                     
                        {renderRoutes(this.props.route.routes)}                            
                        </Content>
                        <Footer style={{ textAlign: "center", color: "#cccccc" }}>推荐使用谷歌浏览器,可以获得更加页面体验</Footer>
                    </Layout>
                
            </Layout>
            
        )
    }
}
