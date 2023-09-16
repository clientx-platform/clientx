export default {
  computed: {
    hostURL() {
      return window.clientx.onfig.hostURL;
    },
    vapidPublicKey() {
      return window.clientx.onfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.clientx.onfig.enabledLanguages;
    },
    isEnterprise() {
      return window.clientx.onfig.isEnterprise === 'true';
    },
  },
};
