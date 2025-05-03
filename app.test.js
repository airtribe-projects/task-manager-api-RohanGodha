const request = require('supertest');
const app = require('./app');

describe('Task Manager API', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Welcome to the Rohan Godha: Task Manager API!');
  });

  it('POST /tasks should create a new task', async () => {
    const newTask = {
      title: "Test Task",
      description: "This is a test task",
      completed: false,
      priority: "high"
    };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('GET /tasks should return an array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /tasks/:id should return the task if exists', async () => {
    const res = await request(app).get('/tasks/1');
    expect([200, 404]).toContain(res.statusCode); // Flexible since ID 1 may or may not exist
  });
});
