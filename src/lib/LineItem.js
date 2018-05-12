export default class LineItem {
  constructor({ optimistic = 0, likely = 0, pessimistic = 0 } = {}) {
    this.optimistic = optimistic;
    this.likely = likely;
    this.pessimistic = pessimistic;
  }

  weightedAvg() {
    const avg = (this.optimistic + 4 * this.likely + this.pessimistic) / 6;
    return Math.round(avg);
  }
}
