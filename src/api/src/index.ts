import express from 'express';
const app = express();

app.use(express.json())

let idSequence = 1;
let items = [];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ error: 'field name must be provided' });
    return;
  }
  if (typeof name !== 'string') {
    res.status(400).json({ error: 'field name must be a string' });
    return;
  }
  const item = { id: idSequence, name, description };
  items.push(item);
  idSequence++;
  res.json(item);
})

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === Number(id));

  if (index >= 0) {
    items.splice(index, 1);
  }
  res.json();
})



const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
