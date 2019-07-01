import React, {Component} from 'react';
import { StackActions, NavigationActions } from 'react-navigation'; 
import {
    Text,
    Button,
    View,
    TouchableOpacity,
    TextInput,
    TouchableHighlight
} from 'react-native';

export default class login extends Component<Props> {
    base_url = "http://172.27.1.245:3001";
    static navigationOptions = {    //上标题
        title: '登录',
    };
    state = {userText:'',pwdText:''};

    _login = () => {
        let data = {name:this.state.userText,age:this.state.pwdText}
        var opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }
        fetch(`${this.base_url}/users/login`,opts)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson::"+JSON.stringify(responseJson));
            if(responseJson){
                if(responseJson.code == "200"){
                    global.storage.save({
                        key:'token',
                        data: responseJson.token,
                        expires: null
                    });
                    //然后应该获取用户的信息
                    const navigate = this.props.navigation;
                    navigate.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                        NavigationActions.navigate({ routeName: 'mainScreen' })
                        ],
                    }))
                }else{
                    alert("无效的用户名或密码1");
                }
            }else{
                alert("无效的用户名或密码2");
            }
            
        })
        .catch((error) => {
        console.error("responseJsonFinal"+error);
        });

        
    }

    render() {
        
        return (
        <View>
              <Text style={{textAlign:"center",fontSize:24}} >基于RN的JWT和增删改查Demo</Text>
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
                onPress={() => {this._login()}}
                title="登录"
              />
        </View>
        );
    }
}