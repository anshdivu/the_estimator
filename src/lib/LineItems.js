import LineItem from './LineItem';

export default class LineItems {
  static convert(rawItems = []) {
    const items = rawItems.map(item => new LineItem(item));
    return new LineItems(items);
  }

  constructor(items = []) {
    this.items = items;
    this.totalEffort = totalEffortCalc(this.items);
  }

  effortInDays() {
    return this.totalEffort / 8;
  }

  effortInWeeks() {
    return this.effortInDays() / 5;
  }

  contingency(percent) {
    const increment = this.effortInWeeks() * percent / 100;
    return this.effortInWeeks() + increment;
  }
}

function totalEffortCalc(items) {
  return items.reduce((acc, item) => acc + item.weightedAvg(), 0);
}
