export const commissionSummary = {
  thisMonth: '6.84M',
  lastMonth: '5.12M',
  pending: '2.15M',
  paid: '38.7M',
  growthPct: 34,  // vs last month
};

export const commissions = [
  { id: 'COM-018', orderId: 'DU-2401', product: 'Robot hút bụi Xiaomi X10', supplierName: 'Shop Điện Máy 247', orderValue: 7990000, rate: 12, amount: 958800, source: 'direct', status: 'confirmed', date: '18/03/2026' },
  { id: 'COM-017', orderId: 'DU-2399', product: 'Smart TV LG 4K 55"', supplierName: 'Shop Điện Máy 247', orderValue: 9900000, rate: 10, amount: 990000, source: 'direct', status: 'confirmed', date: '17/03/2026' },
  { id: 'COM-016', orderId: 'DU-2395', product: 'Sofa góc HomeStyle L200', supplierName: 'Nội Thất HomeStyle', orderValue: 12500000, rate: 11, amount: 1375000, source: 'direct', status: 'pending', date: '15/03/2026' },
  { id: 'COM-015', orderId: 'DU-2390', product: 'Tủ lạnh Samsung 380L', supplierName: 'Shop Điện Máy 247', orderValue: 12300000, rate: 9, amount: 1107000, source: 'direct', status: 'paid', date: '10/03/2026' },
  { id: 'COM-P01', orderId: 'DU-2388', product: 'Override — Minh Phát (L1)', supplierName: '—', orderValue: 4500000, rate: 3, amount: 135000, source: 'override_l1', status: 'confirmed', date: '09/03/2026' },
  { id: 'COM-014', orderId: 'DU-2381', product: 'Máy lọc không khí Philips', supplierName: 'Shop Điện Máy 247', orderValue: 3800000, rate: 12, amount: 456000, source: 'direct', status: 'paid', date: '05/03/2026' },
  { id: 'COM-P02', orderId: 'DU-2376', product: 'Override — Hoàng Oanh (L2)', supplierName: '—', orderValue: 2200000, rate: 1, amount: 22000, source: 'override_l2', status: 'paid', date: '01/03/2026' },
];

export const withdrawHistory = [
  { id: 'WD-011', amount: '15.000.000đ', bank: 'Vietcombank ****1234', date: '01/03/2026', status: 'completed' },
  { id: 'WD-010', amount: '12.500.000đ', bank: 'Vietcombank ****1234', date: '01/02/2026', status: 'completed' },
];

export const commissionChart = {
  day: [
    { label: 'T2', value: 850 },
    { label: 'T3', value: 1200 },
    { label: 'T4', value: 450 },
    { label: 'T5', value: 1650 },
    { label: 'T6', value: 990 },
    { label: 'T7', value: 1930 },
    { label: 'CN', value: 760 },
  ],
  month: [
    { label: 'T10', value: 3800 },
    { label: 'T11', value: 4500 },
    { label: 'T12', value: 5120 },
    { label: 'T1', value: 4200 },
    { label: 'T2', value: 5120 },
    { label: 'T3', value: 6840 },
  ],
};
