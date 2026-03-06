const Report = require('../models/report.model');
const Emergency = require('../models/emergency.model');
const { getIO } = require('../config/socket');

// Helper to generate a random offset for coordinates (~ 1km to 5km)
const randomOffset = (base, range = 0.02) => base + (Math.random() - 0.5) * range;

// City coordinates for our 10 global regions
const cities = {
  london: { lat: 51.5074, lng: -0.1278 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  miami: { lat: 25.7617, lng: -80.1918 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  sydney: { lat: 35.2820, lng: 149.1287 },
  newyork: { lat: 40.7128, lng: -74.0060 },
  jakarta: { lat: -6.2088, lng: 106.8456 },
  manila: { lat: 14.5995, lng: 120.9842 },
  dhaka: { lat: -6.1751, lng: 106.8650 }, // Approximation
  venice: { lat: 45.4408, lng: 12.3155 }
};

const simulationController = {
  async runSimulation(req, res, next) {
    try {
      const { type, cityKey = 'london' } = req.body;
      const io = getIO();
      const baseLat = cities[cityKey]?.lat || 51.5074;
      const baseLng = cities[cityKey]?.lng || -0.1278;
      const userId = req.user.userId;

      res.status(200).json({ message: `Simulation ${type} initiated in ${cityKey}` });

      switch (type) {
        case 1: // Run 1: Flash Flood (Sudden Spike)
          for (let i = 0; i < 15; i++) {
            setTimeout(async () => {
              const report = await Report.create({
                userId,
                latitude: randomOffset(baseLat, 0.01),
                longitude: randomOffset(baseLng, 0.01),
                waterLevel: 'waist',
                description: '[SIMULATION] Flash flood detected! Rapid water rise.',
                photoUrl: null,
                voiceUrl: null
              });
              io.emit('new_report', report);
              
              if (i % 3 === 0) {
                const emergency = await Emergency.create({
                  citizenId: userId,
                  latitude: report.latitude,
                  longitude: report.longitude,
                  description: '[SIMULATION] Trapped by flash flood, need rescue!',
                  priority: 'high'
                });
                io.emit('new_emergency', emergency);
              }
            }, i * 500); // Fire every 500ms
          }
          break;

        case 2: // Run 2: Rising Tide (Gradual)
          const levels = ['ankle', 'knee', 'waist', 'chest', 'above_head'];
          for (let i = 0; i < 5; i++) {
            setTimeout(async () => {
              const report = await Report.create({
                userId,
                latitude: randomOffset(baseLat, 0.02),
                longitude: randomOffset(baseLng, 0.02),
                waterLevel: levels[i],
                description: `[SIMULATION] Water level steadily rising to ${levels[i]}`,
                photoUrl: null,
                voiceUrl: null
              });
              io.emit('new_report', report);
            }, i * 3000); // Fire every 3 seconds
          }
          break;

        case 3: // Run 3: Mass Evacuation (Route Stress-Test)
          // Just spawns many reports in a circle to simulate a hazard zone
          for (let i = 0; i < 20; i++) {
            setTimeout(async () => {
              const angle = (i / 20) * Math.PI * 2;
              const radius = 0.015;
              const report = await Report.create({
                userId,
                latitude: baseLat + Math.sin(angle) * radius,
                longitude: baseLng + Math.cos(angle) * radius,
                waterLevel: 'chest',
                description: '[SIMULATION] Evacuation boundary',
                photoUrl: null,
                voiceUrl: null
              });
              io.emit('new_report', report);
            }, i * 200);
          }
          break;

        case 4: // Run 4: Responder Coordination
          for (let i = 0; i < 5; i++) {
            setTimeout(async () => {
              const emergency = await Emergency.create({
                citizenId: userId,
                latitude: randomOffset(baseLat, 0.03),
                longitude: randomOffset(baseLng, 0.03),
                description: '[SIMULATION] SOS Beacon deployed.',
                priority: 'urgent'
              });
              io.emit('new_emergency', emergency);
              
              // Simulate responder accepting after 2 seconds
              setTimeout(async () => {
                 const accepted = await Emergency.assignResponder(emergency.request_id, userId);
                 io.emit('help_accepted', accepted);
              }, 2000);
            }, i * 2000);
          }
          break;

        case 5: // Run 5: Global Weather Anomaly
          // Spawns reports across multiple cities simultaneously
          const targetCities = Object.keys(cities).slice(0, 5);
          targetCities.forEach((city, index) => {
             setTimeout(async () => {
                const report = await Report.create({
                  userId,
                  latitude: cities[city].lat,
                  longitude: cities[city].lng,
                  waterLevel: 'above_head',
                  description: `[SIMULATION] Extreme weather anomaly in ${city}!`,
                  photoUrl: null,
                  voiceUrl: null
                });
                io.emit('new_report', report);
             }, index * 1000);
          });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Simulation error:', error);
      // We don't call next(error) here because we already sent a 200 OK response to avoid timeout
    }
  }
};

module.exports = simulationController;