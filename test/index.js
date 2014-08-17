var testDocument = require("./test-document")
var testDomElement = require("./test-dom-element")
var document = require("../index")

testDocument(document)
testDomElement(document)

if (typeof window !== "undefined" && window.document) {
    testDocument(window.document)
    testDomElement(window.document)
}
