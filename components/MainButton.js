import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.1} onPress={props.onPress} onLongPress={props.onLongPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        // paddingVertical: 12,
        // paddingHorizontal: '10%',
        minWidth: '95%',
        // borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    }
});

export default MainButton;