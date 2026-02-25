import {DailyTrackerSection} from './_components/DailyTrackerSection';
import {MealCatalogSection} from './_components/MealCatalogSection';

export default function ClientIndex() {
  return (
    <div className="max-w-7xl mx-auto">
      <DailyTrackerSection />
      <MealCatalogSection />
    </div>
  );
}
