import LineItem from './LineItem';

describe(LineItem.prototype.weightedAvg.name, () => {
  it('default case', () => {
    const lineItem = new LineItem({ optimistic: 1, likely: 1, pessimistic: 1 });
    expect(lineItem.weightedAvg()).toBe(1);
  });

  it('real case', () => {
    const lineItem = new LineItem({
      optimistic: 8,
      likely: 32,
      pessimistic: 40
    });
    expect(lineItem.weightedAvg()).toBe(29);
  });

  it('pessimistic value missing', () => {
    const lineItem = new LineItem({ optimistic: 8, likely: 32 });
    expect(lineItem.weightedAvg()).toBe(23);
  });
});
