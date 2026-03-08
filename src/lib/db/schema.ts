import {
  pgTable,
  serial,
  integer,
  text,
  decimal,
  timestamp,
  json,
  primaryKey,
  unique
} from 'drizzle-orm/pg-core';

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  quantity: integer('quantity'),
  created_at: timestamp('created_at', {precision: 6}).defaultNow()
});

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  category: text('category').notNull()
});

export const nutrients = pgTable('nutrients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  unit: text('unit').notNull()
});

export const itemNutrients = pgTable(
  'item_nutrients',
  {
    item_id: integer('item_id')
      .notNull()
      .references(() => items.id),
    nutrient_id: integer('nutrient_id')
      .notNull()
      .references(() => nutrients.id),
    per_100g: decimal('per_100g', {precision: 10, scale: 2}).notNull(),
    per_unit: decimal('per_unit', {precision: 10, scale: 2})
  },
  (t) => [primaryKey({columns: [t.item_id, t.nutrient_id]})]
);

export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  health_score: decimal('health_score')
});

export const mealItems = pgTable(
  'meal_items',
  {
    id: serial('id'),
    meal_id: integer('meal_id')
      .notNull()
      .references(() => meals.id, {onDelete: 'cascade'}),
    item_id: integer('item_id')
      .notNull()
      .references(() => items.id, {onDelete: 'cascade'}),
    quantity: decimal('quantity', {precision: 6, scale: 2}).notNull(),
    measurement: text('measurement').notNull().default('grams')
  },
  (t) => [unique('meal_items_meal_id_item_id_unique').on(t.meal_id, t.item_id)]
);

export const nutrientThresholds = pgTable('nutrient_thresholds', {
  nutrient_id: integer('nutrient_id').primaryKey(),
  nutrient_key: text('nutrient_key'),
  unit: text('unit'),
  min_value: decimal('min_value'),
  max_value: decimal('max_value')
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  roles: json('roles').$type<Record<string, number>>().default({'User': 2001}),
  refresh_token: text('refresh_token'),
  profile_image: json('profile_image'),
  created_at: timestamp('created_at', {withTimezone: true, precision: 6}).defaultNow()
});
