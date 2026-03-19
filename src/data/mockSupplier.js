// Supplier mock data

export const supplierProfile = {
  id: 100,
  name: "Shop Điện Máy 247",
  owner: "Nguyễn Hữu Thắng",
  avatar: "https://ui-avatars.com/api/?name=DM&background=2563eb&color=fff",
  category: "Điện máy",
  rating: 4.8,
  totalProducts: 128,
  totalOrders: 342,
  revenue: "1.8 tỷ",
  coins: "5.2k",
  verified: true,
};

export const supplierProducts = [
  {
    id: 1,
    name: "Robot hút bụi Xiaomi Vacuum X10",
    price: "7.990.000đ",
    stock: 14,
    sold: 38,
    status: "active",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Smart TV LG 4K 55 inch",
    price: "9.900.000đ",
    stock: 6,
    sold: 72,
    status: "active",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Máy lọc không khí Dyson V12",
    price: "15.000.000đ",
    stock: 0,
    sold: 42,
    status: "out_of_stock",
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    name: "Tủ lạnh Samsung Inverter 400L",
    price: "12.300.000đ",
    stock: 3,
    sold: 124,
    status: "active",
    img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=300&q=80"
  },
];

export const supplierOrders = [
  { id: "DU-2401", product: "Robot hút bụi Xiaomi", buyer: "Nguyễn Minh", amount: "7.990.000đ", status: "delivered", date: "12/07" },
  { id: "DU-2400", product: "Smart TV LG 4K", buyer: "Hoàng Oanh", amount: "9.900.000đ", status: "shipping", date: "11/07" },
  { id: "DU-2398", product: "Tủ lạnh Samsung", buyer: "Đức Trí", amount: "12.300.000đ", status: "processing", date: "10/07" },
  { id: "DU-2395", product: "Nồi chiên Philips", buyer: "Mai Linh", amount: "1.500.000đ", status: "delivered", date: "08/07" },
];
