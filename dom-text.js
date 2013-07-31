module.exports = DOMText

function DOMText(value) {
    if (!(this instanceof DOMText)) {
        return new DOMText(value)
    }

    this.data = value
}

DOMText.prototype.type = "DOMTextNode"
DOMText.prototype.nodeType = 3

DOMText.prototype.toString = function _Text_toString() {
    return this.data
}
