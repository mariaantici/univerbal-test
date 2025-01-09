export const corsConfig = require('cors')({
  methods: ['GET', 'POST', 'DELETE'],
  origin: 'http://localhost:8081',
});
