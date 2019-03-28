import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'
import { AtInputNumber } from 'taro-ui'

type CommodityState = {
  itemAmount: number
}

type CommodityOwnProps = {}

type ICommodityProps = CommodityOwnProps

interface Commodity {
  props: ICommodityProps
}

class Commodity extends Component {
  config: Config = {}

  state: CommodityState = {
    itemAmount: 0
  }

  componentWillReceiveProps(nextProp: ICommodityProps) {
    console.log(this.props, nextProp)
  }

  handleInputNumberChange(value: number) {
    this.setState({
      itemAmount: value
    })
  }

  render() {
    return (
      <View className='at-row at-row__justify--between at-row__align--center commodity-container'>
        <View className='at-col at-col-3'>Image</View>
        <View className='at-col at-col-auto'>
          <View className='at-row'>标题</View>
          <View className='at-row'>描述</View>
          <View className='at-row at-row__justify--between'>
            <Text>价格</Text>
            <AtInputNumber
              type='number'
              min={0}
              step={1}
              value={this.state.itemAmount}
              onChange={this.handleInputNumberChange.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Commodity as ComponentClass<CommodityOwnProps, CommodityState>
