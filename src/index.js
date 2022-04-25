import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import s from './Style'
import S from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width

export default function Slider(props) {
    const showValues = !props.showValues ? props.showValues : true
    const maxValue = props.maxValue ? props.maxValue : 1
    const minValue = props.minValue ? props.minValue : 0
    const width = props.width ? props.width - 32 : screenWidth - 132
    const value = props.value ? props.value : minValue
    const step = props.step ? props.step : 0
    const panColor = props.panColor ? props.panColor : 'transparent'
    const thickness = props.thickness ? props.thickness : 50
    const [sliderStyle, barStyle] = [props.sliderStyle ? props.sliderStyle : {}, props.barStyle ? props.barStyle : {}]
    const [persentage, setPersentage] = useState(0)
    const [current, setCurrent] = useState(minValue)
    const onChange = (e) => {
        setCurrent(e)
        props.onChange(e)
    }

    useEffect(() => {
        const ratio = (value - minValue) / (maxValue - minValue)
        setPersentage(ratio)
    })
    return (
        <View>
            {showValues &&
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width, transform: [{ scaleX: .90 }] }]} >
                    <Text>{minValue}</Text>
                    <Text>{current}</Text>
                    <Text>{maxValue}</Text>
                </View>}
            <View style={[s.container]} >
                <View style={[s.bar, barStyle, { borderRadius: 50, overflow: 'hidden', borderColor: 'grey', borderWidth: 2, transform: [{ scaleX: .91 }], position: 'absolute', backgroundColor: 'grey', width: width, height: thickness }]}>
                    <View style={[s.rangeBar, sliderStyle, { borderRadius: thickness, justifyContent: 'center', alignItems: 'center', width: width * persentage, height: thickness, backgroundColor: "white", marginLeft: -2 }]} >
                        <View style={[{ width: thickness, height: thickness, borderRadius: thickness, backgroundColor: persentage > .05 ? 'black' : 'transparent', alignSelf: persentage > .1 ? 'flex-end' : 'flex-start' }]} ></View>
                    </View>
                </View>
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