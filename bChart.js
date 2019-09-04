function drawBarChart(data, options, element) {

    //Sets default properties if they are undefined
    options = setDefaults(options);

    let appendText = "";
    let blnTitle = options.titleText === undefined;

    appendText += '<div class="barchart" style="position:relative">'; //Container for barchart

    if (!blnTitle) {
        appendText += drawDiv(options.titleSize, options.width, options.titleText, "title"); //Title
        options.height = options.height - options.titleSize; //removes the space used for the title    
    }
    appendText += drawDiv(options.height, 10, "", "axis"); //Y-axis   
    appendText += drawBars(data, element, options.height, options.width, options.color);
    appendText += drawDiv(10, options.width, "", "axis"); //X -axis


    appendText += '</div>';
    element.append(appendText);

    $(".barchart").css({ "height": options.height });
    $(".barchart").css({ "width": options.width });
    $(".bar").css({ "backgroundColor": options.color });
    $(".axis").css({ "backgroundColor": "black" });


    $(".title").css({ "color": options.titleColor });
    $(".title").css({ "font-size": options.titleSize + "px" });



}

function setDefaults(options) {
    //This functions sets default parameters if they are not defined.
    if (options.width === undefined) options.width = 500;
    if (options.height === undefined) options.height = 500;
    if (options.color === undefined) options.color = "black";
    if (options.labelColor === undefined) options.labelColor = "black";
    if (options.titleColor === undefined) options.titleColor = "black";
    if (options.titleSize === undefined) options.titleSize = "12px";

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


function drawDiv2(h, w, text) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div style="width:' + w + "px" + ';height:' + h + 'px;float:left;background-color: black">' + text + '</div>';
    return st;
}
/* Remove this function if not required later
function drawXAxes(h, w,e) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div style="width:' + w + "px" + ';height:' + h + 'px;position:absolute;bottom:0;background-color: black"></div>';
    return st;
}
*/

function drawBars(data, e, h, w, bufferWidth) {
    let maxVal = findMax(data); //Finds the maximum value, normalizes the sizes of the bars using this value
    let nBars = data.length; //# of bars of data we have to add
    let st = "";
    console.log(maxVal);
    for (barVal of data) {
        console.log(barVal);

        //Adds a bar (containing data):
        st += '<div style="width:' + w / (nBars + 1) + "px" + ';height:' + h + 'px;float:left">';
        //Top part of the bar (the part that is not filled in)
        st += '<div style="width:' + 100 + "%" +
            ';height:' + h * (1 - barVal / maxVal) +
            'px;float:left"></div>';
        //Bottom half of the bar (part that is filled in with data)
        st += '<div class="bar" style="width:' + 100 + "%" +
            ';height:' + h * (barVal / maxVal) +
            'px;float:left;vertical-align:middle">' +
            '<span class="label vertical-center">' + barVal +
            '</span></div></div>';


    }
    return st;
}



function findMax(d) {
    let max = 0;
    for (datum of d) {
        if (datum > max) max = datum;
    }
    return max;
}

function test() {
    $("h1").text("CHANGED");
}