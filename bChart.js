function drawBarChart(data, options, element) {
    const AXES_WIDTH = 10;
    //Sets default properties if they are undefined
    options = setDefaults(options);

    let appendText = "";
    let blnTitle = options.titleText === undefined;

    appendText += '<div class="barchart" >'; //Container for barchart

    if (!blnTitle) {
        appendText += drawDiv(options.titleSize, options.width, options.titleText, "title"); //Title
    }

    appendText += drawDiv(options.height - options.titleSize, AXES_WIDTH, "", "axis"); //Y-axis   

    //Subtract 10 from the width of the bars because there is less space due to axes
    appendText += drawBars(data, options.height- options.titleSize, options.width-AXES_WIDTH, options.spacing);
    appendText += drawDiv(10, options.width, "", "axis"); //X -axis

    appendText += '</div>';
    element.append(appendText);

    $(".barchart").css({ "height": options.height });
    $(".barchart").css({ "width": options.width });
    $(".bar").css({ "backgroundColor": options.color });
    $(".axis").css({ "backgroundColor": "black" });
    $(".title").css({ "color": options.titleColor });
    $(".title").css({ "font-size": options.titleSize + "px" });

    formatLabel(options.labelCentering,options.labelColor);
}

function formatLabel(cent,col) {
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
    if (options.width === undefined) options.width = 500;
    if (options.height === undefined) options.height = 500;
    if (options.color === undefined) options.color = "black";
    //if (options.labelColor === undefined) options.labelColor = "black";
    if (options.titleColor === undefined) options.titleColor = "black";
    if (options.titleSize === undefined) options.titleSize = "12";
    if (options.spacing === undefined) options.spacing = "0";
    if (options.labelCentering === undefined) options.labelCentering = "50";

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


function drawBars(data, h, w, bufferWidth) {
    let maxVal = findMax(data); //Finds the maximum value, normalizes the sizes of the bars using this value
    let nBars = Object.keys(data).length; //# of bars of data we have to add
    let st = "";

    //Between each bar there is a 'blank space' of width bufferWidth
    //So the width of the bars is the total width minus the space taken by the blank bars
    //If there are nBars bars, then there are nbars+1 buffers (one at beginning, one at the end)
    //So the width of the bar is the remaining space divided by the numebr of bars 
    let barWidth = (w - bufferWidth * (nBars+1)) / (nBars );

    console.log(maxVal);
    st += '<div style="width:' + bufferWidth + "px" + ';height:' + h + 'px;float:left"></div>';

    for (barVal in data) {
        console.log(data[barVal]);

        //Adds a bar (containing data):

        st += '<div style="width:' + barWidth + "px" + ';height:' + h + 'px;float:left">';
        //Top part of the bar (the part that is not filled in)
        st += '<div style="width:' + 100 + "%" +
            ';height:' + h * (1 - data[barVal] / maxVal) +
            'px;float:left"></div>';
        //Bottom half of the bar (part that is filled in with data)
        st += '<div class="bar" style="width:' + 100 + "%" +
            ';height:' + h * (data[barVal] / maxVal) +
            'px;float:left;vertical-align:middle">' +
            '<span class="label">' + data[barVal] +
            '</span></div></div>';
        st += '<div style="width:' + bufferWidth + "px" + ';height:' + h + 'px;float:left"></div>';



    }
    return st;
}



function findMax(d) {
    let max = 0;
    for (datum in d) {
        if (d[datum] > max) max = d[datum];
    }
    return max;
}

function test() {
    $("h1").text("CHANGED");
}