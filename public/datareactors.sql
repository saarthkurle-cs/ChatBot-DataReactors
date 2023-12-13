-- Create the users table with userid and address columns
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(10)
);

INSERT INTO users (userid, username, password) VALUES
(1, 'skurle@sfsu.edu', 'password'),
(2, 'xiawang', 'password'),
(3, 'joshgonzo', 'working'),
(4, 'seandiaz', '12345678'),


-- Create the inventory table
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price INT,
    in_stock INT
);

-- Insert data into the inventory table
INSERT INTO inventory (name, description, price, in_stock) VALUES
('2019 BMW i3', 'The 2019 BMW i3 is an electric car that seats up to four. It offers a driving range of up to 153 miles, according to the EPA, and a range-extending gas engine is optional. The i3 has rear-wheel drive, and competitors include the Nissan Leaf, Volkswagen e-Golf and Chevrolet Bolt EV.', 40000, 5),
('2022 Tesla Model S', 'The 2022 Tesla Model S is a high-performance electric sedan known for its impressive acceleration and long-range capabilities. It features advanced technology, autopilot capabilities, and a luxurious interior. Competitors include the Porsche Taycan and Lucid Air.', 80000, 8),
('2023 Chevy Bolt EV', 'The 2023 Chevy Bolt EV is a compact electric car with a long range. It offers practicality with a spacious interior and cargo space. The Bolt EV is known for its affordability and efficiency. Competitors include the Nissan Leaf and Hyundai Kona Electric.', 35000, 10),
('2024 Ford Mustang Mach E', 'The 2024 Ford Mustang Mach E is an electric SUV that combines the iconic Mustang styling with the benefits of electric mobility. It offers a sporty feel, spacious interior, and advanced tech features. Competitors include the Tesla Model Y and Audi e-tron.', 45000, 7),
('2023 Hyundai Kona', 'The 2023 Hyundai Kona is a compact SUV with hybrid technology. It blends a stylish design with fuel efficiency, making it a popular choice for urban driving. The Kona offers a comfortable interior and a range of safety features. Competitors include the Toyota RAV4 Hybrid and Honda CR-V Hybrid.', 30000, 12),
('2023 Rivian R1T', 'The 2023 Rivian R1T is an electric pickup truck designed for adventurous journeys. It features rugged off-road capabilities, a spacious cabin, and dual electric motors for impressive performance. Competitors include the Tesla Cybertruck and GMC Hummer EV.', 70000, 3);

CREATE TABLE cart (
    userid INT,
    productid INT,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (productid) REFERENCES inventory(id)
);