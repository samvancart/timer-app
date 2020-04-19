import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

import MainButton from './MainButton';
import { getTimeFormat } from '../functions/timeConversions';

import { Ionicons } from '@expo/vector-icons';

const data = Array.from(Array(60), (_, i) => {
    return { id: i };
});



const EditableClock = props => {

    return (
        <View style={styles.container}>
            
            <View style={styles.arrowContainer}>
                <MainButton styles={styles.arrow} onPress={() => {}}>
                    <Ionicons name="md-arrow-dropup" size={130} color="#8f8f8f" />
                </MainButton>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>
                                {getTimeFormat(item.id)}
                            </Text>
                        </View>}
                    keyExtractor={item => item.id.toString()}

                />
            </View>
            <View style={styles.arrowContainer}>
                <MainButton styles={styles.arrow} onPress={() => {}}>
                    <Ionicons name="md-arrow-dropdown" size={130} color="#8f8f8f" />
                </MainButton>
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 170,
        borderColor: 'black',
        // borderWidth: 3
    },
    arrowContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    listContainer: {
        flex: 3,
        margin: 1,
        borderWidth: 1,
        borderColor:"#8f8f8f",
        borderRadius:7,
        overflow:'hidden',
        // borderTopWidth:1,
        // borderBottomWidth:1,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    listItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1,
        // margin:7,
        // borderRadius:15,
        // backgroundColor:"#8f8f8f",

    },
    listItem: {
        fontSize:70,
    },
    arrow: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default EditableClock;

