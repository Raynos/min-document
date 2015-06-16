var domWalk = require("dom-walk")

var Comment = require("./dom-comment.js")
var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")
var Event = require("./event.js")
var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var removeEventListener = require("./event/remove-event-listener.js")

module.exports = Document;

function Document() {
    if (!(this instanceof Document)) {
        return new Document();
    }

    this.head = this.createElement("head")
    this.body = this.createElement("body")
    this.documentElement = this.createElement("html")
    this.documentElement.appendChild(this.head)
    this.documentElement.appendChild(this.body)
    this.childNodes = [this.documentElement]
    this.nodeType = 9
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

proto.createComment = function createComment(data) {
    return new Comment(data, this)
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
    var classes = classNames.split(" ");

    if (!parent) {
        parent = this.body
    }

    var elems = []

    domWalk(parent, function (node) {
        if (node.nodeType === 1) {
            var nodeClassName = node.className || ""
            var nodeClasses = nodeClassName.split(" ")

            if (classes.every(function (item) {
                return nodeClasses.indexOf(item) !== -1
            })) {
                elems.push(node)
            }
        }
    })

    return elems
}

proto.getElementsByTagName = function getElementsByTagName(tagName, parent) {
    tagName = tagName.toLowerCase()

    if (!parent) {
        parent = this
    }

    var elems = []

    domWalk(parent.childNodes, function (node) {
        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
            elems.push(node)
        }
    })

    return elems
}

proto.removeEventListener = removeEventListener
proto.addEventListener = addEventListener
proto.dispatchEvent = dispatchEvent
