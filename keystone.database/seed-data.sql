-- Sample data for Foundation Lists application
-- This script adds sample lists and list items to the database

-- Insert sample lists
INSERT INTO lists (id, name, description, userId, createdAt, updatedAt) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Shopping List', 'Items to buy at the grocery store', 'user_32bzHGVhYtMEzdI5I1R27X2Lnkp', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Work Tasks', 'Tasks to complete this week', 'user_32bzHGVhYtMEzdI5I1R27X2Lnkp', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Books to Read', 'Reading list for this year', 'user_32bzHGVhYtMEzdI5I1R27X2Lnkp', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'Home Improvement', 'Projects around the house', 'user_32bzHGVhYtMEzdI5I1R27X2Lnkp', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'Travel Planning', 'Things to do for upcoming trip', 'user_32bzHGVhYtMEzdI5I1R27X2Lnkp', NOW(), NOW());

-- Insert sample list items for Shopping List
INSERT INTO list_items (id, name, completed, listId, createdAt, updatedAt) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Milk', 0, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440002', 'Bread', 1, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440003', 'Eggs', 0, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440004', 'Apples', 0, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440005', 'Chicken Breast', 1, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Insert sample list items for Work Tasks
INSERT INTO list_items (id, name, completed, listId, createdAt, updatedAt) VALUES
('660e8400-e29b-41d4-a716-446655440006', 'Review PR #123', 0, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440007', 'Update documentation', 0, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440008', 'Team meeting prep', 1, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440009', 'Code review for new feature', 0, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440010', 'Deploy to staging', 1, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW());

-- Insert sample list items for Books to Read
INSERT INTO list_items (id, name, completed, listId, createdAt, updatedAt) VALUES
('660e8400-e29b-41d4-a716-446655440011', 'Clean Code', 0, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440012', 'Design Patterns', 0, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440013', 'System Design Interview', 1, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440014', 'The Pragmatic Programmer', 0, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440015', 'Refactoring', 0, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Insert sample list items for Home Improvement
INSERT INTO list_items (id, name, completed, listId, createdAt, updatedAt) VALUES
('660e8400-e29b-41d4-a716-446655440016', 'Paint living room', 0, '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440017', 'Fix leaky faucet', 1, '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440018', 'Install new light fixtures', 0, '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440019', 'Organize garage', 0, '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW());

-- Insert sample list items for Travel Planning
INSERT INTO list_items (id, name, completed, listId, createdAt, updatedAt) VALUES
('660e8400-e29b-41d4-a716-446655440020', 'Book flights', 1, '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440021', 'Reserve hotel', 0, '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440022', 'Plan itinerary', 0, '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440023', 'Pack suitcase', 0, '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440024', 'Get travel insurance', 1, '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW());

-- Verify the data was inserted
SELECT 'Lists created:' as info;
SELECT id, name, description, userId FROM lists;

SELECT 'List items created:' as info;
SELECT li.id, li.name, li.completed, l.name as list_name 
FROM list_items li 
JOIN lists l ON li.listId = l.id 
ORDER BY l.name, li.name;
