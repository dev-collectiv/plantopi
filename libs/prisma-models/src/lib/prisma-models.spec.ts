import { prismaModels } from './prisma-models';

describe('prismaModels', () => {
  it('should work', () => {
    expect(prismaModels()).toEqual('prisma-models');
  });
});
