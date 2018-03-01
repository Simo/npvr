import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('IterStep e2e test', () => {

    let navBarPage: NavBarPage;
    let iterStepDialogPage: IterStepDialogPage;
    let iterStepComponentsPage: IterStepComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IterSteps', () => {
        navBarPage.goToEntity('iter-step');
        iterStepComponentsPage = new IterStepComponentsPage();
        expect(iterStepComponentsPage.getTitle())
            .toMatch(/Iter Steps/);

    });

    it('should load create IterStep dialog', () => {
        iterStepComponentsPage.clickOnCreateButton();
        iterStepDialogPage = new IterStepDialogPage();
        expect(iterStepDialogPage.getModalTitle())
            .toMatch(/Create or edit a Iter Step/);
        iterStepDialogPage.close();
    });

    it('should create and save IterSteps', () => {
        iterStepComponentsPage.clickOnCreateButton();
        iterStepDialogPage.setDefinizioneInput('definizione');
        expect(iterStepDialogPage.getDefinizioneInput()).toMatch('definizione');
        iterStepDialogPage.setDescrizioneInput('descrizione');
        expect(iterStepDialogPage.getDescrizioneInput()).toMatch('descrizione');
        iterStepDialogPage.setDirezioneInput('5');
        expect(iterStepDialogPage.getDirezioneInput()).toMatch('5');
        iterStepDialogPage.statoPartenzaSelectLastOption();
        iterStepDialogPage.statoArrivoSelectLastOption();
        iterStepDialogPage.save();
        expect(iterStepDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IterStepComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('npvr-iter-step div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class IterStepDialogPage {
    modalTitle = element(by.css('h4#myIterStepLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    definizioneInput = element(by.css('input#field_definizione'));
    descrizioneInput = element(by.css('input#field_descrizione'));
    direzioneInput = element(by.css('input#field_direzione'));
    statoPartenzaSelect = element(by.css('select#field_statoPartenza'));
    statoArrivoSelect = element(by.css('select#field_statoArrivo'));

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

    setDirezioneInput = function(direzione) {
        this.direzioneInput.sendKeys(direzione);
    };

    getDirezioneInput = function() {
        return this.direzioneInput.getAttribute('value');
    };

    statoPartenzaSelectLastOption = function() {
        this.statoPartenzaSelect.all(by.tagName('option')).last().click();
    };

    statoPartenzaSelectOption = function(option) {
        this.statoPartenzaSelect.sendKeys(option);
    };

    getStatoPartenzaSelect = function() {
        return this.statoPartenzaSelect;
    };

    getStatoPartenzaSelectedOption = function() {
        return this.statoPartenzaSelect.element(by.css('option:checked')).getText();
    };

    statoArrivoSelectLastOption = function() {
        this.statoArrivoSelect.all(by.tagName('option')).last().click();
    };

    statoArrivoSelectOption = function(option) {
        this.statoArrivoSelect.sendKeys(option);
    };

    getStatoArrivoSelect = function() {
        return this.statoArrivoSelect;
    };

    getStatoArrivoSelectedOption = function() {
        return this.statoArrivoSelect.element(by.css('option:checked')).getText();
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
