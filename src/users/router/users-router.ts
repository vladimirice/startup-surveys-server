import { Request, Router, Response } from 'express';

const express = require('express');

const router: Router = express.Router();

router.get('/current', (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;

  res.send(user);
});

export = router;
