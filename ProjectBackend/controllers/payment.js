require("dotenv").config()

const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY
});

exports.getToken = (req, res) => {
      
    gateway.clientToken.generate({}, (err, response) => {
        if (err)
        {
            return res.status(500).send(err)
        }
        else
        {
            return res.status(200).send(response)
        }

  
});

}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amoutFromTheClient = req.body.amount
     gateway.transaction.sale({
      amount: amoutFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
  
  options: {
    submitForSettlement: true
  }
 }, (err, result) => {
     if (err)
        {
          return res.status(500).send(err)    
        }
        else
        {
          return res.status(200).send(result)    
        }
     
});

    
}