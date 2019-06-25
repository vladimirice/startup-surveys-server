import { app } from './api-application';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('ready from bin');
});
