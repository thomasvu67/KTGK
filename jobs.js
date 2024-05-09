import React from "react";
import { firebase } from "./Firebase/Firebase";
import { List } from 'react-native-paper';
import "react-native-web"

function Job({id, title}){
    async function toggleComplete() {
        await firebase.firestore()
        .collection('jobs')
        .doc(id);
    }
    return(
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
        />
    )
}
export default Job;