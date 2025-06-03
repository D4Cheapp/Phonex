CREATE DATABASE Phonex;

CREATE TABLE IF NOT EXISTS role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS shop (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supplier (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supply_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price INTEGER NOT NULL,
  product_category_id INTEGER,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_category_id) REFERENCES product_category (id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  shop_id INTEGER,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS supply (
  id SERIAL PRIMARY KEY,
  supplier_id INTEGER NOT NULL,
  shop_id INTEGER NOT NULL,
  supply_status_id INTEGER NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES supplier (id) ON DELETE CASCADE,
  FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE,
  FOREIGN KEY (supply_status_id) REFERENCES supply_status (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sale (
  id SERIAL PRIMARY KEY,
  shop_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_supplier (
  id SERIAL PRIMARY KEY,
  price INTEGER NOT NULL,
  is_primary BOOLEAN NOT NULL,
  shop_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  supplier_id INTEGER NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES supplier (id) ON DELETE CASCADE,
  UNIQUE (product_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS product_characteristic (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS supply_item (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  supply_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (supply_id) REFERENCES supply (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sale_item (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  sale_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sale (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS warehouse_product (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  shop_id INTEGER NOT NULL,
  created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_product_category ON product (product_category_id);
CREATE INDEX IF NOT EXISTS idx_product_supplier_product ON product_supplier (product_id);
CREATE INDEX IF NOT EXISTS idx_product_supplier_shop ON product_supplier (shop_id);
CREATE INDEX IF NOT EXISTS idx_product_supplier_supplier ON product_supplier (supplier_id);
CREATE INDEX IF NOT EXISTS idx_product_characteristic_product ON product_characteristic (product_id);
CREATE INDEX IF NOT EXISTS idx_sale_item_sale ON sale_item (sale_id);
CREATE INDEX IF NOT EXISTS idx_supply_item_supply ON supply_item (supply_id);
CREATE INDEX IF NOT EXISTS idx_warehouse_product_product ON warehouse_product (product_id);

INSERT INTO role (name) VALUES 
('ADMIN'),
('MANAGER'),
('CASHIER');

INSERT INTO supply_status (name) VALUES 
('PENDING'),
('ACCEPTED'),
('REJECTED');

-- Password: 12345
INSERT INTO "user" (name, email, password, role_id) VALUES 
('admin', 'admin@admin.com', '$2b$12$D7.nB9bPHS2xT9kczlFIzewOaTRAhWvAR70bgkgw92h02y/JQTRnO', 1);
