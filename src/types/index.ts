export type ApplePayLocales =
  | 'ar-AB'
  | 'ca-ES'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-DE'
  | 'el-GR'
  | 'en-AU'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'he-IL'
  | 'hi-IN'
  | 'hr-HR'
  | 'hu-HU'
  | 'id-ID'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'ms-MY'
  | 'nb-NO'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'sk-SK'
  | 'sv-SE'
  | 'th-TH'
  | 'tr-TR'
  | 'uk-UA'
  | 'vi-VN'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW';

export type PaymentRequest = ApplePayJS.ApplePayPaymentRequest;
export type OnValidateMerchant = (
  event: ApplePayJS.ApplePayValidateMerchantEvent,
  session: ApplePaySession
) => void;
export type OnPaymentAuthorized = (
  event: ApplePayJS.ApplePayPaymentAuthorizedEvent,
  session: ApplePaySession
) => void;
export type OnCancel = (
  event: ApplePayJS.Event,
  session: ApplePaySession
) => void;

export type UseApplePayConfigs = {
  paymentRequest: PaymentRequest;
  onValidateMerchant: OnValidateMerchant;
  onPaymentAuthorized: OnPaymentAuthorized;
  onCancel: OnCancel;
  dependencies?: any[];
};

export type ApplePayButtonProps = {
  readonly buttonstyle?: 'black' | 'white' | 'white-outline';
  readonly type?: 'plain' | 'buy' | 'donate' | 'pay';
  readonly locale?: ApplePayLocales;
};
