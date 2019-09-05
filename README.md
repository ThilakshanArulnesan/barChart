# barChart

## Data
Data must be provided as an object with the keys of the object being the lables for the x-axis. Each key must be either mapped to a number (single bar chart), or an array of numbers (stacked bar chart). 

## Optional Parameters

### Barchart overall options
#### Width
Set the width of the barchart in px. 
#### Height
Set the height of the barchart in px

#### Bar options
*Color*: Sets the color of the bars. Accepts a hexadecimal code or name of color just like CSS. If using a stacked barchart, the bar color is instead an **array** of colors, one for each bar. If a color is left empty (i.e. there is more stacked bars than colors), then a random color is assigned. If this property is not provided, then a pre-set of colors will be used.

*Spacing*: Adds space (in px) in between each bar. Also adds this space between the first bar and the 

### Title options

*titleText*: Changes the text of the title, if no title text is provided, then the plot will not show a title.

*titleSize*: Set the size of the font in px. The bigger the title font, the less space there will be for the barchart itself.

*titleColor*: Sets the color of title text. Accepts a hexadecimal code or the name of the color just like CSS.



### Label options
*labelColor*: Sets the color of the label. Accepts a hexadecimal code or name of color just like CSS. If using a stacked barchart, the label color is instead an **array** of colors, one for each bar. If a color is left empty (i.e. there is more stacked bars than colors), then the label is set to black. 

*LabelCentering*: Sets the location of the data labels on top of the bar. Accepts an argument of “top”, “middle”, “bottom” or a number between 0 (top of the bar) and 100 (bottom of the bar). 

## Features  to be added
1) Stacked bar chart
2) custom colors for stacked bars
3) Axes ticks
4) Axes label
5) Legend