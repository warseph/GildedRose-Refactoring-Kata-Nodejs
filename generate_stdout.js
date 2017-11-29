const { Item, Shop } = require('./src/gilded_rose');

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Sulfuras, Hand of Ragnaros', -1, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
  new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
  // This Conjured item does not work properly yet
  new Item('Conjured Mana Cake', 3, 6), // < -- : O
];

const days = (process.argv[3] || 31);

const guildedRose = new Shop(items);

console.log('OMGHAI!');
[...Array(days).keys()].forEach(day => {
  console.log(`-------- day ${day} --------`);
  console.log('name, sellIn, quality');
  items
    .map(({ name, sellIn, quality }) => [name, sellIn, quality].join(', '))
    .forEach(item => console.log(item));
  console.log('');
  guildedRose.updateQuality();
});
