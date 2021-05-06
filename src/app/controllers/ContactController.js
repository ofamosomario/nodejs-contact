import firebase from "firebase/app";

import fsConfig from '../../config/firebase'

require('firebase/auth');
require('firebase/database');

class ContactController {

  async store(req , res) {

    firebase.initializeApp(fsConfig.start());
    try {

      firebase.database().ref(`strv-addressbook-${req.body.lastName}-${req.body.firstName}`).set({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber,
        address: req.body.address,
      });

      return res.status(200).json({ success: 'Contact created.' });

    } catch (error) {

      return res.status(400).json(error);

    }

  }

}

export default new ContactController();
