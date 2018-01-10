class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class BaseItem {
  constructor(item) {
    this.item = item;
    this.QUALITY_CHANGE = 1;
  }
  updateQuality() { }
  increaseQuality() {
    const QUALITY_CAP_HIGH = 50;
    if (this.item.quality < QUALITY_CAP_HIGH) {
      this.item.quality += this.QUALITY_CHANGE;
    }
  }
  decreaseQuality() {
    const QUALITY_CAP_LOW = 0;
    if (this.item.quality > QUALITY_CAP_LOW) {
      this.item.quality -= this.QUALITY_CHANGE;
    }
  }
  resetQuality() {
    this.item.quality = 0;
  }
  decreaseSellIn() {
    const SELLIN_CHANGE = 1;
    this.item.sellIn -= SELLIN_CHANGE;
  }
  isSellInLimit() {
    const SELLIN_LIMIT = 0;
    return this.item.sellIn < SELLIN_LIMIT
  }
}

class Sulfuras extends BaseItem {
  static get name() { return 'Sulfuras, Hand of Ragnaros'; }
}
class AgedBrie extends BaseItem {
  static get name() { return 'Aged Brie'; }
  updateQuality() {
    this.increaseQuality();
    this.decreaseSellIn();
    if (this.isSellInLimit()) {
      this.increaseQuality();
    }
  }
}
class BackstagePasses extends BaseItem {
  static get name() { return 'Backstage passes to a TAFKAL80ETC concert'; }
  isSellInIncrease(days) {
    return this.item.sellIn <= days;
  }
  updateQuality() {
    const BACKSTAGE_PASS_FIRST_INCREASE = 10;
    const BACKSTAGE_PASS_SECOND_INCREASE = 5;

    this.increaseQuality();
    if (this.isSellInIncrease(BACKSTAGE_PASS_FIRST_INCREASE)) {
        this.increaseQuality();
    }
    if (this.isSellInIncrease(BACKSTAGE_PASS_SECOND_INCREASE)) {
        this.increaseQuality();
    }
    this.decreaseSellIn();
    if (this.isSellInLimit()) {
      this.resetQuality();
    }
  }
}
class RegularItem extends BaseItem {
  updateQuality() {
    this.decreaseQuality();
    this.decreaseSellIn();
    if (this.isSellInLimit()) {
      this.decreaseQuality();
    }
  }
}

class ItemFactory {
  constructor(item) {
    this.item = item;
  }
  itemObject() {
    switch (this.item.name) {
      case Sulfuras.name:
        return new Sulfuras(this.item);
      case AgedBrie.name:
        return new AgedBrie(this.item);
      case BackstagePasses.name:
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
