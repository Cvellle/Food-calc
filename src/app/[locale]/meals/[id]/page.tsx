import React from "react";
import {
  Flame,
  Beef,
  Wheat,
  Droplet,
  Leaf,
  Candy,
  Salad,
  ShoppingBasket,
  ChefHat,
  LucideIcon,
} from "lucide-react";

export interface Nutrient {
  nutrient: string;
  unit: string;
  total: number;
}

export interface MealItem {
  name: string;
  quantity: number;
  measurement: string;
}

export interface Meal {
  name: string;
  nutrients: Nutrient[];
  items: MealItem[];
}

export interface MealDetailProps {
  meal: Meal;
}

const nutrientIcons: Record<string, LucideIcon> = {
  Calories: Flame,
  Protein: Beef,
  Carbs: Wheat,
  Fat: Droplet,
  Fiber: Leaf,
  Sugar: Candy,
};

const SAMPLE_MEAL: Meal = {
  name: "Grilled Salmon Bowl",
  nutrients: [
    { nutrient: "Calories", unit: "kcal", total: 542.3 },
    { nutrient: "Protein", unit: "g", total: 41.2 },
    { nutrient: "Carbs", unit: "g", total: 38.7 },
    { nutrient: "Fat", unit: "g", total: 22.5 },
    { nutrient: "Fiber", unit: "g", total: 6.1 },
    { nutrient: "Sugar", unit: "g", total: 4.8 },
  ],
  items: [
    { name: "Salmon fillet", quantity: 180, measurement: "g" },
    { name: "Jasmine rice", quantity: 150, measurement: "g" },
    { name: "Avocado", quantity: 0.5, measurement: "pc" },
    { name: "Cherry tomatoes", quantity: 80, measurement: "g" },
    { name: "Cucumber", quantity: 60, measurement: "g" },
    { name: "Sesame seeds", quantity: 1, measurement: "tbsp" },
  ],
};

function NutrientBarChart({ nutrients }: { nutrients: Nutrient[] }) {
  const max = Math.max(...nutrients.map((n) => n.total));
  return (
    <div className="space-y-3">
      {nutrients.map(({ nutrient, unit, total }, i) => {
        const widthPct = (total / max) * 100;
        // alternate accent colors between emerald-700 and red-600
        const barColor = i % 2 === 0 ? "bg-emerald-700" : "bg-red-600";
        return (
          <div key={nutrient} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-gray-600">
              {nutrient}
            </span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all duration-500`}
                style={{ width: `${widthPct}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-xs text-gray-500 text-right">
              {total.toFixed(1)} {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function MealDetail({ meal = SAMPLE_MEAL }: Partial<MealDetailProps> = {}) {
  return (
    <div className="max-w-3xl mx-auto my-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="relative px-8 py-6 border-b bg-gradient-to-r from-emerald-50 to-white">
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <ChefHat size={22} />
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              {meal.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Detailed nutritional breakdown & ingredients
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-emerald-500 to-red-600" />
      </div>
      <div className="p-8 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Flame size={20} className="text-emerald-700" />
              Nutrients
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
              Per meal
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {meal.nutrients.map(({ nutrient, unit, total }, i) => {
              const accent = i % 2 === 0 ? "emerald-700" : "red-600";
              const Icon = nutrientIcons[nutrient];
              return (
                <li
                  key={nutrient}
                  className={`group relative bg-gray-50 hover:bg-white border border-gray-200 hover:border-${accent} rounded-xl p-5 pt-6 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      i % 2 === 0 ? "bg-emerald-700" : "bg-red-600"
                    }`}
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500 font-medium">
                        {nutrient}
                      </span>
                      <span className="text-2xl font-semibold text-gray-800">
                        {total.toFixed(2)}
                        <span
                          className={`text-sm ml-1 ${
                            i % 2 === 0 ? "text-emerald-700" : "text-red-600"
                          }`}
                        >
                          {unit}
                        </span>
                      </span>
                    </div>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                        i % 2 === 0
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {Icon && <Icon size={18} />}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Bar chart of all nutrient values */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Salad size={20} className="text-red-600" />
              Nutrient Comparison
            </h2>
            <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
              Relative scale
            </span>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 border-t-4 border-t-emerald-700">
            <NutrientBarChart nutrients={meal.nutrients} />
          </div>
        </section>

        <section>
          <div className="h-px w-full bg-gradient-to-r from-emerald-700 via-gray-200 to-red-600 mb-8" />
          <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <ShoppingBasket size={20} className="text-emerald-700" />
            Ingredients
          </h2>
          <ul className="border border-gray-100 rounded-xl overflow-hidden">
            {meal.items.map(({ name, quantity, measurement }, i) => (
              <li
                key={i}
                className={`flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition border-l-4 ${
                  i !== meal.items.length - 1 ? "border-b border-b-gray-100" : ""
                } ${i % 2 === 0 ? "border-l-emerald-700" : "border-l-red-600"}`}
              >
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      i % 2 === 0 ? "bg-emerald-700" : "bg-red-600"
                    }`}
                  />
                  {name}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-md font-medium ${
                    i % 2 === 0
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {quantity} {measurement}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}