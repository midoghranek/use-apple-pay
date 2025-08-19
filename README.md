# use-apple-pay

A React library for integrating Apple Pay into your web applications with ease. This package provides React hooks and components to handle Apple Pay payments seamlessly.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [useApplePay Hook](#useapplepay-hook)
  - [ApplePayButton Component](#applepaybutton-component)
  - [Types](#types)
- [Examples](#examples)
- [Browser Support](#browser-support)
- [Development](#development)
- [License](#license)

## Installation

```bash
npm install use-apple-pay
```

or

```bash
yarn add use-apple-pay
```

## Quick Start

Here's a basic example of how to use use-apple-pay in your React application:

```tsx
import React, { useState } from 'react';
import { ApplePayButton, useApplePay } from 'use-apple-pay';
import type { PaymentRequest, OnPaymentAuthorized, OnValidateMerchant, OnCancel } from 'use-apple-pay';

const App = () => {
  const [amount, setAmount] = useState('1.00');

  const paymentRequest: PaymentRequest = {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'masterCard'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Total',
      amount: amount,
    },
  };

  const onPaymentAuthorized: OnPaymentAuthorized = async (event, session) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: event.payment.token,
        }),
      });
      
      if (response.ok) {
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
      } else {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
      }
    } catch (error) {
      session.completePayment(ApplePaySession.STATUS_FAILURE);
    }
  };

  const onValidateMerchant: OnValidateMerchant = async (event, session) => {
    try {
      const response = await fetch('/api/merchant-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          validationURL: event.validationURL,
        }),
      });
      
      const merchantSession = await response.json();
      session.completeMerchantValidation(merchantSession);
    } catch (error) {
      console.error('Merchant validation failed:', error);
    }
  };

  const onCancel: OnCancel = (event, session) => {
    console.log('Payment cancelled by user');
  };

  const { applePayClickHandler } = useApplePay({
    paymentRequest,
    onPaymentAuthorized,
    onValidateMerchant,
    onCancel,
    dependencies: [amount],
  });

  return (
    <div>
      {/* Using the built-in Apple Pay button */}
      <ApplePayButton buttonstyle="black" locale="en-US" type="pay" />
      
      {/* Or use a custom button */}
      <button onClick={applePayClickHandler}>
        Pay with Apple Pay
      </button>
    </div>
  );
};

export default App;
```

## API Reference

### useApplePay Hook

The main hook for handling Apple Pay functionality.

#### Parameters

```typescript
interface UseApplePayConfigs {
  paymentRequest: PaymentRequest;
  onValidateMerchant: OnValidateMerchant;
  onPaymentAuthorized: OnPaymentAuthorized;
  onCancel: OnCancel;
  dependencies?: any[];
}
```

- **paymentRequest** (`PaymentRequest`): The Apple Pay payment request configuration
- **onValidateMerchant** (`OnValidateMerchant`): Callback function called when merchant validation is required
- **onPaymentAuthorized** (`OnPaymentAuthorized`): Callback function called when payment is authorized
- **onCancel** (`OnCancel`): Callback function called when payment is cancelled
- **dependencies** (`any[]`, optional): Array of dependencies that will trigger re-initialization of the Apple Pay session

#### Returns

```typescript
{
  applePayClickHandler: VoidFunction;
}
```

- **applePayClickHandler**: Function to trigger Apple Pay payment flow (can be used with custom buttons)

#### Example

```tsx
const { applePayClickHandler } = useApplePay({
  paymentRequest: {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'masterCard'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Total',
      amount: '10.00',
    },
  },
  onValidateMerchant: async (event, session) => {
    // Handle merchant validation
  },
  onPaymentAuthorized: async (event, session) => {
    // Handle payment authorization
  },
  onCancel: (event, session) => {
    // Handle payment cancellation
  },
  dependencies: [amount], // Re-initialize when amount changes
});
```

### ApplePayButton Component

A pre-styled Apple Pay button component that follows Apple's design guidelines.

#### Props

```typescript
interface ApplePayButtonProps {
  readonly buttonstyle?: 'black' | 'white' | 'white-outline';
  readonly type?: 'plain' | 'buy' | 'donate' | 'pay';
  readonly locale?: ApplePayLocales;
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
```

- **buttonstyle** (`'black' | 'white' | 'white-outline'`, optional): Visual style of the button (default: `'black'`)
- **type** (`'plain' | 'buy' | 'donate' | 'pay'`, optional): Button text type (default: `'pay'`)
- **locale** (`ApplePayLocales`, optional): Locale for button text (default: `'en-US'`)
- **onClick** (`React.MouseEventHandler`, optional): Custom click handler

#### Example

```tsx
<ApplePayButton 
  buttonstyle="black" 
  type="buy" 
  locale="en-US" 
/>
```

### Types

#### PaymentRequest

Based on Apple's `ApplePayJS.ApplePayPaymentRequest` interface.

```typescript
type PaymentRequest = ApplePayJS.ApplePayPaymentRequest;
```

#### Event Handlers

```typescript
type OnValidateMerchant = (
  event: ApplePayJS.ApplePayValidateMerchantEvent,
  session: ApplePaySession
) => void;

type OnPaymentAuthorized = (
  event: ApplePayJS.ApplePayPaymentAuthorizedEvent,
  session: ApplePaySession
) => void;

type OnCancel = (
  event: ApplePayJS.Event,
  session: ApplePaySession
) => void;
```

#### ApplePayLocales

Supported locales for the Apple Pay button:

```typescript
type ApplePayLocales = 
  | 'ar-AB' | 'ca-ES' | 'cs-CZ' | 'da-DK' | 'de-DE' 
  | 'el-GR' | 'en-AU' | 'en-GB' | 'en-US' | 'es-ES' 
  | 'es-MX' | 'fi-FI' | 'fr-CA' | 'fr-FR' | 'he-IL' 
  | 'hi-IN' | 'hr-HR' | 'hu-HU' | 'id-ID' | 'it-IT' 
  | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nb-NO' | 'nl-NL' 
  | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' 
  | 'sk-SK' | 'sv-SE' | 'th-TH' | 'tr-TR' | 'uk-UA' 
  | 'vi-VN' | 'zh-CN' | 'zh-HK' | 'zh-TW';
```

## Examples

### Complete Payment Flow

```tsx
import React, { useState } from 'react';
import { ApplePayButton, useApplePay } from 'use-apple-pay';

const CheckoutPage = () => {
  const [cartTotal, setCartTotal] = useState('25.99');
  const [isLoading, setIsLoading] = useState(false);

  const paymentRequest = {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'masterCard', 'amex'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Your Store',
      amount: cartTotal,
    },
    lineItems: [
      {
        label: 'Product',
        amount: '20.99',
      },
      {
        label: 'Shipping',
        amount: '5.00',
      },
    ],
  };

  const onPaymentAuthorized = async (event, session) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentToken: event.payment.token,
          billingContact: event.payment.billingContact,
          shippingContact: event.payment.shippingContact,
        }),
      });

      const result = await response.json();

      if (result.success) {
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
        // Redirect to success page
        window.location.href = '/payment-success';
      } else {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      session.completePayment(ApplePaySession.STATUS_FAILURE);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onValidateMerchant = async (event, session) => {
    try {
      const response = await fetch('/api/validate-merchant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          validationURL: event.validationURL,
          displayName: 'Your Store',
        }),
      });

      const merchantSession = await response.json();
      session.completeMerchantValidation(merchantSession);
    } catch (error) {
      console.error('Merchant validation failed:', error);
    }
  };

  const onCancel = () => {
    setIsLoading(false);
    console.log('Payment was cancelled');
  };

  useApplePay({
    paymentRequest,
    onPaymentAuthorized,
    onValidateMerchant,
    onCancel,
    dependencies: [cartTotal],
  });

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="total">Total: ${cartTotal}</div>
      
      {isLoading ? (
        <div>Processing payment...</div>
      ) : (
        <ApplePayButton 
          buttonstyle="black" 
          type="buy" 
          locale="en-US" 
        />
      )}
    </div>
  );
};
```

### Using Custom Button

```tsx
import React from 'react';
import { useApplePay } from 'use-apple-pay';

const CustomPaymentButton = () => {
  const { applePayClickHandler } = useApplePay({
    paymentRequest: {
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard'],
      merchantCapabilities: ['supports3DS'],
      total: {
        label: 'Custom Store',
        amount: '15.00',
      },
    },
    onValidateMerchant: async (event, session) => {
      // Handle validation
    },
    onPaymentAuthorized: async (event, session) => {
      // Handle payment
    },
    onCancel: () => {
      // Handle cancellation
    },
  });

  return (
    <button 
      onClick={applePayClickHandler}
      className="custom-apple-pay-btn"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      🍎 Pay with Apple Pay
    </button>
  );
};
```

## Browser Support

This library works in browsers that support Apple Pay on the web:

- **Safari** on macOS and iOS
- **Chrome**, **Edge**, and **Firefox** on devices with Touch ID or Face ID
- Requires HTTPS in production

## Node.js Support

This package supports Node.js versions:
- ✅ Node.js 16.x
- ✅ Node.js 18.x (LTS)
- ✅ Node.js 20.x (LTS)
- ✅ Node.js 22.x (Latest)

### Checking Apple Pay Availability

```typescript
// Check if Apple Pay is available
if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
  // Apple Pay is available
  console.log('Apple Pay is supported');
} else {
  // Apple Pay is not available
  console.log('Apple Pay is not supported on this device/browser');
}
```

## Development

### Prerequisites

- Node.js >= 16 (supports up to Node.js 22)
- React >= 16

### Building

```bash
npm run build
```

### Running the Example

```bash
cd example
npm install
npm start
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Server-Side Requirements

To use Apple Pay, you'll need to implement server endpoints for:

1. **Merchant Validation**: Validate your merchant with Apple
2. **Payment Processing**: Process the encrypted payment token

### Example Server Implementation (Node.js/Express)

```javascript
// Merchant validation endpoint
app.post('/api/validate-merchant', async (req, res) => {
  const { validationURL } = req.body;
  
  try {
    const response = await fetch(validationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantIdentifier: 'your.merchant.id',
        displayName: 'Your Store Name',
        initiative: 'web',
        initiativeContext: 'yourdomain.com',
      }),
      // Include your merchant certificate for authentication
    });
    
    const merchantSession = await response.json();
    res.json(merchantSession);
  } catch (error) {
    res.status(500).json({ error: 'Merchant validation failed' });
  }
});

// Payment processing endpoint
app.post('/api/process-payment', async (req, res) => {
  const { paymentToken } = req.body;
  
  try {
    // Process the payment token with your payment processor
    // (Stripe, Square, etc.)
    const paymentResult = await processPaymentToken(paymentToken);
    
    res.json({ success: true, transactionId: paymentResult.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Security Considerations

- Always validate payments on your server
- Use HTTPS in production
- Properly configure your Apple Pay merchant certificate
- Validate the payment token before processing
- Implement proper error handling

## License

MIT © [midoghranek](https://github.com/midoghranek)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/midoghranek/use-apple-pay/issues) on GitHub.