const router = require('express').Router();
const { defaultMaxListeners } = require('mysql2/typings/mysql/lib/Connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      where: { category_id: req.body.category_id },
      // be sure to include its associated Products
      include: { model: Product },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(
    {
      category_name: req.body.category_name,
    },
  )
    .then(categoryData => res.json(categoryData)
    )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.name,
    },
    {
      where: {
        id: req.params.id
      },
    })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
    .then((deletedCategory) => {
      res.json(deleted);
    })
    .catch((err) => res.json(err));
});


module.exports = router;
