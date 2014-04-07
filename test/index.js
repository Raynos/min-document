var testDocument = require("./test-document")
var document = require("../index")

testDocument(document)

if (typeof window !== "undefined" && window.document) {
    testDocument(window.document)
}
