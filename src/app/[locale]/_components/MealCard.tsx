import Link from 'next/link';

type MealCardLabels = {
  name: string;
  allIngredients: string;
  see: string;
  add: string;
};

type Meal = {
  id: string | number;
  name: string;
  ingredients_preview: string;
};

type MealCardProps = {
  meal: Meal;
  onAdd: (mealId: string) => void;
  labels: MealCardLabels;
};

export function MealCard({meal, onAdd, labels}: MealCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[300px]">
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{labels.name}</h3>
      <p className="mb-5 text-gray-800">{meal.name}</p>

      <h4 className="text-lg font-medium mb-2 text-gray-700">{labels.allIngredients}</h4>
      <p className="text-gray-600 flex-grow">{meal.ingredients_preview}</p>

      <Link
        href={`/meals/${meal.id}`}
        className="mt-4 inline-block px-5 py-2 bg-emerald-600 text-white font-semibold rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 text-center"
      >
        {labels.see}
      </Link>

      <button
        type="button"
        className="mt-4 inline-block px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-300 cursor-pointer"
        onClick={() => onAdd(String(meal.id))}
      >
        {labels.add}
      </button>
    </div>
  );
}
