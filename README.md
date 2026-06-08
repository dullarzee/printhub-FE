# PrintHub - Professional Printing E-Commerce Platform

A comprehensive e-commerce solution for a printing company, built with Next.js 15, Prisma ORM, and Paystack payment integration.

## Features

- **User Authentication**: Complete signup/login system with secure password hashing
- **Product Management**: Browse, filter, and purchase printing products
- **Service Customization**: Order services with configurable options (size, quantity, finishing, etc.)
- **Separate Carts**: Products and services are managed in distinct carts to prevent confusion
- **Payment Integration**: Paystack payment gateway for secure online transactions
- **Order Management**: Complete order tracking and history for logged-in users
- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS
- **Modern Stack**: Next.js 15 App Router, React 19, TypeScript, and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Node.js API routes
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based authentication with HTTP-only cookies
- **Payments**: Paystack
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API (Auth & Cart)

## Project Structure

```
.
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── products/          # Product endpoints
│   │   ├── services/          # Service endpoints
│   │   ├── orders/            # Order management
│   │   └── payments/          # Payment processing
│   ├── products/              # Product pages
│   ├── services/              # Service pages
│   ├── cart/                  # Shopping cart
│   ├── checkout/              # Checkout page
│   ├── about/                 # About page
│   ├── contact/               # Contact page
│   ├── login/                 # Login page
│   ├── signup/                # Registration page
│   └── layout.tsx             # Root layout with providers
├── components/
│   ├── header.tsx             # Navigation header
│   ├── footer.tsx             # Footer
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── auth.ts                # Auth utilities
│   ├── auth-context.tsx       # Auth context provider
│   ├── cart-context.tsx       # Cart context provider
│   └── prisma.ts              # Prisma client
├── prisma/
│   └── schema.prisma          # Database schema
└── scripts/
    └── setup-db.sql           # Initial database setup
```

## Database Schema

### Users
- ID, email, password, name, phone, created_at

### Products
- ID, name, description, price, image, is_active, created_at

### Services
- ID, name, description, base_price, image, is_active, options, created_at

### Service Options
- ID, service_id, name, label, values (array)

### Orders
- ID, user_id, total_amount, shipping_address, status, payment_reference, created_at

### Order Products
- ID, order_id, product_id, quantity, price

### Order Services
- ID, order_id, service_id, quantity, base_price, selected_options

## Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Supabase account with PostgreSQL database
- Paystack account

### Installation

1. **Clone and Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```
   DATABASE_URL="your_supabase_connection_string"
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="your_paystack_public_key"
   PAYSTACK_SECRET_KEY="your_paystack_secret_key"
   ```

3. **Initialize Database**
   The database tables are created automatically when you first connect. If you need to reset:
   ```bash
   npm run prisma:migrate
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```

5. **Open in Browser**
   Visit `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product details

### Services
- `GET /api/services` - Get all services
- `GET /api/services/[id]` - Get service details

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Payments
- `POST /api/payments/verify` - Verify Paystack payment

## Features Walkthrough

### 1. User Authentication
- Sign up with email, password, name, and phone
- Secure password hashing with bcryptjs
- Session management with HTTP-only cookies
- Persistent auth state across pages

### 2. Product Shopping
- Browse all available products
- View detailed product information
- Add products to cart with quantity selection
- Separate product cart management

### 3. Service Customization
- Browse printing services
- Customize services with configurable options
- Select quantity and specifications
- Add services to cart separately from products

### 4. Shopping Cart
- View products and services in separate sections
- Modify quantities
- Remove items
- See real-time total price calculations
- Clear entire cart

### 5. Checkout Process
- Enter shipping and billing information
- Pre-filled user information for logged-in users
- Secure Paystack payment integration
- Order confirmation with tracking information

### 6. Order Management
- View order history
- Track order status
- Access order details and confirmation

## Customization

### Adding Products
Log in to your Supabase console and insert records into the `products` table:
```sql
INSERT INTO products (name, description, price, image, is_active)
VALUES ('Product Name', 'Description', 5000, 'image_url', true);
```

### Adding Services
```sql
INSERT INTO services (name, description, base_price, image, is_active)
VALUES ('Service Name', 'Description', 10000, 'image_url', true);
```

### Adding Service Options
```sql
INSERT INTO service_options (service_id, name, label, values)
VALUES (1, 'size', 'Paper Size', '["A4", "A3", "A2"]'::jsonb);
```

## Payment Testing with Paystack

Use these test credentials:
- Card Number: `5399818201804000`
- Expiry: `08/24`
- CVV: `813`
- OTP: `123456`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel settings
4. Deploy with one click

## Security Considerations

- ✓ Password hashing with bcryptjs
- ✓ HTTP-only secure cookies for sessions
- ✓ Environment variables for sensitive data
- ✓ Server-side payment verification
- ✓ Input validation with Zod
- ✓ SQL injection protection via Prisma
- ✓ CORS-safe API endpoints

## Performance Optimizations

- Next.js 15 App Router with automatic code splitting
- Image optimization
- Client-side caching with Context API
- Efficient database queries with Prisma
- localStorage for cart persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local`
- Check Supabase project is active
- Ensure PostgreSQL row-level security policies are configured

### Payment Not Working
- Verify Paystack API keys are correct
- Check that `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is accessible from frontend
- Confirm webhook is configured in Paystack dashboard

### Authentication Issues
- Clear browser cookies and localStorage
- Verify email is unique in database
- Check that auth routes are accessible

## Future Enhancements

- Email notifications for orders
- Admin dashboard for product management
- Bulk order discounts
- Wishlist functionality
- Product reviews and ratings
- Inventory management
- Multiple payment methods
- Order returns and refunds

## Support

For issues and questions:
- Email: support@printhub.com
- Phone: +234 (123) 456-7890

## License

This project is proprietary and confidential.
