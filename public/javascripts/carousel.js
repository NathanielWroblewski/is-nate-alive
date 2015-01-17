!function() {
  var IMAGES = {
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

  function Carousel(configuration) {
    this.images = configuration.images

    this.initialize = function() {
      this.image = this._randomImage()
      this._positionBoxShadow()
      this._setBackgroundImage()
    }

    this._randomImage = function() {
      var keys = Object.keys(this.images)
      return keys[keys.length * Math.random() << 0]
    }

    this._setBackgroundImage = function() {
      var url = '/is-nate-alive/public/images/' + this.image + '.jpg'

      d3.select('.content').style('background-image', 'url("' + url + '")' )
    }

    // positions the box shadow on the right or left based on the image
    this._positionBoxShadow = function() {
      if (this.images[this.image] === 'left') {
        d3.select('.shadow').style('left', '50%').style('right', 0)
      } else {
        d3.select('.shadow').style('left', 0).style('width', '50%')
      }
    }
  }

  var carousel = new Carousel({images: IMAGES})
  carousel.initialize()
}()
