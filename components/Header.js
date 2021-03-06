import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = props =>{
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height: 90,
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor:'#8f8f8f',
        borderBottomWidth:0.2,
    },
    title:{
        fontSize:30,
    }
});

export default Header;