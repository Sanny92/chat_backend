const conn = require('./config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('./key')

//Missing initializer in const declaration
// const generateAccessToken() = (id, email) => {
//     const payload = {
//         id,
//         email
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }


async function connStart() {
    try {
        await conn.connect(err => {
            if (err) {
                console.log("----Ошибка---- " + err);
                console.log(err);
                return err;
            } else {
                console.log("----Connect DB is OK!----")
            }
        })


    } catch (e) {
        console.log(e)
    }
}

async function connEnd() {
    try {
        await conn.end(err => {
            if (err) {
                console.log("----Ошибка---- " + err);
                console.log(err);
                return err;
            } else {
                console.log("----Connect DB is close !----")
            }
        })


    } catch (e) {
        console.log(e)
    }
}

class authController {

    async registration(req, res) {

        connStart()

        if ((req.body.first_name <= 0) || (req.body.last_name <= 0) || (req.body.email <= 0) || (req.body.password <= 0)) {
            return res.send(" There is not enough information, please provide all the data. (Заполните все поля) ");
        }

        // {
        //     "first_name": "123qwe",
        //     "last_name": "nghFname",
        //     "tag": "tag",
        //     "bio": "bio",
        //     "email": "123qwe@mail.com",
        //     "password": "123qwe"
        // }

        const hashPassword = bcrypt.hashSync(req.body.password, 7)
        try {
            conn.query(`SELECT *
                        FROM users
                        WHERE email = '${req.body.email}'`, (err, result, field) => {
                if (result.length > 0) {
                    return res.send(" This user already exists. (Такой пользователь существует) ");
                } else {
                    // запись в таблицу users
                    conn.query(`INSERT INTO users (first_name, last_name, tag, bio, email, password)
                                VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.tag}',
                                        '${req.body.bio}', '${req.body.email}', '${hashPassword}
                                        ')`, (err, result, field) => {
                    });
                    res.send("The user has been created. (Пользователь создан)")
                }
            })
        } catch (e) {
            console.log(e)
        }
        connEnd()
    }

    // -------------------------------------//

    async login(req, res) {
        connStart()
        try {

            if ((req.body.email <= 0) || (req.body.password <= 0)) {
                return res.send(" There is not enough information, please provide all the data. (Заполните все поля) ");
            }

            conn.query(`SELECT *
                        FROM users
                        WHERE email = '${req.body.email}'`, (err, result, field) => {

                if (result <= 0) {
                    return res.send("Such a user does not exist. (Такого пользователя не существует) ")
                } else if ((result[0]['email']) == req.body.email) {

                    const password = req.body.password
                    const hashPassword = bcrypt.hashSync(req.body.password, 7)
                    // user.password не сработало
                    const validPassword = bcrypt.compareSync(password, hashPassword)

                    if (!validPassword) {
                        return res.send("Invalid password. (Неверный пароль) ")
                    }
                    const id = (result[0]['id'])
                    const email = req.body.email

                    // console.log(id);
                    // console.log(email);
                    // console.log(secret);

//                      const token = generateAccessToken(id, email)
//

                    const token = jwt.sign({
                        id, email
                    }, secret, {expiresIn: 60 * 60})
                    // bearer добавлено для пользователя !?!?
                    return res.json({token: `Bearer ${token}`})

                    connEnd()
                }
            })


            // console.log(user.);


            //   const validPass = bcrypt.compareSync(pass, user.password )


        } catch (e) {

            console.log(e)

        }

    }

    //    // -------------------------------------//
    //    async logout (req, res) {
    //
    //        try{
    //
    //        }
    //
    //        catch (e) {
    //
    //            console.log(e)
    //
    //        }
    //
    //    }
    //    // -------------------------------------//
    async user(req, res) {

        try {

            const id = req.params.user_id

            conn.query(`SELECT *
                        FROM users
                        WHERE id = ${id}`, (err, result, field) => {
                //console.log(err)
                //console.log(result)
                res.send(result)
            })

        } catch (e) {

            console.log(e)

        }

    }

    //    // -------------------------------------//

    async chats(req, res) {

        try {

            const id = req.params.user_id

            conn.query(`SELECT *
                        FROM chats
                        WHERE user_1_id = ${id}`, (err, result, field) => {
                //console.log(err)
                //console.log(result)
                res.send(result)
            })

        } catch (e) {

            console.log(e)

        }

    }

    //    // -------------------------------------//

    async getChat(req, res) {

        try {
            const chat_id = req.params.chat_id

            conn.query(`SELECT *
                        FROM chats
                        WHERE id = ${chat_id}`, (err, result, field) => {
                //console.log(err)
                //console.log(result)
                res.send(result)
            })

        } catch (e) {

            console.log(e)

        }

    }

    //    // -------------------------------------//

}


module.exports = new authController()


