export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/Clientx/g, installationName);
    },
  },
};
