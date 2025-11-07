PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS carts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id INTEGER,
  product_id INTEGER,
  qty INTEGER,
  price_at_time REAL,
  FOREIGN KEY(cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total REAL,
  receipt TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Insert items only if that product name does not already exist.
-- This prevents duplicates while allowing every product to be inserted.

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Headphones', 129.99, 'Wireless over-ear with active noise cancellation', 'https://picsum.photos/seed/headphones/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Headphones');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Earbuds', 59.99, 'True wireless earbuds, 24h battery', 'https://picsum.photos/seed/earbuds/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Earbuds');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe T-Shirt', 19.99, 'Comfort cotton tee', 'https://picsum.photos/seed/tshirt/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe T-Shirt');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Mug', 9.99, 'Ceramic mug', 'https://picsum.photos/seed/mug/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Mug');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Backpack', 49.99, 'Water-resistant backpack', 'https://picsum.photos/seed/backpack/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Backpack');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Charger', 14.99, 'Fast USB-C charger', 'https://picsum.photos/seed/charger/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Charger');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Laptop Sleeve', 24.99, 'Neoprene laptop sleeve', 'https://picsum.photos/seed/sleeve/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Laptop Sleeve');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Sunglasses', 39.99, 'Polarized sunglasses', 'https://picsum.photos/seed/sunglasses/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Sunglasses');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Notebook', 6.99, 'Lined notebook, 100 pages', 'https://picsum.photos/seed/notebook/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Notebook');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Water Bottle', 12.99, 'Insulated stainless steel bottle', 'https://picsum.photos/seed/bottle/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Water Bottle');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Smartwatch', 149.99, 'Fitness and notification tracking', 'https://picsum.photos/seed/smartwatch/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Smartwatch');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Bluetooth Speaker', 79.99, 'Portable waterproof speaker', 'https://picsum.photos/seed/speaker/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Bluetooth Speaker');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Gaming Mouse', 29.99, 'Ergonomic RGB gaming mouse', 'https://picsum.photos/seed/mouse/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Gaming Mouse');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Mechanical Keyboard', 89.99, 'Backlit mechanical keyboard', 'https://picsum.photos/seed/keyboard/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Mechanical Keyboard');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Power Bank', 39.99, '10,000mAh portable power bank', 'https://picsum.photos/seed/powerbank/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Power Bank');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Hoodie', 29.99, 'Soft fleece hoodie with logo', 'https://picsum.photos/seed/hoodie/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Hoodie');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Cap', 14.99, 'Adjustable cotton cap', 'https://picsum.photos/seed/cap/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Cap');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Mouse Pad', 7.99, 'Non-slip surface mouse pad', 'https://picsum.photos/seed/mousepad/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Mouse Pad');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Tablet Stand', 19.99, 'Adjustable aluminum stand', 'https://picsum.photos/seed/stand/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Tablet Stand');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Cable Organizer', 5.99, 'Silicone magnetic cable clips', 'https://picsum.photos/seed/cable/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Cable Organizer');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Desk Lamp', 34.99, 'Rechargeable LED desk lamp', 'https://picsum.photos/seed/lamp/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Desk Lamp');

INSERT INTO products (name, price, description, image)
SELECT 'Vibe Portable SSD', 99.99, '500GB USB-C portable SSD', 'https://picsum.photos/seed/ssd/600/400'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Vibe Portable SSD');
