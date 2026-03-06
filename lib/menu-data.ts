// lib/menu-data.ts

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  subcategory?: string;
  options?: MenuItemOption[];
  addOns?: AddOn[];
  image?: string;
  featured?: boolean;
  popular?: boolean;
}

export interface MenuItemOption {
  label: string;
  price: number;
}

export interface AddOn {
  name: string;
  price: number;
}

export interface FishMeal {
  fish: string;
  prices: { pieces: number; price: number }[];
}

// ===========================
// FAMILY MEALS
// ===========================
// All Family Meals include: 1 Large French Fries, 1 Large Coleslaw,
// 1 Large Gravy, 5 Dinner Rolls

export const familyMeals: MenuItem[] = [
  {
    id: "fm-001",
    name: "10 Piece Pollock",
    description:
      "1 Large French Fries, 1 Large Coleslaw, 1 Large Gravy, 5 Dinner Rolls",
    price: 64.99,
    category: "Family Meals",
  },
  {
    id: "fm-002",
    name: "10 Piece Haddock",
    description:
      "1 Large French Fries, 1 Large Coleslaw, 1 Large Gravy, 5 Dinner Rolls",
    price: 74.99,
    category: "Family Meals",
  },
  {
    id: "fm-003",
    name: "10 Piece Cod",
    description:
      "1 Large French Fries, 1 Large Coleslaw, 1 Large Gravy, 5 Dinner Rolls",
    price: 84.99,
    category: "Family Meals",
  },
  {
    id: "fm-004",
    name: "Family Captain's Catch",
    description:
      "2 Pollock, 2 Haddock, 2 Cod, 10 Jumbo Shrimp, 8 Jumbo Scallops, 1 Large French Fries, 1 Large Coleslaw, 1 Large Gravy, 5 Dinner Rolls",
    price: 79.99,
    category: "Family Meals",
    popular: true,
  },
];

// ===========================
// FISH MEALS
// ===========================
// All Fish Meals include: Fries, Coleslaw, and a Dinner Roll

export const fishMeals: FishMeal[] = [
  {
    fish: "Pollock",
    prices: [
      { pieces: 1, price: 16.5 },
      { pieces: 2, price: 18.5 },
      { pieces: 3, price: 20.5 },
    ],
  },
  {
    fish: "Haddock",
    prices: [
      { pieces: 1, price: 17.5 },
      { pieces: 2, price: 20.5 },
      { pieces: 3, price: 23.5 },
    ],
  },
  {
    fish: "Cod",
    prices: [
      { pieces: 1, price: 18.5 },
      { pieces: 2, price: 20.5 },
      { pieces: 3, price: 22.5 },
    ],
  },
  {
    fish: "Salmon",
    prices: [
      { pieces: 1, price: 20.5 },
      { pieces: 2, price: 25.5 },
      { pieces: 3, price: 30.5 },
    ],
  },
  {
    fish: "Halibut",
    prices: [
      { pieces: 1, price: 24.0 },
      { pieces: 2, price: 36.0 },
      { pieces: 3, price: 48.0 },
    ],
  },
];

// ===========================
// SPECIALTY CATCHES
// ===========================

export const specialtyCatches: MenuItem[] = [
  {
    id: "sc-001",
    name: "Admiral Catch",
    description:
      "1 Piece Pollock, 1 Piece Haddock, 1 Piece Cod, 4 Jumbo Scallops, 5 Lobster Bites, Fries, Coleslaw, Dinner Roll",
    price: 59.0,
    category: "Specialty Catches",
    featured: true,
  },
  {
    id: "sc-002",
    name: "Captain's Catch",
    description:
      "1 Piece Pollock, 1 Piece Haddock, 1 Piece Cod, 5 Jumbo Shrimp, 4 Jumbo Scallops, Fries, Coleslaw, Dinner Roll",
    price: 39.0,
    category: "Specialty Catches",
    popular: true,
  },
  {
    id: "sc-003",
    name: "Off the Hook Catch",
    description:
      "Calamari, 5 Jumbo Shrimp, 4 Jumbo Scallops, Dill Pickle Seasoned French Fries, Coleslaw, Dinner Roll",
    price: 37.0,
    category: "Specialty Catches",
  },
  {
    id: "sc-004",
    name: "8 Jumbo Battered Shrimp",
    description: "French Fries, Coleslaw, Dinner Roll",
    price: 25.0,
    category: "Specialty Catches",
  },
  {
    id: "sc-005",
    name: "Off the Hook Caesar Salad",
    description:
      "3 Cheese, Romaine Lettuce, Croutons, Bacon, Onions, 1 Piece Pollock",
    price: 19.5,
    category: "Specialty Catches",
  },
  {
    id: "sc-006",
    name: "Mate's Catch",
    description:
      "Breaded Clam Strips, Calamari, 5 Jumbo Scallops, Fries, Coleslaw, Dinner Roll",
    price: 42.0,
    category: "Specialty Catches",
  },
];

// ===========================
// KIDS MEALS — All $11.99
// ===========================
// All Kids Meals come with a Juice Box, French Fries, a Toy, and a Snack Cake

export const kidsMeals: MenuItem[] = [
  {
    id: "km-001",
    name: "1 Piece Pollock",
    description: "Juice Box, French Fries, a Toy, and a Snack Cake",
    price: 11.99,
    category: "Kids Meals",
  },
  {
    id: "km-002",
    name: "2 Piece Chicken Fingers",
    description: "Juice Box, French Fries, a Toy, and a Snack Cake",
    price: 11.99,
    category: "Kids Meals",
  },
  {
    id: "km-003",
    name: "1 Pogo",
    description: "Juice Box, French Fries, a Toy, and a Snack Cake",
    price: 11.99,
    category: "Kids Meals",
  },
];

// ===========================
// BURGERS
// ===========================

export const burgers: MenuItem[] = [
  {
    id: "bg-001",
    name: "Single Burger",
    price: 8.99,
    category: "Burgers",
  },
  {
    id: "bg-002",
    name: "Double Burger",
    price: 13.99,
    category: "Burgers",
  },
  {
    id: "bg-003",
    name: "Mushroom Burger",
    price: 12.99,
    category: "Burgers",
  },
  {
    id: "bg-004",
    name: "Chicken Burger",
    price: 12.99,
    category: "Burgers",
  },
  {
    id: "bg-005",
    name: "Fish Burger",
    price: 12.99,
    category: "Burgers",
  },
  {
    id: "bg-006",
    name: "Captain's Burger",
    price: 14.99,
    category: "Burgers",
    popular: true,
  },
  {
    id: "bg-007",
    name: "Mate's Burger",
    price: 12.99,
    category: "Burgers",
  },
];

export const burgerAddOns: AddOn[] = [
  { name: "Add Cheese", price: 2.5 },
  { name: "Add Bacon", price: 2.0 },
  { name: "Make It A Meal (Coleslaw & Fries)", price: 5.99 },
  { name: "Make It Gluten Free", price: 4.0 },
];

// ===========================
// MEALS
// ===========================

export const meals: MenuItem[] = [
  {
    id: "ml-001",
    name: "Newfie Mess",
    price: 17.5,
    category: "Meals",
    popular: true,
    featured: true,
  },
  {
    id: "ml-002",
    name: "Cheese Burger Poutine",
    price: 17.5,
    category: "Meals",
  },
  {
    id: "ml-003",
    name: "3 Piece Chicken Fingers",
    price: 18.5,
    category: "Meals",
  },
  {
    id: "ml-004",
    name: "Clubhouse & French Fries",
    price: 17.5,
    category: "Meals",
  },
  {
    id: "ml-005",
    name: "Hot Turkey or Hamburger",
    price: 19.5,
    category: "Meals",
  },
  {
    id: "ml-006",
    name: "Montreal Smoked Meat",
    price: 17.5,
    category: "Meals",
  },
  {
    id: "ml-007",
    name: "Perogies & Sausage",
    price: 17.5,
    category: "Meals",
  },
  {
    id: "ml-008",
    name: "Dry or Sticky Ribs",
    price: 9.99,
    category: "Meals",
  },
  {
    id: "ml-009",
    name: "Taco in a Bag",
    price: 34.99,
    category: "Meals",
  },
  {
    id: "ml-010",
    name: "Lobster Rolls",
    price: 18.99,
    category: "Meals",
  },
  {
    id: "ml-011",
    name: "Wraps",
    price: 18.99,
    category: "Meals",
    options: [
      { label: "Chicken", price: 18.99 },
      { label: "Shrimp", price: 18.99 },
      { label: "Fish", price: 18.99 },
    ],
  },
];

// ===========================
// APPYS (APPETIZERS)
// ===========================

export const appys: MenuItem[] = [
  {
    id: "ap-001",
    name: "Dry or Sticky BBQ Ribs",
    price: 12.99,
    category: "Appys",
  },
  {
    id: "ap-002",
    name: "Spring Rolls",
    price: 6.99,
    category: "Appys",
  },
  {
    id: "ap-003",
    name: "French Fries",
    price: 6.99,
    category: "Appys",
  },
  {
    id: "ap-004",
    name: "Onion Rings",
    price: 9.99,
    category: "Appys",
  },
  {
    id: "ap-005",
    name: "Blooming Onion",
    price: 10.99,
    category: "Appys",
  },
  {
    id: "ap-006",
    name: "Battered Pickles",
    price: 9.99,
    category: "Appys",
  },
  {
    id: "ap-007",
    name: "Battered Mushrooms",
    price: 9.99,
    category: "Appys",
  },
  {
    id: "ap-008",
    name: "Poutine",
    price: 8.99,
    category: "Appys",
    popular: true,
  },
  {
    id: "ap-009",
    name: "Caesar Salad",
    price: 8.99,
    category: "Appys",
    options: [
      { label: "Small", price: 8.99 },
      { label: "Large", price: 12.99 },
    ],
  },
  {
    id: "ap-010",
    name: "Lobster Bites",
    price: 24.0,
    category: "Appys",
  },
  {
    id: "ap-011",
    name: "Seasoned Fries",
    price: 7.99,
    category: "Appys",
  },
  {
    id: "ap-012",
    name: "Hot Dog",
    price: 6.99,
    category: "Appys",
  },
  {
    id: "ap-013",
    name: "Breaded Bar Clams",
    price: 19.5,
    category: "Appys",
  },
  {
    id: "ap-014",
    name: "Whistle Dog",
    price: 9.99,
    category: "Appys",
  },
  {
    id: "ap-015",
    name: "Calamari",
    price: 17.5,
    category: "Appys",
  },
  {
    id: "ap-016",
    name: "Pollock by the Piece",
    price: 7.0,
    category: "Appys",
  },
  {
    id: "ap-017",
    name: "Haddock by the Piece",
    price: 8.0,
    category: "Appys",
  },
  {
    id: "ap-018",
    name: "Cod by the Piece",
    price: 9.0,
    category: "Appys",
  },
  {
    id: "ap-019",
    name: "Halibut by the Piece",
    price: 18.0,
    category: "Appys",
  },
  {
    id: "ap-020",
    name: "Lobster Rolls",
    price: 29.99,
    category: "Appys",
  },
];

// ===========================
// DRINKS
// ===========================

export const drinks: MenuItem[] = [
  {
    id: "dr-001",
    name: "Can Pop",
    price: 2.5,
    category: "Drinks",
  },
  {
    id: "dr-002",
    name: "Bottle Water",
    price: 1.5,
    category: "Drinks",
  },
  {
    id: "dr-003",
    name: "Milkshakes",
    price: 4.99,
    category: "Drinks",
    options: [
      { label: "Chocolate", price: 4.99 },
      { label: "Vanilla", price: 4.99 },
      { label: "Strawberry", price: 4.99 },
    ],
  },
];

// ===========================
// DESSERTS
// ===========================

export const desserts: MenuItem[] = [
  {
    id: "ds-001",
    name: "Mini Donuts",
    price: 5.99,
    category: "Desserts",
  },
  {
    id: "ds-002",
    name: "Sundae",
    price: 6.99,
    category: "Desserts",
  },
  {
    id: "ds-003",
    name: "Churros",
    description: "Served with Chocolate & Caramel dipping sauces",
    price: 6.99,
    category: "Desserts",
  },
];

// ===========================
// SIDES
// ===========================

export const sides: MenuItem[] = [
  {
    id: "sd-001",
    name: "Gravy",
    price: 3.0,
    category: "Sides",
  },
  {
    id: "sd-002",
    name: "Dressing",
    price: 3.0,
    category: "Sides",
  },
  {
    id: "sd-003",
    name: "Coleslaw",
    price: 3.5,
    category: "Sides",
  },
];

// ===========================
// FULL MENU EXPORT
// ===========================

export const fullMenu = {
  familyMeals,
  fishMeals,
  specialtyCatches,
  kidsMeals,
  burgers,
  burgerAddOns,
  meals,
  appys,
  drinks,
  desserts,
  sides,
};

// Menu categories for navigation
export const menuCategories = [
  { id: "family-meals", label: "Family Meals", icon: "Family" },
  { id: "fish-meals", label: "Fish Meals", icon: "Fish" },
  { id: "specialty-catches", label: "Specialty Catches", icon: "Star" },
  { id: "burgers", label: "Burgers", icon: "Sandwich" },
  { id: "meals", label: "Meals", icon: "UtensilsCrossed" },
  { id: "appys", label: "Appys", icon: "Salad" },
  { id: "kids-meals", label: "Kids Meals", icon: "Baby" },
  { id: "drinks", label: "Drinks", icon: "Cup" },
  { id: "desserts", label: "Desserts", icon: "IceCream" },
  { id: "sides", label: "Sides", icon: "Leaf" },
];

// Business info
export const businessInfo = {
  name: "Off the Hook",
  tagline: "From Sea to Land",
  phone: "(587) 894-4244",
  address: "7003 Ogden Road SE",
  city: "Calgary",
  province: "AB",
  postalCode: "T2C 1B5",
  fullAddress: "7003 Ogden Road SE, Calgary, AB T2C 1B5",
  coordinates: { lat: 50.989923, lng: -114.001447 },
  instagram: "@offthehookyyc",
  instagramUrl: "https://www.instagram.com/offthehookyyc/",
  hours: {
    sunday: "11:00 AM – 9:00 PM",
    monday: "11:00 AM – 9:00 PM",
    tuesday: "11:00 AM – 9:00 PM",
    wednesday: "11:00 AM – 9:00 PM",
    thursday: "11:00 AM – 9:00 PM",
    friday: "11:00 AM – 10:00 PM",
    saturday: "11:00 AM – 10:00 PM",
  },
  hoursSummary: "Sun–Thu: 11am–9pm | Fri–Sat: 11am–10pm",
};
