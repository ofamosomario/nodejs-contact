import * as Yup from 'yup';
import Jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth'

class UserController {

  async index(req, res) {
    return res.status(200).json({ error: 'OLA!' })
  }

  async store(req , res){

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if( !(await schema.isValid(req.body)) ){
      return res.status(400).json({ error: 'Email and passwords are required.' })
    }

    const userExists = await User.findOne({
      where: {email: req.body.email},
    });

    if( userExists ) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    const user = await User.create(req.body)
    const userId = user.id

    return res.status(201).json({
      token: Jwt.sign({ userId }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    })

  }

  async update(req , res){

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string().required().min(6).when("oldPassword" , ( oldPassword , field ) =>
        oldPassword ? field.required(): field
      ),
      confirmPassword: Yup.string().when('password' , ( password , field ) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failed.' })
    }

    const { email , oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if( email !== user.email ) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    if ( oldPassword && !(await user.checkPassword(oldPassword)) ) {
      return res.status(401).json({ error: 'Wrong password.' })
    }

    try {

      if ( await user.update(req.body) ) {

        return res.status(201).json({
          id: user.id,
          email: req.body.email
        });

      }

    } catch (error) {
      res.status(400).json(error);
    }

  }

}

export default new UserController();
