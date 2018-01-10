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
  updateQuality() {}
}

class Sulfuras extends BaseItem {
}
class AgedBrie extends BaseItem {
  updateQuality() {
    if (this.item.quality < QUALITY_CAP_HIGH) {
      this.item.quality = this.item.quality + QUALITY_CHANGE;
    }
    this.item.sellIn = this.item.sellIn - SELLIN_CHANGE;
    if (this.item.sellIn < SELLIN_LIMIT) {
      if (this.item.quality < QUALITY_CAP_HIGH) {
        this.item.quality = this.item.quality + QUALITY_CHANGE;
      }
    }
  }
}
class BackstagePasses extends BaseItem {
  updateQuality() {
    if (this.item.quality < QUALITY_CAP_HIGH) {
      this.item.quality = this.item.quality + QUALITY_CHANGE;
      if (this.item.sellIn <= BACKSTAGE_PASS_FIRST_INCREASE) {
        if (this.item.quality < QUALITY_CAP_HIGH) {
          this.item.quality = this.item.quality + QUALITY_CHANGE;
        }
      }
      if (this.item.sellIn <= BACKSTAGE_PASS_SECOND_INCREASE) {
        if (this.item.quality < QUALITY_CAP_HIGH) {
          this.item.quality = this.item.quality + QUALITY_CHANGE;
        }
      }
    }
    this.item.sellIn = this.item.sellIn - SELLIN_CHANGE;
    if (this.item.sellIn < SELLIN_LIMIT) {
      this.item.quality = this.item.quality - this.item.quality;
    }
  }
}
class RegularItem extends BaseItem {
  updateQuality() {
    if (this.item.quality > QUALITY_CAP_LOW) {
      this.item.quality = this.item.quality - QUALITY_CHANGE;
    }
    this.item.sellIn = this.item.sellIn - SELLIN_CHANGE;
    if (this.item.sellIn < SELLIN_LIMIT) {
      if (this.item.quality > QUALITY_CAP_LOW) {
        this.item.quality = this.item.quality - QUALITY_CHANGE;
      }
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item;
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        item = new Sulfuras(this.items[i]);
      } else if (this.items[i].name === 'Aged Brie') {
        item = new AgedBrie(this.items[i]);
      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        item = new BackstagePasses(this.items[i]);
      } else {
        item = new RegularItem(this.items[i]);
      }
      item.updateQuality();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
