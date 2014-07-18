var domWalk = require("dom-walk")

var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")
var Event = require("./event.js")

module.exports = Document;

function Document() {
    if (!(this instanceof Document)) {
        return new Document();
    }

    this.body = this.createElement("body")
    this.documentElement = this.createElement("html")
    this.documentElement.appendChild(this.body)
}

var proto = Document.prototype;
proto.createTextNode = function createTextNode(value) {
    return new DOMText(value, this)
}

proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace)
    return new DOMElement(tagName, this, ns)
}

proto.createElement = function createElement(tagName) {
    return new DOMElement(tagName, this)
}

proto.createDocumentFragment = function createDocumentFragment() {
    return new DocumentFragment(this)
}

proto.createEvent = function createEvent(family) {
    return new Event(family)
}

proto.getElementById = function getElementById(id, parent) {
    if (!parent) {
        parent = this.body
    }

    if (String(parent.id) === String(id)) {
        return parent
    }

    var arr = parent.childNodes
    var result = null

    if (!arr) {
        return result
    }

    for (var i = 0, len = arr.length; !result && i < len; i++) {
        result = getElementById(id, arr[i])
    }

    return result
}

proto.getElementsByClassName = function getElementsByClassName(classNames, parent) {
    if (classNames.indexOf(" ") != -1) {
        throw new Error("Not yet implemented: getElementsByClassName for multiple class names");
    }

    if (!parent) {
        parent = this.body
    }

    var elems = []

    domWalk(parent, function (node) {
        var className = node.className || ""
        var classes = className.split(" ")

        if (classes.indexOf(classNames) !== -1) {
            elems.push(node)
        }
    })

    return elems
}
