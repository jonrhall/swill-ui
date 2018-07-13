import SwillSDK from '../../../swill-sdk';
import config from '../../config.json';

export default SwillSDK({
  server: `http://${config.server ? config.server : window.location.hostname}`
});
