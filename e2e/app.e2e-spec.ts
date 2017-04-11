import { ZebraFrontendPage } from './app.po';

describe('zebra-frontend App', () => {
  let page: ZebraFrontendPage;

  beforeEach(() => {
    page = new ZebraFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
