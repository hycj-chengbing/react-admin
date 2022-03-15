import React, { PureComponent } from 'react'
import  './product.less'
import { renderRoutes } from "react-router-config"
// import ProductHome from './home'
// import ProductAddUpdate from './add-update'
// import ProductDetail from './detail'
export default class Product extends PureComponent {
    render() {
        return (
            <div>
                 {renderRoutes(this.props.route.routes)} 
            </div>
        )
    }
}
