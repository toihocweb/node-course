const express = require('express');
const validator = require('../middlewares/validator');
const couponController = require('../controllers/couponController');
const { createCoupon } = require('../validations/couponSchema');

const router = express.Router();

router.get('/', couponController.getCoupon);

router.get('/:id', couponController.getCouponById);

router.post('/', validator(createCoupon), couponController.createCoupon);

router.delete('/:id', couponController.deleteCoupon);

module.exports = router;
