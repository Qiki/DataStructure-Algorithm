// require tree-traversal.js

function initParser(DomNode) {
  var node = DomNode;
  var tagList = [
    'html',
    'head',
    'body',
    'div',
    'p',
    'h1', 'h2', 'h3', 'h4',
    'ul', 'li',
    'span', 'a'
  ];

  return {
    parse: parse,
    tagWalker: tagWalker
  };

  function checkTag(text) {
    for (var i = tagList.length - 1; i >= 0; i--) {
      if (tagList[i] === text) {
        return true;
      }
    }
    return false;
  }

  function tagWalker(html) {
    var pointer = 0;
    var htmlLength = html.length;

    return {
      next: next
    };

    function next() {
      if (pointer >= htmlLength) {
        return false;
      }

      var tagName = '';
      var property = {};
      var contentBefore = '';

      var tagStack = [];
      var startContentBefore = true;
      var startTag = false;
      var startAttr = false;
      var startValue = false;
      var startAssign = false;
      var endTag = false;
      var quoteCount = 0;
      var attr = '';
      var attrValue = '';

      while (tagStack.length < 2 && pointer < html.length) {
        if (startContentBefore && html[pointer] !== '<') {
          contentBefore += html[pointer];

          pointer++;
          continue;
        }

        if (html[pointer] === '<') {
          tagStack.push('<');
          startTag = true;
          startContentBefore = false;

          pointer++;
          continue;
        }

        if (startTag && '/' === html[pointer]) {
          endTag = true;

          pointer++;
          continue;
        }

        if (startTag && /[a-z]/.test(html[pointer])) {
          tagName += html[pointer];

          pointer++;
          continue;
        }

        if (!startValue && /\s/.test(html[pointer])) {
          startTag = false;

          if (startAttr && attr.length) {
            property[attr] = null;
            startAttr = false;
          }

          pointer++;
          continue;
        }

        if ('=' === html[pointer]) {
          if (startAttr && attr.length) {
            property[attr] = null;
          }

          startAttr = false;
          startAssign = true;

          pointer++;
          continue;
        }

        if ('"' === html[pointer]) {
          quoteCount++;
          if (quoteCount === 1) {
            startValue = true;
          } else {
            quoteCount = 0;
            property[attr] = attrValue;
            attr = '';
            attrValue = '';
            startAssign = false;
            startValue = false;
          }

          pointer++;
          continue;
        }

        if (!startTag && !startAssign && /[a-z]/.test(html[pointer])) {
          attr += html[pointer];
          startAttr = true;

          pointer++;
          continue;
        }

        if (startAssign && startValue) {
          attrValue += html[pointer];

          pointer++;
          continue;
        }

        if (html[pointer] === '>') {
          tagStack.push('>');

          pointer++;
          continue;
        }
      }

      return {
        tagName       : tagName,
        property      : property,
        endTag        : endTag,
        contentBefore : contentBefore
      };
    }
  }

  function parse(html) {

  }
}