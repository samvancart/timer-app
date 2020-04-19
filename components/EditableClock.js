import React, { useRef, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

import MainButton from './MainButton';
import Card from './Card';
import { getTimeFormat } from '../functions/timeConversions';

import { Ionicons } from '@expo/vector-icons';


let scrollOffset = 0;
let viewHeight = 0;
let topOffset = 0;
let viewY = 0;
let itemY = 0;
let itemHeight = 0;

const data = Array.from(Array(60), (_, i) => {
    return { id: i };
});

const renderItem = ({item}) => {
    return (
        <View style={styles.listItemContainer}
            onLayout={e => {
                itemHeight = e.nativeEvent.layout.height;
                itemY = e.nativeEvent.layout.y;
            }}
        >
            <Text style={styles.listItem}>
                {getTimeFormat(item.id)}
            </Text>
        </View>
    );
};

const EditableClock = props => {

    const listRef = useRef();
    const listContainerRef = useRef();

    // useEffect = (() => {

    // });



const handleUpScroll = () => {
    scrollDistance = getScrollDistance(viewHeight, itemHeight);
    moveList((scrollDistance) * (-1));
};
const handleDownScroll = () => {
    scrollDistance = getScrollDistance(viewHeight, itemHeight);
    moveList(scrollDistance);
};
const getScrollDistance = (viewHeight, itemHeight) => {
    return viewHeight - (viewHeight - itemHeight);
};
const moveList = (scrollDistance) => {
    let offset = scrollOffset + scrollDistance

    listRef.current.scrollToOffset({
        animated: true,
        offset: offset
    });
};


return (
    <View style={styles.container}>
        <View style={styles.arrowContainer}>
            <MainButton styles={styles.arrow} onPress={handleUpScroll}>
                <Ionicons name="md-arrow-dropup" size={130} color="#8f8f8f" />
            </MainButton>
        </View>
        <View
            style={styles.listContainer}
            ref={listContainerRef}
            onLayout={e => {
                listContainerRef.current.measureInWindow((_x, y) => {
                    topOffset = y;
                });
                viewHeight = e.nativeEvent.layout.height;
                viewY = e.nativeEvent.layout.y;

            }}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                // renderItem={({ item }) =>
                //     <View style={styles.listItemContainer}
                //         onLayout={e => {
                //             itemHeight = e.nativeEvent.layout.height;
                //             itemY = e.nativeEvent.layout.y;
                //         }}
                //     >
                //         <Text style={styles.listItem}>
                //             {getTimeFormat(item.id)}
                //         </Text>
                //     </View>}
                keyExtractor={item => item.id.toString()}
                ref={listRef}
                onScroll={e => {
                    scrollOffset = e.nativeEvent.contentOffset.y;
                }}
            />
        </View>
        <View style={styles.arrowContainer}>
            <MainButton styles={styles.arrow} onPress={handleDownScroll}>
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
        justifyContent: 'center',
        // alignItems:'center',
    },
    arrowContainerCard: {
        flex: 1,
        margin: 1,
    },
    arrowContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    listContainerCard: {
        flex: 3
    },
    listContainer: {
        flex: 3,
        // margin: 1,
        borderWidth: 0.5,
        borderColor: "#8f8f8f",
        borderRadius: 7,
        // overflow: 'hidden',
        // borderTopWidth:1,
        // borderBottomWidth:1,
        justifyContent: 'center',
        // backgroundColor: 'red',
        // width:'100%',
        // height:'100%',
    },
    listItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 0.5,
        // width:'100%',
        // height:'100%',
        // position:'absolute'
        // margin:10,
        // borderRadius:15,
        // backgroundColor:"#8f8f8f",

    },
    listItem: {
        fontSize: 75,
    },
    arrow: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default EditableClock;

