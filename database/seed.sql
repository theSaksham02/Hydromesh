-- Sample users
INSERT INTO users (name, email, password, role, phone) VALUES
('Test Citizen', 'citizen@test.com', '$2a$10$X7VYKvBXCVJ.tZz0QZxKu.qY9MZ.lrqVXVYZvKN7ZxZxZxZxZxZx', 'citizen', '1234567890'),
('Test Responder', 'responder@test.com', '$2a$10$X7VYKvBXCVJ.tZz0QZxKu.qY9MZ.lrqVXVYZvKN7ZxZxZxZxZxZx', 'responder', '0987654321');

-- Sample flood reports
INSERT INTO flood_reports (user_id, latitude, longitude, water_level, description) VALUES
((SELECT user_id FROM users WHERE email = 'citizen@test.com'), 51.5074, -0.1278, 'knee', 'Flooding near main street'),
((SELECT user_id FROM users WHERE email = 'citizen@test.com'), 51.5080, -0.1290, 'ankle', 'Minor flooding in park area');