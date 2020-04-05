import app from './app';
import initDb from './db/mongoose';

const PORT = 3000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

export default app;
