!function() {
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
    arc10: 1500, // inner
    arc11: 1500, // inner
    arc12: 1500  // inner
  }

  function Visualization(configuration) {
    this.arcs   = configuration.arcs

    this.initialize = function() {
      this.radiate()
      this.heartbeat('lub')

      for(arc in this.arcs) {
        this.rotate({
          id:       arc,
          duration: this.arcs[arc],
          degrees:  0
        })
      }
    }

    // rotates the arcs, ex. parameter {id: 'arc1', degrees: 90, duration: 1000}
    this.rotate = function(options) {
      var id       = options.id
        , degrees  = options.degrees + this.direct(id)
        , duration = options.duration

      this.animate({el: '#' + id, duration: duration})
        .attr('transform', 'translate(200,200) rotate(' + degrees + ')')
        .each('end', function() {
          this.rotate({id: id, duration: duration, degrees: degrees})
        }.bind(this))
    }

    // determines direction of rotation based on arc id
    this.direct = function(id) {
      return (id.match(/3|5|7|\d{2}/) ? -181 : 181)
    }

    // creates the heartbeat rings, parameter 'lub' or 'dub'
    this.heartbeat = function(prefix) {
      this._beat(this[prefix](prefix))
    }

    this.lub = function(prefix) {
      return {
        prefix:      prefix,
        duration:    500,
        ease:        'linear',
        opacity:     '0.5',
        endRadius:   30,
        startRadius: 5,
        startDiff:   5,
        endDiff:     0,
        outerCircle: '.' + prefix + '-outer-circle',
        innerCircle: '.' + prefix + '-inner-circle'
      }
    }

    this.dub = function(prefix) {
      return {
        prefix:      prefix,
        duration:    3500,
        ease:        'cubic-out',
        opacity:     '1',
        endRadius:   105,
        startRadius: 5,
        startDiff:   5,
        endDiff:     0,
        outerCircle: '.' + prefix + '-outer-circle',
        innerCircle: '.' + prefix + '-inner-circle'
      }
    }

    this._beat = function(a) {
      d3.select(a.outerCircle).style('opacity', '1')

      this.animate({el: a.outerCircle, duration: a.duration, ease: a.ease})
        .attr('r', a.endRadius).style('opacity', '0').style('fill', '#dedede')

      this.animate({el: a.innerCircle, duration: a.duration, ease: a.ease})
        .attr('r', a.endRadius - a.endDiff)
        .each('end', function() {
          d3.select(a.outerCircle).attr('r', a.startRadius).style('fill', '#DB0A5B')
          d3.select(a.innerCircle).attr('r', a.startRadius - a.startDiff)

          this.heartbeat(a.prefix === 'lub' ? 'dub' : 'lub')
        }.bind(this))
    }

    // makes the center glow and change in size
    this.radiate = function() {
      this._pulse(20, function() {
        this._pulse(10, this.radiate.bind(this))
      }.bind(this))
    }

    this.animate = function(options) {
      var easing   = options.ease     || 'linear',
          duration = options.duration || '2000',
          selector = options.el

      return d3.select(selector).transition().ease(easing).duration(duration)
    }

    // change diameter of the core, used in this.radiate()
    this._pulse = function(radius, callback) {
      this.animate({el: '.core', ease: 'linear', duration: 2000})
        .attr('r', 20)
        .each('end', callback)
    }
  }

  var visualization = new Visualization({arcs: ARCS})
  visualization.initialize()

}()
