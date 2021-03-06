import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from "react-redux";
import mapDispatchToProps from '../Actions/actionCreators';
import Axios from 'axios';


 class Login extends Component {
     constructor() {
         super();
        
         this.state = {
            username: "",
            password: ""
         }
     }
     componentDidMount() {

    }
  
    componentWillUnmount() {
  
    }

     handleLogin = async (e) => {
        let user = this.state;
        let {userLoggedIn} = this.props;
        console.log(userLoggedIn);

        let data = await Axios.post("http://localhost:3001/users/login", user);
        console.log(data);
        let currentUser = data.data.username;
        let currentUserID = data.data.id;
        console.log(currentUserID);
        if (currentUser == "") {
            alert("Incorrect username");
            
        }
        alert(`Logging in with ${currentUser}`);
        userLoggedIn(currentUserID);
        this.props.navigation.navigate('Dashboard');

     }

    
    render() {
        return (
            <View style={styles.container}>
                    <Button title="Go Back" onPress={() => this.props.navigation.navigate('Home')}></Button>
                    <Input style={styles.inputBox} autoCapitalize="none" placeholder="Username" onChangeText={(username) => this.setState({username: username})}></Input>
                    <Input style={styles.inputBox} autoCapitalize="none" placeholder="Password" onChangeText={(password) => this.setState({password: password})}></Input>
                    <Button title="Login" onPress={(e) => {this.handleLogin(e)}}/>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6b72a5',
        flexDirection: "column"
      },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: "#b5b5b5",
        borderRadius: 25,
        paddingHorizontal: 10,
        fontSize: 30,
        margin: 5
    }
})

export default connect(null, mapDispatchToProps)(Login);