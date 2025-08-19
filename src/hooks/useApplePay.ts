/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { UseApplePayConfigs } from '../types';

export const useApplePay = ({
  paymentRequest,
  onValidateMerchant,
  onPaymentAuthorized,
  onCancel,
  dependencies = [],
}: UseApplePayConfigs) => {
  const onRequestApplePay: VoidFunction = useCallback(() => {
    if (!ApplePaySession.canMakePayments()) return;
    const session = new ApplePaySession(3, paymentRequest);
    session.onvalidatemerchant = event => onValidateMerchant(event, session);
    session.onpaymentauthorized = event => onPaymentAuthorized(event, session);
    session.oncancel = event => onCancel(event, session);
    session.begin();
  }, [
    paymentRequest,
    onValidateMerchant,
    onPaymentAuthorized,
    onCancel,
    ...dependencies,
  ]);

  useEffect(() => {
    document
      .querySelector('apple-pay-button')
      ?.addEventListener('click', onRequestApplePay);
    return () => {
      document
        .querySelector('apple-pay-button')
        ?.removeEventListener('click', onRequestApplePay);
    };
  }, [onRequestApplePay, ...dependencies]);

  return { applePayClickHandler: onRequestApplePay };
};
