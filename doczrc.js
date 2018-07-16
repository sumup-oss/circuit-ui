import { babel } from 'docz-plugin-babel6';

export default {
  plugins: [babel()],
  modifyBundlerConfig: config => {
    let newConfig = config;
    newConfig.module.rules.push({
      test: /\.txt/,
      use: 'raw-loader'
    });
    return newConfig;
  }
};
