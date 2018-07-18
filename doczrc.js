import { babel } from 'docz-plugin-babel6';

export default {
<<<<<<< HEAD
  dest: './dist',
  plugins: [babel()]
=======
  plugins: [babel()],
  modifyBabelRc: config => {
    config.plugins.push('react-docgen');
    console.log(config);

    return config;
  }
>>>>>>> eb51365... moving PropTable and service functions to utils folder
};
