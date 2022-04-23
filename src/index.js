import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import s from './Style'
import S from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width

const Slider = (props) => {
    const maxValue = props.maxValue ? props.maxValue : 1
    const minValue = props.minValue ? props.minValue : 0
    const width = props.width ? props.width - 32 : screenWidth - 132
    const value = props.value ? props.value : minValue
    const step = props.step ? props.step : 0
    const panColor = props.panColor ? props.panColor : 'transparent'
    const [sliderStyle, barStyle] = [props.sliderStyle ? props.sliderStyle : {}, props.barStyle ? props.barStyle : {}]
    const [persentage, setPersentage] = useState(0)
    const onChange = (e) => {
        props.onChange(e)
    }

    useEffect(() => {
        const ratio = (value - minValue) / (maxValue - minValue)
        setPersentage(ratio)
    })
    return (
        <View style={[s.container]} >
            <View style={[s.bar, barStyle, { borderColor: 'red', borderWidth: 2, transform: [{ scaleX: .91 }], position: 'absolute', backgroundColor: 'red', width: width, height: 20 }]}>
                <View style={[s.rangeBar, sliderStyle, { width: width * persentage, height: 20, backgroundColor: "white", marginLeft: -2 }]} ></View>
            </View>
            <S
                style={{ width: width, height: 20 }}
                minimumValue={minValue}
                maximumValue={maxValue}
                value={value}
                step={step}
                thumbTintColor={panColor}
                minimumTrackTintColor={`rgba(0,0,0,0)`}
                maximumTrackTintColor="rgba(0,0,0,0)"
                onValueChange={(e) => onChange(e)}
            />
        </View>
    );
};



export default Slider;
