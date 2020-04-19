import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';


const CircularProgress = ({ progress, isSecondHalf }) => {

    // const [circleWidth, setCircleWidth] = useState(Dimensions.get('window').width / 4);

    const animation = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: 250,
            easing: Easing.out(Easing.linear),
            useNativeDriver: true
        }).start();
    }, [progress])

    const rotation = animation.current.interpolate({
        inputRange: isSecondHalf ? [50, 100] : [0, 50],
        outputRange: ['45deg', '225deg'],
        extrapolate: "clamp"
    });

    return (
        <View style={styles.progressContainer}>
            <View style={styles.firstProgressLayer}></View>
            <Animated.View style={{
                ...styles.secondProgressLayer,
                borderTopColor: isSecondHalf ? borderCol : colour,
                borderRightColor: isSecondHalf ? borderCol : colour,
                transform: [{ rotateZ: rotation }]
            }}
            />
            {/* <Text style={styles.progressText}>{progress}%</Text> */}
        </View>

    );
};
const colour = '#8f8f8f';
const borderCol='white';
// const borderCol='black';
const circleWidth = Dimensions.get('window').width/2.3
const borderWidth = 5;
const borderRadius = circleWidth/2; 

const styles = StyleSheet.create({
    progressContainer: {
        width: circleWidth,
        height: circleWidth,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        borderColor: borderCol,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstProgressLayer: {
        width: circleWidth,
        height: circleWidth,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colour,
        borderTopColor: colour,
        transform: [{ rotateZ: '-135deg' }]
    },
    secondProgressLayer: {
        width: circleWidth,
        height: circleWidth,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colour,
        borderTopColor: colour,
        transform: [{ rotateZ: '45deg' }]
    },
    progressText:{
        position:'absolute',
        fontSize:50,
        color:colour,
    },
});

export default CircularProgress;