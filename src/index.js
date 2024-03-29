import React from 'react';
import ReactDOM from 'react-dom';
import './App.less';
import "@/assets/css/reset.css";
import App from './App';
import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'


// 读取local中的保存的数据user ,保存到内存中
const user=storageUtils.getUser()
memoryUtils.user=user
ReactDOM.render(
    <App />,
	
  document.getElementById('root')
);

