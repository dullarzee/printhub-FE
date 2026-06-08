# PrintHub Setup Guide

Complete step-by-step guide to set up your PrintHub e-commerce platform.

## 1. Environment Setup

### 1.1 Clone the Repository
```bash
git clone <your-repo-url>
cd printhub
pnpm install
```

### 1.2 Create Environment Variables
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration.

## 2. Database Setup (Supabase)

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be created
4. Go to Project Settings → Database
5. Copy your connection string (PostgreSQL)

### 2.2 Configure Database URL
Update `.env.local`:
```
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?schema=public"
```

### 2.3 Run Database Setup
The tables are created automatically. To seed with sample data:

1. Go to Supabase SQL Editor
2. Open and run `/scripts/seed-data.sql` to add sample products and services

Or run via command line:
```bash
psql -U [user] -d [database] -h [host] -f scripts/seed-data.sql
```

## 3. Paystack Setup

### 3.1 Create Paystack Account
1. Go to [paystack.com](https://paystack.com)
2. Sign up for a business account
3. Complete KYC verification

### 3.2 Get API Keys
1. Log in to Paystack Dashboard
2. Go to Settings → API Keys & Webhooks
3. Copy your Public Key and Secret Key

### 3.3 Configure Environment Variables
Update `.env.local`:
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_xxx" (or pk_test_xxx for testing)
PAYSTACK_SECRET_KEY="sk_live_xxx" (or sk_test_xxx for testing)
```

**Note**: For development, use test keys. Switch to live keys for production.

### 3.4 Setup Paystack Webhook (Optional)
1. In Paystack Dashboard, go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payments/webhook`
3. Select events: `charge.success`
4. Save

## 4. Running the Application

### Development
```bash
pnpm dev
```

Server starts at `http://localhost:3000`

### Production Build
```bash
pnpm build
pnpm start
```

## 5. Testing the Application

### 5.1 Create Test User
1. Go to `http://localhost:3000/signup`
2. Create an account with test credentials

### 5.2 Browse Products/Services
1. Go to Products page - should see sample products
2. Go to Services page - should see sample services with customization options

### 5.3 Test Shopping Cart
1. Add products and services to cart
2. Verify items appear in correct sections
3. Test quantity changes and removals

### 5.4 Test Payment (Using Paystack Test Keys)
1. Add items to cart
2. Go to checkout
3. Sign in if needed
4. Fill shipping details
5. Click "Complete Payment"
6. Use test card: `5399 8182 0180 4000`
7. Expiry: `08/24`
8. CVV: `813`
9. OTP: `123456`

## 6. Sample Data Management

### Adding Products
Via Supabase SQL Editor:
```sql
INSERT INTO products (name, description, price, image, is_active)
VALUES (
  'Product Name',
  'Product description',
  10000,
  'https://image-url.jpg',
  true
);
```

### Adding Services
```sql
INSERT INTO services (name, description, base_price, image, is_active)
VALUES (
  'Service Name',
  'Service description',
  25000,
  'https://image-url.jpg',
  true
);
```

### Adding Service Options
```sql
INSERT INTO service_options (service_id, name, label, values)
VALUES (
  1, -- service_id
  'option_name',
  'Display Label',
  '["Option1", "Option2", "Option3"]'::jsonb
);
```

## 7. Deployment to Vercel

### 7.1 Connect GitHub Repository
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository

### 7.2 Add Environment Variables
In Vercel Project Settings:
1. Go to Settings → Environment Variables
2. Add all variables from `.env.local`:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - `PAYSTACK_SECRET_KEY`

### 7.3 Deploy
1. Click Deploy button
2. Wait for build to complete
3. Your app is live!

## 8. Admin Dashboard (Future Enhancement)

To add admin functionality:
1. Create admin routes in `/app/admin`
2. Add role-based access control
3. Build dashboard for:
   - Managing products/services
   - Order management
   - Revenue analytics
   - Customer management

## 9. Email Notifications (Future Enhancement)

To add email notifications:
1. Set up email service (SendGrid, Mailgun, etc.)
2. Create email templates for:
   - Order confirmation
   - Shipping notification
   - Delivery confirmation
3. Integrate with order creation

## 10. Troubleshooting

### "Database connection error"
- Check `DATABASE_URL` is correct
- Verify Supabase project is active
- Ensure IP whitelist allows your connection

### "Payment not working"
- Verify Paystack keys are correct
- Check keys match environment (test vs live)
- Ensure webhook is configured if using async verification

### "Products not showing"
- Check database has sample data
- Verify `is_active` is set to true
- Check Supabase URL is accessible

### "Shipping info not saving"
- Verify user is authenticated
- Check form validation is passing
- Review browser console for errors

## 11. Security Checklist

- [ ] Environment variables are not exposed
- [ ] Database URL uses SSL connection
- [ ] Paystack webhook is verified
- [ ] HTTPS is enabled (production)
- [ ] Session cookies are HTTP-only
- [ ] API routes validate user authentication
- [ ] Input validation is implemented
- [ ] Rate limiting is considered for APIs

## 12. Performance Optimization

- Enable image optimization in Next.js
- Set up CDN for static assets
- Implement caching headers
- Optimize database queries
- Monitor with Vercel Analytics

## 13. Monitoring & Maintenance

- Set up error monitoring (Sentry)
- Monitor payment failures
- Track order fulfillment times
- Regular database backups
- Update dependencies monthly

## Support

For additional help:
- Check the main README.md
- Review Supabase documentation
- Check Paystack integration docs
- Contact support team

---

**Last Updated**: April 2024
**Version**: 1.0
