import React, { Component } from 'react';
import { FlatList,Text,StyleSheet, View, Alert, Modal,AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteEdit from './component/noteEdit'

export default class Note extends Component {
  state={
    notes:[
      {
        name:'宝贝档案（单击编辑）',
        color:'#9b59b6',
        content:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        data:[]
      },
      {
        name:'我的情敌（长按删除）',
        color:'#3498db',
        content:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        data:[]
      },
      {
        name:'恋爱账单',
        color:'#1abc9c',
        content:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        data:[]
      },
      {
        name:'狗粮本&记仇本',
        color:'#1abc9c',
        content:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        data:[]
      }
    ],
    modalVisible:false,
    noteIndex:0,
    color:null,
  }

  handleNotePress=(index)=>{
    this.setState({noteIndex:index});
    this.setModalVisible(true)
  }

  handleNoteLongPress=(index)=>{
    Alert.alert(
      '删除该信息',
      '删除后不可取消',
      [
        {text: '取消', onPress: () => {}, style: 'cancel'},
        {text: '确认', onPress: () => {
          let notes = this.state.notes;
          notes.splice(index,1);
          this.setState({ notes: notes });
        }},
      ],
      { cancelable: false }
    )
  }

  setModalVisible=(visible)=>{
    this.setState({ modalVisible: visible });
  }

  changeNote=(note,index)=>{
    let notes = this.state.notes;
    notes[index] = note;
    this.setState({notes:notes})
    let MyNotes = JSON.stringify(notes)
    AsyncStorage.setItem('notes',MyNotes)    //AsyncStorage.setItem只能存字符串。所以要JSON.stringify
                                                //把新的user保存在本地，在第一次组件加载完毕之后，即
                                                //在componentDidMount的时候，取出来，第78行
  }

  addNote=()=>{
    this.setState({
      noteIndex:this.state.notes.length,
      color:'#9b59b6',
    });
    this.setModalVisible(true)
  }

  addPerson=()=>{
    this.setState({
      noteIndex:this.state.notes.length,
      color:'#3498db',
    });
    this.setModalVisible(true)
  }

  addDoc=()=>{
    this.setState({
      noteIndex:this.state.notes.length,
      color:'#9b59b6',
    });
    this.setModalVisible(true)
  }

  componentDidMount(){
    AsyncStorage.getItem('notes')
    .then( (data) => {
      console.log(data)
      if(data) {
          var notes = JSON.parse(data)
      }
      if(notes){
        this.setState({
          notes: notes
        });
      }
    })
  }

  render() {
    const {notes,modalVisible,noteIndex,color} = this.state
    return (
      <View style={{flex:1}}>
        <View style={{flex:4}}>
          <FlatList
            data={notes}
            renderItem= {({item,index}) =>
                          <View key={index} style={styles.text}>
                            <Text  onPress={()=>this.handleNotePress(index)} onLongPress={()=>this.handleNoteLongPress(index)} style={{borderColor:'white',borderWidth:1, borderRadius:15,padding: 10,fontSize: 18,height: 44,backgroundColor:item.color}}>{item.name}</Text>
                          </View>
                        }
          ></FlatList>
          
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="记事" onPress={() => this.addNote()}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="人物" onPress={() => this.addPerson()}>
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <NoteEdit
            setModalVisible={this.setModalVisible}
            modalVisible={modalVisible}
            note={notes[noteIndex]?notes[noteIndex]:{
              name:'',
              color:color,
              content:'',
              data:[]
            }}
            noteIndex={noteIndex}
            changeNote={this.changeNote}
          />
        </Modal>
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