const Report = require('../../src/models/report.model');

jest.mock('../../src/config/database', () => ({
  query: jest.fn()
}));

const { query } = require('../../src/config/database');

describe('Report Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new flood report', async () => {
      const mockReport = {
        report_id: '456',
        user_id: '123',
        latitude: 51.5074,
        longitude: -0.1278,
        water_level: 'knee',
        description: 'Test flood'
      };

      query.mockResolvedValue({ rows: [mockReport] });

      const result = await Report.create({
        userId: '123',
        latitude: 51.5074,
        longitude: -0.1278,
        waterLevel: 'knee',
        description: 'Test flood'
      });

      expect(result).toEqual(mockReport);
      expect(query).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const mockReports = [
        { report_id: '1', water_level: 'ankle' },
        { report_id: '2', water_level: 'knee' }
      ];

      query.mockResolvedValue({ rows: mockReports });

      const result = await Report.findAll();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockReports);
    });
  });

  describe('findNearby', () => {
    it('should return reports within radius', async () => {
      const mockReports = [
        { report_id: '1', distance_km: 1.5 },
        { report_id: '2', distance_km: 3.2 }
      ];

      query.mockResolvedValue({ rows: mockReports });

      const result = await Report.findNearby(51.5074, -0.1278, 5);

      expect(result).toHaveLength(2);
      expect(query).toHaveBeenCalledWith(
        expect.stringContaining('ST_DWithin'),
        [51.5074, -0.1278, 5]
      );
    });
  });
});