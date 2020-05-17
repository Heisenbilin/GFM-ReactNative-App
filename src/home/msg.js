

import React from 'react';
import { View,Text, ImageBackground } from 'react-native';
import Svg, { Path } from 'react-native-svg';


class Msg extends React.Component{
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <ImageBackground style={{ flex: 1,opacity: 0.6 }}source={require('./asserts/img/msgbg.jpg')}>
        <View style={{flex: 1,flexDirection: 'row'}}>
          <View style={{flex: 2,opacity: 0.6,backgroundColor:'yellow'}}>
            <View style={{flex: 2,opacity: 0.6,backgroundColor:'yellow'}} />
          </View>
          <View style={{flex: 3, justifyContent: 'center',alignItems: 'center'}} >
            <Text>
              在一起58天了
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Msg;
