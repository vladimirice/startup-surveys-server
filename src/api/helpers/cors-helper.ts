import { Request, Response, NextFunction } from 'express';

const config = require('config');

const defaultCorsParams = {
  methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
  allowedHeaders: 'X-Requested-With,content-type,Authorization,Cookie',
  credentials: 'true',
};

class CorsHelper {
  public static addRegularCors(app: any) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', this.getOriginByRequest(req));

      res.setHeader('Access-Control-Allow-Methods', defaultCorsParams.methods);
      res.setHeader('Access-Control-Max-Age', 24 * 60 * 60);

      res.setHeader(
        'Access-Control-Allow-Headers',
        defaultCorsParams.allowedHeaders,
      );

      res.setHeader('Access-Control-Allow-Credentials', defaultCorsParams.credentials);

      next();
    });
  }

  private static getOriginByRequest(request: Request): string {
    const { allowedOrigins } = config.cors;

    const { origin } = request.headers;
    if (allowedOrigins.includes(origin)) {
      return !Array.isArray(origin) ? origin || '' : '';
    }

    return '';
  }
}

export = CorsHelper;
