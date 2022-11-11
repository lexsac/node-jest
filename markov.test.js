const { MarkovMachine } = require("./markov");


describe('markov machine function', function () {
  test('makeChains function', function () {
    let mm = new MarkovMachine("the cat in the hat");

    expect(mm.makeChains()).toEqual({
      "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]
    })
  });

  test('cuts off at length', function () {
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText(3);
    let outputWords = output.split(/[ \r\n]+/);
    expect([1, 2, 3]).toContain(outputWords.length);
  });
});