type Slugs = {
  [key: string]: string;
};

const slugs: Slugs = {
  DASHBOARD: '/',
  AUTH: '/auth',
  AUTH_CONFIRM: '/api/auth/confirm',
  USERS: '/management/users',
  DRIVERS: '/management/drivers',
  CLIENTS: '/management/clients',
  CARS: '/management/cars',
  CAR_MAINTENANCE: '/management/cars/maintenance',
};

export const getSlugByPathname = (pathname: string) => {
  const keys = Object.keys(slugs);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (slugs[key] === pathname) {
      return key;
    }
  }
  return null;
};

export default slugs;
