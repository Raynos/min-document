var test = require("tape")

var document = require("../index")

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

