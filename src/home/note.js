import React, { Component } from 'react';
import { FlatList,Text,StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Note extends Component {
  state={
    notes:[
      {
        name:'宝贝档案',
        color:'#9b59b6',
        data:[]
      },
      {
        name:'我的情敌',
        color:'#3498db',
        data:[]
      },
      {
        name:'恋爱账单',
        color:'#1abc9c',
        data:[]
      },
      {
        name:'狗粮本&记仇本',
        color:'#1abc9c',
        data:[]
      }
    ]
  }

  handleNotePress=()=>{
    console.log(1)
  }

  addNote=()=>{

  }

  addTime=()=>{

  }

  addDoc=()=>{

  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:4}}>
          <FlatList
            data={this.state.notes}
            renderItem= {({item,index}) =>
                          <View key={index} style={styles.text}>
                            <Text  onPress={()=>this.handleNotePress} onLongPress={()=>console.log('2')} style={{borderColor:'white',borderWidth:1, borderRadius:15,padding: 10,fontSize: 18,height: 44,backgroundColor:item.color}}>{item.name}</Text>
                          </View>
                        }
          ></FlatList>
          
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="记事" onPress={() => this.addNote()}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="人物" onPress={() => this.addTime()}>
              <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="档案" onPress={() => this.addDoc()}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
        <View style={{flex:1}}>
          <View style={styles.gpsView}>
            <Text style={styles.gps}>共享位置</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  text:{
    marginLeft:20,
    marginTop:20,
    marginRight:100,
    marginBottom:0
  },
  gpsView:{
    marginLeft:20,
    marginTop:0,
    marginRight:20,
    marginBottom:0,
  },
  gps:{
    borderColor:'white',
    borderWidth:1,
    borderRadius:15,
    textAlign:'center',
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor:'white'
  }

});