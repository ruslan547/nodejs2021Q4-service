import { PORT } from './common/config';
import app from './app';
import { driverManager } from './utils/dbUtils';

driverManager.connect(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
