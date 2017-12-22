import { ProtoTravelPage } from './app.po';

describe('proto-travel App', () => {
  let page: ProtoTravelPage;

  beforeEach(() => {
    page = new ProtoTravelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
