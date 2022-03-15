import React, { PureComponent } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Line extends PureComponent {
    state = {
        sales: [15, 20, 36, 10, 10, 20],
        stores: [35, 30, 16, 15, 30, 26]
    }
    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale=>sale+1),
            stores: state.stores.reduce((pre,store)=>{
                pre.push(store-1)
                return pre
            })
        }))
    }
    getOption = (sales, stores) => {
        return {

            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'line',
                    data: stores
                }
            ]
        }

    }
    render() {
        const { sales, stores } = this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title='折线图一'>
                    <ReactEcharts option={this.getOption(sales, stores)}></ReactEcharts>
                </Card>
            </div>
        )
    }
}
