

import React from 'react';
import { View,Text,Button,TextInput,TouchableNativeFeedback,StyleSheet,Image,DatePickerAndroid } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ImagePicker from 'react-native-image-picker';
import SelfadaptModal from 'react-native-selfadapt-modal';

const TestData = [
  {id:10086,name:'追求中'},
  {id:10087,name:'喜欢中'},
  {id:10088,name:'恋爱中'},
  {id:10089,name:'已领证'},
];

export default class MsgEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      isedit:false,
      name:'',
    }
  }

  options1={
    title: '上传头像',
    takePhotoButtonTitle:'拍照',
    cancelButtonTitle:'取消',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    allowsEditing:true,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
  }

  changeAvatar=()=> {
    ImagePicker.showImagePicker(this.options1, (response) => {
      if (response.didCancel) {   //取消选择的时候，返回
          // console.log('User cancelled image picker');
          return
      }
      var avatarUri = response.uri;
      var user = this.state.user;
      user.avatar = avatarUri;
      this.setState({
          user: user
      });
    })
  }

  async openDatePicker(flag){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let user = this.state.user;
        let time=year+'-'+(month+1)+'-'+day
        switch(flag){
          case 'birthday' : 
            user.birthday=time;
            this.setState({user:user});
            break;
          case 'begin':
            user.beginTime=time;
            this.setState({user:user});
            break;
        }
        console.log(year, month+1, day)
        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  } 

  changeStatus=(res)=>{
    let user = this.state.user;
    user.status=res.name;
    this.setState({user:user});
  }
  
  changeName=()=>{
    if(this.state.isedit&&this.state.name){
      let user = this.state.user;
      user.name=this.state.name;
      this.setState({
        isedit:false,
        user:user
      });
    }
    else{
      this.setState({
        name:'',
        isedit:true
      })
    }
  }

  saveUserMsg=()=>{
    this.props.changeUserMsg(this.state.user)
    this.props.setModalVisible(!this.props.modalVisible)
  }

  render() {
    const {setModalVisible,modalVisible} = this.props;
    const {user,isedit} = this.state
    const Enter = ()=>( <Svg style={styles.quit} viewBox="0 0 1024 1024">
                          <Path fill="#5A5A68" d="M416 768c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.26L594.75 512 393.37 310.63c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l224 224c12.5 12.5 12.5 32.76 0 45.26l-224 224c-6.24 6.24-14.43 9.36-22.62 9.36z" />
                        </Svg>);
    return (
      <View style={{flex: 1}}>
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
              编辑信息
            </Text>
          </View>
          <View style={{flex: 2}} />
        </View>
        <View style={{flex: 14,backgroundColor:'#e6e6e6'}}>
          <View style={styles.main}>
            <TouchableNativeFeedback onPress={()=>this.changeAvatar()}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.msg}>头像</Text>
                </View>
                <View style={styles.itemCentre}>
                  <Image style={styles.avatar} source={{ uri: user.avatar}} />
                </View>
                <View style={styles.itemRight}>
                  <Enter />
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()=>this.changeName()}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.msg}>姓名</Text>
                </View>
                <View style={styles.itemCentre}>
                  <Text style={styles.msg}>{user.name}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Enter />
                </View>
              </View>
            </TouchableNativeFeedback>
            {isedit&&<View style={styles.item}>
              <TextInput
                style={styles.nameInput}
                placeholder='点击这里输入姓名'
                onChangeText={text => this.setState({name:text})}
                defaultValue={user.name}
                value={this.state.name}
              />
              <Button onPress={this.changeName} title="确认"/>
            </View>}
            <TouchableNativeFeedback onPress={this.openDatePicker.bind(this,'birthday')}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.msg}>生日</Text>
                </View>
                <View style={styles.itemCentre}>
                  <Text style={styles.msg}>{user.birthday}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Enter />
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.main}>
            <SelfadaptModal 
              menuList={TestData}
              modalStyle={styles.statusModal}
              onPress={(res)=>this.changeStatus(res)}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.msg}>状态</Text>
                </View>
                <View style={styles.itemCentre}>
                <Text style={styles.msg}>{user.status}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Enter />
                </View>
              </View>
            </SelfadaptModal>
            <TouchableNativeFeedback onPress={this.openDatePicker.bind(this,'begin')}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.msg}>{user.status==='追求中'?'追求开始时间':
                                            user.status==='喜欢中'?'喜欢开始时间':
                                            user.status==='恋爱中'?'恋爱开始时间':
                                            user.status==='已领证'?'领证时间':'状态未知'
                                          }
                  </Text>
                </View>
                <View style={styles.itemCentre}>
                  <Text style={styles.msg}>{user.beginTime}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Enter />
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.main}>
            <View style={styles.item}>
              <TouchableNativeFeedback onPress={()=>this.saveUserMsg()}>
                <View style={styles.itemUnique}>
                  <Text style={styles.saveMsg}>保存修改</Text>
                </View>
              </TouchableNativeFeedback>
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
  main:{
    marginTop:20,
  },
  item:{
    padding:10,
    flexDirection:'row',
    borderTopWidth:1,
    borderColor:'#e6e6e6',
    backgroundColor:'white',
    justifyContent: 'flex-end',
  },
  itemLeft:{
    justifyContent: 'center',
    flex:4,
  },
  itemCentre:{
    flex:5,
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  itemRight:{
    flex:1,
    paddingLeft:5,
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  itemUnique:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },

  msg:{
    fontSize:16,
  },
  saveMsg:{
    fontSize:16,
    color:'green'
  },
  avatar: {
    borderWidth:1,
    borderColor:'white',
    borderRadius:50,
    width: 50,
    height: 50,
  },
  nameInput:{
    height: 40,
  },
  statusModal:{
    width:300,
    alignItems:'center'
  },
});