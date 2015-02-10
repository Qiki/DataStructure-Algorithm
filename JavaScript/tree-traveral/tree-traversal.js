// basic node data structure

function DomNode(tagName, attributes) {
  attributes = attributes || {};

  this.tagName = tagName;
  this.id = attributes.id;
  this.className = attributes.className || attributes.class;
  this.content = attributes.content || '';
  this.attributes = attributes;
  this.children = [];
}

DomNode.prototype.addChild = function(node) {
  this.children.push(node);
  return this;
};

DomNode.prototype.attr = function(attrName, attrValue) {
  if (attrName && typeof attrName === 'string' && attrValue && typeof attrValue === 'string') {
    this.attributes[attrName] = attrValue;
    return true;
  } else if (attrName && typeof attrName === 'string' && !attrValue) {
    return this.attributes[attrName];
  } else if (!attrName && !attrValue) {
    return this.attributes;
  }
};

DomNode.prototype.text = function() {
  return this.content;
};

// Breadth-first search

DomNode.prototype.findById = function(id) {
  var queue = [];
  var current = null;

  this.children.forEach(function(child) {
    queue.push(child);
  });

  while(queue.length > 0) {
    current = queue.shift();

    if (current.id === id) {
      return current;
    } else {
      current.children.forEach(function(child) {
        queue.push(child);
      });
    }
  }

  return null;
};

// Breadth-first search

DomNode.prototype.findByClass = function(className, callback) {
  var queue = [];
  var current = null;
  var results = [];

  this.children.forEach(function(child) {
    queue.push(child);
  });

  while(queue.length > 0) {
    current = queue.shift();

    // for print all node
    if (typeof callback === 'function') {
      callback(current);
    }

    if (current.className === className) {
      results.push(current);
    } else {
      current.children.forEach(function(child) {
        queue.push(child);
      });
    }
  }

  return results;
};



// depth-first search

DomNode.prototype.render = function() {
  var queue = [];
  var current = null;
  var i = 0;

  queue.push(this);

  while(queue.length > 0) {
    current = queue.pop();

    console.log(nSymbol(current.attributes.level, '..')
      + '<' + current.tagName.toUpperCase() + '>'
      + (current.id ? '#' + current.id : '')
      + (current.className ? '.' + current.className : '')
      + (current.content ? ' || ' + current.content : '')
    );
    console.log();

    for (i = current.children.length - 1; i >= 0; i--) {
      queue.push(current.children[i]);
    }
  }
};

function nSymbol(n, symbol) {
  var ret = '';
  for (var i = 0; i < n; i++) {
    ret += symbol;
  }
  return ret;
}
