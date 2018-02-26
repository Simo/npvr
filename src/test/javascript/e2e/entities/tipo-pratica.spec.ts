import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TipoPratica e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoPraticaDialogPage: TipoPraticaDialogPage;
    let tipoPraticaComponentsPage: TipoPraticaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoPraticas', () => {
        navBarPage.goToEntity('tipo-pratica');
        tipoPraticaComponentsPage = new TipoPraticaComponentsPage();
        expect(tipoPraticaComponentsPage.getTitle())
            .toMatch(/Tipo Praticas/);

    });

    it('should load create TipoPratica dialog', () => {
        tipoPraticaComponentsPage.clickOnCreateButton();
        tipoPraticaDialogPage = new TipoPraticaDialogPage();
        expect(tipoPraticaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Tipo Pratica/);
        tipoPraticaDialogPage.close();
    });

    it('should create and save TipoPraticas', () => {
        tipoPraticaComponentsPage.clickOnCreateButton();
        tipoPraticaDialogPage.setDescrizioneInput('descrizione');
        expect(tipoPraticaDialogPage.getDescrizioneInput()).toMatch('descrizione');
        tipoPraticaDialogPage.setAcronimoInput('acronimo');
        expect(tipoPraticaDialogPage.getAcronimoInput()).toMatch('acronimo');
        tipoPraticaDialogPage.setFamigliaInput('famiglia');
        expect(tipoPraticaDialogPage.getFamigliaInput()).toMatch('famiglia');
        tipoPraticaDialogPage.setValidoAlInput('2000-12-31');
        expect(tipoPraticaDialogPage.getValidoAlInput()).toMatch('2000-12-31');
        tipoPraticaDialogPage.save();
        expect(tipoPraticaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoPraticaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-tipo-pratica div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class TipoPraticaDialogPage {
    modalTitle = element(by.css('h4#myTipoPraticaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descrizioneInput = element(by.css('input#field_descrizione'));
    acronimoInput = element(by.css('input#field_acronimo'));
    famigliaInput = element(by.css('input#field_famiglia'));
    validoAlInput = element(by.css('input#field_validoAl'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDescrizioneInput = function(descrizione) {
        this.descrizioneInput.sendKeys(descrizione);
    };

    getDescrizioneInput = function() {
        return this.descrizioneInput.getAttribute('value');
    };

    setAcronimoInput = function(acronimo) {
        this.acronimoInput.sendKeys(acronimo);
    };

    getAcronimoInput = function() {
        return this.acronimoInput.getAttribute('value');
    };

    setFamigliaInput = function(famiglia) {
        this.famigliaInput.sendKeys(famiglia);
    };

    getFamigliaInput = function() {
        return this.famigliaInput.getAttribute('value');
    };

    setValidoAlInput = function(validoAl) {
        this.validoAlInput.sendKeys(validoAl);
    };

    getValidoAlInput = function() {
        return this.validoAlInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
