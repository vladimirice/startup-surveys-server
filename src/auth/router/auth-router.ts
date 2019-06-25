import { Request, Response } from 'express';

const express = require('express');

const router = express.Router();

router.get('/logout', (req: Request, res: Response) => {
  req.logout();

  res.send({
    success: true,
  });
});

export = router;
