import { Response } from 'express';

const express = require('express');

const router = express.Router();

router.get('/current', (req: any, res: Response) => {
  res.send(req.user);
});

export = router;
