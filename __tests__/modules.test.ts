import { myModule } from '../src/modules';

describe('myModule', () => {
  it('1 + 1 should be 2', () => {
    expect(myModule.add(1, 1)).toBe(2);
  });
});
