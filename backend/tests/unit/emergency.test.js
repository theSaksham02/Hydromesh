const Emergency = require('../../src/models/emergency.model');

jest.mock('../../src/config/database', () => ({
  query: jest.fn()
}));

const { query } = require('../../src/config/database');

describe('Emergency Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create emergency request with pending status', async () => {
      const mockRequest = {
        request_id: '789',
        citizen_id: '123',
        status: 'pending',
        priority: 'high'
      };

      query.mockResolvedValue({ rows: [mockRequest] });

      const result = await Emergency.create({
        citizenId: '123',
        latitude: 51.5074,
        longitude: -0.1278,
        description: 'Need help',
        priority: 'high'
      });

      expect(result.status).toBe('pending');
    });
  });

  describe('assignResponder', () => {
    it('should update status to assigned', async () => {
      const mockRequest = {
        request_id: '789',
        responder_id: '456',
        status: 'assigned'
      };

      query.mockResolvedValue({ rows: [mockRequest] });

      const result = await Emergency.assignResponder('789', '456');

      expect(result.status).toBe('assigned');
      expect(result.responder_id).toBe('456');
    });
  });

  describe('updateStatus', () => {
    it('should update request status', async () => {
      const mockRequest = {
        request_id: '789',
        status: 'resolved'
      };

      query.mockResolvedValue({ rows: [mockRequest] });

      const result = await Emergency.updateStatus('789', 'resolved');

      expect(result.status).toBe('resolved');
    });
  });
});