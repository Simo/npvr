import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StatoPratica e2e test', () => {

    let navBarPage: NavBarPage;
    let statoPraticaDialogPage: StatoPraticaDialogPage;
    let statoPraticaComponentsPage: StatoPraticaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StatoPraticas', () => {
        navBarPage.goToEntity('stato-pratica');
        statoPraticaComponentsPage = new StatoPraticaComponentsPage();
        expect(statoPraticaComponentsPage.getTitle())
            .toMatch(/Stato Praticas/);

    });

    it('should load create StatoPratica dialog', () => {
        statoPraticaComponentsPage.clickOnCreateButton();
        statoPraticaDialogPage = new StatoPraticaDialogPage();
        expect(statoPraticaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Stato Pratica/);
        statoPraticaDialogPage.close();
    });

    it('should create and save StatoPraticas', () => {
        statoPraticaComponentsPage.clickOnCreateButton();
        statoPraticaDialogPage.setDataInizioInput('2000-12-31');
        expect(statoPraticaDialogPage.getDataInizioInput()).toMatch('2000-12-31');
        statoPraticaDialogPage.setDataFineInput('2000-12-31');
        expect(statoPraticaDialogPage.getDataFineInput()).toMatch('2000-12-31');
        statoPraticaDialogPage.setUtenteInput('5');
        expect(statoPraticaDialogPage.getUtenteInput()).toMatch('5');
        statoPraticaDialogPage.praticaSelectLastOption();
        statoPraticaDialogPage.statoSelectLastOption();
        statoPraticaDialogPage.save();
        expect(statoPraticaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StatoPraticaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-stato-pratica div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class StatoPraticaDialogPage {
    modalTitle = element(by.css('h4#myStatoPraticaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dataInizioInput = element(by.css('input#field_dataInizio'));
    dataFineInput = element(by.css('input#field_dataFine'));
    utenteInput = element(by.css('input#field_utente'));
    praticaSelect = element(by.css('select#field_pratica'));
    statoSelect = element(by.css('select#field_stato'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDataInizioInput = function(dataInizio) {
        this.dataInizioInput.sendKeys(dataInizio);
    };

    getDataInizioInput = function() {
        return this.dataInizioInput.getAttribute('value');
    };

    setDataFineInput = function(dataFine) {
        this.dataFineInput.sendKeys(dataFine);
    };

    getDataFineInput = function() {
        return this.dataFineInput.getAttribute('value');
    };

    setUtenteInput = function(utente) {
        this.utenteInput.sendKeys(utente);
    };

    getUtenteInput = function() {
        return this.utenteInput.getAttribute('value');
    };

    praticaSelectLastOption = function() {
        this.praticaSelect.all(by.tagName('option')).last().click();
    };

    praticaSelectOption = function(option) {
        this.praticaSelect.sendKeys(option);
    };

    getPraticaSelect = function() {
        return this.praticaSelect;
    };

    getPraticaSelectedOption = function() {
        return this.praticaSelect.element(by.css('option:checked')).getText();
    };

    statoSelectLastOption = function() {
        this.statoSelect.all(by.tagName('option')).last().click();
    };

    statoSelectOption = function(option) {
        this.statoSelect.sendKeys(option);
    };

    getStatoSelect = function() {
        return this.statoSelect;
    };

    getStatoSelectedOption = function() {
        return this.statoSelect.element(by.css('option:checked')).getText();
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
