import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DESTINATIONS, PROMOTIONS, SEASONAL_THEMES_DATA, LIVE_OPERATIONS_STEPS } from '../src/data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = {
  destinations: DESTINATIONS,
  promotions: PROMOTIONS,
  seasonalThemes: SEASONAL_THEMES_DATA,
  liveOperationsSteps: LIVE_OPERATIONS_STEPS
};

fs.writeFileSync(path.join(__dirname, '../public/data.json'), JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully written data.json');
