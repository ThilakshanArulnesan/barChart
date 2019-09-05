function drawBarChart(data, options, element) {
    const AXES_WIDTH = 10;
    const WIDTH_OF_TICKS = 50;
    //Sets default properties if they are undefined
    options = setDefaults(options, data);
    data = arrayify(data);
    let appendText = "";
    let blnTitle = options.titleText === undefined;

    appendText += '<div class="barchart" >'; //Container for barchart

    if (!blnTitle) {
        appendText += drawDiv(options.titleSize, options.width, options.titleText, "title"); //Title
    }

    appendText += drawTicks(options.height - options.titleSize, WIDTH_OF_TICKS, data,options.yMax,options.numTicks); //Y-ticks  
    appendText += drawDiv(options.height - options.titleSize-AXES_WIDTH, AXES_WIDTH, "", "axis"); //Y-axis   

    //Subtract 10 from the width of the bars because there is less space due to axes
    appendText += drawBars(data,options.yMax, options.height - options.titleSize-AXES_WIDTH, options.width - AXES_WIDTH-WIDTH_OF_TICKS, options.spacing, options.color, options.labelColor);
    appendText += drawDiv(AXES_WIDTH, options.width-WIDTH_OF_TICKS, "", "axis"); //X -axis

    appendText += drawXLabels(data, 20, options.width - AXES_WIDTH-WIDTH_OF_TICKS, options.spacing); //X -axis

    appendText += '</div>';
    element.append(appendText);

    $(".barchart").css({ "height": options.height });
    $(".barchart").css({ "width": options.width });
    $(".axis").css({ "backgroundColor": "black" });
    $(".title").css({ "color": options.titleColor });
    $(".title").css({ "font-size": options.titleSize + "px" });

    formatLabel(options.labelCentering, options.labelColor);
}


function drawTicks(h, w,d,yMax, nTicks) {
    const SIZE_OF_TICKS = 3;
    let sizeOfBlanks = (h-nTicks*SIZE_OF_TICKS)/nTicks;
    console.log(yMax);
    
    if(yMax === undefined || yMax < findMax(d)){
        yMax = findMax(d);
    }

    //creates a divider to put all the ticks in of height h, width w
    let st = '<div class="yticks" style="width:' + w + "px" +
        ';height:' + h +
        'px;float:left;text-align:center">' ;

    for(let i = 0;i<nTicks;i++){

        st += '<div  class="tick" style="width:' + w/3 + "px" +
        ';height:' + SIZE_OF_TICKS +
        'px;float:right;background-color:black">'+
        '</div>' ;

        st += '<div  class="tick" style="width:' + 2*w/3 + "px" +
        ';height:' + SIZE_OF_TICKS +
        'px;float:right">'+
        ((nTicks-i)*yMax/nTicks).toFixed(1)+'</div>' ;

         st += '<div  class="blankSpace" style="width:' + w + "px" +
        ';height:' + sizeOfBlanks +
        'px;float:left;text-align:center"></div>' ;

    }
    return st + '</div>';
}

function arrayify(d){
    //Changes any values that are not an array into an array of length one.
    //This is in order to ensure the rest of the functions can assume an array is given.
    for (key of Object.keys(d)){     
        let val = d[key];
        if(typeof val != "object"){
            d[key] = [val];
        }
    }
    return d;
}

function formatLabel(cent, col) {
    switch (cent) {
        case "top":
            cent = 0;
            break;
        case "middle":
            cent = 50;
            break;
        case "bottom":
            cent = 70;
            break;
    }

    if (isNaN(cent)) {
        cent = 50;
    }

    $(".label").css({
        "top": cent + "%",
        "color": col
    });

}

function setDefaults(options) {
    //This functions sets default parameters if they are not defined.
    if(typeof options.color != "object"){ //Added in case the user provides only one color, not as an array
        let c = options.color;
        options.color = [c];
    }

    
    if(typeof options.labelColor != "object"){ //Added in case the user provides only one color, not as an array
        let c = options.labelColor;
        options.labelColor = [c];
    }

    if (options.width === undefined) options.width = 500;
    if (options.height === undefined) options.height = 500;
    if (options.color === undefined) options.color = ["#7293cb", "#e1974c", "#84ba5b", "#d35e60"];
    if (options.titleColor === undefined) options.titleColor = "black";
    if (options.titleSize === undefined) options.titleSize = "12";
    if (options.spacing === undefined) options.spacing = "0";
    if (options.labelCentering === undefined) options.labelCentering = "50";
    if (options.numTicks === undefined) options.numTicks = 4;

    return options;

}

function drawDiv(h, w, text, className) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div id="title" class="' +
        className +
        '" style="width:' + w + "px" +
        ';height:' + h +
        'px;float:left;text-align:center">' + text + '</div>';
    return st;
}


function drawXLabels(data, h, w, bufferWidth) {
    let nBars = Object.keys(data).length; //# of labels of data we have to add
    let st = "";

    //Between each label there is a 'blank space' of width bufferWidth
    //So the width of the labels is the total width minus the space taken by the blank bars
    //If there are nBars labels, then there are nbars+1 label buffers (one at beginning, one at the end)
    //So the width of the label is the remaining space divided by the number of bars 
    let barWidth = (w - bufferWidth * (nBars + 1)) / (nBars);

    //This adds a space between the y-axis and the first bar.
    let initialSpace = parseFloat(bufferWidth) + 60.;
    st += '<div style="width:' + initialSpace + "px" + ';height:' + h + 'px;float:left"></div>';

    for (barVals in data) {
        //Creates a label divider. The class xlabel can be manipulated as needed
        st += '<div style="width:' + barWidth + "px" + ';height:' + h + 'px;float:left"> <span class="xlabel">'
            + barVals + '</span></div>';

        //This adds a space after each bar
        st += '<div style="width:' + bufferWidth + "px" + ';height:' + h + 'px;float:left"></div>';
    }
    return st;
}


function drawBars(data, maxVal, h, w, bufferWidth, colors,labelColors) {
    if(maxVal === undefined || maxVal < findMax(data)){
        maxVal = findMax(data);//Finds the maximum value, normalizes the sizes of the bars using this value
    } 
    let nBars = Object.keys(data).length; //# of bars of data we have to add
    let st = "";

    //Between each bar there is a 'blank space' of width bufferWidth
    //So the width of the bars is the total width minus the space taken by the blank bars
    //If there are nBars bars, then there are nbars+1 buffers (one at beginning, one at the end)
    //So the width of the bar is the remaining space divided by the numebr of bars 
    let barWidth = (w - bufferWidth * (nBars + 1)) / (nBars);


    //This adds a space between the y-axis and the first bar.
    st += '<div style="width:' + bufferWidth + "px" + ';height:' + h + 'px;float:left"></div>';

    for (barVals in data) {

        //Adds a bar (containing data):

        st += '<div style="width:' + barWidth + "px" + ';height:' + h + 'px;float:left">';
        //Top part of the bar (the part that is not filled in)
        st += '<div style="width:' + 100 + "%" +
            ';height:' + h * (1 - sumVals(data[barVals]) / maxVal) +
            'px;float:left"></div>';

        //Create each bar in a stacked bar chart with the apppropriate color
        for (let i = 0; i < data[barVals].length; i++) {//val of data[barVals]) {
            let val = data[barVals][i];

            if (colors[i] === undefined) {
                //Assigns a random color to the bar
                colors[i] = "#" + randomHex();
                
            }
            if(labelColors[i] === undefined){
                labelColors[i] = "black";
            }

            st += '<div class="bar" style="width:' + 100 + "%" +
                ';height:' + h * (val / maxVal) +
                'px;float:left;vertical-align:middle;background-color:' +
                colors[i] +
                '"><span class="label" style="color:'+labelColors[i] +'">' + val +
                '</span></div>';
        }
        //This adds a space after each bar
        st += '</div><div style="width:' + bufferWidth + "px" + ';height:' + h + 'px;float:left"></div>';
    }
    return st;
}


function randomHex() {

    //Selects three random numbers btwn 0-256 and converts it to base 16. Adds a leading zero if needed to each of these numbers
    //the slice -2 ensure that only two characaters are generated for each color.
    //For example if we generate the number FF, we prepend a 0 giving 0FF, but then the slice removes the 0
    //However, if we generate the number F, we prened a 0, giving 0F, and the slice does not remove anything.
    return ("0" + (Math.floor(Math.random() * 256)).toString(16)).slice(-2) +
        ("0" + (Math.floor(Math.random() * 256)).toString(16)).slice(-2) +
        ("0" + (Math.floor(Math.random() * 256)).toString(16)).slice(-2);
}
function findMax(d) {
    let max = 0;
    for (datum in d) {
        let sumOfVals = sumVals(d[datum]);
        if (sumOfVals > max) max = sumOfVals;
    }
    return max;
}

function sumVals(arr) {
    let sum = 0;
    for (num of arr) {
        sum += num;
    }
    return sum;
}
