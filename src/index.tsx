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
    /** Slider height default 50 */
    height?: number;
    /** Changes backGround image of the full track default null and takes an image value */
    trackBackgroundImage?: any;
    /** Changes backGround image of the progress track default null and takes an image value */
    progressBarBackgroundImage?: any;
    /** Changes backGround image of the pan default null and takes an image value */
    panBackgroundImage?: any;
    /** Style of the progress slider takes a style object*/
    progressBarStyle?: object;
    /** Style of the full track takes a style object*/
    trackStyle?: object;
    /** Chages the slider to a vertical slider default false */
    vertical?: boolean;
    /** Will flip the slider verticaly or horizontaly default false */
    flip?: boolean;
}

interface RequiredProps {
    onChange: (value: number) => void
}

const defaultProps: OptionalProps = {
    maxValue: 1,
    minValue: 0,
    width: (screenWidth - 132),
    value: 0,
    step: 0,
    panStyle: {},
    height: 20,
    trackBackgroundImage: null,
    progressBarBackgroundImage: null,
    panBackgroundImage: null,
    progressBarStyle: {},
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
    const height = props.height
    const trackBackgroundImage = props.trackBackgroundImage ? props.trackBackgroundImage : null
    const progressBarBackgroundImage = props.progressBarBackgroundImage ? props.progressBarBackgroundImage : null
    const progressBarStyle = props.progressBarStyle
    const trackStyle = props.trackStyle
    const [persentage, setPersentage] = useState(0)
    const vertical = props.vertical ? '90deg' : '0deg'
    const flip = props.flip ? '180deg' : "0deg"
    const getPadding = trackStyle.borderWidth ? trackStyle.borderWidth : 4
    const getmargin = panStyle.width ? panStyle.width / 2 : height / 6
    const getBorderRadius = trackStyle.borderRadius ? trackStyle.borderRadius : 0

    // console.log(trackStyle)

    let TRACK_IMAGE, PROGRESS_IMAGE, PAN_IMAGE
    if (Platform.OS == 'web') {
        TRACK_IMAGE = Image.resolveAssetSource = () => { uri: trackBackgroundImage }
        PROGRESS_IMAGE = Image.resolveAssetSource = () => { uri: progressBarBackgroundImage }
        PAN_IMAGE = Image.resolveAssetSource = () => { uri: progressBarBackgroundImage }
    } else {
        TRACK_IMAGE = Image.resolveAssetSource(trackBackgroundImage);
        PROGRESS_IMAGE = Image.resolveAssetSource(progressBarBackgroundImage);
        PAN_IMAGE = Image.resolveAssetSource(progressBarBackgroundImage);
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
                <ImageBackground source={TRACK_IMAGE} resizeMode="cover" style={[s.bar, { backgroundColor: trackBackgroundImage ? 'transparent' : 'grey', width: width + getPadding * 2, height: height }, trackStyle]}>
                    <ImageBackground source={PROGRESS_IMAGE} resizeMode="cover" style={[s.rangeBar, { height: height - getPadding * 2, width: (width * persentage * .985), backgroundColor: progressBarBackgroundImage ? 'transparent' : 'white', borderRadius: getBorderRadius - getBorderRadius / 3 }, progressBarStyle]} >
                    </ImageBackground>
                    <ImageBackground source={TRACK_IMAGE} resizeMode="cover" style={[s.box, { marginLeft: -getmargin, width: height / 3, height: height + 10 }, panStyle]} ></ImageBackground>
                </ImageBackground>
                <S
                    style={{ width: width, height: height, zIndex: 9 }}
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
