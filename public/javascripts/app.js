var ARCS = {
  arc0:  2700,
  arc1:  3500,
  arc2:  5500,
  arc3:  2500,
  arc4:  4000,
  arc5:  5000,
  arc6:  3000,
  arc7:  3000,
  arc8:  2700,
  arc9:  6000,
  arc10: 1500,
  arc11: 1500,
  arc12: 1500
}

var images = {
  antelopecanyon: 'left',
  boulder:        'left',
  coloradobend:   'left',
  coloradobend2:  'right',
  containership:  'left',
  flagstaff:      'right',
  flatirons:      'right',
  forest:         'right',
  glacierpoint:   'right',
  gormanfalls:    'right',
  grandcanyon:    'left',
  hamiltonpool:   'right',
  jacobswell:     'right',
  kayak:          'left',
  misttrail:      'left',
  monumentvalley: 'right',
  mttam:          'left',
  mttamfog:       'right',
  narrows:        'left',
  rifle:          'left',
  riflefalls:     'left',
  sailing:        'right',
  sailingbay:     'left',
  sailingbridge:  'right',
  sanantonio:     'left',
  subway:         'left',
  supai:          'left',
  tahoe:          'left',
  waterfall:      'right',
  yosemite:       'left',
  zion:           'right'
}

var rotate = function(options) {
  var id       = options.id
    , degrees  = options.degrees + direct(id)
    , duration = options.duration

  d3.select('#' + id)
    .transition()
    .duration(duration)
    .ease('linear')
    .attr('transform', 'translate(200,200) rotate(' + degrees + ')')
    .each('end', function() {
      rotate({id: id, duration: duration, degrees: degrees})
    })
}

var direct = function(id) {
  var digits = id.match(/\d{2}|3|5|7/)
  return (digits ? -181 : 181)
}

var heartbeat = function(prefix) {
  var duration    = (prefix === 'lub' ? 500 : 3500)
    , ease        = (prefix === 'lub' ? 'linear' : 'cubic-out')
    , opacity     = (prefix === 'lub' ? '0.5' : '1')
    , startRadius = 5
    , endRadius   = (prefix === 'lub' ? 30 : 105)
    , startDiff   = 5
    , endDiff     = 0

  d3.select('.' + prefix + '-outer-circle').style('opacity', '1')
    .transition().duration(duration).ease(ease)
    .attr('r', endRadius).style('opacity', '0').style('fill', '#dedede')
  d3.select('.' + prefix + '-inner-circle')
    .transition().duration(duration).ease(ease)
    .attr('r', endRadius - endDiff)
    .each('end', function() {
      d3.select('.' + prefix + '-outer-circle')
        .attr('r', startRadius).style('fill', '#DB0A5B')
      d3.select('.' + prefix + '-inner-circle').attr('r', startRadius - startDiff)
      heartbeat(prefix === 'lub' ? 'dub' : 'lub')
    })
}

var pulse = function() {
  d3.select('.core')
    .transition().ease('linear').duration('2000')
    .attr('r', 20)
    .each('end', function() {
      d3.select('.core')
        .transition().ease('linear').duration('2000')
        .attr('r', 10)
        .each('end', pulse)
    })
}

var carousel = function() {
  var img = random(images)
  if (images[img] === 'left') {
    d3.select('.shadow').style('left', '50%').style('right', 0)
  } else {
    d3.select('.shadow').style('left', 0).style('width', '50%')
  }
  d3.select('.content')
    .style('background-image', 'url("/public/images/' + img + '.jpg")' )
}

var random = function(object) {
  var keys = Object.keys(object)
  return keys[keys.length * Math.random() << 0]
}

pulse()
heartbeat('lub')
carousel()

for (arc in ARCS) {
  rotate({
    id:       arc,
    duration: ARCS[arc],
    degrees:  0
  })
}
