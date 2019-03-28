import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  current: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    },
    asyncAdd() {
      dispatch(asyncAdd())
    }
  })
)
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

  componentWillReceiveProps(nextProps) {
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
            tabDirection='vertical'
            onClick={this.handleTabsClick.bind(this)}
          >
            <AtTabsPane current={this.state.current} index={0}>
              <View className='tab-container'>
                <Text>
                  <div className='text-container'>
                    如果必须离开你曾经住过、爱过、深埋着所有过往的地方
                    <br />
                    无论以何种方式，都不要慢慢离开，要决绝地离开，永远不回头。
                    <br />
                    不要相信过去的时光才更好，它们已经消亡了。过去的岁月看来
                    <br />
                    安全无害，被轻易跨越，而未来藏在迷雾中，叫人看来胆怯。
                    <br /> 但当你踏足其中，就会云开雾散。
                  </div>
                </Text>
                <Text>
                  <article className='text-container'>
                    可能等你过完自己的一生，到最后却发现了解别人胜过了解你自己。你学会观察他人，但你从不观察自己，因为你在与孤独苦苦抗争。假如你阅读，或玩纸牌，或照料一条狗，你就是在逃避自己。对孤独的厌恶就如同想要生存的本能一样理所当然，如果不是这样，人类就不会费神创造什么字母表，或是从动物的叫喊中总结出语言，也不会穿梭在各大洲之间——每个人都想知道别人是什么样子。
                  </article>
                </Text>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='tab-container'>
                <Text>标签页2内容</Text>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View className='tab-container'>
                <Text>标签页3内容</Text>
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
