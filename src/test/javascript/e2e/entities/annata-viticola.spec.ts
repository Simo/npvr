import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AnnataViticola e2e test', () => {

    let navBarPage: NavBarPage;
    let annataViticolaDialogPage: AnnataViticolaDialogPage;
    let annataViticolaComponentsPage: AnnataViticolaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AnnataViticolas', () => {
        navBarPage.goToEntity('annata-viticola');
        annataViticolaComponentsPage = new AnnataViticolaComponentsPage();
        expect(annataViticolaComponentsPage.getTitle())
            .toMatch(/Annata Viticolas/);

    });

    it('should load create AnnataViticola dialog', () => {
        annataViticolaComponentsPage.clickOnCreateButton();
        annataViticolaDialogPage = new AnnataViticolaDialogPage();
        expect(annataViticolaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Annata Viticola/);
        annataViticolaDialogPage.close();
    });

    it('should create and save AnnataViticolas', () => {
        annataViticolaComponentsPage.clickOnCreateButton();
        annataViticolaDialogPage.setAnnoInput('anno');
        expect(annataViticolaDialogPage.getAnnoInput()).toMatch('anno');
        annataViticolaDialogPage.setDescrizioneInput('descrizione');
        expect(annataViticolaDialogPage.getDescrizioneInput()).toMatch('descrizione');
        annataViticolaDialogPage.setDataInizioInput('2000-12-31');
        expect(annataViticolaDialogPage.getDataInizioInput()).toMatch('2000-12-31');
        annataViticolaDialogPage.setDataFineInput('2000-12-31');
        expect(annataViticolaDialogPage.getDataFineInput()).toMatch('2000-12-31');
        annataViticolaDialogPage.save();
        expect(annataViticolaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AnnataViticolaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-annata-viticola div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AnnataViticolaDialogPage {
    modalTitle = element(by.css('h4#myAnnataViticolaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    annoInput = element(by.css('input#field_anno'));
    descrizioneInput = element(by.css('input#field_descrizione'));
    dataInizioInput = element(by.css('input#field_dataInizio'));
    dataFineInput = element(by.css('input#field_dataFine'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setAnnoInput = function(anno) {
        this.annoInput.sendKeys(anno);
    };

    getAnnoInput = function() {
        return this.annoInput.getAttribute('value');
    };

    setDescrizioneInput = function(descrizione) {
        this.descrizioneInput.sendKeys(descrizione);
    };

    getDescrizioneInput = function() {
        return this.descrizioneInput.getAttribute('value');
    };

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
