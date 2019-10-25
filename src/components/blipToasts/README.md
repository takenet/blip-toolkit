# BLiP Toast

BLiP Toast is a JavaScript plugin to customize your toasts. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components. You can use the toasts with the possibility of having a title, auto disappearing, showing a dismiss button, and showing an action button.


## Usage

```html
<div id="toasts"></div>

<script type="text/javascript">
import { BlipToasts } from 'blip-toolkit'

const toasts = new BlipToasts()
const toastsElement = toasts.render()
document.getElementById('toasts').appendChild(toastsElement)

const showAlert = () => {
  alert('This is a callback function')
}
toasts.success({
  msg: 'Message here',
  title: 'Title here',
  duration: 4000,
  buttonText: 'Alert',
  callback: showAlert,
})
</script>
```


## Usage in BLiP Portal

To use BLiP Toast in BLiP Portal, inject the service in the controller:

`private BlipToastService: BlipToastService`

And then use it to show the toast:

```javascript
this.BlipToastService.show('danger', {
    msg: 'Error message',
});
```


## Options

#### `msg` - string

The message to show in the toast.

#### `title` - string (optional)

The title of the toast.

#### `buttonText` - string (optional)

If present, the dismiss button will be replaced by this text.

#### `duration` - number (optional)

Duration to keep the toast in the screen, in miliseconds. The default value is 12 seconds. If duration is set to 0, the toast will not disappear until dismissed.
Also, while the person has the mouse over the toast, it will not disappear. The duration will start to count down when the mouse leaves the toast.


## Callback

#### `callback` - function (optional)

Callback function to execute when the dismiss button is clicked. It dismisses the toast after the function is executed.


## Methods

#### `info({ msg, title, buttonText, callback, duration })`

Method to show the info toast:

![image.png](https://s3-sa-east-1.amazonaws.com/msging.net/Services/Images/c6eaac30-25ee-47c2-885d-2f650b1accc4)

#### `refresh({ msg, title, buttonText, callback, duration })`

Method to show the refresh toast:

![image.png](https://s3-sa-east-1.amazonaws.com/msging.net/Services/Images/9f15de47-93f0-4ab0-934b-7fd931270883)

#### `success({ msg, title, buttonText, callback, duration })`

Method to show the success toast:

![image.png](https://s3-sa-east-1.amazonaws.com/msging.net/Services/Images/37062cbc-bdeb-4fff-82cd-06ce2dbce4c4)

#### `warning({ msg, title, buttonText, callback, duration })`

Method to show the warning toast:

![image.png](https://s3-sa-east-1.amazonaws.com/msging.net/Services/Images/193b1dec-3305-4fb8-a788-dae879b91120)

#### `danger({ msg, title, buttonText, callback, duration })`

Method to show the danger toast:

![image.png](https://s3-sa-east-1.amazonaws.com/msging.net/Services/Images/c711083b-bb08-4fec-a462-4bf4c8c4db5b)
