## Crafty-app

Made by <a target="_blank" href="https://crafty-app.com"> Crafty-app</a>


# Date picker

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
   default 0
   you can also use step in persentage Ex:"17%" as a string
```

panStyle:

```bash
   Freely set the pan style width,height,backgroundColor,etc...
```

thickness:

```bash
  Slider thickness
  default 20
```

trackBackgroundImage:

```bash
  Changes backGround image of the full track default null and takes an image value
```

progressBarBackgroundImage:

```bash
  Changes backGround image of the progress track default null and takes an image value
```

sliderStyle

```bash
  Style of the progress slider takes a style object
```

trackStyle

```bash
  Style of the full track takes a style object
```

vertical

```bash
  Chages the slider to a vertical slider default false
```

flip

```bash
  Will flip the slider verticaly or horizontaly default false
```

onChange

```bash
  returns a value based on the slider position required!
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

<table>
   <tr>
   <td><img src="" alt="React Native Slider" height="400px"  style="margin-left:10px" /></td>
  </tr>
</table>



### Important For web view

```bash
Add this to app.json
  "web": {
      "build": {
        "babel": {
          "include": [
            "@khaledz370/datetimepicker-react-native"
          ]
        }
      }
    }
```
