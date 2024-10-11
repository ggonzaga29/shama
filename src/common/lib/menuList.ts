import {
  CarbonIconType,
  Catalog,
  CustomerService,
  Dashboard,
  DocumentMultiple_02,
  Events,
  Identification,
  InventoryManagement,
  Money,
  ReportData,
  UserRole,
  Watsonx,
} from '@carbon/icons-react';
import { LucideIcon } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon | CarbonIconType;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  isAdminGroup: boolean;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      isAdminGroup: false,
      menus: [
        {
          href: '/',
          label: 'Dashboard',
          active: pathname === '/',
          icon: Dashboard,
          submenus: [],
        },
        {
          href: '/clients',
          label: 'Clients',
          active: pathname.includes('/clients'),
          icon: CustomerService,
          submenus: [],
        },
        {
          href: '/contacts',
          label: 'Contacts',
          active: pathname.includes('/contacts'),
          icon: Catalog,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Analytics',
      isAdminGroup: true,
      menus: [
        {
          href: '/reports',
          label: 'Financial Reports',
          active: pathname.includes('/posts'),
          icon: ReportData,
          submenus: [],
        },
        {
          href: '/reports',
          label: 'Transactions',
          active: pathname.includes('/posts'),
          icon: Money,
          submenus: [],
        },
        {
          href: '/powerbi',
          label: 'Power BI',
          active: pathname.includes('/powerbi'),
          icon: Watsonx,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Booking Management',
      isAdminGroup: false,
      menus: [
        {
          href: '/bookings',
          label: 'Bookings',
          active: pathname.includes('/bookings'),
          icon: DocumentMultiple_02,
          submenus: [
            {
              href: '/bookings',
              label: 'All Bookings',
              active: pathname === '/bookings',
            },
            {
              href: '/bookings/add',
              label: 'Add Booking',
              active: pathname.includes('/bookings/add'),
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Fleet Management',
      isAdminGroup: false,
      menus: [
        {
          href: '/fleet/',
          label: 'Fleet Inventory',
          active: pathname.includes('/fleet'),
          icon: InventoryManagement,
          submenus: [
            {
              href: '/fleet',
              label: 'All Vehicles',
              active: pathname === '/fleet',
            },
            {
              href: '/fleet/add',
              label: 'Add Vehicle',
              active: pathname.includes('/fleet/add'),
            },
            {
              href: '/fleet/maintenance',
              label: 'Maintenance',
              active: pathname.includes('/fleet/maintenance'),
            },
          ],
        },
        {
          href: '/drivers',
          label: 'Drivers',
          active: pathname.includes('/drivers'),
          icon: Identification,
          submenus: [
            {
              href: '/drivers',
              label: 'All Drivers',
              active:
                pathname.includes('/drivers') && !pathname.includes('/add'),
            },
            {
              href: '/drivers/add',
              label: 'Add Driver',
              active: pathname.includes('/drivers/add'),
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'User Management',
      isAdminGroup: true,
      menus: [
        {
          href: '/users',
          label: 'Users',
          active: pathname.includes('/users'),
          icon: Events,
          submenus: [],
        },
        {
          href: '/roles',
          label: 'Roles',
          active: pathname.includes('/roles'),
          icon: UserRole,
          submenus: [],
        },
      ],
    },
  ];
}
