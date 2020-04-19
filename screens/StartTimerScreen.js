import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Vibration,
}
    from 'react-native';

import { useInterval } from '../hooks/interval';

import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Clock from '../components/Clock';
import CircularProgress from '../components/CircularProgress';
import EditableClock from '../components/EditableClock';
import { getTimeFromMilliseconds, getNewTime, getTimeFormat } from '../functions/timeConversions';


const delay = 100;
const fraction = (1000 / delay);
const signal = 3;

const StartTimerScreen = props => {

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 1.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdownSignal, setCountdownSignal] = useState(signal);
    const [progress, setProgress] = useState(0);
    const [isSecondHalf, setIsSecondHalf] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(600);
    const [intervalCounter, setIntervalCounter] = useState(1);
    const [remaining, setRemaining] = useState(end);
    const [time, setTime] = useState(getTimeFromMilliseconds(end * delay));


    useInterval(() => {
        setIntervalCounter(Math.floor(intervalCounter) + 1);
        if ((intervalCounter % fraction) === 0) {
            setRemaining(remaining - fraction);
            setTime(getNewTime(time));
        }
        updateProgress();
        triggerCountdownSignal();
    }, isPlaying ? delay : null);



    const triggerCountdownSignal = () => {
        if (countdownSignal === null) {
            return;
        };

        if ((start > end)) {
            Vibration.vibrate(700);
        };

        if (countdownSignal !== 0 && (end - start) === countdownSignal * 10) {
            Vibration.vibrate(100);
            setCountdownSignal(countdownSignal - 1);
        };
    };

    useEffect(() => {
        if (end < start) {
            setTimeout(() => {
                reset();
            }, 1000);
        }
    }, [(end < start)]);

    //CircularProgress

    const updateProgress = () => {
        if (end < start) {
            setIsPlaying(false);
            return;
        }
        const currentProgress = Math.floor((start / end) * 100);

        setProgress(currentProgress);
        if (progress > 50) {
            setIsSecondHalf(true);
        }
        setStart(start + 1);
    };

    const triggerVibration = () => {
        Vibration.vibrate(10)
    };

    const handleStart = () => {
        setIsPlaying(true);
        triggerVibration();
    };

    const handlePause = () => {
        setIsPlaying(false);
        triggerVibration();
    };

    const handleReset = () => {
        reset();
        triggerVibration();
    };

    const reset = () => {
        setIsPlaying(false);
        setProgress(0);
        setStart(0);
        setIsSecondHalf(false);
        setRemaining(end);
        setTime(getTimeFromMilliseconds(end * delay));
        setCountdownSignal(signal);
        setIntervalCounter(1);
    }


    // useEffect(() => {
    //     const updateLayout = () => {
    //         setButtonWidth(Dimensions.get('window').width / 1.5);
    //     };

    //     Dimensions.addEventListener('change', updateLayout);
    //     return () => {
    //         Dimensions.removeEventListener('change', updateLayout);
    //     };
    // });

    return (

        <View style={styles.screen}>
            <View style={styles.playCardContainer}>
                <Card style={styles.playCard}>
                    <CircularProgress progress={progress} isSecondHalf={isSecondHalf} />
                    <View style={styles.playButtonContainer}>
                        <MainButton style={styles.playButton} onPress={isPlaying ? handlePause : handleStart}>
                            <Ionicons name={isPlaying ? 'md-pause' : 'md-play'} size={130} color="#8f8f8f" />
                        </MainButton>
                    </View>
                </Card>
            </View>
            <View style={styles.secondaryViewContainer}>
                <View style={styles.timerCardContainer}>
                    <View style={styles.resetCardContainer}>
                        <Card style={styles.resetCard}>
                            <View style={styles.resetButtonContainer}>
                                <MainButton style={styles.resetButton} onPress={handleReset} >
                                    <Ionicons name="md-refresh" size={40} color="#8f8f8f" />
                                </MainButton>
                            </View>
                        </Card>
                    </View>
                    <Card style={styles.timeDisplayCard}>
                        <Clock>
                            <Text>
                                {getTimeFormat(time.hours)}:
                            {getTimeFormat(time.minutes)}:
                            {getTimeFormat(time.seconds)}
                            </Text>
                        </Clock>
                    </Card>
                </View>
            </View>
            <View style={{flex:0.5, alignItems:'center', justifyContent:'space-around' }}>
            <EditableClock />
            </View>
           
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,

    },
    secondaryViewContainer: {
        flex: 0.15,
        // backgroundColor: '#688',
    },
    playCardContainer: {
        flex: 0.36,
        // backgroundColor: '#555'
    },
    timerCardContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'orange',
    },
    resetCardContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'skyblue',
    },
    playCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    resetCard: {
        flex: 1,
        margin: 10,

    },
    timeDisplayCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    playButtonContainer: {
        // flex: ,
        // width: Dimensions.get('window').width * 0.8,
        // height: Dimensions.get('window').width * 0.5,
        // borderRadius: Dimensions.get('window').width * 0.5 / 2,
        width: '100%',
        height: '100%',
        // backgroundColor:'green',
        // borderRadius: 150,
        overflow: 'hidden',
        position: 'absolute',
        // borderWidth: 3,
        // borderColor: 'black',
    },
    resetButtonContainer: {
        flex: 1,
        // margin: '3%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor:'green',
        borderRadius: 10,
    },
    playButton: {
        flexDirection: 'row',
        // alignSelf: 'center',
        // alignItems: 'center',
        // alignContent:'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        // position:'absolute',
        // backgroundColor:'blue',

    },
    resetButton: {
        flex: 1,
        minWidth: 60,
        minHeight: 50,
        maxWidth: '100%',
        maxHeight: '100%',
        margin: '3%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default StartTimerScreen;