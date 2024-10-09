export const queryKeys = {
  drivers: {
    all: ['drivers'],
    byId: (id: string) => ['drivers', id],
  },
  cars: {
    all: ['cars'],
    byId: (id: string) => ['cars', id],
  },
};
