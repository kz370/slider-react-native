import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, Dimensions, ImageBackground, Image } from 'react-native';
import s from '@khaledz370/slider-react-native/src/Style'
import S from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width
const calculateNewPosition = (value, step) => {
    if (step) {
        return Math.round(value / step) * step
    } else {
        return value
    }
}

const calculateStep = (step, minValue, maxValue) => {
    let newStep = 0
    if (typeof (step) === 'number') {
        if (step > maxValue || step < 0) {
            newStep = 0
        } else {
            newStep = step
        }
    } else {
        if (+step.replace('%', '') >= 100 || +step.replace('%', '') <= 0) {
            newStep = 0
        } else {
            newStep = (+step.replace('%', '') * (maxValue - minValue)) / 100
        }
    }
    return +newStep
}

const getValue = (value, min, max) => {
    let v = min
    if (min <= +value && +value <= max) {
        v = value
    } else if (+value > max) {
        v = max
    } else {
        v = min
    }
    return v
}

interface OptionalProps {
    /** Maximum slider value default = 1 */
    maxValue?: number;
    /** Minimum slider value default = 0 */
    minValue?: number;
    /** Slider width */
    width?: number;
    /** Current slider value default minimum value */
    value?: number;
    /** Step at which slider move default 0 you can also use step in persentage Ex:"17%" as a string*/
    step?: number | string;
    /** Changes pan style*/
    panStyle?: object;
    /** Slider thickness default 50 */
    thickness?: number;
    /** Changes backGround image of the full track default null and takes an image value */
    trackBackgroundImage?: any;
    /** Changes backGround image of the progress track default null and takes an image value */
    progressBarBackgroundImage?: any;
    /** Style of the progress slider takes a style object*/
    sliderStyle?: object;
    /** Style of the full track takes a style object*/
    trackStyle?: object;
    /** Chages the slider to a vertical slider default false */
    vertical?: boolean;
    /** Will flip the slider verticaly or horizontaly default false */
    flip?: boolean;
}

interface RequiredProps {
    /** returns a value based on the slider position required! */
    onChange: (value: number) => void
}

const defaultProps: OptionalProps = {
    maxValue: 1,
    minValue: 0,
    width: (screenWidth - 132),
    value: 0,
    step: 0,
    panStyle: {},
    thickness: 20,
    trackBackgroundImage: null,
    progressBarBackgroundImage: null,
    sliderStyle: {},
    trackStyle: {},
    vertical: false,
    flip: false,
}

interface AllProps extends OptionalProps, RequiredProps { }

export default function Slider(props: AllProps) {
    const maxValue = props.maxValue
    const minValue = props.minValue
    const width = props.width
    const value = getValue(props.value, minValue, maxValue)
    let step = calculateStep(props.step, minValue, maxValue)
    const panStyle = props.panStyle
    const thickness = props.thickness
    const trackBackgroundImage = props.trackBackgroundImage ? props.trackBackgroundImage : null
    const progressBarBackgroundImage = props.progressBarBackgroundImage ? props.progressBarBackgroundImage : null
    const sliderStyle = props.sliderStyle
    const trackStyle = props.trackStyle
    const [persentage, setPersentage] = useState(0)
    const vertical = props.vertical ? '90deg' : '0deg'
    const flip = props.flip ? '180deg' : "0deg"

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
        let ratio
        if (step) {
            ratio = (calculateNewPosition(e, step) - minValue) / (maxValue - minValue)
        } else {
            ratio = (e - minValue) / (maxValue - minValue)
        }
        setPersentage(ratio)
        props.onChange(e)
    }

    useEffect(() => {
        step = calculateStep(props.step, minValue, maxValue)
        const ratio = (value - minValue) / (maxValue - minValue)
        setPersentage(ratio)
    })

    return (
        <View style={[{ height: vertical ? 400 : 40, margin: 20 }]}>
            <View style={[s.container, { transform: [{ rotateZ: vertical }, { rotateZ: flip }] }]} >
                <ImageBackground source={TRACK_IMAGE} resizeMode="cover" style={[s.bar, { backgroundColor: trackBackgroundImage ? 'transparent' : 'grey', width: width, height: thickness + 4 }, trackStyle]}>
                    <ImageBackground source={PROGRESS_IMAGE} resizeMode="cover" style={[s.rangeBar, sliderStyle, { width: width * persentage*.985 , height: thickness, backgroundColor: progressBarBackgroundImage ? 'transparent' : 'white' }]} >

                    </ImageBackground>
                    <View style={[s.box, { width: thickness / 3, height: thickness + 10 }, panStyle]} ></View>
                </ImageBackground>
                <S
                    style={{ width: width, height: thickness }}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    value={value}
                    step={step}
                    thumbTintColor="rgba(0,0,0,0)"
                    minimumTrackTintColor="rgba(0,0,0,0)"
                    maximumTrackTintColor="rgba(0,0,0,0)"
                    onValueChange={(e) => onChange(e)}
                />
            </View>
        </View>
    );
};

Slider.defaultProps = defaultProps;
