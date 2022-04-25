import React, { useState, useEffect } from 'react';
import { Platform, View, Dimensions, Text, TextInput, ImageBackground, Image } from 'react-native';
import s from './Style'
import S from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width
const calculateNewPosition = (value, step) => {
    return Math.round(value / step) * step
}


export default function Slider(props) {
    const showValues = !props.showValues ? props.showValues : true
    const maxValue = props.maxValue ? props.maxValue : 1
    const minValue = props.minValue ? props.minValue : 0
    const width = props.width ? props.width - 32 : screenWidth - 132
    const value = props.value ? (props.value <= minValue ? minValue : props.value >= maxValue ? maxValue : props.value) : minValue
    const step = props.step ? props.step : 0
    const panColor = props.panColor ? props.panColor : 'transparent'
    const thickness = props.thickness ? props.thickness : 50
    const trackBackgroundImage = props.trackBackgroundImage ? props.trackBackgroundImage : null
    const progressBarBackgroundImage = props.progressBarBackgroundImage ? props.progressBarBackgroundImage : null
    const [sliderStyle, setSliderStyle] = [props.sliderStyle ? props.sliderStyle : {}, props.barStyle ? props.barStyle : {}]
    const [persentage, setPersentage] = useState(0)
    const [current, setCurrent] = useState(calculateNewPosition(value, step))
    const vertical = props.vertical ? props.vertical === true ? "90deg" : props.vertical === 'invert' ? '270deg' : props.vertical : 0

    let TRACK_IMAGE, PROGRESS_IMAGE
    if (Platform.OS == 'web') {
        TRACK_IMAGE = Image.resolveAssetSource = () => { uri: trackBackgroundImage }
    } else {
        TRACK_IMAGE = Image.resolveAssetSource(trackBackgroundImage);
    }
    if (Platform.OS == 'web') {
        PROGRESS_IMAGE = Image.resolveAssetSource = () => { uri: progressBarBackgroundImage }
    } else {
        PROGRESS_IMAGE = Image.resolveAssetSource(progressBarBackgroundImage);
    }

    const onChange = (e) => {
        setCurrent(e)
        props.onChange(e)
    }

    useEffect(() => {
        const ratio = (value - minValue) / (maxValue - minValue)
        setPersentage(ratio)
        if (ratio === 1) {
            setCurrent(maxValue)
        } else {
            setCurrent(calculateNewPosition(value, step))
        }
        props.onChange(current)
    }, [current])

    const changeText = (e) => {
        if (+e <= maxValue) {
            setCurrent(e)
        } else if (+e >= maxValue) {
            setCurrent(maxValue)
        }
        if (step) {
            setTimeout(() => {
                if (+e <= maxValue && +e >= minValue)
                    setCurrent(calculateNewPosition(e, step))
            }, 400)
        }
    }
    return (
        <View style={[{ height: vertical ? 400 : 40, margin: 20 }]}>
            {showValues &&
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width, transform: [{ scaleX: .90 }] }]} >
                    <Text>{minValue}</Text>
                    <TextInput value={`${current}`} onChangeText={e => { changeText(e) }} />
                    <Text>{maxValue}</Text>
                </View>}
            <View style={[s.container]} >
                <ImageBackground source={TRACK_IMAGE} resizeMode="cover" style={[s.bar, { backgroundColor: trackBackgroundImage ? 'transparent' : 'grey', borderRadius: 50, overflow: 'hidden', borderColor: 'grey', borderWidth: 2, transform: [{ scaleX: .91 }], position: 'absolute', width: width, height: thickness + 4 }]}>
                    <ImageBackground source={PROGRESS_IMAGE} resizeMode="cover" style={[s.rangeBar, sliderStyle, { borderRadius: thickness, justifyContent: 'center', alignItems: 'center', width: width * persentage, height: thickness, backgroundColor: progressBarBackgroundImage ? 'transparent' : 'white', marginLeft: -2 }]} >
                        <View style={[{ width: thickness, height: thickness, borderRadius: thickness + 4, backgroundColor: 'black', alignSelf: persentage > .1 ? 'flex-end' : 'flex-start' }]} ></View>
                    </ImageBackground>
                </ImageBackground>
                <S
                    style={{ width: width, height: thickness }}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    value={value}
                    step={step}
                    thumbTintColor={panColor}
                    minimumTrackTintColor="rgba(0,0,0,0)"
                    maximumTrackTintColor="rgba(0,0,0,0)"
                    onValueChange={(e) => onChange(e)}
                />
            </View>
        </View>
    );
};