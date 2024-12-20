import * as tf from '@tensorflow/tfjs-node';

// Simple linear regression model for demonstration
export async function createModel(features, labels) {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [features[0].length]
  }));
  
  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dense({
    units: 1
  }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'meanSquaredError'
  });

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels);

  await model.fit(xs, ys, {
    epochs: 100,
    batchSize: 32
  });

  return model;
}