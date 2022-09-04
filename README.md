
# React animation

This library makes possible to animate your React component with a few lines of code.

## Instalation
From root directory: 
```sh
npm i anim-react
```
or
```sh
yarn add anim-react
```

## Usage
```js
import { useRef } from 'react';
import { useAnim } from 'anim-react';

const myComponent = () => {
    const refToMyComponent = useRef(null); // create whatever ref
    
    const myComponentAnimation = useAnim({
        ref: refToMyComponent, // pass ref
        animName: "slideFromLeft" // name of predefined animation config
    })
    return (
        <div ref={refToMyComponent}> MyComponent </div>  
        /* Do not forget to pass ref into your target component. */
    )
}

export default myComponent;
```
## API

**useAnim(config)**
| useAnim | Custom React hook |
| :---- | ------ |
| **config** | Object with 3 fields: <br>{ <br> &nbsp;&nbsp;**ref**, <br> &nbsp;&nbsp;**animName**, <br>  &nbsp;&nbsp;**userConfig**, <br> } |
| **ref** | [React ref](https://reactjs.org/docs/hooks-reference.html#useref) that you currently passing to target component.  <br> **- type :** _React.MutableRefObject<HTMLElement \| null>_ <br> **- required** <br> <br> _Definition example: <br> const **ref** = useRef(null);_|
| **animName** | You can choose one of our [predefined animations](#names) , and use it without any customisations if you want. <br> **- type :** String  |
| **userConfig** | Object that provides animation definition/customisation : <br> { <br> &nbsp;&nbsp;**isActive**, <br> &nbsp;&nbsp;**keyframes**, <br> &nbsp;&nbsp; _...any other **JS** animation option_ <br> } <br> _Here you can [Read more](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect) about animation keyframes/options._ |
| **isActive** | Here you can define animation activity state _(true/false)_: <br> **- type :** Boolean <br> **- default :** true |
| **keyframes** | Animation frames that defines which and how style properties would be animated. [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)  |
| ...other animation options | Here you can  [Read more](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect)  about all animation options. |

## Names
Already existing animations names:
1. slideFromLeft
2. slideFormRight
3. slideFromTop
4. slideFromBottom
5. opacityAppear