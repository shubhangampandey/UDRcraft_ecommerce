const router = require('express').Router();
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');

// GET /api/orders — admin gets all
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/customer/:customerId
router.get('/customer/:customerId', protect, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/vendor/:vendorId
router.get('/vendor/:vendorId', protect, async (req, res) => {
  try {
    const orders = await Order.find({ 'items.vendorId': req.params.vendorId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/track/:orderId
router.get('/track/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({
      customerId: req.user._id.toString(),
      customerName: req.user.name,
      customerEmail: req.user.email,
      items: req.body.items,
      total: req.body.total,
      shippingAddress: req.body.shippingAddress,
      status: 'pending',
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
