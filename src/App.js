// 应用根组件
import React, { memo, Suspense} from 'react'
import { renderRoutes } from "react-router-config"
import { BrowserRouter} from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>page loading</div>}>
        {renderRoutes(routes)}
        </Suspense> 
    </BrowserRouter>
  );
}
export default memo(App);
