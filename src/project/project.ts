import LineItem from "./line-item";

export default class Project {
  constructor(public name = "", public items: LineItem[] = []) {}

  update(items: LineItem[]) {
    return new Project(this.name, items);
  }

  addItem(item: LineItem) {
    const updatedItems = this.items.concat([item]);
    return this.update(updatedItems);
  }

  updateItem(index: number, update: Partial<LineItem>) {
    const updatedItem = new LineItem({ ...this.items[index], ...update });

    const updatedItems = [...this.items];
    updatedItems[index] = updatedItem;

    return this.update(updatedItems);
  }

  deleteItem(index: number) {
    const updatedItems = [...this.items];
    updatedItems.splice(index, 1);

    return this.update(updatedItems);
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
