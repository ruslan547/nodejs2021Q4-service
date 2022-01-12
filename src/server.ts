import { PORT } from './common/config';
import app from './app';
import { DriverManager } from './utils/dbUtils';

DriverManager.connect(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
