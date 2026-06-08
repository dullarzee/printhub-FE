-- CreateTable users
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable addresses
CREATE TABLE IF NOT EXISTS "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable products
CREATE TABLE IF NOT EXISTS "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable services
CREATE TABLE IF NOT EXISTS "services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable service_options
CREATE TABLE IF NOT EXISTS "service_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,
    "optionData" JSONB NOT NULL,
    "priceModifier" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "service_options_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable carts
CREATE TABLE IF NOT EXISTS "carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable cart_items
CREATE TABLE IF NOT EXISTS "cart_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "productId" TEXT,
    "serviceId" TEXT,
    "quantity" INTEGER NOT NULL,
    "selectedOptions" JSONB,
    "priceAtAdd" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cart_items_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable orders
CREATE TABLE IF NOT EXISTS "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paystackReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable order_items
CREATE TABLE IF NOT EXISTS "order_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "productId" TEXT,
    "serviceId" TEXT,
    "quantity" INTEGER NOT NULL,
    "selectedOptions" JSONB,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON UPDATE CASCADE,
    CONSTRAINT "order_items_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "carts_userId_key" ON "carts"("userId");

-- Insert sample products
INSERT INTO "products" ("id", "name", "description", "price", "category", "imageUrl", "stock", "createdAt", "updatedAt") VALUES
('prod_001', 'Premium Glossy Paper 300gsm', 'High-quality glossy paper perfect for vibrant color prints', 45.99, 'Paper', '/images/glossy-paper.jpg', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_002', 'Matte Business Cards (500 pcs)', 'Professional matte finish business cards', 35.50, 'Business Cards', '/images/business-cards.jpg', 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_003', 'Kraft Paper Roll 24"', 'Natural kraft paper roll for eco-friendly packaging', 28.75, 'Paper', '/images/kraft-paper.jpg', 75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_004', 'Cardstock Assortment Pack', 'Mixed colors and weights cardstock', 52.00, 'Cardstock', '/images/cardstock.jpg', 40, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_005', 'Laminating Sheets (100 pcs)', 'Self-adhesive laminating sheets for document protection', 22.99, 'Accessories', '/images/laminating-sheets.jpg', 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample services
INSERT INTO "services" ("id", "name", "description", "basePrice", "imageUrl", "createdAt", "updatedAt") VALUES
('svc_001', 'Professional Design Service', 'Custom design creation for your branding needs', 150.00, '/images/design-service.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('svc_002', 'Digital Printing', 'High-quality digital printing for various formats', 0.50, '/images/digital-printing.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('svc_003', 'Binding & Finishing', 'Professional binding, lamination, and finishing services', 25.00, '/images/binding-service.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('svc_004', 'Embossing Service', 'Embossed prints for premium finishing touch', 40.00, '/images/embossing-service.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample service options
INSERT INTO "service_options" ("id", "serviceId", "optionName", "optionType", "optionData", "priceModifier", "createdAt", "updatedAt") VALUES
('opt_001', 'svc_002', 'Size', 'select', '{"options": [{"label": "A4", "value": "a4", "priceModifier": 0}, {"label": "A3", "value": "a3", "priceModifier": 1.00}, {"label": "Custom", "value": "custom", "priceModifier": 2.00}]}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('opt_002', 'svc_002', 'Quantity', 'number', '{"min": 1, "max": 10000, "step": 1}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('opt_003', 'svc_002', 'Paper Type', 'select', '{"options": [{"label": "Glossy", "value": "glossy", "priceModifier": 0}, {"label": "Matte", "value": "matte", "priceModifier": 0.50}, {"label": "Watercolor", "value": "watercolor", "priceModifier": 1.50}]}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('opt_004', 'svc_003', 'Binding Type', 'select', '{"options": [{"label": "Perfect Binding", "value": "perfect", "priceModifier": 5.00}, {"label": "Comb Binding", "value": "comb", "priceModifier": 3.00}, {"label": "Spiral Binding", "value": "spiral", "priceModifier": 7.00}]}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('opt_005', 'svc_003', 'Page Count', 'number', '{"min": 10, "max": 500, "step": 10}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
