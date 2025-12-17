const tf = require('@tensorflow/tfjs-node');

async function trainAndSaveModel() {
  // Example: Simple model for demonstration
  const model = tf.sequential();

  model.add(tf.layers.dense({units: 16, inputShape: [10], activation: 'relu'}));
  model.add(tf.layers.dense({units: 8, activation: 'relu'}));
  model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  // Dummy training data - 100 samples, 10 features each
  const xs = tf.randomNormal([100, 10]);
  const ys = tf.randomUniform([100, 1]).greater(0.5).cast('float32');

  // Train model for 10 epochs
  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 16
  });

  // Save the model locally
  await model.save('file://models/nutrition_model');

  console.log('Model trained and saved to /models/nutrition_model');
}

trainAndSaveModel();
