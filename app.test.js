const request = require('supertest');
const app = require('./app');

describe('Task Manager API', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Welcome to the Rohan Godha/i);
  });

  it('POST /tasks should create a new task', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Sample',
      description: 'Sample Desc',
      completed: false,
      priority: 'medium'
    });

    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('title', 'Sample');
  });

  it('GET /tasks should return all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200); 
    expect(Array.isArray(res.body)).toBe(true); 
  });

  it('PUT /tasks/:id should update an existing task', async () => {
    const taskId = 1;
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        description: 'Updated Task Description',
        completed: true,
        priority: 'high'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
    expect(res.body).toHaveProperty('completed', true);
  });


  it('DELETE /tasks/:id should delete a task', async () => {
    const taskId = 1; 
    const taskExists = await request(app).get(`/tasks/${taskId}`);
    expect(taskExists.statusCode).toBe(200);
    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.statusCode).toBe(204);
    const taskAfterDelete = await request(app).get(`/tasks/${taskId}`);
    expect(taskAfterDelete.statusCode).toBe(404);
  });

});