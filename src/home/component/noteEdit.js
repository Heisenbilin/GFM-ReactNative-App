

import React from 'react';
import { View,Text,TextInput,Button,TouchableNativeFeedback,StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default class NoteEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      note:props.note,
      isedit:false,
      name:props.note.name,
      content:props.note.content,
    }
  }

  saveNote=()=>{
    let {note,name,content} = this.state;
    if((name!==note.name)||(content!==note.content)){
      note.name = name;
      note.content = content;
      this.props.changeNote(note,this.props.noteIndex)
      this.props.setModalVisible(!this.props.modalVisible)
    }
    else{
      this.props.setModalVisible(!this.props.modalVisible)
    }
  }

  render() {
    const {setModalVisible,modalVisible} = this.props;
    const {note} = this.state
    return (
      <View style={{flex:1}}>
        <View style={{flex: 1,flexDirection: 'row'}}>
          <View style={{flex: 2,flexDirection: 'row'}}>
            <View style={{flex: 1}} />
            <View style={{flex: 6, justifyContent: 'center'}} >
            <TouchableNativeFeedback  onPress={()=>setModalVisible(!modalVisible)}>
              <Svg style={styles.quit} viewBox="0 0 1024 1024" >
                <Path fill="#5A5A68" d="M436.32 512.77l231.26-231.24c15.24-15.25 15.25-39.94 0-55.18s-39.94-15.24-55.18 0L354.85 483.86a38.921 38.921 0 0 0-11.43 27.59c0 0.44 0.02 0.87 0.03 1.31-0.01 0.44-0.03 0.87-0.03 1.31 0 9.98 3.81 19.97 11.43 27.59L612.4 799.19c15.25 15.24 39.94 15.25 55.18 0 15.24-15.25 15.24-39.94 0-55.18L436.32 512.77z"></Path>
              </Svg>
            </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{flex: 3, justifyContent: 'center',alignItems: 'center'}} >
            <Text style={{fontSize:18}}>
              编辑笔记
            </Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center',alignItems: 'center'}} >
            <TouchableNativeFeedback  onPress={()=>this.saveNote()}>
              <Svg style={styles.quit} viewBox="0 0 1024 1024">
                <Path fill="#5A5A68" d="M927.97968 108.360629a50.575037 50.575037 0 0 0-69.085501 18.517689l-391.898737 678.933747-316.000056-182.409708A50.575037 50.575037 0 0 0 100.427574 711.005546l359.812488 207.690002a50.553362 50.553362 0 0 0 69.078276-18.517689L946.504593 177.44613a50.575037 50.575037 0 0 0-18.524913-69.085501z"></Path>
              </Svg>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{flex:14,backgroundColor:'#e6e6e6'}}>
          <View style={styles.name}>
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize:18}}>名称</Text>
            </View>
            <View style={{flex:4,justifyContent: 'center'}}>
              <TextInput
                style={styles.nameInput}
                placeholder={note.name}
                onChangeText={text => this.setState({name:text})}
                defaultValue={note.name}
                value={this.state.name}
              />
            </View>
          </View>
          <View style={styles.content}>
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize:18}}>内容</Text>
            </View>
            <View style={{flex:4,flexDirection: 'row',justifyContent: 'flex-start',flexWrap: 'wrap',}}>
              <TextInput
                style={styles.contentInput}
                numberOfLines={10}
                multiline = {true}
                placeholder={note.content}
                onChangeText={text => this.setState({content:text})}
                defaultValue={note.content}
                value={this.state.content}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quit:{
    width:24,
    height:24,
  },
  name:{
    flex:1,
    marginTop:20,
    flexDirection:'row',
    backgroundColor:'white'
  },
  content:{
    flex:10,
    marginTop:20,
    paddingTop:20,
    flexDirection:'row',
    alignItems:'flex-start',
    backgroundColor:'white'
  },
  nameInput:{
    height: 40,
  },
  contentInput:{
    height:300,
    textAlignVertical: 'top'
  }
});

