CREATE TABLE Employee
(
    email           VARCHAR(100)   NOT NULL,
    password        VARCHAR(64)    NOT NULL,
    id_employee     VARCHAR(10) PRIMARY KEY,
    empl_surname    VARCHAR(50)    NOT NULL,
    empl_name       VARCHAR(50)    NOT NULL,
    empl_patronymic VARCHAR(50)    NOT NULL,
    empl_role       VARCHAR(10)    NOT NULL,
    salary          DECIMAL(13, 4) NOT NULL,
    date_of_birth   DATE           NOT NULL,
    date_of_start   DATE           NOT NULL,
    phone_number    VARCHAR(13)    NOT NULL,
    city            VARCHAR(50)    NOT NULL,
    street          VARCHAR(50)    NOT NULL,
    zip_code        VARCHAR(9)     NOT NULL
);

CREATE TABLE Category
(
    category_number INT PRIMARY KEY,
    category_name   VARCHAR(50) NOT NULL
);

CREATE TABLE Product
(
    id_product      Int PRIMARY KEY,
    category_number INT          NOT NULL,
    product_name    VARCHAR(50)  NOT NULL,
    characteristics VARCHAR(100) NOT NULL,
    FOREIGN KEY (category_number) REFERENCES Category (category_number) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Store_Product
(
    UPC                 VARCHAR(12) PRIMARY KEY,
    UPC_prom            VARCHAR(12)    NULL,
    id_product          INTEGER        NOT NULL,
    selling_price       DECIMAL(13, 4) NOT NULL,
    products_number     INT            NOT NULL,
    promotional_product BOOLEAN        NOT NULL,
    FOREIGN KEY (UPC_prom) REFERENCES Store_Product (UPC) ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY (id_product) REFERENCES Product (id_product) ON UPDATE CASCADE
        ON DELETE NO ACTION
);

CREATE TABLE Customer_Card
(
    card_number     VARCHAR(13) PRIMARY KEY,
    cust_surname    VARCHAR(50) NOT NULL,
    cust_name       VARCHAR(50) NOT NULL,
    cust_patronymic VARCHAR(50) NOT NULL,
    phone_number    VARCHAR(13) NOT NULL,
    city            VARCHAR(50) NOT NULL,
    street          VARCHAR(50) NOT NULL,
    zip_code        VARCHAR(9)  NOT NULL,
    percent         INTEGER     NOT NULL
);

CREATE TABLE Checks
(
    check_number Varchar(10) PRIMARY KEY,
    id_employee  Varchar(10)    NOT NULL,
    card_number  Varchar(13)    NULL,
    print_date   DATE           NOT NULL,
    sum_total    DECIMAL(13, 4) NOT NULL,
    vat          DECIMAL(13, 4) NOT NULL,
    FOREIGN KEY (id_employee) REFERENCES Employee (id_employee) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (card_number) REFERENCES Customer_Card (card_number) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE Sale
(
    UPC            VARCHAR(12)    NOT NULL,
    check_number   VARCHAR(10)    NOT NULL,
    product_number INT            NOT NULL,
    selling_price  DECIMAL(13, 4) NOT NULL,
    FOREIGN KEY (UPC) REFERENCES Store_Product (UPC) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (check_number) REFERENCES Checks (check_number) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (UPC, check_number)
);


-- Insert data into Employee table
INSERT INTO Employee (email, password, id_employee, empl_surname, empl_name, empl_patronymic, empl_role, salary,
                      date_of_birth,
                      date_of_start, phone_number, city, street, zip_code)
VALUES ('smith@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3utl3hkVsgoD2xg8eMLUUtxeTio4So726', 'E001', 'Smith', 'John',
        'James', 'Manager', 6000.00, '1990-05-15', '2022-01-01', '123-456-7890', 'New York', 'Broadway',
        '10001'), /*7878787878*/
       ('semytskyi@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3uPLDo36PNZC95ZhoIa8HKxtlVYUlTxZW', 'E002', 'Semytskyi',
        'Oleksandr', 'Yaroslavovish', 'Manager', 10000.00, '2005-09-05', '2022-01-01', '+380967784563', 'Kiyv',
        'obolonska', '07400'), /*1234567890*/
       ('synak@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3uCL2T7m.Mf77.35SyAuPNpxJmaJQGnoK', 'E003', 'Synak',
        'Oleksandr', 'Yaroslavovish', 'Manager', 5000.00, '1990-02-28', '2022-04-05', '+380970102032', 'Irpin',
        'Central', '61000'), /*87654321*/
       ('zakhar@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3uPx8U4mwD2HMV3XRUTam6XRWa26VodRG', 'E004', 'Litvinchuk',
        'Zakhar', 'Viktorovich', 'Manager', 5000.00, '2005-09-30', '2022-04-20', '+380978330997', 'Rivne', 'Central',
        '15785'), /*30092005*/
       ('ivanov@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3usZtx4TV4ZCXvRMj7o.ExLbR1fvlHzqa', 'E005', 'Ivanov',
        'Petro', 'Oleksiyovych', 'Cashier', 1000.00, '1988-12-20', '2022-02-15', '+380501234567', 'Kyiv', 'Shevchenka',
        '03150'), /*12345678*/
       ('petrenko@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3u1MPC4tpGFFErJlPIi/p37JdwULdw3Ne', 'E006', 'Petrenko',
        'Maria', 'Olehivna', 'Cashier', 1500.00, '1995-07-10', '2022-03-10', '+380504554568', 'Lviv', 'Bandery',
        '79000'), /*2020202020*/
       ('kachynska@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3u7KaKJKuDHZVAgAYRGcdZVCUJhVUuifq', 'E007', 'Kachynska',
        'Iryna', 'Vasylivna', 'Cashier', 2000.00, '2005-05-18', '2022-04-01', '789-012-3456', 'Gatne', 'Kvitneva',
        '12005'), /*32165487*/
       ('kovalenko@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3usZtx4TV4ZCXvRMj7o.ExLbR1fvlHzqa', 'E008',
        'Kovalenko', 'Andrii', 'Viktorovych', 'Cashier', 1500.00, '1990-02-28', '2022-04-05', '+380970102032',
        'Kharkiv', 'Central', '61000'), /*12345678*/
       ('grace@ukr.net.ua', '$2a$10$c7XAOdvq40jde1A5nUvJ3uKMbLHFiFvoTwDWXfJGKlfdmReSlyJkq', 'E009', 'Grace',
        'Emily', 'Grace', 'Cashier', 3000.00, '1992-08-20', '2022-02-01', '987-654-3210', 'Los Angeles', 'Main St',
        '90001'), /*123456789*/
       ('genocidArmian@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3uj5AvybDZm/eSmonRDePVEsnT9p1kN/S', 'E0010', 'Williams',
        'Robert', 'Andrew', 'Cashier', 2500.00, '1995-03-10', '2022-03-01', '456-789-0123', 'Chicago', 'Elm St',
        '60601'), /*12345678910*/
       ('jones@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3u8mNZAHDj56shzUa2OhI4uEzctmj1Xtu', 'E0011', 'Jones',
        'Mary', 'Elizabeth', 'Cashier', 2000.00, '1998-11-25', '2022-04-01', '789-012-1252', 'San Francisco',
        'Market St', '94102'), /*12345678911*/
       ('brown@gmail.com', '$2a$10$c7XAOdvq40jde1A5nUvJ3u/bpnq/MRSqMOZ10RIW9ZT3vxO7jhzhS', 'E0012', 'Brown',
        'David', 'Michael', 'Manager', 3500.00, '1993-07-05', '2022-05-01', '012-345-6789', 'Houston', 'Oak St',
        '77001');
/*12345678912*/

-- Insert data into Category table
INSERT INTO Category (category_number, category_name)
VALUES (1, 'Electronics'),
       (2, 'Clothing'),
       (3, 'Books'),
       (4, 'Furniture'),
       (5, 'Toys');

-- Insert data into Product table
INSERT INTO Product (id_product, category_number, product_name, characteristics)
VALUES (1, 1, 'Laptop', '16GB RAM, 512GB SSD'),
       (2, 1, 'Smartphone', '6.5-inch display, 128GB storage'),
       (3, 2, 'T-shirt', 'Cotton fabric, black color'),
       (4, 2, 'Jeans', 'Blue denim, slim fit'),
       (5, 3, 'Novel', 'Science fiction, paperback'),
       (6, 1, 'Desktop Computer', '32GB RAM, 1TB HDD, Intel Core i7 processor'),
       (7, 1, 'Tablet', '10.2-inch display, 256GB storage, Apple A12 chip'),
       (8, 2, 'Dress', 'Floral print, midi length, polyester material'),
       (9, 2, 'Sneakers', 'White color, rubber sole, lace-up closure'),
       (10, 3, 'Cookbook', 'International recipes, hardcover edition'),
       (11, 4, 'Sofa', '3-seater, fabric upholstery, wooden frame'),
       (12, 4, 'Dining Table', 'Solid wood construction, extendable, seats 6'),
       (13, 5, 'Board Game', 'Strategy game for 2-4 players, ages 8 and up'),
       (14, 5, 'Puzzle', '1000 pieces, scenic landscape design'),
       (15, 1, 'Wireless Headphones', 'Over-ear design, Bluetooth connectivity, 40-hour battery life'),
       (16, 5, 'Educational Puzzle', 'Alphabet and numbers, wooden material, child-safe paint'),
       (17, 5, 'Dollhouse', 'Wooden construction, furnished rooms, 3-storey design'),
       (18, 5, 'Remote Control Car', '1:18 scale, off-road capability, rechargeable battery'),
       (19, 5, 'Building Blocks', 'Set of 100 pieces, assorted colors, compatible with major brands'),
       (20, 3, 'Thriller', 'Suspenseful plot, gripping narrative, ebook format'),
       (21, 3, 'Fantasy Novel', 'Magic and adventure, hardcover edition'),
       (22, 3, 'Biography', 'Life story of a famous personality, illustrated, paperback'),
       (23, 2, 'Hoodie', 'Cotton blend fabric, kangaroo pocket, drawstring hood'),
       (24, 2, 'Jacket', 'Waterproof, windproof, insulated lining, zip closure'),
       (25, 2, 'Skirt', 'A-line silhouette, knee-length, plaid pattern');
-- Insert data into Store_Product table
INSERT INTO Store_Product (UPC, UPC_prom, id_product, selling_price, products_number, promotional_product)
VALUES ('SP002', NULL, 1, 4000.00, 1000, TRUE),
       ('SP001', 'SP002', 1, 5000.00, 1000, FALSE),
       ('SP004', NULL, 2, 2000.00, 1200, TRUE),
       ('SP003', 'SP002', 2, 2500.00, 1200, FALSE),
       ('SP006', NULL, 7, 2736.00, 20, TRUE),
       ('SP005', 'SP006', 7, 3420.00, 1200, FALSE),
       ('SP007', NULL, 6, 8000.00, 20, FALSE),

       ('SP009', NULL, 3, 16.00, 20, TRUE),
       ('SP008', 'SP009', 3, 20.00, 7000, FALSE),
       ('SP0011', NULL, 4, 80.00, 200, TRUE),
       ('SP0010', 'SP0011', 4, 100.00, 7000, FALSE),

       ('SP0013', NULL, 23, 92.00, 3, TRUE),
       ('SP0012', 'SP0013', 23, 115.00, 30, FALSE),
       ('SP0014', NULL, 8, 45.00, 200, FALSE),
       ('SP0032', NULL, 24, 73.00, 153, FALSE),
       ('SP0033', NULL, 13, 10.50, 20, FALSE),
       ('SP0017', NULL, 9, 45.50, 20, FALSE),


       ('SP0015', NULL, 19, 96.00, 1, TRUE),
       ('SP0016', 'SP0015', 19, 120.00, 96, FALSE),
       ('SP0018', NULL, 17, 800.00, 5, TRUE),
       ('SP0029', 'SP0018', 17, 1000.00, 70, FALSE),
       ('SP0019', NULL, 9, 45.50, 20, FALSE),
       ('SP0020', NULL, 13, 47.25, 2, FALSE),


       ('SP0022', NULL, 22, 4.00, 30, TRUE),
       ('SP0021', 'SP0022', 22, 5.00, 30, FALSE),
       ('SP0024', NULL, 20, 12.00, 2, TRUE),
       ('SP0023', 'SP0024', 20, 15.00, 12, FALSE),
       ('SP0028', NULL, 21, 7.25, 156, FALSE),
       ('SP0031', NULL, 25, 60.00, 3, TRUE),
       ('SP0030', 'SP0031', 25, 75.00, 300, FALSE),
       ('SP0027', NULL, 11, 1680.00, 3, TRUE),
       ('SP0026', 'SP0027', 11, 2100.00, 3, FALSE);

-- Insert data into Customer_Card table
INSERT INTO Customer_Card (card_number, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip_code,
                           percent)
VALUES ('C001', 'Doe', 'Alice', 'Marie', '456-789-0123', 'Chicago', 'Elm St', '60601', 5),
       ('C002', 'Brown', 'James', 'Michael', '789-012-3456', 'San Francisco', 'Market St', '94102', 10),
       ('C003', 'Williams', 'Emma', 'Grace', '123-456-7890', 'New York', 'Broadway', '10001', 8),
       ('C004', 'Taylor', 'Olivia', 'Sophia', '987-654-3210', 'Los Angeles', 'Main St', '90001', 8),
       ('C005', 'Anderson', 'Noah', 'William', '012-345-6789', 'Houston', 'Oak St', '77001', 5),
       ('C006', 'Depp', 'Johnny', 'David', '567-890-1234', 'Caribbean Islands', 'Cedar St', '19101', 10),
       ('C007', 'Lopez', 'Isabella', 'Sofia', '234-567-8901', 'Miami', 'Palm St', '33101', 10),
       ('C008', 'Martinez', 'Alexander', 'David', '345-678-9012', 'Dallas', 'Maple St', '75201', 10),
       ('C009', 'Hernandez', 'Mia', 'Victoria', '456-789-0123', 'Phoenix', 'Pine St', '85001', 10);

-- Insert data into Checks table
INSERT INTO Checks (check_number, id_employee, card_number, print_date, sum_total, vat)
VALUES ('CH001', 'E005', 'C001', '2022-01-01', 1984.74, 348.20),
       ('CH002', 'E005', 'C002', '2022-01-02', 200.00, 20.00),
        ('CH003', 'E005', 'C003', '2022-01-03', 120.00, 12.00),
        ('CH004', 'E005', 'C004', '2022-01-04', 180.00, 18.00),
        ('CH005', 'E005', 'C005', '2022-01-05', 220.00, 22.00),
       ('CH006', 'E006', 'C007', '2024-02-04', 180.00, 18.00),
       ('CH007', 'E007', 'C008', '2024-02-04', 180.00, 18.00),
       ('CH008', 'E007', 'C008', '2024-04-25', 180.00, 18.00);


-- Insert data into Sale table
INSERT INTO Sale (UPC, check_number, product_number, selling_price)
VALUES ('SP0016', 'CH001', 2, 10.50),
       ('SP0022', 'CH001', 10, 4.00),
       ('SP0027', 'CH001', 1, 1680.00);
 --       ('987654321', 'CH001', 2, 800.00),
 --       ('456789123', 'CH002', 3, 20.00),
 --       ('654321987', 'CH002', 4, 50.00),
--        ('789123456', 'CH003', 5, 15.00);