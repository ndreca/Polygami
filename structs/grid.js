// A Grid provides a coordinate system and access to elements on the paper.
class Grid {
  constructor(w, h) {
    // w and h are the width and height of the Grid
    this.w = w;
    this.h = h;

    // Instantiate an empty array that will hold the Corners that will be placed in the grid
    this.corners = {};

    // Instantiate an object holding all the Points in the Grid
    // There is a Point every 0.5 of a grid unit
    // Points are keyed by stringified coordinates x,y
    this.points = {};
    for (var x = 0; x <= w; x += 0.5) {
      for (var y = 0; y <= h; y += 0.5) {
        this.points[Point.toString(x, y)] = new Point(x, y);
      }
    }

    // Instantiate an object with the Creases keyed by stringified endpoint
    // coordinates x,y
    this.creases = {};
    for (var point in this.points) {
      if (this.points.hasOwnProperty(point)) {
        this.creases[point] = [];
      }
    }
  }

  // Returns the Point at an (x, y) location in this grid
  point(x, y) {
    return this.points[Point.toString(x, y)];
  }

  // Returns the Creases in this grid with endpoints at an (x, y) location
  creasesAt(x, y) {
    return this.creases[Point.toString(x, y)];
  }

  // Returns whether crease already exists in the set of Creases in this grid
  creaseExists(crease) {
    var array = this.creases[Point.toString(crease.endpoints[0].x, crease.endpoints[0].y)];
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    array = this.creases[Point.toString(crease.endpoints[1].x, crease.endpoints[1].y)];
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    return false;
  }

  // Creates a Crease starting at (x1, y1) going to (x2, y2) with the specified
  // color and adds it to this grid, if one does not already exist (returns
  // null if a Crease at these endpoints already exists)
  addCrease(p1, p2, color) {
    var crease = new Crease(p1, p2, color);
    if (this.creaseExists(crease)) {
      // The Crease already exists in the Grid, we return null
      return null;
    } else {
      // We add the Crease to our set of creases
      this.creases[Point.toString(p1.x, p1.y)].push(crease);
      this.creases[Point.toString(p2.x, p2.y)].push(crease);
      return crease;
    }
  }
}
