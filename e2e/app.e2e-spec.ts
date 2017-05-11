import { BedtimeTunesPage } from './app.po';

describe('bedtime-tunes App', () => {
  let page: BedtimeTunesPage;

  beforeEach(() => {
    page = new BedtimeTunesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
