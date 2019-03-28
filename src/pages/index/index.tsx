import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import './index.scss'
import Commodity from '../../components/commodity'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  current: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state: PageState = {
    current: 0
  }

  handleTabsClick(index: number) {
    this.setState({
      current: index
    })
  }

  componentWillReceiveProps(nextProps: IProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const tabList = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' }
    ]
    return (
      <View className='index'>
        <View className='at-row'>
          <Text>Head Top</Text>
        </View>
        <View className='at-row'>
          <AtTabs
            current={this.state.current}
            tabList={tabList}
            height='570px'
            onClick={this.handleTabsClick.bind(this)}
          >
            <AtTabsPane current={this.state.current} index={0}>
              <View className='tab-container'>
                <Commodity />
                <Commodity />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='tab-container'>
                <Commodity />
                <Commodity />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View className='tab-container'>
                <Commodity />
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
