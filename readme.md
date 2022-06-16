## Crafty-app

Made by <a target="_blank" href="https://crafty-app.com"> Crafty-app</a>

# React native slider

A fully custimizable slider for react native

## Installation

npm:

```bash
  npm i @khaledz370/slider-react-native
```

yarn:

```bash
  yarn add @khaledz370/slider-react-native
```

## Usage

List of possible values:

maxValue:

```bash
    Maximum slider value
    default = 1
```

minValue:

```bash
   Minimum slider value
   default = 0
```

width:

```bash
   Slider width
```

value:

```bash
    Current slider value default minimum value
```

step:

```bash
   Step at which slider move
   you can also use step in persentage Ex:"17%" as a string
   default 0
```

height:

```bash
  Slider height
  default 20
```

trackStyle

```bash
  Style of the full track
  takes a style object
```

progressBarStyle

```bash
  Style of the progress slider
  takes a style object
```

panStyle:

```bash
  Style of the pan
  takes a style object
```

trackBackgroundImage:

```bash
  Changes backGround image of the full track
  default null
  takes an image value
```

progressBarBackgroundImage:

```bash
  Changes backGround image of the progress track
  default null
  takes an image value
```

panBackgroundImage:

```bash
  Changes backGround image of the pan
  default null
  takes an image value
```

vertical

```bash
  Chages the slider to a vertical slider
  default false
```

flip

```bash
  Will flip the slider verticaly or horizontaly
  default false
```
disabled

```bash
  will disable the slider
  default false
```

onChange

```bash
  required!
  returns a value based on the slider position
```

## Usage/Examples

### Slider basic example

```javascript
import Slider from "@khaledz370/slider-react-native";

export default function App() {
  const [value, setValue] = useState(50);
  return (
    <View style={styles.container}>
      {showModal && (
        <Slider
          value={value}
          step={10}
          maxValue={500}
          minValue={30}
          onChange={e => setValue(e)}
          width={300}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
```

## Screenshots

![alt text](https://raw.githubusercontent.com/kz370/myImages/main/sliderBasic.png)

### Slider custom example

```javascript
        <Slider
          ...
          height={50}
          trackStyle={{
            borderRadius: 50,
            borderColor: "lightgreen",
            borderWidth: 5
            }}
          panStyle={{
            backgroundColor: "red",
            borderColor: "blue",
            borderWidth: 5,
            width: 50,height: 80,
            borderRadius: 15
            }}
          progressBarStyle={{
            backgroundColor: "wheat"
            }}
        />
```

## Screenshots

![alt text](https://raw.githubusercontent.com/kz370/myImages/main/sliderCustom.png)
