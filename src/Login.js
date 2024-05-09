import React, { useState,useEffect } from "react";
import { View, Image,StyleSheet,Text, LogBox } from "react-native";
import { Button, TextInput,IconButton } from "react-native-paper";
import { firebase } from "../Firebase/Firebase";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import Home from "./Home"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMyContextProvider, login } from './index';
const Login =({navigation})=>{
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    const handleLogin=()=>{
      if (validateCredentials()==false) {
        return; // Prevent login if validation fails
      }
      else
      //   {
      //     firebase.auth().signInWithEmailAndPassword(email,password)
      //   .then(()=> {
      //     console.log("dang nhap thanh cong")
      //     navigation.navigate("Home",{Home})
      //   })
      //   .catch(e => {
      //     console.log("thatbai")
      //   })
      //   }
      login(dispatch, email, password);
    }
    useEffect(() => {
      if (userLogin !== null) navigation.navigate('Home');
      console.log("da",userLogin)
    }, [userLogin]);
  
    const validateCredentials = () => {
      if (!email.includes('@')) {
        alert('Username must contain an @ symbol.');
        return false;
      }
  
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
      }
  
      return true; // Credentials are valid
    };
    const isDisabled = !isValidEmail || !isValidPassword || email === '' || password === '';

    return(
        <View style ={{ marginTop: 100}}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 200, height: 200, marginBottom: 10 }}
                resizeMode="contain"
              />
            <View>
              <TextInput
                  label={"Email"}
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  style={{width:400, marginBottom: 20, marginTop:40 }}
              />
            </View>
            <View style={styles.passwordContainer}>
              <TextInput 
                  label={"Password"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  mode="outlined"
                  style={{width:400, marginBottom: 20, flex: 1 ,marginTop:20}}
              />
                <IconButton
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  style={{marginTop:20}}
                />
            </View>
            <Button 
              mode="contained" 
              onPress={handleLogin}
              buttonColor='#3366CC'
              textColor='white'
              style={{width:400, marginBottom: 10 , borderRadius:LogBox, paddingHorizontal:50,marginTop:20}}
              // disabled={isDisabled}
              >
                Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ textAlign: 'center', color: '#3366CC' }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};
const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:50,
  },
});
export default Login