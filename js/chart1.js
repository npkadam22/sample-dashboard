function c1(){ 

var chart1 =d3.select("#chart1");
var temperatures = [50,60,70,90],
    dates = [1,2,3,4],
    margin = { top: 0, right: 0, bottom: 20, left: 15 }
    height = chart1.style("height").slice(0, -2)*2 - margin.top - margin.bottom,
    width = chart1.style("width").slice(0, -2)-25 - margin.left - margin.right;


var tempColor,
    yScale,
    yAxisValues,
    yAxisTicks,
    yGuide,
    xScale,
    xAxisValues,
    xAxisTicks,
    xGuide,
    colors,
    tooltip,
    myChart;
  
  
    yScale = d3.scaleLinear()
      .domain([0, d3.max(temperatures)])
      .range([0,height]);
  
    yAxisValues = d3.scaleLinear()
      .domain([0, d3.max(temperatures)])
      .range([height,0]);
  
    yAxisTicks = d3.axisLeft(yAxisValues)
    .ticks(5)
  
    xScale = d3.scaleBand()
      .domain(temperatures)
      .paddingInner(.1)
      .paddingOuter(.1)
      .range([0, width])
  
    xAxisValues = d3.scaleLinear()
    .domain([0, d3.max(dates)])
    .range([0, width])
  
    xAxisTicks = d3.axisBottom(xAxisValues)
      .ticks(2)

    colors = d3.scaleLinear()
      .domain([0, 65, d3.max(temperatures)])
      .range(['#FFFFFF', '#2D8BCF', '#DA3637'])
  
    tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0)
      .style('pointer-events','none');
  
    myChart = d3.select('#chart1').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.right + ')')
      .selectAll('rect').data(temperatures)
      .enter().append('rect')
        .attr('fill', colors)
        .attr('width', function(d) {
          return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function(d) {
          return xScale(d);
        })
        .attr('y', height)
        
        .on('mouseover', function(d) {
          tooltip.transition().duration(200)
            .style('opacity', .9)
          tooltip.html(
            '<div style="font-size: 2rem; font-weight: bold">' +
              d + '&deg;</div>'
          )
            .style('left', (d3.event.pageX -35) + 'px')
            .style('top', (d3.event.pageY -30) + 'px')
          tempColor = this.style.fill;
          d3.select(this)
            .style('fill', 'yellow')
        })
  
        .on('mouseout', function(d) {
          tooltip.html('')
          d3.select(this)
            .style('fill', tempColor)
        });
  
    yGuide = d3.select('#chart1 svg').append('g')
              .attr('transform', 'translate(20,0)')
              .call(yAxisTicks)
  
    xGuide = d3.select('#chart1 svg').append('g')
              .attr('transform', 'translate(20,'+ height + ')')
              .call(xAxisTicks)
  
    myChart.transition()
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('y', function(d) {
        return height - yScale(d);
      })
      .delay(function(d, i) {
        return i * 20;
      })
      .duration(1000)
      .ease(d3.easeBounceOut)
    }

c1();

$(document).ready(function(){
    $(window).resize(function(){
        d3.select("#chart1").html("<h5 class='card-title'>Chart 1</h5>")
      c1();
    });
  });