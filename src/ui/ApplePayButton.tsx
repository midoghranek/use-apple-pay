import React, { FC, createElement } from 'react';
import { ApplePayButtonProps } from '../types';
import styled from '@emotion/styled';
import { useScript } from '../hooks/useScript';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'apple-pay-button': ApplePayButtonProps;
    }
  }
}

export const ApplePayButton: FC<ApplePayButtonProps> = props => {
  useScript('https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js');
  return (
    <ApplePayButtonStyled>
      {createElement('apple-pay-button', {
        buttonstyle: props.buttonstyle || 'black',
        type: props.type || 'pay',
        locale: props.locale || 'en-US',
      })}
    </ApplePayButtonStyled>
  );
};

const ApplePayButtonStyled = styled.div`
  apple-pay-button {
    --apple-pay-button-width: 100%;
    --apple-pay-button-height: 50px;
    --apple-pay-button-border-radius: 7px;
    --apple-pay-button-padding: 7px 7px;
    --apple-pay-button-box-sizing: border-box;
  }
`;
