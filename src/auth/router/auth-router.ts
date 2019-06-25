const express = require('express');

const router = express.Router();

router.get('/logout', (req: any, res: any) => {
  req.logout();

  res.send({
    success: true,
  });
});

export = router;
