import {

  LucideIcon,
} from 'lucide-react';

import {
  CarbonIconType,
  Dashboard,
  CustomerService,
  Catalog,
  Watsonx,
  ReportData,
  InventoryManagement,
  Identification,
  VehicleServices,
  UserRole,
  Events,
} from '@carbon/icons-react';

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
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
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
      isAdminGroup: false,
      menus: [
        {
          href: '/reports',
          label: 'Financial Reports',
          active: pathname.includes('/posts'),
          icon: ReportData,
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
      groupLabel: 'Fleet Management',
      isAdminGroup: false,
      menus: [
        {
          href: 'fleet/cars',
          label: 'Vehicle Inventory',
          active: pathname.includes('/fleet/maintenance'),
          icon: InventoryManagement,
          submenus: [],
        },
        {
          href: 'fleet/drivers',
          label: 'Driver Management',
          active: pathname.includes('/fleet/maintenance'),
          icon: Identification,
          submenus: [],
        },
        {
          href: 'fleet/maintenance',
          label: 'Maintenance',
          active: pathname.includes('/fleet/maintenance'),
          icon: VehicleServices,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'User Management',
      isAdminGroup: true,
      menus: [
        {
          href: '/users',
          label: 'User Management',
          active: pathname.includes('/users'),
          icon: Events,
          submenus: [],
        },
        {
          href: '/roles',
          label: 'Role Management',
          active: pathname.includes('/roles'),
          icon: UserRole,
          submenus: [],
        },
      ],
    },
  ];
}
