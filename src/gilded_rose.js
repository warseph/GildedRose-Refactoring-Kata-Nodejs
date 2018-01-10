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

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > QUALITY_CAP_LOW) {
            this.items[i].quality = this.items[i].quality - QUALITY_CHANGE;
        }
      } else {
        if (this.items[i].quality < QUALITY_CAP_HIGH) {
          this.items[i].quality = this.items[i].quality + QUALITY_CHANGE;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn <= BACKSTAGE_PASS_FIRST_INCREASE) {
              if (this.items[i].quality < QUALITY_CAP_HIGH) {
                this.items[i].quality = this.items[i].quality + QUALITY_CHANGE;
              }
            }
            if (this.items[i].sellIn <= BACKSTAGE_PASS_SECOND_INCREASE) {
              if (this.items[i].quality < QUALITY_CAP_HIGH) {
                this.items[i].quality = this.items[i].quality + QUALITY_CHANGE;
              }
            }
          }
        }
      }
      this.items[i].sellIn = this.items[i].sellIn - SELLIN_CHANGE;
      if (this.items[i].sellIn < SELLIN_LIMIT) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > QUALITY_CAP_LOW) {
              this.items[i].quality = this.items[i].quality - QUALITY_CHANGE;
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < QUALITY_CAP_HIGH) {
            this.items[i].quality = this.items[i].quality + QUALITY_CHANGE;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
