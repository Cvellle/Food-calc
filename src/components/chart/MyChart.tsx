'use client';

import {useMemo, useState} from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import {format, subDays, isAfter, startOfDay} from 'date-fns';
import {NUTRIENTS} from '@/lib/nutrition/nutrients-List';

interface Props {
  meals: any[];
}

export default function NutrientBarChart({meals}: Props) {
  const [activeNutrient, setActiveNutrient] =
    useState<keyof typeof NUTRIENTS>('calories');
  const [daysRange, setDaysRange] = useState<number>(7);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const nutrientConfig = NUTRIENTS[activeNutrient];
  const MAX_LIMIT = nutrientConfig.max;

  const data = useMemo(() => {
    const dailyMap: Record<string, number> = {};
    const cutoffDate = startOfDay(subDays(new Date(), daysRange));

    meals.forEach((meal) => {
      const mealDate = new Date(meal.date);

      if (isAfter(mealDate, cutoffDate) || mealDate > new Date()) {
        const day = format(mealDate, 'dd.MM');
        const value =
          meal.nutrients.find(
            (n: any) =>
              n.nutrient.toLowerCase() === activeNutrient.toLowerCase()
          )?.total || 0;

        dailyMap[day] = (dailyMap[day] || 0) + value;
      }
    });

    return Object.entries(dailyMap)
      .map(([date, total]) => ({
        date,
        total: Number(total.toFixed(1)),
        originalDate: date.split('.').reverse().join('-')
      }))
      .sort((a, b) => a.originalDate.localeCompare(b.originalDate));
  }, [meals, activeNutrient, daysRange]);

  const yAxisMax = useMemo(() => {
    const highestDataPoint = Math.max(...data.map((d) => d.total), 0);
    return Math.max(MAX_LIMIT, highestDataPoint) * 1.2;
  }, [data, MAX_LIMIT]);

  return (
    <div className="w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            {nutrientConfig.key}
          </h3>
          <p className="text-sm text-slate-500 font-medium italic">
            Daily Limit:{' '}
            <span className="text-red-600 font-bold">
              {MAX_LIMIT} {nutrientConfig.unit}
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}
            className="border rounded-lg px-3 py-1.5 text-xs bg-white border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {chartType === 'bar' ? '📈 Line' : '📊 Bar'}
          </button>

          <select
            value={daysRange}
            onChange={(e) => setDaysRange(Number(e.target.value))}
            className="border rounded-lg px-3 py-1.5 text-xs bg-slate-50 border-slate-200 font-bold text-slate-600 outline-none"
          >
            <option value={3}>Last 3 days</option>
            <option value={7}>Last 7 days</option>
            <option value={10}>Last 10 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 3 months</option>
            <option value={365}>Last year</option>
          </select>

          <select
            value={activeNutrient}
            onChange={(e) => setActiveNutrient(e.target.value as any)}
            className="border rounded-lg px-3 py-1.5 text-xs bg-slate-50 border-slate-200 font-bold text-slate-600 outline-none"
          >
            <option value="calories">Calories (kcal)</option>
            <option value="protein">Protein (g)</option>
            <option value="carbohydrates">Carbs (g)</option>
            <option value="total fat">Total Fat (g)</option>
            <option value="iron">Iron (mg)</option>
            <option value="vitamin C">Vitamin C (mg)</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={data}
              margin={{top: 25, right: 30, left: 0, bottom: 0}}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{fill: '#94a3b8', fontSize: 11}}
                domain={[0, yAxisMax]}
              />
              <Tooltip
                cursor={{fill: '#f8fafc'}}
                content={
                  <CustomTooltip
                    MAX_LIMIT={MAX_LIMIT}
                    unit={nutrientConfig.unit}
                  />
                }
              />
              <ReferenceLine
                y={MAX_LIMIT}
                stroke="#dc2626"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{
                  position: 'top',
                  value: `LIMIT: ${MAX_LIMIT}`,
                  fill: '#dc2626',
                  fontSize: 10,
                  fontWeight: '900'
                }}
              />
              <Bar
                dataKey="total"
                radius={[6, 6, 0, 0]}
                barSize={daysRange > 30 ? 10 : 30}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.total > MAX_LIMIT ? '#dc2626' : '#10b981'}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{top: 25, right: 30, left: 0, bottom: 0}}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{fill: '#94a3b8', fontSize: 11}}
                domain={[0, yAxisMax]}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    MAX_LIMIT={MAX_LIMIT}
                    unit={nutrientConfig.unit}
                  />
                }
              />
              <ReferenceLine
                y={MAX_LIMIT}
                stroke="#dc2626"
                strokeDasharray="4 4"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                strokeWidth={3}
                dot={{fill: '#10b981', r: 4}}
                activeDot={{r: 6}}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Optimal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-600" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Exceeded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({active, payload, MAX_LIMIT, unit}: any) {
  if (active && payload?.[0]) {
    const val = payload[0].value as number;
    return (
      <div className="bg-white border shadow-xl p-3 rounded-xl border-slate-100 min-w-[120px]">
        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">
          {payload[0].payload.date}
        </p>
        <p
          className={`text-sm font-black ${val > MAX_LIMIT ? 'text-red-600' : 'text-emerald-600'}`}
        >
          {val} {unit}
        </p>
      </div>
    );
  }
  return null;
}
