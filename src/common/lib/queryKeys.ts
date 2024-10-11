export const queryKeys = {
  drivers: {
    all: ['drivers'],
    byId: (id: string) => ['drivers', id],
    bySearch: (searchField: string, searchValue: string) => [
      'drivers',
      searchField,
      searchValue,
    ],
  },
  cars: {
    all: ['cars'],
    byId: (id: string) => ['cars', id],
  },
};
