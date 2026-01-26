'use client';

import {useState} from 'react';
import {createMealAsync} from '@/services/meal.service';
import {useTranslations} from 'next-intl';

type Item = {
  itemId: number | '';
  quantity: number | '';
  measurement: 'grams' | 'unit';
};

const igredients = [
  {id: 1, category: 'produce', name: 'apple'},
  {id: 2, category: 'produce', name: 'banana'},
  {id: 3, category: 'nuts/seeds', name: 'almonds'},
  {id: 4, category: 'produce', name: 'carrot'},
  {id: 5, category: 'produce', name: 'spinach'},
  {id: 6, category: 'produce', name: 'broccoli'},
  {id: 7, category: 'protein', name: 'chicken breast'},
  {id: 8, category: 'protein', name: 'salmon'},
  {id: 9, category: 'pantry', name: 'flour'},
  {id: 10, category: 'pantry', name: 'sugar'},
  {id: 11, category: 'pantry', name: 'salt'},
  {id: 12, category: 'pantry', name: 'olive oil'},
  {id: 13, category: 'dairy', name: 'butter'},
  {id: 14, category: 'protein', name: 'eggs'},
  {id: 15, category: 'dairy', name: 'milk'},
  {id: 16, category: 'produce', name: 'tomatoes'},
  {id: 17, category: 'produce', name: 'onions'},
  {id: 18, category: 'produce', name: 'garlic'},
  {id: 19, category: 'produce', name: 'basil'},
  {id: 20, category: 'pantry', name: 'pasta'},
  {id: 21, category: 'dairy', name: 'cheese'},
  {id: 22, category: 'pantry', name: 'rice'}
];

export default function CreateMealPage() {
  const [name, setName] = useState('');
  const [items, setItems] = useState<Item[]>([
    {itemId: '', quantity: '', measurement: 'grams'}
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('CreateMeal');

  function handleItemChange(index: number, field: keyof Item, value: any) {
    const newItems: Item[] = [...items];
    newItems[index] = {...newItems[index], [field]: value};
    setItems(newItems);
  }

  function addItem() {
    setItems([...items, {itemId: '', quantity: '', measurement: 'grams'}]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError('Meal name is required');
      return;
    }
    for (const item of items) {
      if (item.itemId === '' || item.quantity === '' || item.quantity <= 0) {
        setError('All items must have valid itemId and quantity');
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        name,
        items: items.map(({itemId, quantity, measurement}) => ({
          itemId: Number(itemId),
          quantity: Number(quantity),
          measurement
        }))
      };
      const data = await createMealAsync(payload);
      setSuccess(`Meal sucessfully created`);
      setName('');
      setItems([{itemId: '', quantity: '', measurement: 'grams'}]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error getting the meal');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Meal</h1>

      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Meal Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Items</label>
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 mb-3 items-end">
              <div className="flex flex-col flex-1">
                <label htmlFor={`itemId-${i}`} className="text-sm mb-1">
                  Item
                </label>
                <select
                  id={`measurement-${i}`}
                  value={item.itemId}
                  onChange={(e) =>
                    handleItemChange(
                      i,
                      'itemId',
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                  required
                >
                  {igredients?.map((ingredient, i) => (
                    <option key={i} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                {/* <input
                  id={`itemId-${i}`}
                  type="number"
                  min={1}
                  value={item.itemId}
                  onChange={(e) =>
                    handleItemChange(
                      i,
                      'itemId',
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                  required
                /> */}
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor={`quantity-${i}`} className="text-sm mb-1">
                  Quantity
                </label>
                <input
                  id={`quantity-${i}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      i,
                      'quantity',
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-[0] h-[31px]"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor={`measurement-${i}`} className="text-sm mb-1">
                  Measurement
                </label>
                <select
                  id={`measurement-${i}`}
                  value={item.measurement}
                  onChange={(e) =>
                    handleItemChange(i, 'measurement', e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="grams">grams</option>
                  <option value="unit">unit</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
                aria-label="Remove item"
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-indigo-700"
          >
            {t('addItem')}
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-emerald-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : t('createMeal')}
        </button>
      </form>
    </div>
  );
}
