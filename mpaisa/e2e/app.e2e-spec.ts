import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for mpaisa', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be mpaisa', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('mpaisa');
    })
  });

  it('navbar-brand should be mpaisa@0.1.8',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('mpaisa@0.1.8');
  });

  
    it('Loans component should be loadable',() => {
      page.navigateTo('/Loans');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Loans');
    });

    it('Loans table should have 10 columns',() => {
      page.navigateTo('/Loans');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });

  

});
