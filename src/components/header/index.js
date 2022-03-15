import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './style.less'
import LinkButton from '@/components/link-button'
import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'
import menuList from '@/config/menuConfig'
import { reWeather } from '@/services'
import { formateDate } from '@/utils/dateUtils'
const { confirm } = Modal;
class Header extends PureComponent {
    constructor() {
        super()
        this.state = {
            currentTime: formateDate(Date.now()),
            city: '',
            weather: '',
            temperature: 0
        }

    }
    //获取title
    getTitle = () => {
        const currentPath = this.props.location.pathname
        var title

        menuList.forEach(item => {
            if (item.path === currentPath) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => currentPath.indexOf(cItem.path)===0)
                if (cItem) {
                    title = cItem.title
                }
            }
        });
        return title
    }
    // 退出登录
    loginOut = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '您确定退出吗?',
            onOk: () => {
                console.log('OK');
                storageUtils.removerUser()
                memoryUtils.user = {}
                // 跳转到logi界面
                this.props.history.replace('/login')
            },
            // adc
        });
    }

    // 每隔1秒 获取当前时间
    getCurrentTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000);
    }
    //获取当前天气
    getWeather = async () => {
        const res = await reWeather('杭州')
        const { city, weather, temperature } = res.data.lives[0]
        this.setState({
            city,
            weather,
            temperature
        })
    }
    // 第一次render()之后执行 就一次
    // 一般执行异步操作 1. ajax请求,2.启动定时器
    componentDidMount() {
        this.getCurrentTime()
        this.getWeather()
    }
    // 当前组件卸载之前调用
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime, city, weather, temperature } = this.state
        const username = memoryUtils.user.name
        const title = this.getTitle()
        return (
            <div className="header" >
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.loginOut}>退 出</LinkButton >

                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left"> {title} </div>
                    <div className="header-bottom-right">
                        <span>
                            {currentTime}
                        </span>
                        <span>
                            {city}
                        </span>
                        <span>
                            {weather}
                        </span>
                        <span>
                            {temperature + '℃'}
                        </span>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(Header)

