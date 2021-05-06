import Jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {

  async store(req , res){

    const { email , password } = req.body;

    const user = await User.findOne({ where: { email } })

    if( !user ) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if( !(await user.checkPassword(password)) ) {
      return res.status(401).json({ error: 'Wrong password.' });
    }

    const { id } = user;

    return res.json({
      user: {
        id
      },
      token: Jwt.sign({ id }, process.env.SECRET_KEY , {
        expiresIn: process.env.EXPIRES_IN,
      })

    })

  }

}

export default new SessionController();
