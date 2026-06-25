# ⚖️ LegalEase — Legal Services Marketplace

LegalEase is a full-stack legal services marketplace that connects clients with verified lawyers. Built with Next.js 16 (App Router), Express.js, and MongoDB, it features role-based access control, real-time booking management, Stripe payments, and dedicated dashboards for clients, lawyers, and admins.

---

## 🌐 Live Demo

> [https://legal-ease-flame-zeta.vercel.app/](https://legal-ease-flame-zeta.vercel.app/)

---

## ✨ Features

### 🔓 Public (Unauthenticated)
- Browse the landing page, lawyers listing, and lawyer detail pages
- Search and filter lawyers by specialization, fee, and more
- Paginated lawyer listing with URL-based filter params

### 🔐 Authentication
- Sign up / Sign in powered by **Better Auth** with MongoDB adapter
- Role selection after sign-up: **Client** or **Lawyer**
- Lawyer onboarding via a multi-field modal form (name, photo, bio, fee, services)

### 👤 Client Dashboard
- Edit profile (name, profile picture via ImgBB)
- Track booking history with real-time status updates
- Pay accepted bookings via **Stripe Checkout**
- Leave reviews on lawyer profile pages after payment

### 👨‍💼 Lawyer Dashboard
- View incoming booking requests (pending / accepted / rejected)
- Accept or reject client booking requests
- Manage offered services (add, edit, delete)
- Edit profile details and profile picture

### 🛡️ Admin Dashboard
- Analytics overview: total users, total lawyers, total revenue, total hires
- User and lawyer management (delete accounts)
- Transaction history page
- Full platform visibility across all roles

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Full-stack React framework |
| [HeroUI v3](https://heroui.com/) | UI component library |
| [Framer Motion](https://www.framer.com/motion/) | Animations & scroll effects |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Gravity UI Icons](https://gravity-ui.com/) | Icon system |
| [Lucide React](https://lucide.dev/) | Additional icons |
| [React Icons](https://react-icons.github.io/) | Extended icon set |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [Stripe.js](https://stripe.com/docs/js) | Frontend payment integration |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) | REST API server |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Better Auth](https://www.better-auth.com/) | Authentication & session management |
| [Stripe](https://stripe.com/) | Payment processing |
| [ImgBB](https://imgbb.com/) | Profile image hosting |

---

## 📁 Project Structure

```
legalease/
├── frontend/                   # Next.js App Router
│   ├── app/
│   │   ├── (public)/           # Landing, lawyers, lawyer details
│   │   ├── (auth)/             # Sign in, sign up, choose role
│   │   ├── dashboard/
│   │   │   ├── client/         # Client dashboard pages
│   │   │   ├── lawyer/         # Lawyer dashboard pages
│   │   │   └── admin/          # Admin dashboard pages
│   │   └── api/                # Next.js route handlers (Better Auth, etc.)
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Auth config, utilities
│   └── globals.css             # Tailwind v4 @theme config
│
└── backend/                    # Express.js API
    ├── routes/                 # API route definitions
    ├── controllers/            # Business logic
    ├── models/                 # MongoDB collections
    └── middleware/             # Auth, role checks
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account
- ImgBB API key

### 1. Clone the Repository

```bash
git clone https://github.com/Tamim379ta/LegalEase.git
cd legalease
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Better Auth
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# ImgBB
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

```bash
npm run dev
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 🔑 Role-Based Access

| Role | Access |
|---|---|
| **Guest** | Landing page, lawyers listing, lawyer detail pages |
| **Client** | Book lawyers, track bookings, pay via Stripe, leave reviews, edit profile |
| **Lawyer** | Manage bookings (accept/reject), manage services, edit profile |
| **Admin** | Full platform management, analytics, transaction history |

---

## 💳 Booking & Payment Flow

```
Client books lawyer → Booking created (pending)
       ↓
Lawyer reviews request → Accepts or rejects
       ↓
If accepted → Client pays via Stripe Checkout
       ↓
Payment confirmed → Client can leave a review
```

---

## 📦 Key Dependencies

```json
{
  "next": "^16.2.9",
  "react": "19.2.4",
  "better-auth": "^1.6.19",
  "@better-auth/mongo-adapter": "^1.6.19",
  "@heroui/react": "^3.2.1",
  "framer-motion": "^12.41.0",
  "stripe": "^22.2.3",
  "@stripe/stripe-js": "^9.8.0",
  "mongodb": "^7.3.0",
  "@gravity-ui/icons": "^2.18.0"
}
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Author

**Tamim** — Full-Stack Developer  
Built with Next.js, Express.js, and MongoDB