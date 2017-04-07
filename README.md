# Touch


## Usage

```js
Constructor(HTMLElement, [options])

var myElement = document.getElementById('app');
var littleTouch = new Touch(myElement);
```

## Tap
```js
littleTouch.on('tap', function(e) {
	console.log(e);
})
```

## Swipe

```js
littleTouch.on('swipe', function(e) {
	console.log(e);
})
```

## Pan

```js
littleTouch.on('pan', function(e) {
	console.log(e);
})
```