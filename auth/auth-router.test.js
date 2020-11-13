const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
   await db('users').truncate() // this guarantee we test with EMPTY table.
})

describe('auth-Router.js', () => {
   it('is the testing environment', () => {
      expect(process.env.DB_ENV).toBe('testing')
   })
})

describe('[POST] /register', () => {
   const credentials = { username: 'josh', password: 'kitty' }

   it('works', async () => {
      const res = await request(server).post('/api/auth/register').send(credentials)
      expect(res.status).toBe(201)
   })
})

describe('[POST] /login', () => {
   const credentials = { username: 'josh', password: 'kitty' }

   it('works', async () => {
      const res = await request(server).post('/api/auth/login').send(credentials)
      expect(res.status).toBe(401)
   })
})
