

import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Head from './src/home/head'


class App extends React.Component{
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}} >
          <Head/>
        </View>
        <View style={{flex: 6, backgroundColor: 'powderblue'}} />
        <View style={{flex: 8, backgroundColor: 'skyblue'}} />
      </View>
    );
  }
}

export default App;