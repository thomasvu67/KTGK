import React, {useEffect,useState}from "react";
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, List, TextInput, Text, Appbar } from 'react-native-paper';
import { firebase } from "../Firebase/Firebase";
import { useMyContextProvider,logout } from ".";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Job from "/jobs"
function Home() {
  const [job, setJob] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [jobs, setJobs] = React.useState([]);
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [isValid, setIsValid] = React.useState(false);
  const ref = firebase.firestore().collection('jobs');

  // useEffect(() => {
  //   if (userLogin == null)
  //     navigation.navigate("Login")
  // }, [userLogin]);

  const handleLogout = () => {
    logout(dispatch)
  };

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title } = doc.data();
        list.push({
          id: doc.id,
          title,
        });
      });
      list.sort((a, b) => a.title.localeCompare(b.title));
      setJobs(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const addJob = async () => {
    if (isValid) {
      await ref.add({
        title: job,
      });
      setJob('');
    }
  };
  const handleJobChange = (text) => {
    setJob(text);
    setIsValid(text.trim().length > 0);
  };

  if (loading) {
    return null;
  }
  return(
    <View >
      <View style={styles.header}>
        <TouchableOpacity style={{textColor:'blue',flexDirection:"row"}} onPress={handleLogout} >
          <Image source={require('../assets/icon back.jpg')} style={styles.icon} ></Image>
          <Text style={{paddingTop:4, fontSize:20}}>Login</Text>
        </TouchableOpacity>
        <View style={{flex:1,alignItems:"center",paddingRight:80}}><Text style={styles.headerText}>Home</Text></View>
        
      </View>
      <View style={{alignItems:"center"}}>
        <Text style={styles.greeting}>Hello, {userLogin ? userLogin.fullName : 'User-Name'}</Text>
        
      </View>
      
      <View style={styles.container}>
        <TextInput
          label={"New Job"}
          value={job}
          onChangeText={handleJobChange}
          placeholder="Enter new job"
          style={styles.textInput}
        />
        <Button
          title="ADD"
          onPress={addJob}
          style={styles.button}
          
        ><Text >Add</Text></Button>
      </View>
        
      <FlatList
        style={{paddingTop:20}}
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Job {...item} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    paddingLeft:35,
    paddingRight:35,
    flex: 1, // Make the container take up the full screen height
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'center', // Center children horizontally
    alignItems: 'center', // Center children vertically
  },
  textInput: {
    flex: 1, // Allow input to fill available space
    marginRight: 10, // Add some margin between input and button
    padding: 10, // Add padding for better user experience
    backgroundColor: '#fff', // Set background color (optional)
    borderRadius: 30, // Add border radius for aesthetics (optional)
  },
  button: {
    backgroundColor: '#33CCFF', // Button background color
    borderRadius: 10, // Button border radius
    paddingHorizontal: 20, // Add horizontal padding for button text
    paddingVertical: 10, // Add vertical padding for button text
  },
  header: {
    padding:10,
    flexDirection:"row",
    backgroundColor: '#fff', // White background color
     // Add padding for better spacing
    // Center content horizontally
     // Center content vertically
  },
  headerText: {
    
    alignItems: "center",
    fontSize: 24, // Font size for the header text
    fontWeight: 'bold', // Make the text bold
    color: '#000', // Black text color
  },
  todoItem: {
    borderBottomWidth: 1, // Add border width for the underline
    borderBottomColor: '#ccc', // Set the underline color
    padding: 10, // Add padding around the content
  },
  underline: {
    height: 1, // Set the height of the underline
    backgroundColor: '#ccc', // Set the underline color
    marginTop: 5, // Add margin top for spacing
  },
  icon: {
    
    width: 30, // Adjust width as needed
    height: 30, // Adjust height as needed
    resizeMode: 'contain', // Maintain aspect ratio
  },
  greeting: {
    paddingTop:20,
    textAlign: 'center',
    fontSize: 20,
    
  },
});

export default Home;