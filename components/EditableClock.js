import React, { useRef, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Animated, Easing } from 'react-native'

import MainButton from './MainButton';
import { getTimeFormat } from '../functions/timeConversions';

import { Ionicons } from '@expo/vector-icons';

const upperBound = 59;
const lowerBound = 0;
let viewHeight = 0;
let itemHeight = 0;
let scrollOffset = 0;


const initData = () => {
    let data = Array.from(Array(62), (_, i) => {
        if (i === 0) {
            return { title: 59, id: i }
        }
        if (i === 61) {
            return { title: 0, id: i }
        }
        return { title: i - 1, id: i };
    });
    return data;
};


const EditableClock = props => {

    const animation = useRef(new Animated.Value(0));
    const listRef = useRef(0);

    const [currentIdx, setCurrentIdx] = useState(1);
    const [data, setData] = useState(initData());
    const [heightView, setHeightView] = useState(0);
    const [heightItem, setHeightItem] = useState(0);
    const [isDirectionUp, setIsDirectionUp] = useState(null);
    const [contentOffsetState, setContentOffsetState] = useState(0);

    const getTranslateStyle = position => ({
        transform: [
            {
                translateY: position
            },
        ],
    });


    useEffect(() => {

    });


    useEffect(() => {
        if (isDirectionUp !== null) {
            if ((currentIdx === 1) && isDirectionUp) {
                getNewOffset(getScrollDistance(heightView, heightItem) * (data.length - 2));
                console.log(contentOffsetState)
            } else if ((currentIdx === data.length) && !isDirectionUp) {
                getNewOffset(getScrollDistance(heightView, heightItem));
            }
        }
    });


    const getNewOffset = (offset) => {
        listRef.current.scrollToOffset({
            animated: false,
            offset: offset
        });
        setCurrentIdx(getPosition(offset, getScrollDistance(heightView, heightItem)));
    }

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: 59,
            duration: 10000,
            easing: Easing.out(Easing.linear),
            useNativeDriver: true
        }).start();
    }, [])

    const rotation = animation.current.interpolate({
        inputRange: [0, 59],
        outputRange: ['0deg', '360deg'],
        extrapolate: "clamp"
    });

    const handleUpScroll = () => {
        setCurrentIdx(currentIdx - 1)
        if (currentIdx <= lowerBound) {
            setCurrentIdx(upperBound);
            return;
        }

    };


    const handleDownScroll = () => {
        setCurrentIdx(currentIdx + 1)
        if (currentIdx >= upperBound) {
            setCurrentIdx(lowerBound);
            return;
        }
    };

    const getScrollDistance = (viewHeight, itemHeight) => {
        return viewHeight - (viewHeight - itemHeight);
    };

    const getY = (scrollDistance) => {
        let offset = scrollOffset + scrollDistance;
        return offset;
    };

    const getPosition = (scrollOffset, scrollDistance) => {
        const index = Math.abs(Math.round((scrollOffset + scrollDistance) / scrollDistance));
        // console.log(index);
        return index;
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItem}
                    onLayout={e => {
                        itemHeight = e.nativeEvent.layout.height;
                        setHeightItem(itemHeight);
                    }}
                >
                    {getTimeFormat(item.title)}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.arrowContainer}>
                <MainButton styles={styles.arrow} onPress={handleUpScroll} onLongPress={e => { console.log(e) }}>
                    <Ionicons name="md-arrow-dropup" size={130} color="#8f8f8f" />
                </MainButton>
            </View>
            <View style={styles.listContainer}
                onLayout={e => {
                    viewHeight = e.nativeEvent.layout.height;
                    setHeightView(viewHeight);
                }}
            >
                <FlatList

                    snapToOffsets={[...Array(data.length)].map((x, i) => (Math.floor(getScrollDistance(heightView, heightItem) * i)))}
                    decelerationRate={"normal"}
                    pagingEnabled
                    snapToAlignment={"start"}
                    showsVerticalScrollIndicator={false}
                    // scrollEnabled={false}
                    initialScrollIndex={1}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ref={listRef}
                    getItemLayout={(data, dataLength) => (
                        {
                            length: getScrollDistance(viewHeight, itemHeight),
                            offset: getScrollDistance(viewHeight, itemHeight) * dataLength,
                            index: dataLength
                        }
                    )}
                    onScroll={e => {
                        const currentOffset = e.nativeEvent.contentOffset.y;
                        const directionUp = currentOffset > scrollOffset ? false : true;
                        scrollOffset = currentOffset;
                        // setContentOffsetState(currentOffset)
                        // e.nativeEvent.contentOffset = { x: 0, y: contentOffsetState };
                        // scrollOffset = contentOffsetState;
                        setIsDirectionUp(directionUp);
                        setCurrentIdx(getPosition(scrollOffset, getScrollDistance(viewHeight, itemHeight)));

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
        alignItems: 'center',
        // backgroundColor: 'red',
        // width:'100%',
        // height:'100%',
    },
    listItemContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 0.5,
        // width:'100%',
        // height:'100%',
        // position: 'absolute'
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