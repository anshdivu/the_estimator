import LineItem from "./line-item";

export default class Project {
  constructor(public name = "", public items: LineItem[] = []) {}

  update(items: LineItem[]) {
    return new Project(this.name, items);
  }

  addItem(item: LineItem) {
    const newItems = this.items.concat([item]);
    return this.update(newItems);
  }

  updateItem(index: number, item: LineItem) {
    const newItems = [...this.items];
    newItems[index] = item;

    return this.update(newItems);
  }

  deleteItem(index: number) {
    const newItems = [...this.items];
    newItems.splice(index, 1);

    return this.update(newItems);
  }

  effortInHours = () =>
    this.items.reduce((acc, item) => acc + item.weightedAvg(), 0);

  effortInDays = () => this.effortInHours() / 8;

  effortInWeeks = () => this.effortInDays() / 5;

  contingency = (percent: number) => {
    const increment = (this.effortInWeeks() * percent) / 100;
    return this.effortInWeeks() + increment;
  };
}
