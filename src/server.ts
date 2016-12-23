import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Accounts.emailTemplates.resetPassword.text = function(user, url) {
    return `Hello,\n\nTo reset your password, simply click the link below.\n\n${url.replace("#/", "")}\n\nThanks.`;
  }
}
