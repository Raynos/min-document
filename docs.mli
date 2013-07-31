type DOMText := {
    data: String,
    type: "DOMTextNode",
    nodeType: 3,

    constructor: (value: String) => DOMText,
    toString: () => String
}

type DOMNode := DOMText | DOMElement | DocumentFragment
type DOMChild := DOMText | DOMElement

type DOMElement := {
    tagName: String,
    className: String,
    dataset: Object<String, Any>,
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    style: Object<String, String>,
    type: "DOMElement",
    nodeType: 1,

    constructor: (tagName: String) => DOMElement,
    appendChild: (child: DOMNode),
    removeChild: (child: DOMChild),
    replaceChild: (elem: DOMNode, needle: DOMChild),
    focus: () => void,
    toString: () => String
}

type DocumentFragment := {
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    type: "DocumentFragment",
    nodeType: 11,
    nodeName: "#document-fragment",

    constructor: () => DocumentFragment,
    appendChild
    replaceChild
    removeChild
    toString: () => String
}

type Document := {
    body: DOMElement,

    Document: () => Document,
    Text: (value: String) => DOMText,
    Element: (tagName: String) => DOMElement,
    DocumentFragment: () => DocumentFragment,
    createTextNode: (value: String) => DOMText,
    createElement: (tagName: String) => Element,
    createDocumentFragment: () => DocumentFragment,
    getElementById: (id: String) => null | Element
}

min-document := Document
