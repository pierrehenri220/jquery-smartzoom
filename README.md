# Smartzoom
Scale your design on smartphone based on a specific width

## Requirements

Every jquery.ap-xxx plugin uses the window.ap global namespace. Avoid using or root overriding window.ap.  
This plugin just scales your design by:

1. Modifying the html document through the zoom property. To do so you need to be shure user won't mess it by disabling the scalability option. To achieve this, you can use this meta tag:

```
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

2. Adjusting the font size from the body to keep the ratio intact for the text elements. To achieve this you have to use relative units in your stylesheet for every text related properties. Em is recommended. For example:

```
body {
    font-size: 62.5%;
}
h1 {
    margin: 0 16px 48px 16px;
    font-size: 2em; /* 20px */
}
```

## Methods

### Initialize

When the dom is ready, just trigger the function like this:

```
ap.smartzoom.initialize();
```

See below for more options.

### Terminate

If need be you can stop using:

```
ap.smartzoom.terminate();
```

This will reset the document zoom property to 100% and the font size to its initial state

## Initialize Options


### Integer width
The default based width is 320 pixels. To change it, just pass it as an argument like this:

```
ap.smartzoom.initialize({
    width: 640
});
```

### Percent fontSize
The default based font size is 62.5. It means 1em = 10px.
To change it, just pass it as an argument like this:

```
ap.smartzoom.initialize({
    fontSize: 100 // 100% 1em = 16px for most of the browsers
});
```