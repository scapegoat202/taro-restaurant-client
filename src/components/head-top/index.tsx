import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

type HeadTopState = {}

type HeadTopOwnProps = {}

type IHeadTopProps = HeadTopOwnProps

interface HeadTop {
  props: IHeadTopProps
}

class HeadTop extends Component {
  config: Config = {}

  render() {
    return (
      <View>
        <View className='at-row at-row__justify--center'>
          <Text>Image</Text>
        </View>
        <View className='at-row at-row__justify--center'>
          <Text>店铺名称</Text>
        </View>
        <View className='at-row at-row__justify--center'>
          <Text>公告</Text>
        </View>
      </View>
    )
  }
}

export default HeadTop as ComponentClass<HeadTopOwnProps, HeadTopState>
