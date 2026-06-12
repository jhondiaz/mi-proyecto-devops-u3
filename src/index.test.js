const request = require('supertest');
const { app } = require('./index');

describe('GET /', () => {
  it('should respond with a 200 status code and JSON object', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('DevSecOps Lab API');
  });
});
