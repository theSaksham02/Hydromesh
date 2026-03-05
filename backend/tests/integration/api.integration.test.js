const request = require('supertest');
const { app } = require('../../src/index');

describe('API Integration Tests', () => {
  let authToken;

  // Login before tests
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'citizen@test.com',
        password: 'password123'
      });
    
    authToken = response.body.token;
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
    });
  });

  describe('Reports API', () => {
    describe('GET /api/reports', () => {
      it('should return list of reports', async () => {
        const response = await request(app)
          .get('/api/reports')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('POST /api/reports', () => {
      it('should create report when authenticated', async () => {
        const response = await request(app)
          .post('/api/reports')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            latitude: 51.5074,
            longitude: -0.1278,
            waterLevel: 'knee',
            description: 'Integration test report'
          })
          .expect(201);

        expect(response.body.water_level).toBe('knee');
      });

      it('should reject when not authenticated', async () => {
        await request(app)
          .post('/api/reports')
          .send({
            latitude: 51.5074,
            longitude: -0.1278,
            waterLevel: 'knee'
          })
          .expect(401);
      });
    });
  });

  describe('Emergency API', () => {
    describe('POST /api/emergency', () => {
      it('should create emergency request', async () => {
        const response = await request(app)
          .post('/api/emergency')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            latitude: 51.5074,
            longitude: -0.1278,
            description: 'Need help',
            priority: 'high'
          })
          .expect(201);

        expect(response.body.status).toBe('pending');
      });
    });
  });

  describe('Weather API', () => {
    describe('GET /api/weather/current', () => {
      it('should return weather data', async () => {
        const response = await request(app)
          .get('/api/weather/current')
          .query({ latitude: 51.5074, longitude: -0.1278 })
          .expect(200);

        expect(response.body).toBeDefined();
      });

      it('should reject without coordinates', async () => {
        await request(app)
          .get('/api/weather/current')
          .expect(400);
      });
    });
  });
});