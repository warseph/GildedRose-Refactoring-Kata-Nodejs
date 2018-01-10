class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const QUALITY_CAP_HIGH = 50;
const QUALITY_CAP_LOW = 0;
const QUALITY_CHANGE = 1;
const SELLIN_LIMIT = 0;
const SELLIN_CHANGE = 1;
const BACKSTAGE_PASS_FIRST_INCREASE = 10;
const BACKSTAGE_PASS_SECOND_INCREASE = 5;

class BaseItem {
  constructor(item) {
    this.item = item;
  }
  updateQuality() { }
  changeQuality(number) {
    this.item.quality += number;
  }
  changeSellIn(number) {
    this.item.sellIn += number;
  }
}

class Sulfuras extends BaseItem {
}
class AgedBrie extends BaseItem {
  updateQuality() {
    if (this.item.quality < QUALITY_CAP_HIGH) {
      this.changeQuality(QUALITY_CHANGE);
    }
    this.changeSellIn(-SELLIN_CHANGE);
    if (this.item.sellIn < SELLIN_LIMIT) {
      if (this.item.quality < QUALITY_CAP_HIGH) {
        this.changeQuality(QUALITY_CHANGE);
      }
    }
  }
}
class BackstagePasses extends BaseItem {
  updateQuality() {
    if (this.item.quality < QUALITY_CAP_HIGH) {
      this.changeQuality(QUALITY_CHANGE);
      if (this.item.sellIn <= BACKSTAGE_PASS_FIRST_INCREASE) {
        if (this.item.quality < QUALITY_CAP_HIGH) {
          this.changeQuality(QUALITY_CHANGE);
        }
      }
      if (this.item.sellIn <= BACKSTAGE_PASS_SECOND_INCREASE) {
        if (this.item.quality < QUALITY_CAP_HIGH) {
          this.changeQuality(QUALITY_CHANGE);
        }
      }
    }
    this.changeSellIn(-SELLIN_CHANGE);
    if (this.item.sellIn < SELLIN_LIMIT) {
      this.changeQuality(-this.item.quality);
    }
  }
}
class RegularItem extends BaseItem {
  updateQuality() {
    if (this.item.quality > QUALITY_CAP_LOW) {
      this.changeQuality(-QUALITY_CHANGE);
    }
    this.changeSellIn(-SELLIN_CHANGE);
    if (this.item.sellIn < SELLIN_LIMIT) {
      if (this.item.quality > QUALITY_CAP_LOW) {
        this.changeQuality(-QUALITY_CHANGE);
      }
    }
  }
}

class ItemFactory {
  constructor(item) {
    this.item = item;
  }
  itemObject() {
    switch (this.item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return new Sulfuras(this.item);
      case 'Aged Brie':
        return new AgedBrie(this.item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePasses(this.item);
      default:
        return new RegularItem(this.item);
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const factory = new ItemFactory(this.items[i]);
      const item = factory.itemObject();
      item.updateQuality();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
