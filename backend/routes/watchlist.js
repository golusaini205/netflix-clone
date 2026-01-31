const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET My List
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.watchlist);
});

// ADD to My List
router.post("/add", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const exists = user.watchlist.find(
    (m) => m.movieId === req.body.movieId
  );

  if (exists) return res.status(400).json("Already in My List");

  user.watchlist.push(req.body);
  await user.save();

  res.json(user.watchlist);
});

// REMOVE from My List
router.post("/remove", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.watchlist = user.watchlist.filter(
    (m) => m.movieId !== req.body.movieId
  );
  
  await user.save();
  res.json(user.watchlist);
});

module.exports = router;
