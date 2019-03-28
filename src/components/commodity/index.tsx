import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

type CommodityState = {}

type CommodityOwnProps = {}

type ICommodityProps = CommodityOwnProps

interface Commodity {
  props: ICommodityProps
}

class Commodity extends Component {
  config: Config = {}

  render() {
    return (
      <View>
        <div>Hello world</div>
      </View>
    )
  }
}

export default Commodity as ComponentClass<CommodityOwnProps, CommodityState>
