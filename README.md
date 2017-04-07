# Touch


## Usage

```js
// Constructor(HTMLElement, [options])

var myElement = document.getElementById('app');
var miniTouch = new Touch(myElement);
```

## Tap
```js
miniTouch.on('tap', function(e) {
	console.log(e);
})
```

## Swipe

```js
miniTouch.on('swipe', function(e) {
	console.log(e);
})
```

## Pan

```js
// @todo
miniTouch.on('pan', function(e) {
	console.log(e);
})
```