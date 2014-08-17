var test = require("tape")

module.exports = testDomElement

function testDomElement(document) {

    var cleanup = require('./cleanup')(document)

    test("can getElementsByClassName", function(assert) {
        function append_div(classNames, parent) {
            var div = document.createElement("div")
            div.className = classNames
            parent.appendChild(div)
            return div
        }

        function assertMatch(classNames, expectedElements, parent) {
            var parent = parent || document
            var result = parent.getElementsByClassName(classNames)
            assert.equal(result.length, expectedElements.length)
            for (var i = 0; i < expectedElements.length; i++) {
                assert.notEqual(expectedElements.indexOf(result[i]), -1)
            }
        }

        var divA   = append_div("A", document.body)
        var divB   = append_div("B", document.body)
        var divC   = append_div("C", document.body)

        var divA1  = append_div("A1",  divA)
        var divA2  = append_div("A2",  divA)
        var divB1  = append_div("B1",  divB)
        var divB2  = append_div("B2",  divB)
        var divB2a = append_div("B2a", divB2)
        var divB2b = append_div("B2b", divB2)

        assertMatch("A",    [divA])
        assertMatch("B",    [divB])
        assertMatch("C",    [divC])
        assertMatch("A1",   [divA1])
        assertMatch("A2",   [divA2])
        assertMatch("B1",   [divB1])
        assertMatch("B2",   [divB2])
        assertMatch("B2a",  [divB2a])
        assertMatch("B2b",  [divB2b])

        assertMatch("A1",   [divA1], divA)
        assertMatch("A2",   [divA2], divA)
        assertMatch("A1",   [], divB)
        assertMatch("A2",   [], divC)
        assertMatch("B1",   [divB1], divB)
        assertMatch("B2",   [divB2], divB)
        assertMatch("B2a",  [divB2a], divB)
        assertMatch("B2a",  [divB2a], divB2)
        assertMatch("B2b",  [], divA)

        cleanup()
        assert.end()
    })
}
