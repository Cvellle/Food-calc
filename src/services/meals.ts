import {promises as fs} from 'fs';
import path from 'path';

export async function getMeals() {
  const filePath = path.join(process.cwd(), 'public/data', 'nutritients.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}
