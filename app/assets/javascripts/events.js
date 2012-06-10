//=require strftime

$(document).ready(function() {
  var dtpOptions = {
    dateFormat: "yy-mm-dd",
    separator: " ",
    timeFormat: "hh:mm"
  }
  $('.event-start-date input').datetimepicker(dtpOptions);
  $('.event-end-date input').datetimepicker(dtpOptions);

  var data = JSON.parse($('.attendance').text());
  var att = data.attendance;

  att.forEach(function(d) {
    // FUUUUUUUCK YOU JAVASCRIPT!
    var parts = d[0].split('T');
    var date = parts[0].split('-');
    var time = parts[1].split(':');

    d[0] = new Date();
    d[0].setFullYear(parseInt(date[0], 10));
    d[0].setMonth(parseInt(date[1], 10) - 1);
    d[0].setDate(parseInt(date[2], 10));
    d[0].setHours(parseInt(time[0], 10));
    d[0].setMinutes(parseInt(time[1], 10));
    d[0].setSeconds(parseInt(time[2], 10));
  });

  var dates = att.map(function (d) { return d[0]; });

  var m = [20, 40, 20, 40],
      w = 1020 - m[1] - m[3],
      h = 390 - m[0] - m[2];

  var x = d3.time.scale()
    .domain([dates[0], dates.slice(-1)[0]])
    .range([0, w]);
 
  var y = d3.scale.linear()
    .domain([0, d3.max(att, function (d) { return d[1]; })])
    .range([h, 0]);

  var xAxis = d3.svg.axis().scale(x).tickSize(-h);
      yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

  var svg = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  svg.append("g").selectAll("rect")
    .data(att)
  .enter().append("rect")
    .attr("class", "foreground bar")
    .attr("x", function (d) { return x(new Date(d[0])) + 2; })
    .attr("y", function (d) { return y(d[1]); })
    .attr("width", w / att.length - 4)
    .attr("height", function (d) { return h - y(d[1]); })

  // Add the x-axis.
  svg.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

  // Add the y-axis.
  svg.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + w + ",0)")
      .call(yAxis);

  // Resizing support
  function resizePath(d) {
    var e = +(d == "e"),
        x = e ? 1 : -1,
        y = h / 3;
    return "M" + (.5 * x) + "," + y
        + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
        + "V" + (2 * y - 6)
        + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
        + "Z"
        + "M" + (2.5 * x) + "," + (y + 8)
        + "V" + (2 * y - 8)
        + "M" + (4.5 * x) + "," + (y + 8)
        + "V" + (2 * y - 8);
  }

  var brush = d3.svg.brush()
    .x(x)
    .on("brush", function () {
      var g = d3.select(this.parentNode),
          extent = brush.extent();

      g.select(".brush")
        .call(brush.extent(extent = extent.map(d3.time.hour.round)))
    })
    .on("brushend", function () {
      var e = brush.extent(),
          fmt = "%Y-%m-%d %H:%M";
      jQuery('#start_date').val(e[0].strftime(fmt));
      jQuery('#end_date').val(e[1].strftime(fmt));
    });

  var gBrush = svg.append("svg:g")
    .attr("class", "brush")
    .call(brush)

  gBrush.selectAll("rect")
    .attr("height", h)
  
  gBrush.selectAll(".resize")
    .append("path")
      .attr("d", resizePath);
  
});
