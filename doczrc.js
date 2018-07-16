import { babel } from 'docz-plugin-babel6';

export default {
<<<<<<< HEAD
  dist: './dist',
  plugins: [babel()]
=======
  plugins: [babel()],
  modifyBundlerConfig: config => {
    let newConfig = config;
    newConfig.module.rules.push({
      test: /\.txt/,
      use: 'raw-loader'
    });
    return newConfig;
  }
>>>>>>> 5726436... adding a proptable component
};
