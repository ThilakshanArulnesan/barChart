function drawBarChart(data, options, element) {

    //Sets default properties if they are undefined
    options = setDefaults(options);
    let appendText ="";
    appendText+='<div class="barchart" style="position:relative">';
    appendText+=   drawAxes(options.height,10, element); //Y-axis
   
    appendText+=  drawBars(data, element, options.height, options.width,options.color);

    appendText+=  drawXAxes(10,options.width, element); //X -axis

    appendText+='</div>';
    element.append(appendText);
    $(".barchart").css({"height":options.height});
    $(".barchart").css({"width":options.width});

    $(".bar").css({"backgroundColor":options.color});



}

function setDefaults(options) {
    //This functions sets default parameters if they are not defined.
    if (options.width === undefined) options.width = 500;
    if (options.height === undefined) options.height = 500;
    if (options.color === undefined) options.color = "black";
    if (options.labelColor === undefined) options.labelColor = "black";

    return options;

}

function drawAxes(h, w,e) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div style="width:' + w + "px" + ';height:' + h + 'px;float:left;background-color: black"></div>';
    return st;
    e.append(st);

}

function drawXAxes(h, w,e) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div style="width:' + w + "px" + ';height:' + h + 'px;position:absolute;bottom:0;background-color: black"></div>';
    return st;
    e.append(st);

}

function drawBars(data, e, h, w) {
    let maxVal = findMax(data);
    let nBars = data.length;
    let st = "";
    console.log(maxVal);
    for (barVal of data) {
        console.log(barVal);
        st += '<div style="width:' + w / nBars + "px" + ';height:' + h + 'px;float:left">';
        st += '<div style="width:' + 100 + "%" +
            ';height:' + h * (1 - barVal / maxVal) +
            'px;float:left"></div>';

        st += '<div class="bar" style="width:' + 100 + "%" +
            ';height:' + h * (barVal / maxVal) +
            'px;float:left;vertical-align:middle">'+
            '<span class="label vertical-center">'+ barVal+
            '</span></div></div>';
    //    console.log(st);
      //  e.append(st);
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