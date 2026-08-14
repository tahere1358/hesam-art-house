# پرامپت توسعه — خانه هنر حسام (Hesam Art House)

> **نوع خروجی:** وب‌اپلیکیشن فروشگاهی + پنل کاربری + پنل مدیریت + پنل پشتیبانی  
> **سبک طراحی:** مینیمال، مدرن، دو‌زبانه (FA/EN)، RTL/LTR  
> **معماری:** ماژولار، قابل توسعه، آماده اتصال درگاه‌های پرداخت

---

## ۱. معرفی پروژه

**نام برند:** خانه هنر حسام — Hesam Art House  
**حوزه فعالیت:** فرهنگ و گرافیک دیجیتال  
**شعار/هدف:** بهترین فضا برای خرید فایل‌های آماده و لایه‌باز، سفارش اختصاصی، تبلیغات، و پشتیبانی ۲۴ ساعته

### محصولات و خدمات
- فروش فایل‌های آماده و لایه‌باز:
  - Microsoft Word, Excel, PowerPoint
  - Adobe Photoshop (PSD)
  - CorelDRAW (CDR)
  - سایر فرمت‌های گرافیکی و اداری (قابل گسترش)
- پذیرش **سفارش اختصاصی** (Custom Order)
- **تبلیغات** (Advertising / Sponsored placement)
- **اشتراک ماهانه و سالانه** (Subscription plans)
- **پشتیبانی ۲۴/۷**

---

## ۲. پالت رنگ (Design System)

### رنگ اصلی — نبض برند
| نام | کد پیشنهادی | کاربرد |
|-----|-------------|--------|
| **فیروزه‌ای (Turquoise)** | `#2EC4B6` | Primary — دکمه‌ها، لینک‌ها، آیکون‌های فعال، هدر |

### مکمل‌های طیف سرد (عمق و آرامش)
| نام | کد پیشنهادی | کاربرد |
|-----|-------------|--------|
| Seafoam | `#A8E6CF` | هایلایت ملایم، پس‌زمینه کارت |
| Mint | `#98FF98` | Badge، وضعیت موفق |
| Aqua | `#7FDBDA` | گرادیان، Hover |
| Teal | `#008080` | تیتر، کنتراست باوقار |
| Lagoon | `#006D77` | Footer، نوار کناری |
| Peacock | `#005F73` | عمق بخش‌های بزرگ |
| Petrol | `#003D4D` | متن روی پس‌زمینه روشن |
| Atlantic | `#001F3F` | Dark mode surface |
| Abyss | `#0A1628` | پس‌زمینه تیره، Sidebar ادمین |

### مکمل‌های طیف گرم (گرما و انرژی)
| نام | کد پیشنهادی | کاربرد |
|-----|-------------|--------|
| Vanilla | `#FDF6E3` | پس‌زمینه اصلی سایت |
| Butter | `#FFF8DC` | کارت، Section |
| Lemon | `#FFF44F` | Alert انرژی، Promo |
| Daffodil | `#FFD700` | Star rating |
| Canary | `#FFEF00` | CTA ثانویه |
| Honey | `#FFB347` | تخفیف، Campaign |
| Ochre | `#CC7722` | Accent گرم |
| Saffron | `#F4C430` | Premium badge |
| Gold | `#D4AF37` | VIP، لوکس |

### قوانین UI
- **مینیمال:** فضای سفید/وانیلی زیاد، تایپوگرافی خوانا، بدون شلوغی
- **کنتراست:** فیروزه‌ای + Abyss/Teal برای عمق؛ Vanilla/Butter برای تعادل
- **RTL/LTR:** پشتیبانی کامل فارسی (RTL) و انگلیسی (LTR)
- **Responsive:** Mobile-first
- **فونت فارسی:** Vazirmatn / IRANSans — **انگلیسی:** Inter / Poppins

---

## ۳. معماری فنی (پیشنهادی)

```
hesam-art-house/
├── apps/
│   ├── web/                 # Next.js 14+ (App Router) — فروشگاه + پنل کاربر
│   └── admin/               # پنل مدیریت (یا route /admin در web)
├── packages/
│   ├── ui/                  # Design system + کامپوننت‌های مشترک
│   ├── database/            # Prisma schema + migrations
│   ├── payment/             # ماژول درگاه پرداخت (Interface-based)
│   ├── storage/             # آپلود، واترمارک، پیش‌نمایش
│   ├── i18n/                # fa/en translations
│   └── notifications/       # Notification Center
├── docker-compose.yml
└── .env.example
```

### Stack پیشنهادی
| لایه | تکنولوژی |
|------|----------|
| Frontend | Next.js 14+, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes / tRPC یا NestJS |
| Database | PostgreSQL + Prisma ORM |
| Cache/Queue | Redis + BullMQ (واترمارک، ایمیل، اعلان) |
| Storage | S3-compatible (MinIO local / Arvan / Liara) |
| Auth | NextAuth.js — Email + OTP + Social (اختیاری) |
| Search | Meilisearch یا PostgreSQL Full-Text |
| Realtime | Socket.io / Pusher — چت پشتیبانی |
| i18n | next-intl |
| Charts | Recharts / Chart.js |
| Excel Export | ExcelJS |

---

## ۴. ماژول پرداخت (Modular Payment Gateway)

> **الان:** جای درگاه‌ها در کد **خالی/Placeholder** باشد. فقط Interface و Mock.

```typescript
// packages/payment/types.ts
interface PaymentGateway {
  id: string;                    // 'zarinpal' | 'idpay' | 'stripe' | 'paypal'
  name: string;
  region: 'IR' | 'INTL';
  isEnabled: boolean;
  createPayment(params: CreatePaymentParams): Promise<PaymentSession>;
  verifyPayment(params: VerifyPaymentParams): Promise<PaymentResult>;
  refund?(params: RefundParams): Promise<RefundResult>;
}

// Placeholder implementations — بدون API key واقعی
class ZarinpalGateway implements PaymentGateway { /* TODO */ }
class StripeGateway implements PaymentGateway { /* TODO */ }
class PaymentService {
  constructor(private gateways: PaymentGateway[]) {}
  getAvailableGateways(userRegion?: string): PaymentGateway[] { /* ... */ }
}
```

### سناریوهای پرداخت
- خرید تک‌فایل
- سبد خرید
- اشتراک (Recurring — placeholder)
- شارژ **کیف پول**
- پرداخت سفارش اختصاصی
- پرداخت تبلیغات

### کیف پول کاربر (User Wallet)
- موجودی قابل شارژ (درگاه IR/INTL)
- کسر خودکار در خرید
- تاریخچه تراکنش (واریز، برداشت، خرید، بازگشت)
- حداقل موجودی / قفل موقت در پرداخت ناتمام

---

## ۵. نقش‌ها و پنل‌ها

### ۵.۱. کاربر عادی (Customer Panel)
| قابلیت | توضیح |
|--------|--------|
| ثبت‌نام / ورود | ایمیل، موبایل، OTP |
| مرور و جستجو | دسته‌بندی + فیلتر + Full-text search |
| پیش‌نمایش آنلاین | تمام فایل‌ها (با واترمارک) |
| مقایسه فایل | تا N فایل side-by-side |
| خرید فایل | درگاه / کیف پول |
| سفارش اختصاصی | فرم + آپلود مرجع + پیگیری |
| درخواست تبلیغ | فرم + بودجه + بازه |
| اشتراک | ماهانه / سالانه |
| کد تخفیف | اعمال در checkout |
| امتیاز و سطح | Gamification — Bronze/Silver/Gold/... |
| Notification Center | خرید، سفارش، تبلیغ، پیام پشتیبانی |
| چت پشتیبانی | **فقط چت با ادمین** — کاربر فقط مکالمه خودش را می‌بیند |
| پروفایل | اطلاعات، تاریخچه خرید، دانلودها، کیف پول |

### ۵.۲. پنل مدیریت (Admin Panel)
| ماژول | قابلیت‌ها |
|-------|-----------|
| **داشبورد آماری** | نمودار فروش، کاربران، درآمد، بازدید کل/جزئی |
| | جدول: ارزیابی قیمت، فایل، درآمد |
| | پرفروش‌ترین، پرترافیک‌ترین |
| | مشتریان برتر (LTV، تعداد خرید) |
| | **دکمه خروجی Excel** برای هر گزارش |
| **مدیریت فایل** | CRUD، دسته‌بندی، قیمت، تگ، وضعیت |
| **پیش‌نمایش / واترمارک** | تنظیم واترمارک، regenerate preview |
| **سفارشات** | سفارش فایل، تبلیغ — workflow وضعیت |
| **کاربران** | لیست، سطح، امتیاز، مسدودسازی |
| **کد تخفیف / کمپین** | درصد/مبلغ، محدودیت، تاریخ، محصول/دسته |
| **اشتراک‌ها** | پلن‌ها، قیمت، مزایا |
| **کیف پول** | مشاهده تراکنش‌ها، تنظیمات |
| **درگاه پرداخت** | فعال/غیرفعال، Placeholder config |
| **اتصال بله (Bale)** | Webhook/API — اعلان سفارش، پیام مدیریت |
| **پشتیبانی** | **مشاهده تمام چت‌های کاربران** — پاسخ، assign، بستن تیکت |
| **اعلان‌ها** | Push/Email/SMS/In-app — broadcast |
| **آمار دانلود/فروش** | per file, per category, per period |
| **تنظیمات سایت** | لوگو، رنگ، SEO، زبان پیش‌فرض |

### ۵.۳. پنل پشتیبانی — قوانین چت
```
┌─────────────────────────────────────────────────────────┐
│  ADMIN: می‌بیند → همه Conversationها + همه Messages     │
│  USER:  می‌بیند → فقط Conversation خودش با Admin       │
│  USER:  نمی‌بیند → چت سایر کاربران (هرگز)               │
└─────────────────────────────────────────────────────────┘
```
- هر سفارش (فایل / تبلیغ) → **خودکار** در صفحه پشتیبانی ثبت + لینک به تیکت
- Realtime messaging + وضعیت خوانده‌شده
- ضمیمه فایل در چت

---

## ۶. فروشگاه — UX/UI

### صفحات عمومی
- Home (Hero، دسته‌های برتر، پرفروش، CTA اشتراک)
- Shop / Archive (Grid/List، فیلتر، sort)
- Category pages (سلسله‌مراتب دسته‌بندی)
- Product detail (پیش‌نمایش، مقایسه، خرید، related)
- Search results (Autocomplete + filters)
- Custom Order
- Advertising request
- Pricing / Subscription plans
- About, FAQ, Contact
- Login / Register

### دسته‌بندی (نمونه — قابل ویرایش در ادمین)
```
├── قالب‌های اداری
│   ├── Word
│   ├── Excel
│   └── PowerPoint
├── گرافیک
│   ├── Photoshop (PSD)
│   ├── Corel (CDR)
│   └── Vector / PNG / SVG
├── بسته‌های ترکیبی
└── سایر
```

### جستجو — الزامات
- Search bar در Header (همیشه visible)
- Autocomplete (عنوان، تگ، دسته)
- فیلتر: فرمت، قیمت، تاریخ، امتیاز، پرفروش
- Sort: جدیدترین، ارزان‌ترین، پرفروش، محبوب
- URL shareable برای نتایج فیلترشده

### دو‌زبانه
- Toggle FA / EN در Header
- تمام UI strings در فایل‌های i18n
- محتوای محصول: title_fa, title_en, description_fa, description_en
- URL: `/fa/...` و `/en/...` یا query `?lang=`

---

## ۷. پیش‌نمایش آنلاین + واترمارک

### پیش‌نمایش بر اساس فرمت
| فرمت | روش پیش‌نمایش |
|------|----------------|
| تصویر (PNG/JPG/WebP) | `<img>` + واترمارک CSS/Canvas |
| PSD | تبدیل لایه composite → PNG (Sharp/ImageMagick) + واترمارک |
| CDR | Export preview (placeholder یا سرویس خارجی) |
| PDF | PDF.js viewer |
| DOCX/XLSX/PPTX | تبدیل به PDF/تصویر (LibreOffice headless) یا thumbnail از ادمین |
| Video | `<video>` poster + واترمارک overlay |

### واترمارک خودکار
- Queue job پس از آپلود: `generatePreviewWithWatermark(fileId)`
- متن واترمارک: «Hesam Art House» + logo شفاف
- Tile / diagonal pattern — غیرقابل حذف در preview
- فایل اصلی **فقط پس از خرید** — signed URL با expiry

---

## ۸. مقایسه فایل‌ها (File Compare)
- انتخاب ۲ تا ۴ فایل → صفحه Compare
- جدول: قیمت، فرمت، حجم، دانلود، امتیاز، تاریخ
- Preview thumbnails کنار هم
- دکمه «افزودن به سبد» برای هر کدام

---

## ۹. امتیاز و سطح کاربری (Gamification)

### امتیاز (Points)
- خرید → +X امتیاز
- ثبت نظر → +Y
- معرفی دوست → +Z
- اشتراک فعال → bonus

### سطح (Levels)
| سطح | آستانه | مزایا |
|-----|--------|-------|
| Bronze | 0 | — |
| Silver | 500 | ۵٪ تخفیف |
| Gold | 2000 | ۱۰٪ + اولویت پشتیبانی |
| Platinum | 5000 | ۱۵٪ + پیش‌نمایش VIP |

---

## ۱۰. کد تخفیف و کمپین

```typescript
interface DiscountCode {
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  applicableTo: 'ALL' | 'CATEGORY' | 'PRODUCT';
  targetIds?: string[];
  campaignId?: string;
}

interface Campaign {
  id: string;
  name: string;
  bannerImage?: string;
  startDate: Date;
  endDate: Date;
  discountCodes: DiscountCode[];
  isActive: boolean;
}
```

---

## ۱۱. Notification Center

### انواع اعلان
- `ORDER_CREATED` — سفارش ثبت شد
- `ORDER_STATUS_CHANGED`
- `PAYMENT_SUCCESS` / `PAYMENT_FAILED`
- `FILE_READY_DOWNLOAD`
- `SUBSCRIPTION_EXPIRING`
- `SUPPORT_REPLY`
- `CAMPAIGN_PROMO`
- `WALLET_CHARGED`

### UI
- آیکون زنگ در Header + badge تعداد unread
- Dropdown لیست + صفحه `/notifications`
- Mark as read / Mark all read
- (اختیاری) Email + SMS + Push

---

## ۱۲. داشبورد آماری (Admin)

### KPI Cards
- درآمد امروز / هفته / ماه / کل
- تعداد فروش
- کاربران جدید
- بازدید (کل / منحصر به فرد)
- نرخ تبدیل

### نمودارها
- خطی: فروش و درآمد در بازه زمانی
- میله‌ای: فروش per category
- دایره‌ای: سهم فرمت فایل
- Area: ترافیک سایت

### جداول
- پرفروش‌ترین فایل‌ها (نام، دانلود، درآمد، امتیاز)
- پرترافیک‌ترین صفحات
- مشتریان برتر (نام، تعداد خرید، LTV)
- ارزیابی قیمت (میانگین، min/max per category)

### خروجی Excel
- دکمه در هر ویجت: `Export to Excel`
- Sheet: Summary + Raw data
- فیلتر تاریخ قبل از export

---

## ۱۳. اتصال بله (Bale Bot) — مدیریت

> Placeholder — بدون token واقعی در repo

```typescript
interface BaleAdminConfig {
  botToken: string;       // env: BALE_BOT_TOKEN
  adminChatIds: string[]; // env: BALE_ADMIN_CHAT_IDS
}

// Events → notify admin on Bale
- newOrder(order)
- newAdRequest(ad)
- newSupportMessage(ticket)
- largePurchase(threshold)
- dailySalesReport()
```

---

## ۱۴. Database Schema (خلاصه Prisma)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String?  @unique
  phone         String?  @unique
  name          String?
  role          Role     @default(CUSTOMER)
  points        Int      @default(0)
  level         UserLevel @default(BRONZE)
  walletBalance Decimal  @default(0)
  locale        String   @default("fa")
  createdAt     DateTime @default(now())
  orders        Order[]
  subscriptions Subscription[]
  supportTickets SupportTicket[]
  notifications Notification[]
  reviews       Review[]
}

model Product {
  id            String   @id @default(cuid())
  slug          String   @unique
  titleFa       String
  titleEn       String
  descriptionFa String?
  descriptionEn String?
  price         Decimal
  format        FileFormat
  categoryId    String
  category      Category @relation(...)
  previewUrl    String?  // watermarked
  fileUrl       String   // protected
  downloadCount Int      @default(0)
  salesCount    Int      @default(0)
  tags          Tag[]
  reviews       Review[]
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  type        OrderType   // FILE | CUSTOM | AD | SUBSCRIPTION
  status      OrderStatus
  totalAmount Decimal
  paymentId   String?
  items       OrderItem[]
  supportTicket SupportTicket?
}

model SupportTicket {
  id        String   @id @default(cuid())
  userId    String
  orderId   String?  @unique
  subject   String
  status    TicketStatus
  messages  SupportMessage[]
}

model SupportMessage {
  id        String   @id @default(cuid())
  ticketId  String
  senderId  String
  senderRole Role
  content   String
  attachments Json?
  readAt    DateTime?
}

model WalletTransaction {
  id        String   @id @default(cuid())
  userId    String
  amount    Decimal
  type      WalletTxType // DEPOSIT | PURCHASE | REFUND
  reference String?
}

model DiscountCode { /* ... */ }
model Campaign { /* ... */ }
model Notification { /* ... */ }
model AnalyticsEvent { /* pageview, download, purchase */ }
```

---

## ۱۵. API Routes (نمونه)

```
# Public
GET    /api/products?search=&category=&format=&sort=
GET    /api/products/[slug]
GET    /api/products/[slug]/preview
GET    /api/categories

# Auth required
POST   /api/cart
POST   /api/checkout
POST   /api/orders/custom
POST   /api/orders/ad
POST   /api/wallet/charge
GET    /api/wallet/transactions
POST   /api/discount/validate
GET    /api/compare?ids=
GET    /api/notifications
POST   /api/support/tickets
POST   /api/support/messages
WS     /api/support/ws

# Admin
GET    /api/admin/dashboard/stats
GET    /api/admin/dashboard/export?type=sales&from=&to=
CRUD   /api/admin/products
CRUD   /api/admin/categories
CRUD   /api/admin/discounts
CRUD   /api/admin/campaigns
GET    /api/admin/support/tickets        # ALL tickets
GET    /api/admin/support/tickets/[id]
POST   /api/admin/bale/test
```

---

## ۱۶. Environment Variables (.env.example)

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Storage
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Payment — PLACEHOLDER (empty for now)
Zarinpal_MERCHANT_ID=
IDPAY_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

# Bale — PLACEHOLDER
BALE_BOT_TOKEN=
BALE_ADMIN_CHAT_IDS=

# Redis
REDIS_URL=

# Search
MEILISEARCH_HOST=
MEILISEARCH_KEY=

# Watermark
WATERMARK_TEXT=Hesam Art House
WATERMARK_LOGO_URL=
```

---

## ۱۷. فازبندی توسعه (Roadmap)

### فاز ۱ — MVP (۴–۶ هفته)
- [ ] Setup monorepo + DB + Auth
- [ ] Design system (رنگ‌ها، کامپوننت‌ها)
- [ ] Home + Shop + Product detail + Search
- [ ] دسته‌بندی + i18n FA/EN
- [ ] Admin: CRUD محصول + دسته
- [ ] پیش‌نمایش تصویر + واترمارک ساده
- [ ] Checkout placeholder + کیف پول mock

### فاز ۲ — تجاری (۳–۴ هفته)
- [ ] Payment module (interface + mock gateways)
- [ ] سفارش اختصاصی + تبلیغات
- [ ] اشتراک ماهانه/سالانه
- [ ] کد تخفیف + کمپین
- [ ] Notification Center
- [ ] امتیاز و سطح

### فاز ۳ — پشتیبانی و آنalytics (۲–۳ هفته)
- [ ] چت پشتیبانی (realtime)
- [ ] Auto-ticket از سفارشات
- [ ] داشبورد آماری + نمودارها
- [ ] Excel export
- [ ] آمار دانلود/فروش

### فاز ۴ — پیشرفته (۲–۳ هفته)
- [ ] پیش‌نمایش همه فرمت‌ها
- [ ] مقایسه فایل
- [ ] اتصال Bale
- [ ] اتصال درگاه‌های واقعی IR/INTL

---

## ۱۸. معیارهای پذیرش (Acceptance Criteria)

1. ✅ سایت دو‌زبانه FA/EN با RTL/LTR صحیح
2. ✅ UI مینیمال با پالت فیروزه‌ای و مکمل‌های تعریف‌شده
3. ✅ جستجو و دسته‌بندی سریع و دقیق
4. ✅ پیش‌نمایش آنلاین با واترمارک برای همه فایل‌ها
5. ✅ کیف پول + تاریخچه تراکنش
6. ✅ کد تخفیف، کمپین، امتیاز، سطح کاربری
7. ✅ مقایسه فایل (۲–۴ فایل)
8. ✅ Notification Center
9. ✅ داشبورد admin با نمودار، جدول، Excel export
10. ✅ چت: admin همه را می‌بیند — user فقط چت خودش
11. ✅ سفارشات در صفحه پشتیبانی auto-register
12. ✅ Payment gateways: modular + placeholder (بدون key واقعی)
13. ✅ Bale: config placeholder در پنل admin
14. ✅ Responsive + Performance (Lighthouse > 85)

---

## ۱۹. پرامپت کوتاه برای AI Developer (Copy-Paste)

```
Build "Hesam Art House" (خانه هنر حسام) — a minimal bilingual (FA/EN) digital marketplace for ready-made graphic/office files (Word, Excel, PPT, PSD, CDR, etc.) with custom orders, ads, and subscriptions.

Stack: Next.js 14 App Router, TypeScript, Tailwind, PostgreSQL, Prisma, Redis.

Design: Minimal. Primary color Turquoise #2EC4B6. Complement with cold palette (Seafoam, Teal, Abyss) and warm accents (Vanilla, Butter, Gold). RTL/LTR. Vazirmatn + Inter fonts.

Features:
- Shop with hierarchical categories, powerful search/filters, online preview with AUTO watermark on all previews
- User panel: buy files, custom orders, ad requests, monthly/yearly subscription, wallet, discount codes, points/levels, file compare (2-4), notification center
- Support chat: users see ONLY their chat with admin; admin sees ALL chats. Auto-create support ticket on every order/ad request.
- Admin dashboard: sales/users/revenue/traffic charts, tables (top products, top customers, pricing), Excel export button
- Modular payment gateway (Interface pattern): Iranian + International gateways as PLACEHOLDERS only (no real API keys)
- Bale bot connection placeholder in admin settings
- Download/sales analytics per file

Do NOT hardcode payment or Bale credentials. Use .env placeholders.
Follow modular architecture in packages/payment, packages/storage, packages/notifications.
```

---

**تهیه‌شده برای:** خانه هنر حسام — Hesam Art House  
**نسخه:** 1.0
