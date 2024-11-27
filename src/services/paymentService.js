const Razorpay = require('razorpay');
const crypto = require('crypto');
const config = require('../config/config');
const CustomError = require('../utils/customError');

// Create instance
var instance = new Razorpay({ 
    key_id: config.RAZORPAY_KEY_ID, 
    key_secret: config.RAZORPAY_KEY_SECRET
})

// Create order
const createOrder = async (req,res) => {
    const {amount} = req.body;
    var options = {
        amount: amount * 100,
        currency: "USD",
        receipt: 'order_rcptid_' + Date.now()
    };
    try{
         const order = await instance.orders.create(options);
         res.json(order);    
    }catch(error){
        console.error(error);
    res.status(500).json({ message: 'Error creating Razorpay order' });
    }
 }

// Verify payment
const validatePayment = async (req,res) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;  
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expected_signature = crypto 
            .createHmac('sha256',config.JWT_SECRET_KEY)
            .update(body)
            .digest('hex');
            if(expected_signature === razorpay_signature) {
                res.json({ success: true, message: 'Payment verified successfully' });
            }else{
                res.status(400).json({ success: false, message: 'Payment verification failed' });
            }
    }catch (error) {
        console.error('Error verifying payment:', error);
        throw new Error('Error verifying payment',error);
    }
 }

module.exports = {
    createOrder,
    validatePayment,
};