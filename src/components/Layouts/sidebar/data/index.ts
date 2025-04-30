import { ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_SUPERVISOR } from "@/constants/AppConstant";
import * as Icons from "../icons";
interface NavItem {
  title: string;
  url?: string;
  roles?: String[];
}

// Menu section with potential subitems
interface NavSection {
  title: string;
  url?: string;
  icon?: any; // Replace `any` with a proper icon type if available
  roles?: String[];
  items: NavItem[];
}

// Top-level labeled menu group
interface NavGroup {
  label: string;
  items: NavSection[];
}

// Full nav data
export type NavData = NavGroup[];
export const NAV_DATA: NavData = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
      {
        title: "User management",
        roles:[ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_SUPERVISOR],
        icon: Icons.User,
        items: [
          {
            title: "User Profile",
            url: "/user",
            roles: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
          },  
          
          {
            title: "Clients",
            url: "/user/client",
            roles: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
          },
          {
            title: "Sites",
            url: "/user/site",
            roles: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
          },  
          {
            title: "Maintenance",
            url: "/user/maintenance",
            roles: [ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_SUPERVISOR],
          },  
        ],
        
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
