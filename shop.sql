CREATE TABLE Employee
(
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
    UPC                 VARCHAR(50) PRIMARY KEY,
--     UPC_prom            VARCHAR(13)    NULL,
    id_product          INTEGER        NOT NULL,
    selling_price       DECIMAL(13, 4) NOT NULL,
    quantity            INT            NOT NULL,
    promotional_product BOOLEAN        NOT NULL,
--     FOREIGN KEY (UPC_prom) REFERENCES Sale (UPC) ON UPDATE CASCADE
--         ON DELETE SET NULL,
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
    zip             VARCHAR(9)  NOT NULL,
    percent         INTEGER     NOT NULL
);

CREATE TABLE Checks
(
    check_number Varchar(10) PRIMARY KEY,
    id_employee  Varchar(10)    NOT NULL,
    card_number  Varchar(13)    NULL,
    print_date   DATE       NOT NULL,
    sum_total    DECIMAL(13, 4) NOT NULL,
    vat          DECIMAL(13, 4) NOT NULL,
    FOREIGN KEY (id_employee) REFERENCES Employee (id_employee) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (card_number) REFERENCES Customer_Card (card_number) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE Sale
(
    UPC            VARCHAR(12) NOT NULL,
    check_number   VARCHAR(10) NOT NULL,
    product_number INT            NOT NULL,
    selling_price  DECIMAL(13, 4) NOT NULL,
    FOREIGN KEY (UPC) REFERENCES Store_Product (UPC) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (check_number) REFERENCES Checks (check_number) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (UPC, check_number)
);


-- Insert data into Employee table
INSERT INTO Employee (id_employee, empl_surname, empl_name, empl_patronymic, empl_role, salary, date_of_birth, date_of_start, phone_number, city, street, zip_code)
VALUES
    ('E001', 'Smith', 'John', 'James', 'Manager', 5000.00, '1990-05-15', '2022-01-01', '123-456-7890', 'New York', 'Broadway', '10001'),
    ('E002', 'Johnson', 'Emily', 'Grace', 'Manager', 3000.00, '1992-08-20', '2022-02-01', '987-654-3210', 'Los Angeles', 'Main St', '90001'),
    ('E003', 'Williams', 'Robert', 'Andrew', 'Cashier', 2500.00, '1995-03-10', '2022-03-01', '456-789-0123', 'Chicago', 'Elm St', '60601'),
    ('E004', 'Jones', 'Mary', 'Elizabeth', 'Cashier', 2000.00, '1998-11-25', '2022-04-01', '789-012-3456', 'San Francisco', 'Market St', '94102'),
    ('E005', 'Brown', 'David', 'Michael', 'Cashier', 3500.00, '1993-07-05', '2022-05-01', '012-345-6789', 'Houston', 'Oak St', '77001');

-- Insert data into Category table
INSERT INTO Category (category_number, category_name)
VALUES
    (1, 'Electronics'),
    (2, 'Clothing'),
    (3, 'Books'),
    (4, 'Furniture'),
    (5, 'Toys');

-- Insert data into Product table
INSERT INTO Product (id_product, category_number, product_name, characteristics)
VALUES
    (1, 1, 'Laptop', '16GB RAM, 512GB SSD'),
    (2, 1, 'Smartphone', '6.5-inch display, 128GB storage'),
    (3, 2, 'T-shirt', 'Cotton fabric, black color'),
    (4, 2, 'Jeans', 'Blue denim, slim fit'),
    (5, 3, 'Novel', 'Science fiction, paperback');

-- Insert data into Store_Product table
INSERT INTO Store_Product (UPC, id_product, selling_price, quantity, promotional_product)
VALUES
    ('123456789', 1, 1500.00, 10, FALSE),
    ('987654321', 2, 800.00, 20, TRUE),
    ('456789123', 3, 20.00, 50, FALSE),
    ('654321987', 4, 50.00, 30, FALSE),
    ('789123456', 5, 15.00, 40, TRUE);

-- Insert data into Customer_Card table
INSERT INTO Customer_Card (card_number, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip, percent)
VALUES
    ('C001', 'Doe', 'Alice', 'Marie', '456-789-0123', 'Chicago', 'Elm St', '60601', 5),
    ('C002', 'Brown', 'James', 'Michael', '789-012-3456', 'San Francisco', 'Market St', '94102', 10),
    ('C003', 'Williams', 'Emma', 'Grace', '123-456-7890', 'New York', 'Broadway', '10001', 7),
    ('C004', 'Taylor', 'Olivia', 'Sophia', '987-654-3210', 'Los Angeles', 'Main St', '90001', 8),
    ('C005', 'Anderson', 'Noah', 'William', '012-345-6789', 'Houston', 'Oak St', '77001', 6);

-- Insert data into Checks table
INSERT INTO Checks (check_number, id_employee, card_number, print_date, sum_total, vat)
VALUES
    ('CH001', 'E001', 'C001', '2022-01-01', 150.00, 15.00),
    ('CH002', 'E002', 'C002', '2022-01-02', 200.00, 20.00),
    ('CH003', 'E003', 'C003', '2022-01-03', 120.00, 12.00),
    ('CH004', 'E004', 'C004', '2022-01-04', 180.00, 18.00),
    ('CH005', 'E005', 'C005', '2022-01-05', 220.00, 22.00);

-- Insert data into Sale table
INSERT INTO Sale (UPC, check_number, product_number, selling_price)
VALUES
    ('123456789', 'CH001', 1, 1500.00),
    ('987654321', 'CH001', 2, 800.00),
    ('456789123', 'CH002', 3, 20.00),
    ('654321987', 'CH002', 4, 50.00),
    ('789123456', 'CH003', 5, 15.00);






