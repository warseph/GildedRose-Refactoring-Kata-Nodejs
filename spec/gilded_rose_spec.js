const expect = require('chai').expect;

const gildedRose = require('../src/gilded_rose');
const Shop = gildedRose.Shop;
const Item = gildedRose.Item;

describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).equal("fixme");
  });

});
