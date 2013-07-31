function DOMText(value) {
    this.data = value
}

DOMText.prototype.type = "DOMTextNode"
DOMText.prototype.nodeType = 3

DOMText.prototype.toString = function _Text_toString() {
    return this.data
}

function DOMElement(tagName) {
    this.tagName = tagName
    this.className = ""
    this.dataset = {}
    this.childNodes = []
    this.parentNode = null
    this.style = {}
}

DOMElement.prototype.type = "DOMElement"
DOMElement.prototype.nodeType = 1

DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    this.childNodes.push(child)
    child.parentNode = this
}

DOMElement.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        var index = this.childNodes.indexOf(needle)

        this.childNodes[index] = elem
        elem.parentNode = this
    }

DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    var index = this.childNodes.indexOf(elem)

    this.childNodes.splice(index, 1)
}

// Un-implemented
DOMElement.prototype.focus = function _Element_focus() {
    return void 0
}

DOMElement.prototype.toString = _Element_toString

function DocumentFragment() {
    this.childNodes = []
    this.parentNode = null
}

DocumentFragment.prototype.type = "DocumentFragment"
DocumentFragment.prototype.nodeType = 11
DocumentFragment.prototype.nodeName = "#document-fragment"

DocumentFragment.prototype.appendChild  = DOMElement.prototype.appendChild
DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild
DocumentFragment.prototype.removeChild  = DOMElement.prototype.removeChild

DocumentFragment.prototype.toString =
    function _DocumentFragment_toString() {
        return this.childNodes.map(function (node) {
            return String(node)
        }).join("")
    }

var body = createElement("body")

module.exports = Document()

function Document() {
    return {
        body: body,
        createTextNode: createTextNode,
        createElement: createElement,
        createDocumentFragment: createDocumentFragment,
        getElementById: getElementById
    }
}

function createTextNode(value) {
    return new DOMText(value)
}

function createElement(tagName) {
    return new DOMElement(tagName)
}

function createDocumentFragment() {
    return new DocumentFragment()
}

/*
* getElementById returns the Element whose ID is given by elementId.
* If no such element exists, returns null.
* Behavior is not defined if more than one element has this ID.
*/
function getElementById(id, parent) {
    if (!parent) {
        parent = body
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

        if (result) {
            return result
        }
    }
}

function _Element_toString() {
    var strings = []

    strings.push("<" + this.tagName + properties(this) +
        datasetify(this) + ">")

    if (this.textContent) {
        strings.push(this.textContent)
    }

    this.childNodes.forEach(function (node) {
        strings.push(node.toString())
    })

    strings.push("</" + this.tagName + ">")

    return strings.join("\n")
}

function isProperty(elem, key) {
    var type = typeof elem[key]

    return elem.hasOwnProperty(key) &&
        (type === "string" || type === "boolean" || type === "number") &&
        key !== "nodeName" && key !== "className" && key !== "tagName" &&
        key !== "textContent"
}

function stylify(styles) {
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        attr += key + ":" + value + ";"
    })
    return attr
}

function datasetify(elem) {
    var ds = elem.dataset
    var props = []

    for (var key in ds) {
        props.push({ name: "data-" + key, value: ds[key] })
    }

    return props.length ? stringify(props) : ""
}

function stringify(list) {
    var attributes = []
    list.forEach(function (tuple) {
        var name = tuple.name
        var value = tuple.value

        if (name === "style") {
            value = stylify(value)
        }

        attributes.push(name + "=" + "\"" + value + "\"")
    })

    return attributes.length ? " " + attributes.join(" ") : ""
}

function properties(elem) {
    var props = []
    for (var key in elem) {
        if (isProperty(elem, key)) {
            props.push({ name: key, value: elem[key] })
        }
    }

    if (elem.className) {
        props.push({ name: "class", value: elem.className })
    }

    return props.length ? stringify(props) : ""
}
