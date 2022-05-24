import React, { useRef, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Animated, Easing } from 'react-native'

import MainButton from './MainButton';
import { getTimeFormat } from '../functions/timeConversions';

import { Ionicons } from '@expo/vector-icons';

const upperBound = 10;
const lowerBound = 0;
const fullLength = upperBound + 2;



// const initData = () => {
//     let data = Array.from(Array(upperBound), (_, i) => {

//         return { title: i, id: i };
//     });
//     return data;
// };

const initData = () => {
    let data = Array.from(Array(fullLength), (_, i) => {
        if (i === lowerBound) {
            return { title: (upperBound - 1), id: i }
        }
        if (i === (fullLength - 1)) {
            return { title: lowerBound, id: i }
        }
        return { title: i - 1, id: i };
    });
    return data;
};

const getScrollDistance = (viewHeight, itemHeight) => {
    return viewHeight - (viewHeight - itemHeight);
};

const getPosition = (value, scrollDistance) => {
    const position = (scrollDistance * value)
    return (-position);
}

const TimePicker = props => {


    const [currentIdx, setCurrentIdx] = useState(0);
    const [data, setData] = useState(initData());
    const [viewHeight, setViewHeight] = useState(0);
    const [itemHeight, setItemHeight] = useState(0);
    const [transformStyle, setTransformStyle] = useState(0);
    const [isOnLowerBoundary, setIsOnLowerBoundary] = useState(true);
    const [isOnUpperBoundary, setIsOnUpperBoundary] = useState(false);
    const [isOnBoundary, setIsOnBoundary] = useState(null);


    const animation = useRef(new Animated.Value(getPosition(currentIdx, getScrollDistance(viewHeight, itemHeight))));


    useEffect(() => {
        if (currentIdx === 1) {
            setIsOnLowerBoundary(true);
        } else {
            setIsOnLowerBoundary(false);
        };

        if (currentIdx === data.length - 2) {
            setIsOnUpperBoundary(true);
        } else {
            setIsOnUpperBoundary(false);
        };

    }, [currentIdx]);

    useEffect(() => {
        setTransformStyle(getTransformStyle(animation.current));
        const position = getPosition(currentIdx, getScrollDistance(viewHeight, itemHeight));
        console.log(position);
        animate(100, position);
    }, [currentIdx])

    const animate = (duration, position) => Animated.timing(animation.current, {
        toValue: position,
        duration: duration,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true
    }).start();

    // const rotation = animation.current.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 20],
    //     extrapolate: "clamp"
    // });



    const handleUpScroll = () => {
        if (currentIdx === 0) {
            // console.log(animation.current)
            // setIsOnBoundary(true);
            // setCurrentIdx(data.length - 3);
            // const position = getPosition((data.length - 3), getScrollDistance(viewHeight, itemHeight));
            // setTransformStyle(getTransformStyle(data.length - 3));
            // animate(0, position); 
            // setIsOnBoundary(false);

            // return;
        }
        setCurrentIdx(currentIdx => currentIdx - 1)
        // console.log(currentIdx);


    };


    const handleDownScroll = () => {
        if (currentIdx === data.length - 1) {
            setIsOnBoundary(true)
            return;
        }
        setCurrentIdx(currentIdx => currentIdx + 1)
    };



    const getTranslateStyle = position => ({
        transform: [
            {
                translateY: position
            },
        ],
    });


    const getTransformStyle = (value) => {
        // const transformStyle = getTranslateStyle(getPosition(currentIdx, getScrollDistance(viewHeight, itemHeight)));
        const transformStyle = getTranslateStyle(value);

        return transformStyle;
    }

    const renderItem =
        <View style={styles.listItemContainer}>
            {data.map((item) => (
                <Animated.Text style={{ ...styles.listItem, ...transformStyle }}
                    onLayout={e => {
                        setItemHeight(e.nativeEvent.layout.height);
                    }}
                    key={item.id}
                >
                    {getTimeFormat(item.title)}
                </Animated.Text>
            ))
            }
        </View>


    return (
        <View style={styles.container}>
            <View style={styles.arrowContainer}>
                <MainButton styles={styles.arrow} onPress={handleUpScroll} onLongPress={e => { console.log(e) }}>
                    <Ionicons name="md-arrow-dropup" size={130} color="#8f8f8f" />
                </MainButton>
            </View>
            <View style={styles.listContainer}
                onLayout={e => {
                    setViewHeight(e.nativeEvent.layout.height);
                }}
            >
                {renderItem}
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
        // flexDirection:'column-reverse',
        // margin: 1,
        borderWidth: 0.5,
        borderColor: "#8f8f8f",
        borderRadius: 7,
        overflow: 'hidden',
        // borderTopWidth:1,
        // borderBottomWidth:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        // width:'100%',
        // height:75,
    },
    listItemContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        // borderWidth: 0.5,
        // width:'100%',
        // height: 50,
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

export default TimePicker;