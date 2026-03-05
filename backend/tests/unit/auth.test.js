const User = require('../../src/models/user.model');

// Mock database
jest.mock('../../src/config/database', () => ({
  query: jest.fn()
}));

const { query } = require('../../src/config/database');

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return user when email exists', async () => {
      const mockUser = {
        user_id: '123',
        name: 'Test User',
        email: 'test@test.com',
        role: 'citizen'
      };

      query.mockResolvedValue({ rows: [mockUser] });

      const result = await User.findByEmail('test@test.com');

      expect(query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = $1',
        ['test@test.com']
      );
      expect(result).toEqual(mockUser);
    });

    it('should return undefined when email does not exist', async () => {
      query.mockResolvedValue({ rows: [] });

      const result = await User.findByEmail('nonexistent@test.com');

      expect(result).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should return user when id exists', async () => {
      const mockUser = {
        user_id: '123',
        name: 'Test User',
        email: 'test@test.com'
      };

      query.mockResolvedValue({ rows: [mockUser] });

      const result = await User.findById('123');

      expect(result).toEqual(mockUser);
    });
  });
});