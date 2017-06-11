const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([{
    version: 1,
    path: '/api/v1',
  }]);
});
router.get('/v1', (req, res) => {
  res.json([{
    users: '/api/v1/users',
    test: '/api/v1/test',
  }]);
});

module.exports = router;
