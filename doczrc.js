import { babel } from 'docz-plugin-babel6';

export default {
  plugins: [babel()],
  modifyBabelRc: config => {
    config.plugins.push('react-docgen');
    console.log(config);

    return config;
  }
};
