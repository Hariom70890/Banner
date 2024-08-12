const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');

router.get('/', async (req, res) => {
  try {
    const banner = await Banner.findOne();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const banner = new Banner(req.body);
  try {
    const newBanner = await banner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/', async (req, res) => {
  try {
    const updatedBanner = await Banner.findOneAndUpdate({}, req.body, { new: true });
    console.log("updarede banner:-",updatedBanner)
      res.json( updatedBanner );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;