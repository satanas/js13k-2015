var Group = function() {
  var _ = this;
  _.e = []; // Group elements

  // Add element
  _.a = function(e) {
    _.e.push(e);
  };

  // Check for collisions with object 'o'
  _.c = function(o, cb) {
    var i, w;
    for(i = _.e.length; i--;) {
      w = _.e[i];
      // FIXME: Dirty hack to improve performance
      if (!$.c.iv(w)) continue;
      if ($.o.rect(o, w)) cb(o, w);
    }
  };

  // Update elements
  _.u = function() {
    var d = [], i, w;
    for(i = _.e.length; i--;) {
      w = _.e[i];
      // Update element
      if (w.hasOwnProperty('u')) w.u();
      // Mark to delete if not alive
      if (!w.a) d.push(i);
    }

    // Delete from array
    if (d.length > 0) {
      _.e = _.e.filter(function(v, i) {
        return d.indexOf(i) < 0;
      });
    }
  };

  // Render
  _.r = function() {
    $.c.r(_.e);
  };
};
