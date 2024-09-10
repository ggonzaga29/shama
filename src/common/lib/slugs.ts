type Slugs = {
  [key: string]: string;
};

const slugs: Slugs = {
  DASHBOARD: '/',
  AUTH: '/auth',
  AUTH_CONFIRM: '/api/auth/confirm',
  USERS: '/users',
  DRIVERS: '/drivers',
  CLIENTS: '/clients',
  CARS: '/cars',
  CAR_MAINTENANCE: '/cars/maintenance',
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
