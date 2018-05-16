import LineItems from './LineItems';
import LineItem from './LineItem';

describe(LineItems.name, () => {
  const members = LineItems.prototype;

  describe(LineItems.convert.name, () => {
    it('returns LineItems', () => {
      const rawItem = { likely: 1 };
      const expectedItems = new LineItems([new LineItem(rawItem)]);

      const lineItems = LineItems.convert([rawItem]);
      expect(lineItems).toEqual(expectedItems);
    });
  });

  describe(members.totalEffort.name, () => {
    it('returns sum of indiviual weightedAvgs', () => {
      const lineItems = LineItems.convert([{ likely: 1 }, { likely: 1 }]);

      expect(lineItems.totalEffort()).toEqual(2);
    });
  });

  describe(members.effortInDays.name, () => {
    it('returns divided by 8', () => {
      const lineItems = LineItems.convert([{ likely: 8 }, { likely: 8 }]);

      expect(lineItems.effortInDays()).toEqual(1.25);
    });
  });

  describe(members.effortInWeeks.name, () => {
    it('returns divided by 8/5', () => {
      const lineItems = LineItems.convert([{ likely: 40 }, { likely: 40 }]);

      expect(lineItems.effortInWeeks()).toEqual(1.35);
    });
  });

  describe(members.contingency.name, () => {
    it('returns contingency', () => {
      const lineItems = LineItems.convert([{ likely: 40 }, { likely: 40 }]);

      expect(lineItems.contingency(10)).toEqual(1.485);
    });
  });
});
