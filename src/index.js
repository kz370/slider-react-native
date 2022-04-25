import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, PanResponder, Pressable, Text, TextInput } from 'react-native';
import { calculateRealValue, calculateNewPosition, defaultMax } from './Functions'
import s from './Style'

export default function Slider(props) {
    try {
        const showValues = !props.showValues ? props.showValues : true
        const xMax = props.width ? props.width / 2 : defaultMax
        const xMin = -xMax

        const maxValue = props.maxValue ? props.maxValue : 1
        const minValue = props.minValue ? props.minValue : 0
        const range = (maxValue - minValue)
        const step = props.step ? calculateRealValue(props.step, range, maxValue, minValue) : 0

        const val = props.value ? props.value : minValue
        const realValue = val <= maxValue ? (val >= minValue ? val - minValue : minValue) : minValue
        const value = step ? calculateNewPosition(realValue, step) : realValue

        const oldOffset = xMin + ((value / range) * 2 * xMax)
        const oldPersentage = (xMax + oldOffset) / (2 * xMax)

        const barStyle = props.barStyle ? [{ ...props.barStyle }].map(e => {
            return { "height": e.height ? e.height : 20, "backgroundColor": e.backgroundColor ? e.backgroundColor : 'grey' }
        })[0] : {}
        const sliderStyle = props.sliderStyle ? [{ ...props.sliderStyle }].map(e => {
            return { "height": e.height ? e.height : 20, "backgroundColor": e.backgroundColor ? e.backgroundColor : 'green' }
        })[0] : {}

        const panStyle = props.panStyle ? [{ ...props.panStyle }].map(e => {
            return { "height": e.height ? e.height : 20, "backgroundColor": e.backgroundColor ? e.backgroundColor : 'black' }
        })[0] : {}

        const pan = useRef(new Animated.ValueXY({ x: xMin + ((value / range) * 2 * xMax), y: 0 })).current;
        const [percentage, setPercentage] = useState(oldPersentage)
        const [output, setoutput] = useState(minValue + (oldPersentage * range))

        const panResponder = useRef(
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    let shift
                    if (pan.x._value > xMax) {
                        shift = xMax
                    } else if (pan.x._value < xMin) {
                        shift = xMin
                    } else {
                        shift = pan.x._value
                    }
                    pan.setOffset({
                        x: shift,
                    });
                },
                onPanResponderMove: (_, gesture) => {
                    const newStep = step ? calculateNewPosition(gesture.dx, step) : gesture.dx
                    const limit = pan.x._offset + newStep
                    let shift = 0, newoffset = 0
                    if (limit < xMax && limit > xMin) {
                        shift = newStep
                        newoffset = limit
                    } else if (limit >= xMax) {
                        shift = 2 * xMax
                        newoffset = xMax
                    } else if (limit <= xMin) {
                        shift = 2 * xMin
                        newoffset = xMin
                    }
                    pan.x.setValue(shift)
                    const newPersentage = (xMax + newoffset) / (2 * xMax)
                    const newOutput = minValue + (newPersentage * range)
                    setPercentage(newPersentage)
                    setoutput(newOutput)
                    props.onChange(newOutput)
                },
                onPanResponderRelease: () => {
                    if (pan.x._value + pan.x._offset > xMax || pan.x._value + pan.x._offset < xMin) {
                        pan.x.setOffset(0)
                    }
                    pan.flattenOffset()
                },
            })
        ).current;

        useEffect(() => {
            textChange(val)
        }, [value])

        const setBarValue = (e) => {
            const newStep = step ? calculateNewPosition(e, step) : e
            const panPostion = () => {
                if (newStep > (2 * xMax)) {
                    return (2 * xMax)
                } else if (newStep < xMin) {
                    console.log('e', e)
                } else {
                    return Math.floor(newStep)
                }
            }
            const newOffset = panPostion() - xMax
            const newOutput = minValue + (panPostion() / ((2 * xMax)) * range)
            const newPersentage = panPostion() / ((2 * xMax))
            pan.x.setValue(newOffset)
            setPercentage(newPersentage)
            setoutput(newOutput)
            props.onChange(newOutput)
        }

        const textChange = (e, setpan = true) => {
            if (+e || +e === 0 || e === '') {
                const newStep = step ? calculateNewPosition(+e, step) : +e
                let newValue
                if (newStep > maxValue) {
                    newValue = maxValue
                } else {
                    newValue = newStep
                }
                if (+e <= maxValue && +e >= minValue && e.length <= `${maxValue}`.length) {
                    setoutput(`${e}`)
                }
                const newOutput = (newOutput) => {
                    if (+newOutput) {
                        if (+newOutput <= maxValue && +newOutput >= minValue) {
                            setoutput(newOutput)
                        }
                    } else {
                        if (+e <= maxValue && +e >= minValue && e.length <= `${maxValue}`.length)
                            setoutput(e)
                    }
                }
                setTimeout(() => newOutput(`${newValue}`), 100)
                const newOffset = xMin + (((newValue - minValue) / range) * 2 * xMax)
                const newPersentage = (xMax + newOffset) / (2 * xMax)
                setPercentage(newPersentage)
                if (setpan) {
                    pan.x.setValue(newOffset)
                }
            }
        }
        return (
            <View>
                {showValues &&
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }]} >
                        <Text>{minValue}</Text>
                        <TextInput keyboardType='numeric' style={[s.titleText, { width: xMax * 1.8 }]} onChangeText={(e) => { textChange(e) }} value={`${output}`} />
                        <Text>{maxValue}</Text>
                    </View>}
                <View style={[s.container]}>
                    <Animated.View style={[s.container]} {...panResponder.panHandlers}>
                        <Pressable onPressIn={e => setBarValue(e.nativeEvent.locationX)} style={[s.bar, barStyle, { width: (2 * xMax) + 20, position: 'absolute' }]}>
                            <View style={[s.rangeBar, sliderStyle, { width: ((2 * xMax * percentage)) + 20 }]} ></View>
                        </Pressable>
                        <View style={[s.box, panStyle, { transform: [{ translateX: ((2 * xMax * percentage)) - xMax }] }]} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            {
                                transform: [{
                                    translateX: pan.x.interpolate({
                                        inputRange: [xMin, xMax],
                                        outputRange: [xMin, xMax],
                                        extrapolate: 'clamp'
                                    })
                                }]
                            }
                        ]}
                    >
                    </Animated.View>
                </View>
            </View>
        );
    } catch (e) {
        return (
            <View>

            </View>
        )
    }
};