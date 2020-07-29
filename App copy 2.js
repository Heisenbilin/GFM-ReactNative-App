

import React from 'react';
import { ImageBackground,SafeAreaView, View, Text } from 'react-native';
import Head from './src/home/head'
import Msg from './src/home/msg'


class App extends React.Component{
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={{flex: 1}}>
        <View style={{flex: 1}} >
          <Head/>
        </View>
        <View style={{flex: 6}} >
          <Msg/>
        </View>
        <View style={{flex: 8, backgroundColor: 'skyblue'}} />
      </View>
    );
  }
}

export default App;
