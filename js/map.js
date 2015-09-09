// Based on http://gamedevelopment.tutsplus.com/tutorials/generate-random-cave-levels-using-cellular-automata--gamedev-9664
var Map = function(w, h) {
  var _ = this,
      i, j;
  _.w = w;
  _.h = h;
  _.m = null; // Map
  _.dl = 3; // Death limit
  _.bl = 5; // Birth limit
  _.sa = 0.45; // Chance to start alive
  _.s = 3; // Number of steps
  _.to = 0.5; // Percentage of tolerance to remove clean up lines to avoid impossible caves

  // Generate map
  _.g = function() {
    var i, c, x, y;
    // Initialize map
    _.m = _.im();
    // Simulate steps
    for (i=_.s; i--;) {
      _.m = _.ss(_.m);
    }
    _.hk();
    // Set player
    _.sp();
    // Set TNT
    _.stnt();
    _.sfi();
    if (dbg) _.pp(_.m);
  };

  // Simulate step
  _.ss = function(m) {
    var x, y, n, t = _.cl(m);

    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        n = _.ca(m, x, y);

        if (m[x][y] === "#") {
          t[x][y] = (n <= _.dl) ? "." : "#";
        } else {
          t[x][y] = (n >= _.bl) ? "#" : ".";
        }
        //console.log('m['+x+']['+y+']', m[x][y], 'n', n, 't['+x+']['+y+']', t[x][y]);
      }
    }
    return t;
  };

  // Count alive neighbours
  _.ca = function(m, x, y) {
    var i, j, nx, ny, c = 0;

    for (i=-1; i<2; i++) {
      for (j=-1; j<2; j++) {
        nx = x + i;
        ny = y + j;

        if (i === 0 && j === 0) continue;

        if (nx < 0 || ny < 0 || nx > _.w - 1 || ny > _.h - 1) {
          c += 1;
        } else if (m[nx][ny] === "#") {
          c += 1;
        }
      }
    }
    return c;
  };

  // Check if an object is around another
  _.ar = function(o, x, y, d) {
    var i, j, nx, ny, d = d || 1;

    for (i=-d; i<=d; i++) {
      for (j=-d; j<=d; j++) {
        nx = x + i;
        ny = y + j;
        if (nx < 0 || ny < 0 || nx > _.w - 1 || ny > _.h - 1) continue;
        if (_.m[nx][ny] === o) return true;
      }
    }
    return false;
  };

  // Create cellmap
  _.cm = function() {
    var i, j, t = [];
    for (i=0; i<_.w; i++) {
      t.push([]);
      for (j=_.h;j--;) t[i].push(0);
    }
    return t;
  };

  // Initialize map
  _.im = function() {
    var x, y, m = _.cm();
    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        m[x][y] = (rnd() < _.sa) ? "#" : ".";
      }
    }
    return m;
  };

  // Clone map
  _.cl = function(m) {
    var x, y, t = _.cm();
    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        t[x][y] = m[x][y];
      }
    }
    return t;
  };

  // Hack to prevent impossible caves. If the number of solid blocks is bigger than the tolerance
  // then clean up those lines
  _.hk = function() {
    if ((_.csb(7) / _.w >= _.to) || (_.csb(8) / _.w >= _.to)) {
      // Clean horizontal lines
      for (var i=1; i<_.w - 1; i++) {
        _.m[i][7] = ".";
        _.m[i][8] = ".";
      }
    }
    if ((_.csb(18) / _.w >= _.to) || (_.csb(19) / _.w >= _.to)) {
      // Clean horizontal lines
      for (var i=1; i<_.w - 1; i++) {
        _.m[i][18] = ".";
        _.m[i][19] = ".";
      }
    }
  };

  // Count solid blocks in a horizontal line
  _.csb = function(y) {
    var i, c = 0;
    for (i=_.w; i--;) {
      if (_.m[i][y] === "#") c += 1;
    }
    return c;
  };

  // Set player
  _.sp = function() {
    var x, y;
    for (x=1; x<_.w - 1; x++) {
      for (y=1; y<_.h - 1; y++) {
        // If the square is free, check if there is plenty room for the player
        if (_.m[x][y] === '.' && _.ca(_.m, x, y) < 3) return _.m[x][y] = "@";
      }
    }
  };

  // Set TNT
  _.stnt = function() {
    var x, y, c=t=0;
    while (t < 10 && c < 3) {
      x = rndr(1, _.w - 1);
      y = rndr(1, _.h - 1);
      if (_.m[x][y] === '.' && _.ca(_.m, x, y) < 4 && !_.ar("T", x, y, 5)) {
        _.m[x][y] = "T";
        c += 1;
        t = 0;
      }
      t += 1;
    }
  };

  // Set fire
  _.sfi = function() {
    var x, y, c=t=0;
    while (t < 10 && c < 3) {
      x = rndr(1, _.w - 1);
      y = rndr(1, _.h - 1);
      if (_.m[x][y] === '.' && _.ca(_.m, x, y) < 4 && !_.ar("f", x, y, 5)) {
        _.m[x][y] = "f";
        c += 1;
        t = 0;
      }
      t += 1;
    }
  };

  // Pretty print map
  _.pp = function(m) {
    var x, y, str;
    for (y=0; y<_.h; y++) {
      str = '';
      for (x=0; x<_.w; x++) {
        str += m[x][y] + " ";
      }
      console.log(y, str);
    }
  };
};