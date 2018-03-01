import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Stato e2e test', () => {

    let navBarPage: NavBarPage;
    let statoDialogPage: StatoDialogPage;
    let statoComponentsPage: StatoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Statoes', () => {
        navBarPage.goToEntity('stato');
        statoComponentsPage = new StatoComponentsPage();
        expect(statoComponentsPage.getTitle())
            .toMatch(/Statoes/);

    });

    it('should load create Stato dialog', () => {
        statoComponentsPage.clickOnCreateButton();
        statoDialogPage = new StatoDialogPage();
        expect(statoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Stato/);
        statoDialogPage.close();
    });

    it('should create and save Statoes', () => {
        statoComponentsPage.clickOnCreateButton();
        statoDialogPage.setDefinizioneInput('definizione');
        expect(statoDialogPage.getDefinizioneInput()).toMatch('definizione');
        statoDialogPage.setDescrizioneInput('descrizione');
        expect(statoDialogPage.getDescrizioneInput()).toMatch('descrizione');
        statoDialogPage.setAcronimoInput('acronimo');
        expect(statoDialogPage.getAcronimoInput()).toMatch('acronimo');
        statoDialogPage.setCodiceInput('codice');
        expect(statoDialogPage.getCodiceInput()).toMatch('codice');
        statoDialogPage.setValidoAlInput('2000-12-31');
        expect(statoDialogPage.getValidoAlInput()).toMatch('2000-12-31');
        statoDialogPage.save();
        expect(statoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StatoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-stato div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class StatoDialogPage {
    modalTitle = element(by.css('h4#myStatoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    definizioneInput = element(by.css('input#field_definizione'));
    descrizioneInput = element(by.css('input#field_descrizione'));
    acronimoInput = element(by.css('input#field_acronimo'));
    codiceInput = element(by.css('input#field_codice'));
    validoAlInput = element(by.css('input#field_validoAl'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDefinizioneInput = function(definizione) {
        this.definizioneInput.sendKeys(definizione);
    };

    getDefinizioneInput = function() {
        return this.definizioneInput.getAttribute('value');
    };

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

    setCodiceInput = function(codice) {
        this.codiceInput.sendKeys(codice);
    };

    getCodiceInput = function() {
        return this.codiceInput.getAttribute('value');
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
