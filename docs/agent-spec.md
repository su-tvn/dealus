# DEALUS — Agent Role Specification

> Version 1.1 · March 2026

---

## 1. Tổng quan vai trò Agent

Agent trong hệ thống Dealus đóng vai trò **trung gian bán hàng độc lập**, kết nối Supplier (nhà cung cấp) và Buyer (khách hàng cuối). Agent không trực tiếp quản lý kho hàng, thay vào đó họ kiếm hoa hồng thông qua việc tư vấn và chốt deal thành công.

**Mô hình kinh doanh:**
```
Supplier → [Hợp đồng + Hoa hồng] → Agent → [Tư vấn + Chốt đơn] → Buyer
                                        ↕
                                   Sub-Agent (cây đội nhóm)
```

---

## 2. Nhóm chức năng chính

### 2.1 Supplier Hub — Kết nối & Ký hợp đồng

| Tính năng | Mô tả |
|-----------|-------|
| **Tìm kiếm Supplier** | Duyệt danh sách supplier công khai theo ngành hàng, rating, hoa hồng |
| **Trang giới thiệu Supplier** | Thông tin shop, sản phẩm nổi bật, chính sách hoa hồng, đánh giá từ agent khác |
| **Gửi yêu cầu hợp tác** | Agent gửi request → Supplier duyệt/từ chối → Tự động tạo hợp đồng nháp |
| **Ký hợp đồng điện tử** | Xác nhận điều khoản bằng OTP/eSign. Lưu PDF hợp đồng trong hệ thống |
| **Quản lý hợp đồng** | DS hợp đồng đang hiệu lực, sắp hết hạn, đã chấm dứt. Nhắc gia hạn |
| **Mức hoa hồng** | Hiển thị rõ % hoa hồng theo từng sản phẩm/danh mục. Có thể thương lượng |

**Trạng thái hợp đồng:** `Chờ duyệt → Hiệu lực → Tạm dừng → Hết hạn → Chấm dứt`

---

### 2.2 Product Catalog — Lấy hàng & Quản lý danh mục cá nhân

| Tính năng | Mô tả |
|-----------|-------|
| **Kho hàng từ Supplier** | Xem toàn bộ sản phẩm của các supplier đã ký hợp đồng |
| **Đăng ký bán sản phẩm** | Agent chọn sản phẩm vào "danh mục bán của tôi" (My Catalog) |
| **Chia sẻ sản phẩm** | Tạo link giới thiệu có tracking (deep link chứa agent_id) |
| **Xem giá sỉ / giá bán** | Giá gốc supplier, giá đề xuất bán lẻ, biên lợi nhuận ước tính |
| **Cập nhật tồn kho real-time** | Nhận thông báo khi sản phẩm hết hàng hoặc giá thay đổi |
| **Tạo bộ sưu tập** | Gom nhóm sản phẩm theo chủ đề để tư vấn nhanh (vd: "Bộ nhà thông minh") |

---

### 2.3 Customer Management — Quản lý toàn bộ vòng đời khách hàng

Hệ thống quản lý khách hàng bao gồm **toàn bộ hành trình**: từ lúc chưa biết đến Dealus (Lead) → đang được tư vấn → đã mua → khách trung thành. Agent có một nơi duy nhất để theo dõi tất cả.

#### Phân loại vòng đời (Customer Lifecycle)

```
Lead (tiềm năng)  →  Prospect (đang tư vấn)  →  Customer (đã mua)  →  Loyal / VIP
      ↓                       ↓                          ↓
  Cold / Inactive         Stalled                   Churned (rời bỏ)
```

#### 2.3.1 Lead Management — Quản lý khách tiềm năng (trước mua)

| Tính năng | Mô tả |
|-----------|-------|
| **Thêm Lead thủ công** | Agent nhập tên, SĐT, nguồn (Zalo/Facebook/Offline/Referral), nhu cầu sơ bộ |
| **Lead từ link tracking** | Khi khách click link sản phẩm của agent → tự động tạo Lead ẩn danh, gắn agent_id |
| **Phân loại độ nóng** | Gán nhãn nhiệt độ: `🔥 Nóng · 🌡️ Ấm · ❄️ Lạnh · 💤 Ngủ đông` dựa trên tương tác |
| **Ghi chú & Tag** | Ghi nhu cầu, ngân sách, sản phẩm quan tâm, kênh liên lạc ưa thích |
| **Pipeline bán hàng** | Kanban/list theo bước: `Mới → Đang liên hệ → Đã tư vấn → Báo giá → Chờ quyết định → Chốt / Mất` |
| **Nhắc follow-up** | Đặt reminder ngày giờ cụ thể, agent nhận push notify khi đến hạn |
| **Lý do mất deal** | Khi chuyển sang "Mất": chọn lý do (giá cao / chọn đối thủ / chưa có nhu cầu / không liên lạc) để thống kê |

#### 2.3.2 Tư vấn & Chốt đơn

| Tính năng | Mô tả |
|-----------|-------|
| **Chat tư vấn** | Nhắn tin trực tiếp với khách, gửi sản phẩm từ catalog vào chat |
| **Báo giá nhanh** | Tạo báo giá tổng hợp nhiều sản phẩm, gửi qua link hoặc PDF |
| **Đặt hàng thay khách** | Agent tạo đơn hộ khách hàng, hệ thống ghi nhận commission agent |
| **Script tư vấn** | Thư viện mẫu câu hỏi/trả lời, kịch bản theo từng loại sản phẩm |

#### 2.3.3 Hồ sơ khách hàng (Customer Profile)

Sau khi chốt, Lead chuyển thành Customer với đầy đủ thông tin tích lũy:

| Thông tin | Nội dung |
|-----------|---------|
| **Thông tin cơ bản** | Tên, SĐT, địa chỉ, kênh liên hệ ưa thích |
| **Lịch sử giao dịch** | Tất cả đơn hàng đã mua, giá trị, sản phẩm, ngày mua |
| **Timeline tương tác** | Lịch sử chat, báo giá, follow-up, ticket — theo thứ tự thời gian |
| **Ghi chú & sở thích** | Note về thị hiếu, ngân sách thường chi, thương hiệu ưa thích |
| **Trạng thái & Nhãn** | `Mới · Tiềm năng · Thân thiết · VIP · Không hoạt động` — tự động cập nhật |
| **Chỉ số giá trị** | LTV (tổng chi tiêu), số đơn, đơn giá trung bình, lần mua gần nhất |

---

### 2.7 Customer Care — Chăm sóc khách hàng sau bán

Đây là giai đoạn **sau khi đơn hàng hoàn tất** — agent chịu trách nhiệm duy trì mối quan hệ, xử lý phản hồi và tái kích hoạt khách hàng cũ. Đây là yếu tố tạo doanh thu bền vững và tăng uy tín agent.

#### 2.7.1 Quản lý sau đơn hàng

| Tính năng | Mô tả |
|-----------|-------|
| **Xác nhận giao hàng** | Agent nhận notify khi đơn được giao, có thể chủ động nhắn hỏi thăm khách |
| **Hướng dẫn sử dụng** | Gửi tài liệu / video hướng dẫn sản phẩm từ supplier vào chat |
| **Thu thập đánh giá** | Tự động nhắc khách để lại đánh giá 7 ngày sau giao hàng. Theo dõi rating trung bình |
| **Xử lý khiếu nại** | Khách báo lỗi/trả hàng → Agent tạo ticket gửi Supplier → Theo dõi trạng thái xử lý |
| **Lịch sử hỗ trợ** | Toàn bộ ticket khiếu nại / yêu cầu bảo hành, trạng thái và kết quả |

#### 2.7.2 Tái tương tác & Giữ chân khách hàng

| Tính năng | Mô tả |
|-----------|-------|
| **Phân loại khách hàng** | Tự động gán nhãn: `Mới · Tiềm năng · Thân thiết · VIP · Không hoạt động` |
| **Nhắc hẹn định kỳ** | Đặt lịch liên lạc lại sau N ngày (vd: 30 ngày sau mua, nhắc check bảo hành) |
| **Broadcast tin nhắn** | Gửi tin nhắn hàng loạt đến nhóm khách (cùng tag) về deal mới, voucher |
| **Upsell tự động** | Khi khách hàng mua SP A, hệ thống gợi ý SP B phù hợp từ catalog để agent gửi |
| **Voucher chăm sóc** | Agent phát voucher từ supplier cho khách VIP để khuyến khích mua lại |

#### 2.7.3 Đo lường chất lượng dịch vụ

| Chỉ số | Mô tả |
|--------|-------|
| **Tỷ lệ khách hàng quay lại (Retention)** | % khách đã mua 1 lần và mua lại trong 90 ngày |
| **NPS / Satisfaction score** | Điểm hài lòng trung bình từ các đánh giá sau đơn hàng |
| **Tỷ lệ khiếu nại** | Số ticket / tổng đơn hàng — chỉ số kiểm soát chất lượng supplier |
| **Thời gian phản hồi** | Trung bình giờ từ lúc khách nhắn đến khi agent trả lời đầu tiên |
| **Số khách active / tháng** | Khách có tương tác (nhắn tin hoặc mua) trong 30 ngày qua |

**Trạng thái ticket hỗ trợ:** `Mới → Đang xử lý → Chờ supplier → Đã giải quyết → Đóng`

**Luồng xử lý khiếu nại:**
```
Khách báo lỗi qua chat
→ Agent tạo ticket (mô tả vấn đề, ảnh/video đính kèm)
→ Ticket gửi tới Supplier liên quan
→ Supplier cập nhật trạng thái (đổi hàng / hoàn tiền / từ chối)
→ Agent nhận notify → thông báo lại cho khách
→ Khách xác nhận → Đóng ticket
→ Nếu giải quyết tốt: +điểm đánh giá agent
→ Nếu từ chối không hợp lý: agent có thể escalate lên Dealus admin
```

---

### 2.4 Commission Center — Theo dõi hoa hồng

| Tính năng | Mô tả |
|-----------|-------|
| **Dashboard hoa hồng** | Tổng hoa hồng tháng này, tháng trước, đang chờ xử lý, đã nhận |
| **Chi tiết theo đơn hàng** | Mỗi đơn: sản phẩm, giá trị, % hoa hồng, số tiền, trạng thái thanh toán |
| **Hoa hồng từ Sub-Agent** | Phần trăm override từ doanh số của đội nhóm (MLM model) |
| **Lịch thanh toán** | Chu kỳ thanh toán (tuần/tháng), ngày cut-off, ngày giải ngân |
| **Yêu cầu rút tiền** | Rút về tài khoản ngân hàng / ví điện tử. Xem lịch sử rút |
| **Biểu đồ thu nhập** | Xu hướng hoa hồng theo thời gian (ngày/tháng) |

**Cấu trúc hoa hồng gợi ý:**
```
Đơn hàng trực tiếp:     Agent nhận 8-15% (tùy sản phẩm, tùy hợp đồng)
Từ Sub-Agent cấp 1:     Override 3%
Từ Sub-Agent cấp 2:     Override 1%
Bonus KPI tháng:        +2% nếu đạt doanh số mục tiêu
```

---

### 2.5 Team Network — Quản lý đội nhóm (cây MLM)

| Tính năng | Mô tả |
|-----------|-------|
| **Cây đội nhóm** | Visualize cây sub-agent (đã có AgentTreeView), expand/collapse node |
| **Mời Sub-Agent** | Tạo link giới thiệu cá nhân, quản lý danh sách đã mời |
| **Hiệu suất đội** | Doanh số của từng thành viên, rank, hoa hồng override nhận được |
| **Leaderboard** | Xếp hạng nội bộ đội nhóm theo doanh số tháng |
| **Thông báo hoạt động** | Nhận notify khi sub-agent ký hợp đồng mới, chốt đơn lớn |

---

### 2.6 Sales Tools — Công cụ bán hàng

| Tính năng | Mô tả |
|-----------|-------|
| **Trang cá nhân Agent** | Microsite public: ảnh, bio, danh mục sản phẩm đang bán |
| **QR Code cá nhân** | QR dẫn về trang cá nhân agent, dùng cho offline marketing |
| **Chia sẻ lên mạng xã hội** | Share sản phẩm/deal ra Zalo, Facebook với hình ảnh + caption tự động |
| **Feed & Bài đăng** | Đăng bài lên Feed cộng đồng Dealus để tăng reach |
| **Voucher / Ưu đãi** | Nhận voucher từ supplier để phát cho khách hàng của mình |
| **Script tư vấn** | Thư viện các mẫu câu hỏi/trả lời phổ biến, kịch bản bán hàng |

---

## 3. Màn hình cần xây dựng (UI Screens)

```
AgentApp
├── AgentDashboard         ← Tổng quan: KPI, hoa hồng, top sản phẩm, hoạt động gần đây  [✅ done]
├── AgentSupplierHub       ← Tìm Supplier, danh sách đang hợp tác, hợp đồng              [✅ done]
│   ├── SupplierBrowse     ← Khám phá supplier (filter ngành, commission, rating)
│   ├── SupplierDetail     ← Trang chi tiết 1 supplier + nút "Gửi yêu cầu"
│   └── ContractDetail     ← Chi tiết hợp đồng + điều khoản + lịch sử
├── AgentCatalog           ← Sản phẩm đang bán, thêm từ supplier, tạo bộ sưu tập        [✅ done]
├── AgentCommission        ← Hoa hồng: tổng quan, chi tiết, rút tiền                    [✅ done]
├── AgentCustomers         ← CRM toàn vòng đời: Lead → Prospect → Customer → Loyal
│   ├── LeadList           ← DS lead tiềm năng, filter theo nhiệt độ/nguồn, tìm kiếm
│   ├── LeadPipeline       ← Kanban pipeline: Mới → Đang liên hệ → Báo giá → Chốt/Mất
│   ├── CustomerList       ← DS khách hàng đã mua, filter theo nhãn/trạng thái
│   ├── CustomerDetail     ← Profile + lịch sử đơn + timeline tương tác + follow-up
│   └── QuoteBuilder       ← Tạo báo giá từ catalog, gửi link
├── AgentCare              ← Chăm sóc sau bán: ticket khiếu nại, broadcast, upsell
│   ├── TicketList         ← DS ticket hỗ trợ (lọc theo trạng thái)
│   ├── TicketDetail       ← Chi tiết ticket, timeline xử lý
│   └── BroadcastCompose   ← Soạn & gửi tin nhắn hàng loạt theo nhóm khách
├── AgentTeam              ← Cây đội nhóm (AgentTreeView), mời, leaderboard
└── AgentProfile           ← Trang cá nhân, QR code, cài đặt
```

---

## 4. Luồng hoạt động cốt lõi

### Luồng 0: Quản lý Lead từ khi chưa biết đến chốt đơn
```
Agent gặp khách trên Facebook quan tâm đến TV 4K
→ Agent vào AgentCustomers → LeadList → thêm Lead mới
→ Nhập: tên, SĐT, nguồn "Facebook", nhiệt độ "Nóng", tag "TV 4K"
→ Chuyển sang pipeline bước "Đang liên hệ"
→ Agent chat tư vấn → gửi sản phẩm từ catalog
→ Khách muốn so sánh 3 model → Agent tạo báo giá → gửi link
→ Khách cần suy nghĩ thêm 2 ngày → Agent đặt reminder follow-up
→ [2 ngày sau] Agent nhận push notify → liên lạc lại
→ Khách chốt → Agent nhấn "Đặt hàng" → pipeline chuyển sang "Đã chốt"
→ Lead tự động convert thành Customer trong danh sách khách hàng
```

### Luồng 1: Agent ký hợp đồng với Supplier mới
```
Agent vào SupplierBrowse
→ Lọc theo ngành "Điện máy", hoa hồng > 8%
→ Chọn "Shop Điện Máy 247" → xem trang SupplierDetail
→ Nhấn "Gửi yêu cầu hợp tác" → điền lý do, kinh nghiệm
→ Supplier nhận thông báo → Duyệt → Hệ thống tạo hợp đồng nháp
→ Agent xem hợp đồng → ký bằng OTP
→ Trạng thái: "Đang hiệu lực" → Agent thấy sản phẩm trong AgentCatalog
```

### Luồng 2: Agent tư vấn và chốt đơn cho khách
```
Khách nhắn tin hỏi về TV 4K
→ Agent vào AgentCustomers → mở chat với khách
→ Gửi 3 model TV từ AgentCatalog vào chat (kèm giá, hình)
→ Tạo báo giá tổng hợp → gửi link cho khách
→ Khách xác nhận → Agent nhấn "Đặt hàng"
→ Đơn chuyển sang Supplier xử lý
→ Hoa hồng ghi nhận vào CommissionCenter (trạng thái "Chờ giao hàng")
→ Khi giao xong → Commission "Đã xác nhận" → đủ điều kiện rút
```

### Luồng 3: Chăm sóc sau bán & xử lý khiếu nại
```
Hệ thống tự động notify Agent: "Đơn DU-2401 đã giao 7 ngày trước"
→ Agent vào AgentCare → thấy nhắc nhở hỏi thăm Nguyễn Minh
→ Agent mở chat → hỏi thăm, gửi hướng dẫn sử dụng Robot
→ Khách phản hồi: sản phẩm có lỗi
→ Agent tạo Ticket: loại "Lỗi sản phẩm", đính kèm ảnh
→ Ticket gửi Shop Điện Máy 247 → Supplier xem xét → Chấp nhận đổi hàng
→ Agent cập nhật khách → Ticket đóng
→ Rating agent +1, khách được tag "Thân thiết"
```

### Luồng 4: Tái kích hoạt khách không hoạt động
```
Hệ thống gắn tag "Không hoạt động" cho khách > 60 ngày chưa mua
→ Agent vào AgentCare → BroadcastCompose
→ Chọn nhóm: tag = "Không hoạt động"
→ Soạn tin: "Chào anh/chị! Em có deal mới..." + đính kèm 1 sản phẩm từ catalog
→ Gửi → hệ thống log lần liên hệ, nhắc follow-up sau 3 ngày
```

### Luồng 5: Agent phát triển đội nhóm
```
Agent vào AgentTeam → nhấn "Mời Sub-Agent"
→ Lấy link mời cá nhân (có agent_id tracking)
→ Chia sẻ Zalo/Facebook
→ Người mới đăng ký qua link → tự động vào cây với parent = Agent
→ Agent nhận override 3% từ mọi đơn của Sub-Agent
```

---

## 5. Dữ liệu cần bổ sung (Mock Data)

```js
// mockAgentSuppliers.js — đã tạo ✅
// mockCommissions.js — đã tạo ✅

// mockLeads.js (pending)
{
  id: "L001",
  name: "Trần Thị Mai",
  phone: "0912345678",
  source: "facebook",         // facebook | zalo | offline | referral | tracking_link
  heat: "hot",               // hot | warm | cold | dormant
  interest: "Robot hút bụi, TV 4K",
  budget: 10000000,
  stage: "quote_sent",       // new | contacted | consulted | quote_sent | deciding | won | lost
  lostReason: null,          // price | competitor | no_need | unreachable | other
  notes: "Hỏi nhiều về bảo hành, cần tư vấn kỹ",
  followUpAt: "2026-03-22",
  createdAt: "2026-03-10",
  lastContact: "2026-03-18",
}

// mockCustomers.js (pending)
{
  id: "C001",
  name: "Nguyễn Minh Tuấn",
  phone: "0901234567",
  tags: ["VIP", "Điện máy"],
  status: "loyal",            // new | warm | loyal | vip | inactive
  lastContact: "2026-03-15",
  totalOrders: 3,
  totalSpent: 28500000,
  ltv: 28500000,
  avgOrderValue: 9500000,
  notes: "Thích Samsung, ngại hàng Trung Quốc",
  followUpAt: "2026-04-01",
  convertedFromLead: "L001",  // backlink to original lead
}

// mockTickets.js (pending)
{
  id: "TK-012",
  customerId: "C001",
  customerName: "Nguyễn Minh Tuấn",
  orderId: "DU-2401",
  product: "Robot hút bụi Xiaomi X10",
  supplierId: 100,
  type: "defective",          // defective | wrong_item | missing | return | other
  description: "Robot không sạc được sau 3 ngày sử dụng",
  status: "supplier_review",  // new | processing | supplier_review | resolved | closed
  createdAt: "2026-03-18",
  resolvedAt: null,
  resolution: null,           // exchange | refund | repair | rejected
}
```

---

## 6. Ưu tiên phát triển (Roadmap)

| Sprint | Màn hình | Độ ưu tiên | Trạng thái |
|--------|----------|-----------|------------|
| S1 | AgentDashboard (cải tiến) + AgentCommission | 🔴 Cao | ✅ Done |
| S1 | AgentSupplierHub (list + request) | 🔴 Cao | ✅ Done |
| S2 | AgentCatalog + chia sẻ sản phẩm | 🔴 Cao | ✅ Done |
| S2 | AgentCustomers — LeadList + LeadPipeline (pre-sale) | 🔴 Cao | ⏳ Pending |
| S2 | AgentCustomers — CustomerList + CustomerDetail (post-sale) | 🔴 Cao | ⏳ Pending |
| S3 | AgentCare — TicketList + TicketDetail | 🔴 Cao | ⏳ Pending |
| S3 | AgentCare — Broadcast & Upsell gợi ý | 🟡 Trung bình | ⏳ Pending |
| S3 | ContractDetail + eSign flow | 🟡 Trung bình | ⏳ Pending |
| S4 | AgentTeam — leaderboard, mời sub-agent | 🟡 Trung bình | ⏳ Pending |
| S4 | Care metrics dashboard (retention, NPS, response time) | 🟡 Trung bình | ⏳ Pending |
| S5 | Trang cá nhân Agent + QR Code | 🟢 Thấp | ⏳ Pending |
| S5 | Báo giá PDF, Script tư vấn, Upsell tự động | 🟢 Thấp | ⏳ Pending |
