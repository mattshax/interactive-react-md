const express = require('express');
const PGPubsub = require('pg-pubsub');
const config = require('../config/server');

const pubsub = new PGPubsub(config.database);
const router = express.Router();

router.get('/', (req, res) => {
  req.app.db.Data.findAll({ order: [['updatedAt', 'DESC']]})
    .then(data => res.json(data))
    .catch(error => res.send(error));
  // process.on('unhandledRejection', error => {
  //    console.log('unhandledRejection', error.message);
  // });
});
router.get('/add', (req, res) => {
  req.app.db.Data.create({
      message: 'Testing',
    })
    .then(data => res.json(data))
    .catch(error => res.send(error));
});
router.get('/remove', (req, res) => {
  req.app.db.Data.findOne()
    .then(data => data.destroy())
    .then(() => res.send('deleted'))
    .catch(error => res.send(error));
});
router.get('/edit', (req, res) => {
  req.app.db.Data.findOne()
    .then((data) => {
      const dat = data;
      dat.message = `Testing-${Math.round(Math.random() * 1000)}`;
      return dat.save();
    })
    .then(() => res.send('edited'))
    .catch(error => res.send(error));
});

router.get('/stream', (req, res) => {
  let messageCount = 0;

  const subscriber = pubsub.addChannel('events', (data) => {
    console.log('EVENT OCCURED IN ', data.table);
    messageCount += 1;
    res.write(`id: ${messageCount}\n`);
    return res.write(`data: ${data.table}\n\n`); // Note the extra newline
  });

  /*
  setInterval(function() {
          messageCount++;
          res.write('id: ' + messageCount + '\n');
          res.write("data: " + new Date() + "\n\n");
      }, 1000)
      */

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('\n');
  req.on('close', () => {
    console.log('disconnected');
    pubsub.removeChannel('events');
    //subscriber.close();
    //res.end()
  });
});


module.exports = router;
