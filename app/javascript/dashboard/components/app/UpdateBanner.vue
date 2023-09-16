<template>
  <banner
    v-if="shouldShowBanner"
    color-scheme="primary"
    :banner-message="bannerMessage"
    href-link="https://github.com/clientx-platform/clientx/releases"
    :href-link-text="$t('GENERAL_SETTINGS.LEARN_MORE')"
    has-close-button
    @close="dismissUpdateBanner"
  />
</template>
<script>
import Banner from 'dashboard/components/ui/Banner.vue';
import { LOCAL_STORAGE_KEYS } from 'dashboard/constants/localStorage';
import { LocalStorage } from 'shared/helpers/localStorage';
import { mapGetters } from 'vuex';
import adminMixin from 'dashboard/mixins/isAdmin';
import { hasAnUpdateAvailable } from './versionCheckHelper';

export default {
  components: { Banner },
  mixins: [adminMixin],
  props: {
    latestClientxVersion: { type: String, default: '' },
  },
  data() {
    return { userDismissedBanner: false };
  },
  computed: {
    ...mapGetters({ globalConfig: 'globalConfig/get' }),
    updateAvailable() {
      return hasAnUpdateAvailable(
        this.latestClientxVersion,
        this.globalConfig.appVersion
      );
    },
    bannerMessage() {
      return this.$t('GENERAL_SETTINGS.UPDATE_CLIENTX', {
        latestClientxVersion: this.latestClientxVersion,
      });
    },
    shouldShowBanner() {
      return (
        !this.userDismissedBanner &&
        this.globalConfig.displayManifest &&
        this.updateAvailable &&
        !this.isVersionNotificationDismissed(this.latestClientxVersion) &&
        this.isAdmin
      );
    },
  },
  methods: {
    isVersionNotificationDismissed(version) {
      const dismissedVersions =
        LocalStorage.get(LOCAL_STORAGE_KEYS.DISMISSED_UPDATES) || [];
      return dismissedVersions.includes(version);
    },
    dismissUpdateBanner() {
      let updatedDismissedItems =
        LocalStorage.get(LOCAL_STORAGE_KEYS.DISMISSED_UPDATES) || [];
      if (updatedDismissedItems instanceof Array) {
        updatedDismissedItems.push(this.latestClientxVersion);
      } else {
        updatedDismissedItems = [this.latestClientxVersion];
      }
      LocalStorage.set(
        LOCAL_STORAGE_KEYS.DISMISSED_UPDATES,
        updatedDismissedItems
      );
      this.userDismissedBanner = true;
    },
  },
};
</script>
