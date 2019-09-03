function drawBarChart(data, options, element) {


    if (options.width === undefined) options.width = 500;
    if (options.height === undefined) options.height = 500;


    drawAxes(options.height, options.width, element);
    drawBars(data, element, options.height, options.width);

    let bgColor = "red";

    console.log(options);
}

function drawAxes(h, w, e) {
    //creates and adds a divider with the height + width in element e.
    let st = '<div style="width:' + 10 + "px" + ';height:' + h + 'px;float:left;background-color: black"></div>';

    e.append(st);
    //  st = '<div style="width:' + w + "px" + ';height:' + 10 + 'px;background-color: black"></div>';
    //  e.append(st);
}

function drawBars(data, e, h, w) {
    let maxVal = findMax(data);
    let nBars = data.length;
    console.log(maxVal);
    for (barVal of data) {
        console.log(barVal);
        let st = '<div style="width:' + w / nBars + "px" + ';height:' + h + 'px;float:left">';
        st = st + '<div style="width:' + 100 + "%" +
            ';height:' + h * (1 - barVal / maxVal) +
            'px;float:left"></div>';

        st = st + '<div style="width:' + 100 + "%" +
            ';height:' + h * (barVal / maxVal) +
            'px;float:left;background-color: green"></div></div>';
        console.log(st);
        e.append(st);
    }


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