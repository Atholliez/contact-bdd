/**
 * Created by athollie on 04/12/17.
 */
const {Given,Then,When} = require ('cucumber');
Given(/^The contact list is display$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;
        var contact = this.browser.tabs.current.Contact.Contacts;
        var actu;
        var tab = this.browser.queryAll ('table tbody tr td');
        var i = 0;
        var iterator = contact.instance().iterator();
        while(iterator.hasNext()){
            actu = iterator.next();
            this.browser.assert.success(actu.firstName(),tab[i].innerHTML);
            i = i + 1;
            this.browser.assert.success(actu.lastName(),tab[i].innerHTML);
            i = i+5;
        }
        callback();
    });
});
When(/^User clicks on remove button of the first contact$/ , function(callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if (err) throw err;
        var tab = this.browser.query ('table tbody td a');
        tab.click();
        callback();
    });
});
Then(/^The first contact is removed$/ , function(callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if (err) throw err;
        var listeR = this.browser.tabs.current.Contact.Contacts.instance().iterator().next();
        var removeContact = this.browser.queryAll ('table tbody td');
        this.browser.assert.success(listeR.firstName(), "Jacques");
        this.browser.assert.success(listeR.firstName(),removeContact[0].innerText);
        callback();
    });
});