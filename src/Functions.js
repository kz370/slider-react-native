import { Dimensions } from 'react-native';

const width = Dimensions.get('screen').width
export const defaultMax = (width - 100) / 2

export const calculateRealValue = (step, range, max, min) => {
    let newValue = 0
    if (typeof (step) === 'string') {
        if (step.includes('%')) {
            newValue = range * ((+(step.replace('%', '')) / 100))
        } else {
            newValue = +step
        }
    } else {
        newValue = step
    }
    if (newValue >= min && newValue <= max) {
        return newValue
    } else {
        return 0
    }
}

export const calculateNewPosition = (value, step) => {
    return Math.round(value / step) * step
}