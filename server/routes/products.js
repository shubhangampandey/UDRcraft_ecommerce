const router = require('express').Router();
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../config/cloudinary");
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg","png","webp"],
    transformation: [
      { width: 800, height: 800, crop: "limit", quality: "auto" }
    ],
  },
});


const upload = multer({ storage });


// GET /api/products — public, returns approved products only
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ approved: true }).sort({ createdAt: -1 });

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString(),
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/all — admin only, returns all products
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString(),
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/vendor/:vendorId
router.get('/vendor/:vendorId', protect, async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.params.vendorId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/products/search?q=sofa
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';

    const products = await Product.find({
      approved: true,
      name: { $regex: q, $options: 'i' }
    }).sort({ createdAt: -1 });

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString(),
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products — vendor creates product with optional image upload
router.post('/', protect, authorize('vendor'), upload.single('image'), async (req, res) => {
  try {
    
    const product = await Product.create({
      name: req.body.name,
      price: Number(req.body.price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      image: req.file ? req.file.path : "",
      category: req.body.category,
      description: req.body.description || '',
      vendor: req.user.storeName || req.user.name,
      vendorId: req.user._id.toString(),
      badge: req.body.badge,
      inStock: true,
      approved: false, // pending by default
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', protect, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      description: req.body.description,
    };

    // if new image uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE /api/products/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id/approve — admin toggle approval
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.approved = !product.approved;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
