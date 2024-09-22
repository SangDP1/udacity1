const request = require('supertest');
import app from './server'


describe('Server tets', () => {
  it('should return picture', async () => {
    const res = await request(app)
      .post('/pixabay')
      .send({
        cityName: 'tokyo'
      })
    expect(res.statusCode).toEqual(200);
  }),
  it('should return user city name', async () => {
    const res = await request(app)
    .post('/GeoNames')
    .send({
      cityName: 'tokyo',
      cityURL: 'https://pixabay.com/get/gc42f199e72e82665645fe6651eeb0f3ef4dc9f51283a98922f4a7d3a1eb96d7d89964e622645425b7afef870159f818f638e23d9651f51ae0d4af05f5adc6e67_640.jpg'
    })
    expect(res.statusCode).toEqual(200);
  })
})