

import React from 'react';
import {  StyleSheet,
          AsyncStorage,
          Modal,
          TouchableNativeFeedback,
          View,
          Text,
          ImageBackground,
          Image
       } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ImagePicker from 'react-native-image-picker';
import MsgEdit from './component/msgEdit'


class Msg extends React.Component{
  state={
    user:{
      name:'花琦',
      birthday:'1996-10-10',
      age:'19',
      avatar:'https://i.loli.net/2020/05/21/OTixNUX9pkz6rAL.png',
      backgroundImage:'https://i.loli.net/2020/05/21/P8blDunwRz2yKCe.jpg',
      status:'追求中',
      beginTime:'2020-05-24',
      accessToken:true,
    },
    notice:[
      {
        name:'距离下次吵架还有',
        days:3
      },
      {
        name:'已经坚持不吵架',
        days:32
      }
    ],
    modalVisible: false,
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

  options2={
    title: '上传背景图',
    takePhotoButtonTitle:'拍照',
    cancelButtonTitle:'取消',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    maxWidth: 800,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    allowsEditing:true,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
  }

  changebgi=()=> {
    ImagePicker.showImagePicker(this.options2, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {   //取消选择的时候，返回
          // console.log('User cancelled image picker');
          return
      }
      // console.log(response)    //是一个对象，里面有uri
      var backgroundImageUri = response.uri;
      // console.log(avatarUri);  //是一个字符串
      var user = this.state.user;

      user.backgroundImage = backgroundImageUri;

      this.setState({
          user: user
      });
      var user = this.state.user;
      var NewImage = JSON.stringify(user)
      AsyncStorage.setItem('user',NewImage)   //AsyncStorage.setItem只能存字符串。所以要JSON.stringify
                                              //把新的user保存在本地，在第一次组件加载完毕之后，即
                                              //在componentDidMount的时候，取出来，第78行
    })
  }

  changeAvatar=()=> {
    ImagePicker.showImagePicker(this.options1, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {   //取消选择的时候，返回
          // console.log('User cancelled image picker');
          return
      }
      // console.log(response)    //是一个对象，里面有uri
      var avatarUri = response.uri;
      // console.log(avatarUri);  //是一个字符串
      var user = this.state.user;

      user.avatar = avatarUri;

      this.setState({
          user: user
      });
      var user = this.state.user;
      var NewImage = JSON.stringify(user)
      AsyncStorage.setItem('user',NewImage)   //AsyncStorage.setItem只能存字符串。所以要JSON.stringify
                                              //把新的user保存在本地，在第一次组件加载完毕之后，即
                                              //在componentDidMount的时候，取出来，第78行
    })
  }

  changeUserMsg=(user)=>{
    this.setState({user:user})
    var user = this.state.user;
    var NewUserInfo = JSON.stringify(user)
    AsyncStorage.setItem('user',NewUserInfo)    //AsyncStorage.setItem只能存字符串。所以要JSON.stringify
                                                //把新的user保存在本地，在第一次组件加载完毕之后，即
                                                //在componentDidMount的时候，取出来，第78行
  }

  setModalVisible=(visible)=>{
    this.setState({ modalVisible: visible });
  }

  componentDidMount(){
    AsyncStorage.getItem('user')
    .then( (data) => {
      if(data) {
          var user = JSON.parse(data)
      }
      if( user && user.accessToken){
        this.setState({
            user: user
        });
      }
    })
  }

  render() {
    const {user,notice,modalVisible} = this.state
    console.log(user)
    return (
      <ImageBackground style={{ flex: 1}} source={{ uri: user.backgroundImage}}>
        <TouchableNativeFeedback onPress={()=>this.changebgi()}>
          <View style={{flex: 1}}>
            <View style={{flex: 3,flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <View style={{flex: 1}} />
                <View style={{flex: 4,flexDirection: 'row'}}>
                  <View style={{flex: 1}} />
                  <View style={{flex: 2,alignItems:'center'}}>
                      <Text style={styles.status}>{user.status}</Text>
                      <TouchableNativeFeedback onPress={()=>this.changeAvatar()}>
                        <Image style={styles.avatar} source={{ uri: user.avatar}} />
                      </TouchableNativeFeedback>
                      <Text style={styles.name}>{user.name},{user.age}</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 3}}>
                <View style={{flex: 1, justifyContent: 'center',alignItems: 'flex-end',padding:5}} >
                  <TouchableNativeFeedback onPress={()=>this.setModalVisible(true)}>
                    <Svg width={20} height={20} viewBox="0 0 1024 1024" >
                      <Path fill="white" d="M759.57826045 343.15217422a31.18695644 31.18695644 0 0 1-19.33043467 19.36956533l-385.66956533 385.66956446a148.69565244 148.69565244 0 0 1-61.43478223 36.97826132l-157.81304355 48.56086934a39.13043467 39.13043467 0 0 1-48.91304355-48.91304355l48.52173955-157.85217334a148.69565244 148.69565244 0 0 1 37.0173911-61.39565245L635.53478222 101.99130401a129.13043467 129.13043467 0 1 1 182.62173956 182.58260888l-58.57826133 58.57826133zM589.47826045 236.63913066L216.17391289 609.82608711a86.08695645 86.08695645 0 0 0-21.40434756 35.56956533l-35.53043466 115.43478223 115.43478222-35.491304a86.08695645 86.08695645 0 0 0 35.60869599-21.40434844l373.18695645-373.22608624-94.06956533-94.06956532zM633.69565244 192.30434756l94.06956533 94.10869599 46.13478223-46.1347831a66.52173955 66.52173955 0 1 0-94.06956533-94.06956446L633.69565244 192.30434756zM120.69565244 933.04347823h782.60869512a31.30434756 31.30434756 0 1 0 0-62.608696H120.69565244a31.30434756 31.30434756 0 1 0 0 62.60869599z"></Path>
                    </Svg>
                  </TouchableNativeFeedback>
                </View>
                <View style={{flex: 9, justifyContent: 'center',alignItems: 'center'}} >
                  <Text style={styles.dates}>在一起<Text style={{color:'yellow',fontSize:25}}>58</Text>天了</Text>
                </View>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',}}>
              <View style={{flex: 1}} />
              <View style={{flex: 9,justifyContent: 'center',}}>
                {notice.map((item,i) => (
                                  <Text key={i} style={styles.notice}>{item.name}<Text style={{color:'yellow',fontSize:20}}>{item.days}</Text>天</Text>
                              ))}
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <MsgEdit setModalVisible={this.setModalVisible} modalVisible={modalVisible} user={user} changeUserMsg={this.changeUserMsg}/>
        </Modal>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  avatar: {
    borderWidth:1,
    borderColor:'white',
    borderRadius:50,
    position:'absolute',
    left:0,
    top:18,
    width: 100,
    height: 100,
    zIndex:2
  },
  status:{
    padding:3,
    borderRadius:4,
    backgroundColor:'white',
    position:'absolute',
    top:0,
    height: 25,
    zIndex:3
  },
  name: {
    padding:3,
    borderRadius:4,
    backgroundColor:'white',
    position:'absolute',
    top:110,
    height: 25,
    zIndex:3
  },
  dates: {
    fontSize:18,
    color:'white'
  },
  notice: {
    fontSize:15,
    color:'white'
  },
});

export default Msg;


