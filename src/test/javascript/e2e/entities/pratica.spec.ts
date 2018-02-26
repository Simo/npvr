import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pratica e2e test', () => {

    let navBarPage: NavBarPage;
    let praticaDialogPage: PraticaDialogPage;
    let praticaComponentsPage: PraticaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Praticas', () => {
        navBarPage.goToEntity('pratica');
        praticaComponentsPage = new PraticaComponentsPage();
        expect(praticaComponentsPage.getTitle())
            .toMatch(/Praticas/);

    });

    it('should load create Pratica dialog', () => {
        praticaComponentsPage.clickOnCreateButton();
        praticaDialogPage = new PraticaDialogPage();
        expect(praticaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Pratica/);
        praticaDialogPage.close();
    });

    it('should create and save Praticas', () => {
        praticaComponentsPage.clickOnCreateButton();
        praticaDialogPage.setNumeroPraticaInput('numeroPratica');
        expect(praticaDialogPage.getNumeroPraticaInput()).toMatch('numeroPratica');
        praticaDialogPage.setNomeInput('nome');
        expect(praticaDialogPage.getNomeInput()).toMatch('nome');
        praticaDialogPage.annataViticolaSelectLastOption();
        praticaDialogPage.tipoPraticaSelectLastOption();
        praticaDialogPage.save();
        expect(praticaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PraticaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-pratica div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PraticaDialogPage {
    modalTitle = element(by.css('h4#myPraticaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroPraticaInput = element(by.css('input#field_numeroPratica'));
    nomeInput = element(by.css('input#field_nome'));
    annataViticolaSelect = element(by.css('select#field_annataViticola'));
    tipoPraticaSelect = element(by.css('select#field_tipoPratica'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumeroPraticaInput = function(numeroPratica) {
        this.numeroPraticaInput.sendKeys(numeroPratica);
    };

    getNumeroPraticaInput = function() {
        return this.numeroPraticaInput.getAttribute('value');
    };

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    annataViticolaSelectLastOption = function() {
        this.annataViticolaSelect.all(by.tagName('option')).last().click();
    };

    annataViticolaSelectOption = function(option) {
        this.annataViticolaSelect.sendKeys(option);
    };

    getAnnataViticolaSelect = function() {
        return this.annataViticolaSelect;
    };

    getAnnataViticolaSelectedOption = function() {
        return this.annataViticolaSelect.element(by.css('option:checked')).getText();
    };

    tipoPraticaSelectLastOption = function() {
        this.tipoPraticaSelect.all(by.tagName('option')).last().click();
    };

    tipoPraticaSelectOption = function(option) {
        this.tipoPraticaSelect.sendKeys(option);
    };

    getTipoPraticaSelect = function() {
        return this.tipoPraticaSelect;
    };

    getTipoPraticaSelectedOption = function() {
        return this.tipoPraticaSelect.element(by.css('option:checked')).getText();
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
