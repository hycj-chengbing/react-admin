import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '@/assets/img/logo.png'
import { Menu } from 'antd';


import menuList from '@/config/menuConfig'
import './style.less'
const { SubMenu } = Menu;
class LeftNav extends PureComponent {

    getMenuNodes = (menuList) => {
        //得到当前路由路径
        const localPath = this.props.location.pathname
        // console.log(localPath);
       
            return menuList.map(item => {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.path} icon={item.icon}>
                            <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                    )
                } else {
                    const cItem = item.children.find(cItem =>localPath.indexOf(cItem.path) === 0)
                    if (cItem) {
                        this.openKey = item.path
                    }
                    return (
                        <SubMenu key={item.path} icon={item.icon} title={item.title}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>

                    )
                }

            })
    }
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        //得到当前路由路径
        let localPath = this.props.location.pathname
        if (localPath.indexOf('/admin/product')===0){ //当前请求的是商品或在其子路由
            localPath='/admin/product'
            console.log(localPath);
        }
        // 得到需要打开对菜单项
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/admin' className="left-nav-header">
                    <img src={logo} alt="logo"></img>
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    selectedKeys={[localPath]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>

            </div>
        )
    }
}
/** 
 * withRouter 高阶组件
 * 包装非路由组件,返回一个新的组件
 * 新的组件向非路由组件传递三个属性: history/location/match
*/
export default withRouter(LeftNav)
