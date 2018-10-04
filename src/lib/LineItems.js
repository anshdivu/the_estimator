import LineItem from './LineItem';
import * as Papa from 'papaparse';

export default class LineItems {
  static convert(rawItems = []) {
    const items = rawItems.map(item => new LineItem(item));
    return new LineItems(items);
  }

  constructor(items = []) {
    this.items = items;
    this.length = items.length;
  }

  update(idx, lineItem) {
    const updatedItems = [...this.items];
    updatedItems[idx] = lineItem;

    return new LineItems(updatedItems);
  }

  totalEffort() {
    return this.items.reduce((acc, item) => acc + item.weightedAvg(), 0);
  }

  effortInDays() {
    return this.totalEffort() / 8;
  }

  effortInWeeks() {
    return this.effortInDays() / 5;
  }

  contingency(percent) {
    const increment = (this.effortInWeeks() * percent) / 100;
    return this.effortInWeeks() + increment;
  }

  toCsv() {
    return Papa.unparse(this.items);
  }
}
