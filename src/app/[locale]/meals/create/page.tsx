'use client';

import {useEffect, useState} from 'react';
import {createMealAsync} from '@/services/meal.service';
import {useTranslations} from 'next-intl';
import {endpoint} from '../../../../../config/endpoint';

type Item = {
  itemId: number | '';
  quantity: number | '';
  measurement: 'grams' | 'unit';
};

export default function CreateMealPage() {
  const [name, setName] = useState('');
  const [items, setItems] = useState<Item[]>([
    {itemId: '', quantity: '', measurement: 'grams'}
  ]);
  const [selectItems, setSelectItems] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('CreateMeal');

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(`${endpoint}/items`);
        if (!res.ok) throw new Error('Failed');
        const list = await res.json();
        setSelectItems(list);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown get items error');
        }
      }
    };
    getItems();
  }, []);

  function handleItemChange(index: number, field: keyof Item, value: any) {
    const newItems: Item[] = [...items];
    newItems[index] = {...newItems[index], [field]: value};
    setItems(newItems);
  }

  function addItem() {
    setItems([...items, {itemId: '', quantity: '', measurement: 'grams'}]);
  }

  function removeItem(index: number) {
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
      createMealAsync(payload);
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
      <h1 className="text-2xl font-bold mb-6">{t('createMeal')}</h1>
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
            className="py-[0] h-[35px]
            w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Items</label>
          {items.map((item, i) => (
            <div key={i} className="flex flex-wrap gap-2 mb-3 items-end">
              <div className="flex flex-col flex-1">
                <label htmlFor={`itemId-${i}`} className="text-sm mb-1">
                  Item
                </label>
                <select
                  id={`measurement-${i}`}
                  value={item.itemId || ''}
                  onChange={(e) =>
                    handleItemChange(i, 'itemId', e.target.value)
                  }
                  className="py-[0] h-[35px] border border-gray-300 rounded px-2 py-1"
                  required
                >
                  <option value="" disabled={item.itemId !== ''}></option>

                  {selectItems?.map(
                    (ingredient: {id: string | number; name: string}, i) => (
                      <option key={i} value={ingredient.id}>
                        {ingredient.name}
                      </option>
                    )
                  )}
                </select>
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
                  className="border border-gray-300 rounded px-2 py-[0] h-[35px]"
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
                  className="py-[0] h-[35px] border border-gray-300 rounded px-2 py-1"
                >
                  <option value="grams">grams</option>
                  <option value="unit">unit</option>
                </select>
              </div>
              <button
                disabled={items.length === 1}
                type="button"
                onClick={() => removeItem(i)}
                className={`mb-[5px] cursor-pointer font-bold px-2
                  ${items.length === 1 ? 'text-gray-500' : 'text-red-500'}`}
                aria-label="Remove item"
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-[100%] md:w-auto mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-indigo-700"
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
