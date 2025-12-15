type NavLink = {
  type: 'link';
  label: string;
  href: string;
};

type NavDropdown = {
  type: 'dropdown';
  label: string;
  items: {
    label: string;
    href: string;
    description: string;
  }[];
};

export type NavItem = NavLink | NavDropdown;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Meals',
    type: 'dropdown',
    items: [
      {label: 'All meals', description: 'See all meals', href: '/meals'},
      {
        label: 'Create meal',
        description: 'Create a new meal',
        href: '/meals/create'
      }
    ]
  },
  {
    label: 'About',
    type: 'link',
    href: '/about'
  },
  {
    label: 'Contact',
    type: 'link',
    href: '/contact'
  },
  {
    label: 'Blog',
    type: 'link',
    href: '/blog'
  }
];
