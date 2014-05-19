rImgLoad.js
============
## responsive/responsible image loading
### loading screensize/download-speed appropriate images

Starts by getting screen size and calculating download speed of initial image of known size.
	- If the device screen is retina, and download speed is fast, downloads all retina sized images
	- If the device screen is large, and download speed is fast, downloads all images
	- If the device screen is large/retina, but download speed is slow, downloads first 2 large images
	- If the device screen is small and download speed is fast, downloads all small images
	- If the device screen is small and download speed is slow, downloads first 2 small images

- The demo is for loading images for a fullscreen image carousel (only 4 of them total)
- but it could be used for pretty much anything
- Carousel code: http://codepen.io/jbeeio/pen/JBchE


### DEMO: http://www.jbee.io/demos/rImgLoad
### TEST IT: http://codepen.io/jbeeio/pen/lzipD

###Tested With
	- Chrome & Opera
	
	- Firefox & Safari
	
	- Android Stock & Chrome for Android
	
	- iOS6+
	
	- IE 7+


