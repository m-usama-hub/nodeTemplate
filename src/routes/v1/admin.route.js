const express = require('express');
const can = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
  userValidation,
  productValidation,
  campaignValidation,
  paymentValidation,
  orderValidation,
  generalValidation,
} = require('../../validations');
const {
  dashboardController,
  userController,
  productController,
  campaignController,
  paymentController,
  orderController,
  feedbackController,
} = require('../../controllers');

const router = express.Router();

router.route('/').get(can('getDashboard'), dashboardController.getDashboard);

// User Mangement routes
router
  .route('/users')
  .post(can('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(can('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/user/:userId')
  .get(can('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(can('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(can('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

// Product Mangement routes
router
  .route('/products')
  .post(can('manageProducts'), validate(productValidation.createProduct), productController.createProduct)
  .get(can('getProducts'), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/product/:productId')
  .get(can('getProducts'), validate(productValidation.getProduct), productController.getProduct)
  .patch(can('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(can('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

// Campaign Mangement routes
router
  .route('/campaigns')
  .post(can('manageCampaigns'), validate(campaignValidation.createCampaign), campaignController.createCampaign)
  .get(can('getCampaigns'), validate(campaignValidation.getCampaigns), campaignController.getCampaigns);

router
  .route('/campaign/:campaignId')
  .post(can('manageCampaigns'), validate(campaignValidation.publishCampaign), campaignController.publishCampaign)
  .get(can('getCampaigns'), validate(campaignValidation.getCampaign), campaignController.getCampaign)
  .patch(can('manageCampaigns'), validate(campaignValidation.updateCampaign), campaignController.updateCampaign)
  .delete(can('manageCampaigns'), validate(campaignValidation.deleteCampaign), campaignController.deleteCampaign);

// Campaign prizes
router
  .route('/prize')
  .post(can('manageCampaignPrizes'), validate(campaignValidation.addPrize), campaignController.addPrize)
  .patch(can('manageCampaignPrizes'), validate(campaignValidation.updatePrize), campaignController.updatePrize)
  .delete(can('manageCampaignPrizes'), validate(campaignValidation.deletePrize), campaignController.deletePrize);

// Campaign notes
router
  .route('/note')
  .post(can('manageCampaignNotes'), validate(campaignValidation.addNote), campaignController.addNote)
  .patch(can('manageCampaignNotes'), validate(campaignValidation.updateNote), campaignController.updateNote)
  .delete(can('manageCampaignNotes'), validate(campaignValidation.deleteNote), campaignController.deleteNote);

//Winner routes
router
  .route('/winner')
  .post(can('manageWinners'), validate(campaignValidation.addWinner), campaignController.addWinner)
  .patch(can('manageWinners'), validate(campaignValidation.updateWinner), campaignController.updateWinner)
  .delete(can('manageWinners'), validate(campaignValidation.deleteWinner), campaignController.deleteWinner);

//Order routes
router.route('/orders').get(can('getOrder'), validate(orderValidation.getOrders), orderController.getOrders);
router.route('/order/:orderId').get(can('getOrder'), validate(orderValidation.getOrder), orderController.getOrder);

//Payment routes
router.route('/payments').get(can('getPayment'), validate(paymentValidation.getPayments), paymentController.getPayments);
router
  .route('/payment/:paymentId')
  .get(can('getPayment'), validate(paymentValidation.getPayment), paymentController.getPayment);

//Feedback routes
router
  .route('/feedbacks')
  .get(can('getFeedback'), validate(generalValidation.getFeedbacks), feedbackController.getFeedbacks);
router
  .route('/feedback/:feedbackId')
  .get(can('getFeedback'), validate(generalValidation.getFeedback), feedbackController.getFeedback);

module.exports = router;
