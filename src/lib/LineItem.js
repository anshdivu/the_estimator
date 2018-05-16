export default class LineItem {
  constructor({
    description = '',
    optimistic = 0,
    likely = 0,
    pessimistic = 0
  } = {}) {
    this.description = description;
    this.optimistic = optimistic;
    this.likely = likely;
    this.pessimistic = pessimistic;
  }

  update(data) {
    return new LineItem({ ...this, ...data });
  }

  weightedAvg() {
    const avg = (this.optimistic + 4 * this.likely + this.pessimistic) / 6;
    return Math.round(avg);
  }
}
