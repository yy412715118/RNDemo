import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Button ,  TouchableHighlight , Alert , Modal , TextInput} from 'react-native';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';

export default class mainPage extends Component<Props> {
    base_url = "http://172.27.1.245:3001";
  selectedID="";
  state = {dataJson:{},loaded:false,modalVisible: false,userText:'',pwdText:''};
  _onPress = () => {
    this._fetchData();
  };
  _addUser(){
    this.selectedID = '';
    this.setState({userText:'',pwdText:''});
    this._setModalVisible(true);
  }
  _editUser(item){
    var pwd = item.age.toString();
    this.selectedID = item.id;
    this.setState({userText:item.name,pwdText:pwd});
    this._setModalVisible(true);
  }
  _userOperation(){
    this.selectedID == ''?this._createUser():this._updateUser();
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    //this._updateUser({name:"qqq",age:"19",id:item.id})
  }
  _header = () => {
    return <Text style={[styles.txt,{backgroundColor:'green'}]}>这是头部</Text>;
  } 

  _empty = () => {
    return <Text style={[styles.txt,{backgroundColor:'green'}]}>暂无数据</Text>;
  }

  _footer = () => {
      return <Text style={[styles.txt,{backgroundColor:'green'}]}>这是尾部</Text>;
  }
  _separator = () => {
    return <View style={{height:1,backgroundColor:'black'}}/>;
  }

  _list=()=>{
    return <SwipeableFlatList
    ItemSeparatorComponent={this._separator}
    data={this.state.dataJson}
    renderItem={({item}) => <Text style={{ height: 60 }}>{"Id:"+item.id+"\n"+"userName:"+item.name+"\n"+"password:"+item.age}</Text>}
    renderRight={({ item}) => (
      <View style={{width:80,height:60,flexDirection: 'row'}}>
      
      <TouchableHighlight  style={{flex:1,backgroundColor:"blue",justifyContent: 'center',alignItems:'center'}} onPress={() => this._editUser(item)}>
          <Text style={{color:"white"}}>编辑</Text>
      </TouchableHighlight>
      <TouchableHighlight style={{flex:1,backgroundColor:"red",justifyContent: 'center',alignItems:'center'}} onPress={() => 
        Alert.alert(
          '确定删除吗？',
          '',
          [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'destructive'},
              {text: 'OK', onPress: () => this._deleteUser(item.id)}
          ]
        )
      
      }>
          <Text style={{color:"white"}}>删除</Text>
      </TouchableHighlight>

      </View> 
  )}
    keyExtractor={item => item.id.toString()}
    //2创建侧滑菜单
    maxSwipeDistance={80}//可展开（滑动）的距离
    
  />
  }

//这是reactNative
  _fetchData=async()=>{
    let token= await global.storage.load({
        key:'token'
    })
    var opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + token
        },
      }
    fetch(`${this.base_url}/users/queryAll`,opts)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("_fetchData::"+JSON.stringify(responseJson))
      if(responseJson.hasOwnProperty("code")){
        alert(responseJson.message);
      }else{
        this.setState({dataJson:responseJson,loaded:true});
      }
      
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  _createUser=async()=>{
    let token= await global.storage.load({
        key:'token'
    })
    let data = {name:this.state.userText,age:this.state.pwdText}
    var opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      },
      body: JSON.stringify(data)
    }
    fetch(`${this.base_url}/users/addUser`,opts)
    .then((response) => response)
    .then((responseJson) => {
      this._setModalVisible(false);
      this._fetchData();
    })
    .catch((error) => {
      console.error("responseJsonFinal"+error);
    });
  }

  _updateUser= async()=>{
    let token= await global.storage.load({
        key:'token'
    })
    let data = {name:this.state.userText,age:this.state.pwdText,id:this.selectedID}
    var opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      },
      body: JSON.stringify(data)
    }
    fetch(`${this.base_url}/users/updateUser`,opts)
    .then((response) => response)
    .then((responseJson) => {
      this._setModalVisible(false);
      this._fetchData();
    })
    .catch((error) => {
      console.error("responseJsonFinal"+error);
    });
  }

  _deleteUser=async(id)=>{
    let token= await global.storage.load({
        key:'token'
    })
    var opts = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      },
    }
    fetch(`${this.base_url}/users/deleteUser?id=${id}`,opts)
    .then((response) => response)
    .then((responseJson) => {
      this._fetchData();
    })
    .catch((error) => {
      console.error("responseJsonFinal"+error);
    });

  }

  //带参数的POST请求
  _Request=()=> {

    var opts = {
        method: 'POST',
        headers: {
        'Accept': 'application/json'
        },
        Authorization:'Bearer ' + token
    }
    return opts;
}


  renderLoadingView() {
    
    return (
      <View style={styles.container}>
        <Text>
          正在加载数据……
        </Text>
      </View>
    );
  }

  render() {

    // if(this.state.loaded){
    //   return this._list();
    // }

    return (
      <View style={styles.container}>
        
        <Button style={styles.button}
        onPress={this._onPress}
        title="查询"/>
        <Button style={styles.button}
        onPress={() => {
          this._addUser();
        }}
        title="添加"/>
      {this.state.dataJson.length>0?this._list():null}
        
      <Modal
          
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this._setModalVisible(false);
          }}
        >
          <View  style={{ marginTop: 22 ,flex:1}} >
            <View>
              <Text style={{textAlign:"center",fontSize:24}} >{this.selectedID == ''?'新增用户':'修改用户'}</Text>
              <TextInput
                style={{height: 40,borderColor: 'black', borderWidth: 1}}
                placeholder="输入用户名"
                value= {this.state.userText}
                onChangeText={(text) => this.setState({userText:text})}
              />
              <TextInput
                style={{height: 40,borderColor: 'black', borderWidth: 1}}
                placeholder="输入密码"
                value={this.state.pwdText}
                onChangeText={(text) => this.setState({pwdText:text})}
              />
              <Button
                onPress={() => {
                  this._userOperation();
                }}
                title={this.selectedID==''?"新增":"修改"}
              />
              <Button 
                onPress={() => {
                  this._setModalVisible(!this.state.modalVisible);
                }}
                title="取消"
                color="gray"
              />
              
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    textAlign: 'center',
    fontSize:24,
    color: '#333333',
    marginBottom: 20,
  },
  button:{//官方为了保证平台样式统一，仅支持修改按钮背景色，使用touch系列组件替换
    marginBottom: 50,
    width:80,
    height:60
  },
  //侧滑菜单的样式
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  quick: {
    backgroundColor: "#ff1d49",
    flex: 1,
    alignItems: 'flex-end',//水平靠右
    justifyContent: 'center',//上下居中
    width: 100,
    borderRadius: 5,
    elevation: 5,//漂浮的效果

  },
  delete: {
    color: "#d8fffa",
    marginRight: 30
  }
});
