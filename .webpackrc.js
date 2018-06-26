import { resolve } from 'path';

export default {
  env: {
    production: {
      // define: {
      //   'BASE_URL': '/EasyOrder-FE/'
      // },
      // publicPath: '/EasyOrder-FE/static/'
    }
  },
  theme: {
    '@brand-primary': '#ffd161'
  },
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  proxy: {
    // '/api': {
    //   'target': 'http://192.168.191.2',
    //   secure: false,
    //   'changeOrigin': true
    // }
  }
}
