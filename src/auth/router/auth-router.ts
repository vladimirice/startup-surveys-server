const express = require('express');
const { servers } = require('config');


const router = express.Router();
//
router.get('/logout', (req: any, res: any) => {
  req.logout();

  res.redirect(servers.client);
});

export = router;
