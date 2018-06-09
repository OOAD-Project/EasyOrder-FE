import { resolve } from 'path';

export default {
  env: {
    production: {
      define: {
        'BASE_URL': '/EasyOrder-FE/'
      },
      publicPath: '/EasyOrder-FE/static/'
    }
  },
  theme: {
    '@brand-primary': '#ffd161'
  },
  alias: {
    '@': resolve(__dirname, 'src'),
  }
}
