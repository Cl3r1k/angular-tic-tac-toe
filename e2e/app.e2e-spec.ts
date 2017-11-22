import { AppPage } from './app.po';

describe('angular-tic-tac-toe App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display `Tic Tac Toe` message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Tic Tac Toe');
    });
});
