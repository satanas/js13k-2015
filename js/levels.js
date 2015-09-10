var Levels = function() {
  var _ = this;
  // Possible colors for bg levels
  _.bgc = ['#3c4763', '#543c63', '#633c47', '#3c633e', '#63523c'];
  // Levels definition
  // m: map
  // s: messages of the character
  _.l = {
    "1": {
      "m": [
        "....................",
        "....................",
        "....................",
        "....................",
        "....#...............",
        "....#...............",
        "....#...............",
        "..###...............",
        "....................",
        "...@................",
        "#########.......####",
        "....................",
        "....................",
        "....................",
        "....................",
      ],
      "s": [
        {
          t: ["Hi there!"],
          d: 1400
        },
        {
          t: ["Things here work", "slighly different"],
          d: 2300
        },
        {
          t: ["Your purpose", "is to die"],
          d: 3000
        }
      ]
    }
  };
};
