import { Request, Response, Router } from 'express';

const express = require('express');
const { servers } = require('config');

const router: Router = express.Router();
router.get('/logout', (req: Request, res: Response) => {
  // @ts-ignore
  req.logout();

  res.redirect(servers.client);
});

export = router;
