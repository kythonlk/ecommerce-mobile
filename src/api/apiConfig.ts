import { environment } from './env';

export function getWoocommerceApiConfig() {
  return {
    Url: environment.woocommerceApiUrl,
    Key: environment.woocommerceConsumerKey,
    Secret: environment.woocommerceConsumerSecret,
  };
}
