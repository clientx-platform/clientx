import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.clientx.onfig = {
        hostURL: 'https://app.clientx.io',
        helpCenterURL: 'https://help.clientx.io',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.clientx.io/hc/handbook'
      );
      window.clientx.onfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.clientx.onfig = {
        hostURL: 'https://app.clientx.io',
        helpCenterURL: 'https://help.clientx.io',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.clientx.io/hc/handbook/articles/article-slug');
      window.clientx.onfig = {};
    });
  });
});
