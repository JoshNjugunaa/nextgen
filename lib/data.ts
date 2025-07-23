// Mock data for the food court application

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  dishes: Dish[];
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  restaurantId: string;
  isPopular?: boolean;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'reserved';
  ownerId?: string;
}

export interface Review {
  id: string;
  customerName: string;
  outlet: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  restaurantId: string;
  totalRevenue: number;
}
export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Tamu Tamu Grills',
    cuisine: 'BBQ',
    description: 'Authentic grilled meats and vegetables with traditional African spices',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '1', name: 'Grilled Chicken', price: 1200, description: 'Marinated chicken with traditional spices', restaurantId: '1', isPopular: true },
      { id: '2', name: 'Beef Kebabs', price: 1500, description: 'Tender beef skewers', restaurantId: '1' },
      { id: '3', name: 'Grilled Fish', price: 1800, description: 'Fresh fish with herbs', restaurantId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Swahili Plates',
    cuisine: 'Coastal',
    description: 'Traditional Swahili dishes with coconut and spices',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '4', name: 'Chicken Biryani', price: 1000, description: 'Fragrant rice with spiced chicken', restaurantId: '2', isPopular: true },
      { id: '5', name: 'Coconut Rice', price: 600, description: 'Rice cooked in coconut milk', restaurantId: '2' },
      { id: '6', name: 'Fish Curry', price: 1400, description: 'Coconut fish curry', restaurantId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Burger Bros',
    cuisine: 'Fast Food',
    description: 'Juicy burgers and crispy fries for quick meals',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '7', name: 'Classic Burger', price: 800, description: 'Beef patty with lettuce and tomato', restaurantId: '3', isPopular: true },
      { id: '8', name: 'Chicken Burger', price: 750, description: 'Grilled chicken breast burger', restaurantId: '3' },
      { id: '9', name: 'Fries', price: 400, description: 'Crispy golden fries', restaurantId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Sushi Spot',
    cuisine: 'Japanese',
    description: 'Fresh sushi and Japanese favorites',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '10', name: 'California Roll', price: 1200, description: 'Avocado and crab roll', restaurantId: '4', isPopular: true },
      { id: '11', name: 'Salmon Nigiri', price: 1500, description: 'Fresh salmon over rice', restaurantId: '4' },
      { id: '12', name: 'Miso Soup', price: 500, description: 'Traditional soybean soup', restaurantId: '4' },
    ]
  },
  {
    id: '5',
    name: 'Mama Njeri Kitchen',
    cuisine: 'Coastal',
    description: 'Traditional coastal dishes with a homely touch',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '19', name: 'Pilau Rice', price: 800, description: 'Spiced rice with meat', restaurantId: '5', isPopular: true },
      { id: '20', name: 'Samosas', price: 150, description: 'Crispy pastries with filling', restaurantId: '5' },
      { id: '21', name: 'Chapati', price: 50, description: 'Soft flatbread', restaurantId: '5' },
    ]
  },
  {
    id: '6',
    name: 'Delhi Delights',
    cuisine: 'Indian',
    description: 'North Indian specialties and street food',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '22', name: 'Chicken Tikka', price: 1400, description: 'Grilled marinated chicken', restaurantId: '6', isPopular: true },
      { id: '23', name: 'Paneer Curry', price: 1100, description: 'Cottage cheese in spicy gravy', restaurantId: '6' },
      { id: '24', name: 'Garlic Naan', price: 350, description: 'Garlic flavored bread', restaurantId: '6' },
    ]
  },
  {
    id: '7',
    name: 'Spice Garden',
    cuisine: 'Indian',
    description: 'Authentic Indian curries and breads',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '13', name: 'Butter Chicken', price: 1300, description: 'Creamy tomato chicken curry', restaurantId: '7', isPopular: true },
      { id: '14', name: 'Naan Bread', price: 300, description: 'Fresh baked Indian bread', restaurantId: '7' },
      { id: '15', name: 'Dal Curry', price: 700, description: 'Lentil curry with spices', restaurantId: '7' },
    ]
  },
  {
    id: '8',
    name: 'Green Bowl',
    cuisine: 'Vegan',
    description: 'Healthy plant-based meals and smoothies',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '16', name: 'Buddha Bowl', price: 900, description: 'Mixed vegetables and quinoa', restaurantId: '8', isPopular: true },
      { id: '17', name: 'Green Smoothie', price: 500, description: 'Spinach, banana, and mango', restaurantId: '8' },
      { id: '18', name: 'Veggie Wrap', price: 700, description: 'Fresh vegetables in a tortilla', restaurantId: '8' },
    ]
  },
];

export const cuisines = [
  { name: 'Coastal', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Indian', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Fast Food', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Vegan', image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'BBQ', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Japanese', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const tables: Table[] = [
  { id: '1', number: 1, capacity: 4, status: 'available', ownerId: '1' },
  { id: '2', number: 2, capacity: 6, status: 'reserved', ownerId: '1' },
  { id: '3', number: 3, capacity: 4, status: 'available', ownerId: '2' },
  { id: '4', number: 4, capacity: 8, status: 'available', ownerId: '2' },
  { id: '5', number: 5, capacity: 4, status: 'reserved', ownerId: '3' },
  { id: '6', number: 6, capacity: 6, status: 'available', ownerId: '3' },
  { id: '7', number: 7, capacity: 4, status: 'available', ownerId: '1' },
  { id: '8', number: 8, capacity: 6, status: 'reserved', ownerId: '2' },
  { id: '9', number: 9, capacity: 4, status: 'available', ownerId: '1' },
  { id: '10', number: 10, capacity: 6, status: 'available', ownerId: '2' },
  { id: '11', number: 11, capacity: 8, status: 'reserved', ownerId: '3' },
  { id: '12', number: 12, capacity: 4, status: 'available', ownerId: '1' },
  { id: '13', number: 13, capacity: 6, status: 'available', ownerId: '2' },
  { id: '14', number: 14, capacity: 4, status: 'reserved', ownerId: '3' },
  { id: '15', number: 15, capacity: 8, status: 'available', ownerId: '1' },
  { id: '16', number: 16, capacity: 6, status: 'available', ownerId: '2' },
  { id: '17', number: 17, capacity: 4, status: 'available', ownerId: '3' },
  { id: '18', number: 18, capacity: 6, status: 'reserved', ownerId: '1' },
  { id: '19', number: 19, capacity: 4, status: 'available', ownerId: '2' },
  { id: '20', number: 20, capacity: 8, status: 'available', ownerId: '3' },
];

export const reviews: Review[] = [
  {
    id: '1',
    customerName: 'John Mwangi',
    outlet: 'Tamu Tamu Grills',
    rating: 5,
    comment: 'Amazing grilled chicken! The spices were perfect and the meat was so tender.',
    date: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'Sarah Ahmed',
    outlet: 'Swahili Plates',
    rating: 4,
    comment: 'Love the coconut rice and fish curry. Authentic coastal flavors.',
    date: '2024-01-14'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    outlet: 'Burger Bros',
    rating: 4,
    comment: 'Quick service and tasty burgers. Great for a fast lunch.',
    date: '2024-01-13'
  },
  {
    id: '4',
    customerName: 'Priya Patel',
    outlet: 'Sushi Spot',
    rating: 5,
    comment: 'Fresh sushi and excellent presentation. Will definitely come back!',
    date: '2024-01-12'
  }
];

export const popularDishes = [
  { id: '1', name: 'Grilled Chicken', outlet: 'Tamu Tamu Grills', price: 1200 },
  { id: '4', name: 'Chicken Biryani', outlet: 'Swahili Plates', price: 1000 },
  { id: '7', name: 'Classic Burger', outlet: 'Burger Bros', price: 800 },
  { id: '10', name: 'California Roll', outlet: 'Sushi Spot', price: 1200 },
  { id: '13', name: 'Butter Chicken', outlet: 'Spice Garden', price: 1300 },
  { id: '16', name: 'Buddha Bowl', outlet: 'Green Bowl', price: 900 },
];
export const owners: Owner[] = [
  { id: '1', name: 'John Kamau', email: 'john@tamugrills.com', restaurantId: '1', totalRevenue: 125000 },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@swahiliplates.com', restaurantId: '2', totalRevenue: 98000 },
  { id: '3', name: 'Mike Wilson', email: 'mike@burgerbros.com', restaurantId: '3', totalRevenue: 87500 },
];