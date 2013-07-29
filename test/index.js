var test = require("tape")

var document = require("../index")

test("document is a Document", function (assert) {
    assert.equal(typeof document.createTextNode, "function")
    assert.equal(typeof document.createElement, "function")
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

	var h1 = document.createElement("h1")
	var h2 = document.createElement("h2")


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


