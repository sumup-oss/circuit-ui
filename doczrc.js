import { babel } from 'docz-plugin-babel6';

export default {
<<<<<<< HEAD
  dist: './dist',
  plugins: [babel()]
=======
  plugins: [babel()],
  modifyBabelRc: config => {
    config.plugins.push('react-docgen');
    console.log(config);

    return config;
  }
>>>>>>> 5726436... adding a proptable component
};
