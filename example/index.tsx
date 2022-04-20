import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApplePayButton, useApplePay } from '../.';
import type { PaymentRequest, OnPaymentAuthorized, OnValidateMerchant, OnCancel} from "../.";
import { useState } from 'react';
  
const App = () => {
  const [amount, setAmount] =  useState('1.00');
  const paymentRequest: PaymentRequest = {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'masterCard'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Total',
      amount: '1.00',
    },
  };

  const onPaymentAuthorized: OnPaymentAuthorized = async (event, session) => {
    const requestPayment = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: event.payment.token,
      }),
    });
    if (requestPayment.ok) {
      return session.completePayment(ApplePaySession.STATUS_SUCCESS);
    }
    return session.completePayment(ApplePaySession.STATUS_FAILURE);
  };

  const onValidateMerchant: OnValidateMerchant = async (event, session) => {
    // Call your own server to request a new merchant session.
    const merchantSession = await fetch('/merchant-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        validationURL: event.validationURL,
      }),
    });
    session.completeMerchantValidation(merchantSession);
  };

  const onCancel: OnCancel = (event, session) =>
    console.log('cancel', event, session);

  const { applePayClickHandler } = useApplePay({
    paymentRequest,
    onPaymentAuthorized,
    onValidateMerchant,
    onCancel,
    dependencies: [amount],
  });
  
  return (
    <div>
      {/* Built-in ApplePayButton */}
      <ApplePayButton buttonstyle="black" locale="en-US" type="pay" />
      {/* Custom Button */}
      <button onClick={applePayClickHandler}>Apple Pay</button>

      {/* Change Amount */}
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value || "1").toFixed(2))}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
