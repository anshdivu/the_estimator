export default class LineItem {
  public description = "";
  public optimistic = 0;
  public likely = 0;
  public pessimistic = 0;

  constructor(partialItem: Partial<LineItem> = {}) {
    Object.assign(this, partialItem);
  }

  weightedAvg() {
    const avg = (this.optimistic + 4 * this.likely + this.pessimistic) / 6;
    return Math.round(avg);
  }
}
