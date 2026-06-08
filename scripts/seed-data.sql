-- Seed Products
INSERT INTO products (id, name, description, price, image, is_active) VALUES
('prod_001', 'Business Cards (500 sheets)', 'Premium quality business cards with glossy finish. Perfect for professional branding.', 5000, 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop', true),
('prod_002', 'Letterheads (100 sheets)', 'High-quality letterhead paper with custom branding. Ideal for official correspondence.', 3500, 'https://images.unsplash.com/photo-1596552183267-f12ffc648a4d?w=500&h=500&fit=crop', true),
('prod_003', 'Brochures (1000 copies)', '3-fold or 4-fold brochures with vibrant colors. Great for marketing and promotions.', 15000, 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=500&fit=crop', true),
('prod_004', 'Banners (per sqm)', 'High-resolution vinyl banners. Perfect for events, sales, and advertising.', 8000, 'https://images.unsplash.com/photo-1614009066535-34659c7ccc7f?w=500&h=500&fit=crop', true),
('prod_005', 'Labels & Stickers (500 pcs)', 'Custom die-cut labels and stickers with excellent adhesion. Various sizes available.', 4500, 'https://images.unsplash.com/photo-1609043152557-e300af52d480?w=500&h=500&fit=crop', true),
('prod_006', 'Flyers (500 copies)', 'Colorful flyers on premium paper stock. Perfect for distribution and promotion.', 6000, 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop', true);

-- Seed Services
INSERT INTO services (id, name, description, base_price, image, is_active) VALUES
('svc_001', 'Custom Design Service', 'Professional design consultation and creation for your printing needs. Our designers will work with you to bring your vision to life.', 25000, 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop', true),
('svc_002', 'Large Format Printing', 'High-quality large format printing for posters, signage, and displays. Sizes up to 1.6m width available.', 12000, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop', true),
('svc_003', 'Embossing & Foiling Service', 'Premium embossing and foiling services to add elegance to your printed materials. Perfect for premium branding.', 8000, 'https://images.unsplash.com/photo-1598928506790-4877a2a9a5d9?w=500&h=500&fit=crop', true),
('svc_004', 'Booklet & Catalog Printing', 'Professional booklet and catalog printing with perfect binding. Ideal for manuals, catalogs, and portfolios.', 18000, 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=500&fit=crop', true);

-- Seed Service Options
INSERT INTO service_options (id, service_id, name, label, values) VALUES
('opt_001', 'svc_001', 'complexity', 'Design Complexity', '["Simple", "Medium", "Complex"]'::jsonb),
('opt_002', 'svc_001', 'revisions', 'Number of Revisions', '["1", "3", "5", "Unlimited"]'::jsonb),
('opt_003', 'svc_002', 'size', 'Maximum Width', '["0.6m", "1.0m", "1.6m"]'::jsonb),
('opt_004', 'svc_002', 'material', 'Material Type', '["Glossy Photo Paper", "Matte Paper", "Canvas", "Vinyl"]'::jsonb),
('opt_005', 'svc_003', 'type', 'Finish Type', '["Gold Foil", "Silver Foil", "Embossing", "Combination"]'::jsonb),
('opt_006', 'svc_003', 'coverage', 'Coverage Area', '["Partial", "Full"]'::jsonb),
('opt_007', 'svc_004', 'pages', 'Page Count', '["8", "16", "24", "32"]'::jsonb),
('opt_008', 'svc_004', 'binding', 'Binding Type', '["Saddle Stitch", "Perfect Binding", "Spiral Binding"]'::jsonb);
