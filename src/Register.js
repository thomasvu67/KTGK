import { useState } from "react";
import { Alert, View,StyleSheet } from "react-native";
import { Button, Text, TextInput,IconButton } from "react-native-paper";
import {firebase} from "../Firebase/Firebase"
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { Image } from "react-native";
import { createAccount } from ".";
import "react-native-web"

const Register =()=>{
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [fullName, setfullName]= useState("");
    const [confirmpass, setconfirmpass]= useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const handleCreateAccount=()=>{
        // firebase.firestore().createUserWithEmailAndPassword(email,password)
        // .then(()=> Alert.alert("dang ky thanh cong"))
        // .catch(e => Alert.alert(e.message))
        if (validateCredentials()==false) {
            return; 
          }
        else
        {
            const role="customer"
            createAccount(email,password,fullName,role)
            alert('Tao thanh cong');
        }
    }
    const validateCredentials = () => {
        if (!email.includes('@')) {
          alert('Username must contain an @ symbol.');
          return false;
        }
    
        if (password.length < 6) {
          alert('Password must be at least 6 characters long.');
          return false;
        }

        if (confirmpass!=password) {
            alert('Password must be at least 6 characters long.');
            return false;
          }
    
        return true; // Credentials are valid
      };
    return(
        <View style ={{marginTop:50,justifyContent:"center"}}>
            <Image
              style ={{width: 200, height: 200, alignSelf:"center"}}
              source={require("../assets/logo.png")}
              resize
          ></Image>
            <View>
            <TextInput
                label={"Fullname"}
                value={fullName}
                onChangeText={setfullName}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
            />
            <View style={styles.passwordContainer}>
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                style={styles.inputicon}
                mode="outlined"
                secureTextEntry={!showPassword}
            />
            <IconButton 
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
            />
            </View>
            
            <View style={styles.passwordContainer}>
            <TextInput
                label={"Confirm Password"}
                value={confirmpass}
                onChangeText={setconfirmpass}
                style={styles.inputicon}
                mode="outlined"
                secureTextEntry={!showConfirmPassword}
            />
            <IconButton 
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            </View>
            </View>
            <Button style={styles.button} mode="contained" onPress={handleCreateAccount}>
                Create Account
            </Button>
            <View style={{flexDirection: "row",justifyContent:"center"}}>
                <Button onPress={()=> navigation.navigate('Login', {Login})}> Log in </Button>
                <Button onPress={()=> navigation.navigate('ForgotPassword', {ForgotPassword})}> Forgot Password </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor:"white",
        marginLeft:80,
        marginRight:80,
        marginTop:20,
        marginBottom:20,
        
    },
    button: {
        backgroundColor:"#3366CC",
        borderRadius:"LogBox",
        marginLeft:80,
        marginRight:80,
        marginTop:20,
        marginBottom:20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    inputicon: {
        backgroundColor:"white",
        marginLeft:80,
        marginRight:10,
        marginTop:20,
        marginBottom:20,
        paddingRight:270,
        
    },
  });
export default Register