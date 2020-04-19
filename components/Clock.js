import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Clock = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{props.children}</Text>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderColor:'black',
        width:'100%',
        height:'100%',
        // borderRadius:10,
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
        // elevation: 5,


    },
    timer: {
        fontSize:50,
    },
});


export default Clock;