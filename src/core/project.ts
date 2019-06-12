import LineItem from './line-item';

export default class Project {
  constructor(public name = 'Project', public items: LineItem[] = []) {}

  effortInHours = () =>
    this.items.reduce((acc, item) => acc + item.weightedAvg(), 0);

  effortInDays = () => this.effortInHours() / 8;

  effortInWeeks = () => this.effortInDays() / 5;

  contingency = (percent: number) => {
    const increment = (this.effortInWeeks() * percent) / 100;
    return this.effortInWeeks() + increment;
  };
}
