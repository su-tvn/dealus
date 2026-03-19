// Agent node shape: { id, name, role, rank, rating, reviews, img, totalDeal, revenue, children[] }

export const topAgents = [
  { id: 1, name: "Trần Anh", role: "Chuyên gia Nội thất", rating: 4.9, reviews: 124, rank: "Diamond", img: "https://i.pravatar.cc/150?img=33" },
  { id: 2, name: "Lê Lan", role: "Chuyên viên Tín dụng", rating: 4.8, reviews: 89, rank: "Gold", img: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Tuấn BĐS", role: "Môi giới BĐS", rating: 4.9, reviews: 210, rank: "Diamond", img: "https://i.pravatar.cc/150?img=11" },
];

// Current logged-in agent profile (mock)
export const agentProfile = {
  id: 10,
  name: "Tuấn BĐS",
  role: "Môi giới Bất động sản",
  rank: "Diamond",
  rating: 4.9,
  reviews: 210,
  totalDeal: 48,
  revenue: "2.4 tỷ",
  coins: "38.5k",
  avatar: "https://i.pravatar.cc/150?img=11",
  parentId: null, // Diamond agent = root
};

// Full agent tree (the logged-in Diamond agent and their downlines)
export const agentTree = {
  id: 10,
  name: "Tuấn BĐS",
  role: "Môi giới BĐS",
  rank: "Diamond",
  rating: 4.9,
  totalDeal: 48,
  revenue: "2.4 tỷ",
  img: "https://i.pravatar.cc/150?img=11",
  children: [
    {
      id: 11,
      name: "Minh Phát",
      role: "Môi giới BĐS",
      rank: "Gold",
      rating: 4.7,
      totalDeal: 18,
      revenue: "860 triệu",
      img: "https://i.pravatar.cc/150?img=15",
      children: [
        {
          id: 21,
          name: "Hoàng Oanh",
          role: "Tư vấn BĐS",
          rank: "Silver",
          rating: 4.5,
          totalDeal: 6,
          revenue: "240 triệu",
          img: "https://i.pravatar.cc/150?img=5",
          children: [],
        },
        {
          id: 22,
          name: "Đức Trí",
          role: "Tư vấn BĐS",
          rank: "Silver",
          rating: 4.4,
          totalDeal: 4,
          revenue: "160 triệu",
          img: "https://i.pravatar.cc/150?img=12",
          children: [],
        },
      ],
    },
    {
      id: 12,
      name: "Trần Anh",
      role: "Chuyên gia Nội thất",
      rank: "Gold",
      rating: 4.9,
      totalDeal: 22,
      revenue: "980 triệu",
      img: "https://i.pravatar.cc/150?img=33",
      children: [
        {
          id: 23,
          name: "Mai Linh",
          role: "Tư vấn Nội thất",
          rank: "Silver",
          rating: 4.6,
          totalDeal: 9,
          revenue: "360 triệu",
          img: "https://i.pravatar.cc/150?img=44",
          children: [],
        },
      ],
    },
    {
      id: 13,
      name: "Lê Lan",
      role: "Chuyên viên Tín dụng",
      rank: "Silver",
      rating: 4.8,
      totalDeal: 31,
      revenue: "420 triệu",
      img: "https://i.pravatar.cc/150?img=47",
      children: [],
    },
  ],
};
