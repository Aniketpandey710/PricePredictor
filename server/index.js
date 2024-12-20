import express from 'express';
import predictors from './predictors/index.js';

const app = express();
app.use(express.json());

app.post('/api/predict', async (req, res) => {
  try {
    const { category, features } = req.body;
    
    if (!predictors[category]) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const prediction = await predictors[category](features);
    res.json(prediction);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});