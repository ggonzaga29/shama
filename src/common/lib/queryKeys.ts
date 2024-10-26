function bySearch(tablename: string) {
  return (searchFields: string[], searchValue: string) => {
    return [tablename, searchFields.join(', '), searchValue];
  };
}

export const queryKeys = {
  drivers: {
    all: ['drivers'],
    byId: (id: string) => ['drivers', id],
    bySearch: bySearch('drivers'),
  },
  cars: {
    all: ['cars'],
    byId: (id: string) => ['cars', id],
    bySearch: bySearch('cars'),
  },
  clients: {
    all: ['clients'],
    byId: (id: string) => ['clients', id],
    bySearch: bySearch('clients'),
  },
};
