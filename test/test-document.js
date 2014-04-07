var test = require("tape")

module.exports = testDocument

function testDocument(document) {
    test("document is a Document", function (assert) {
        assert.equal(typeof document.createTextNode, "function")
        assert.equal(typeof document.createElement, "function")
        assert.equal(typeof document.createDocumentFragment, "function")

        assert.end()
    })

    test("can do stuff", function (assert) {
        var div = document.createElement("div")
        div.className = "foo bar"

        var span = document.createElement("span")
        div.appendChild(span)
        span.textContent = "Hello!"

        var html = String(div)

        assert.equal(html, "<div class=\"foo bar\">\n" +
            "<span>\nHello!\n</span>\n</div>")

        assert.end()
    })


    test("can createDocumentFragment", function (assert) {
        var frag = document.createDocumentFragment()

        assert.equal(frag.nodeType, 11)

        var h1 = document.createElement("h1")
        var h2 = document.createElement("h2")

        assert.equal(h1.nodeType, 1)
        assert.equal(h1.nodeType, 1)

        frag.appendChild(h1)
        assert.equal(String(frag), "<h1>\n</h1>")

        frag.appendChild(h2)
        assert.equal(String(frag), "<h1>\n</h1><h2>\n</h2>")

        frag.removeChild(h1)
        assert.equal(String(frag), "<h2>\n</h2>")

        frag.replaceChild(h1, h2)
        assert.equal(String(frag), "<h1>\n</h1>")

        assert.end()
    })


    test("can getElementById", function (assert) {

        function append_div(id, parent) {
            var div = document.createElement("div")
            div.id = id
            parent.appendChild(div)
            return div
        }

        var div1   = append_div(1, document.body)
        var div2   = append_div(2, document.body)
        var div3   = append_div(3, document.body)

        var div11  = append_div(11, div1)
        var div12  = append_div(12, div1)
        var div21  = append_div(21, div2)
        var div22  = append_div(22, div2)
        var div221 = append_div(221, div22)
        var div222 = append_div(222, div22)

        assert.equal(document.getElementById(1),    div1)
        assert.equal(document.getElementById("2"),  div2)
        assert.equal(document.getElementById(3),    div3)
        assert.equal(document.getElementById(11),   div11)
        assert.equal(document.getElementById(12),   div12)
        assert.equal(document.getElementById(21),   div21)
        assert.equal(document.getElementById(22),   div22)
        assert.equal(document.getElementById(221),  div221)
        assert.equal(document.getElementById(222),  div222)

        assert.end()
    })

    test("can create/manipulate textnodes", function (assert) {
        var textnode = document.createTextNode("hello")

        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "hello")
        assert.equal(typeof textnode.replaceData, "function")

        textnode.replaceData(0, 7, "nightly")
        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "nightly")
        assert.equal(typeof textnode.replaceData, "function")

        textnode.replaceData(1, 1, "ou")
        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "noughtly")

        assert.end()
    })

    test("owner document is set", function (assert) {
        var textnode = document.createTextNode("hello")
        var domnode = document.createElement("div")
        var fragment = document.createDocumentFragment()

        assert.equal(textnode.ownerDocument, document)
        assert.equal(domnode.ownerDocument, document)
        assert.equal(fragment.ownerDocument, document)

        assert.end()
    })

    test("Create namespaced nodes", function (assert) {
        var svgURI = "http://www.w3.org/2000/svg"
        var htmlURI = "http://www.w3.org/1999/xhtml"

        var noNS = document.createElement("div")
        var svgNS = document.createElementNS(svgURI, "svg")
        var emptyStringNS = document.createElementNS("", "div")
        var nullNS = document.createElementNS(null, "div")
        var undefinedNS = document.createElementNS(undefined, "div")
        var htmlNS = document.createElement("div")

        assert.equal(noNS.tagName, "DIV")
        assert.equal(noNS.namespaceURI, htmlURI)

        assert.equal(svgNS.tagName, "svg")
        assert.equal(svgNS.namespaceURI, svgURI)

        assert.equal(emptyStringNS.tagName, "div")
        assert.equal(emptyStringNS.namespaceURI, null)

        assert.equal(nullNS.tagName, "div")
        assert.equal(nullNS.namespaceURI, null)

        assert.equal(undefinedNS.tagName, "div")
        assert.equal(undefinedNS.namespaceURI, "undefined")

        assert.equal(htmlNS.tagName, "DIV")
        assert.equal(htmlNS.namespaceURI, htmlURI)

        assert.end()
    })
}
