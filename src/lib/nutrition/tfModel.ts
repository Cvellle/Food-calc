import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

// Load pre-trained TF model (must be in public folder or accessible path)
export async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/models/nutrition_model/model.json');
  }
  return model;
}

export async function predictNutritionScore(mealNutrients: any[]) {
  const model = await loadModel();
  const inputTensor = tf.tensor2d([mealNutrients]); // shape [1, number_of_features]
  const prediction = model.predict(inputTensor) as tf.Tensor;
  const scoreArr = (await prediction.array()) as number[][];
  return scoreArr[0][0]; // e.g. score between 0-1
}
