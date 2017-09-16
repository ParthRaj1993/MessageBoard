import { MessageAppPage } from './app.po';

describe('message-app App', () => {
  let page: MessageAppPage;

  beforeEach(() => {
    page = new MessageAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
