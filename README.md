# barChart
## About
This is a custom stacked barchart generating library created as a part of an optional project for LightHouse Labs. The library is created entirely using HTML, CSS, Javascript, and JQuery. 

## Setup 
Include and reference add the following to your HTML page:
- bChart.js
- style.css

If you would like to see a demo, please refer to the index.html provided or the examples found in the next section.

## Examples

![Barchart Example](screenshots/s1.png?raw=true "Barchart 1")

 This chart was generated using
 drawBarChart({
 
            "Label 1": 100,
            "Label 2": 200,
            "Label 3": 150,
            "Label 4": 50
 
 },{
 
        height: 900,
        width: 900,
        color: "#7293cb",
        titleText: "Demo barchart",
        titleColor: "Blue",
        titleSize: "30",
        spacing: "20",
        labelCentering: "top",
        labelColor: "black",
        numTicks: 5,
        yMax: 15
 
 },$("#elementid));
 
  With the given data [100,200,150,50]. Note that since the data's max value is greater than the max value provided as a parameter (yMax), the scale is set by the max value of the data.


![Barchart Example 2](screenshots/S2.png?raw=true "Barchart 2")

drawBarChart({
 
            "Option 1": [1, 2],
            "Option 2": [2, 3],
            "Option 3": [3, 1],
 
 },{
 
        height: 500,
        width: 500,
        color: ["#7293cb", "#e1974c"],
        titleText: "Demo stacked barchart",
        titleColor: "black",
        titleSize: "30",
        spacing: "50",
        labelCentering: "center",
        labelColor: ["red", "white"],
        numTicks: 7,
        yMax: 7

 
 },$("#elementid));

Note that the label colors and the bar
        colors can be changed individually (an array the same size as the stacked data must be used). Note that the
        width of the bars
        depends on the spacing between the bars as well as the width of the barchart overall.


![Barchart Example 3](screenshots/S3.png?raw=true "Barchart 3")

drawBarChart({

       "Category 1": [1, 2, 4],
            "Category 2": [2, 3, 4],
            "Category 3": [3, 1, 7],
            "Category 4": [10, 1, 2],
            "Category 5": [3, 2, 1]
 
 },{
 
       height: 900,
        width: 1000,
        color: ["#7293cb", "#e1974c", "#84ba5b"],
        titleText: "Three stacked bars",
        titleColor: "purple",
        titleSize: "30",
        spacing: "20",
        labelCentering: "bottom",
        labelColor: ["red", "white", "black"],
        numTicks: 3,
        yMax: 15
 
 },$("#elementid));

 Note that if a label color is not specified, the color black is used by default. The width of the
        bars will vary with the amount of data presented.
## API Functions/Parameters

### Parameter: Data 
Type: Object (map of string to array)
Data must be provided as an object with the keys of the object being the lables for the x-axis. Each key must be either mapped to a number (single bar chart), or an array of numbers (stacked bar chart). 

### Element
Type: JQuery Element
Provide an jQuery element that the barchart should be rendedered into.

### Options Parameters
Type: Object containing optional parameters.
The optional parameters are outlined below.

#### Barchart overall options
*Width*
Set the width of the barchart in px. Default is 500px.
*Height*
Set the height of the barchart in px. Default is 500px.

#### Y-Axis Ticks
*numTicks* Sets the number of tick marks on the y-axis. Defaults to 4 ticks if not provided.
*yMax* Sets the largest value to display on the y-axis. If no value is provided or the value provided is less than the
maximum value for the dataset, then the max value of the dataset is used instead.

#### Bar options
*Color*: Sets the color of the bars. Accepts a hexadecimal code or name of color just like CSS. If using a stacked barchart, the bar color is instead an **array** of colors, one for each bar. If a color is left empty (i.e. there is more stacked bars than colors), then a random color is assigned. If this property is not provided, then a pre-set of colors will be used.

*Spacing*: Adds space (in px) in between each bar. Also adds this space between the first bar and the 

#### Title options

*titleText*: Changes the text of the title, if no title text is provided, then the plot will not show a title.

*titleSize*: Set the size of the font in px. The bigger the title font, the less space there will be for the barchart itself.

*titleColor*: Sets the color of title text. Accepts a hexadecimal code or the name of the color just like CSS.



#### Label options
*labelColor*: Sets the color of the label. Accepts a hexadecimal code or name of color just like CSS. If using a stacked barchart, the label color is instead an **array** of colors, one for each bar. If a color is left empty (i.e. there is more stacked bars than colors), then the label is set to black. 

*LabelCentering*: Sets the location of the data labels on top of the bar. Accepts an argument of “top”, "center", “bottom”. The default position is in the middle of the bar.


## Known issues/bugs
- Y-axis labels do not line up exactly with the tick marks


## Features  to be added
1) Legend

## External Resources used
https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
-Helped figure out how to create a random color for by bars when user does not provide colors

http://ksrowell.com/blog-visualizing-data/2012/02/02/optimal-colors-for-graphs/
-Used for default colors of barchart when user does not provide it.

https://api.jquery.com
-Jquery documentation

https://www.youtube.com/watch?v=LYKRkHSLE2E&list=PLoYCgNOIyGABdI2V8I_SWo22tFpgh2s6_&index=4
-Jquery video series
