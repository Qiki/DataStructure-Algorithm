// basic node data structure

function DomNode(tagName, attributes) {
  attributes = attributes || {};

  this.tagName = tagName;
  this.id = attributes.id;
  this.className = attributes.className;
  this.content = attributes.content;
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
