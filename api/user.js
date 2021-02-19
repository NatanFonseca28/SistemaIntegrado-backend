const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    /* -------------------------------------------------------------------------- */
    /*                  persistência de usuário no Banco de Dados                 */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                 Função utilizada para criar um novo usuário                */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                    e/ou                                    */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                          alterar usuário existente                         */
    /* -------------------------------------------------------------------------- */

    const save = async(req, res) => {
        const user = {...req.body };
        if (req.params.id) user.id = req.params.id;

        if (!req.originalUrl.startsWith("/users")) user.admin = false;
        if (!req.user || !req.user.admin) user.admin = false;

        try {
            existsOrError(user.name, "Nome não informado");
            existsOrError(user.email, "E-mail não informado");
            existsOrError(user.nickname, "Nome de usuário não informado");
            existsOrError(user.idDpto, "Departamento não informado");
            existsOrError(user.password, "Senha não informada");
            existsOrError(user.confirmPassword, "Senha não confere");
            equalsOrError(user.password, user.confirmPassword, "Senha não confere");

            /* 
                  
                  TRATAMENTO DE ERROS:

                  Tratamento de erros para cada caso de inserção de dados no sistema. Para mais informações, consulte "//API/validator.js"
                  
                  */

            const userFromDB = await app
                .db("users")
                .where({
                    nickname: user.nickname,
                })
                .first();
            if (!user.id) {
                notExistsOrError(userFromDB, "Usuário já cadastrado no sistema");
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }
        user.password = encryptPassword(user.password);
        delete user.confirmPassword;

        if (user.id) {
            app
                .db("users")
                .update(user)
                .where({
                    id: user.id,
                })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        } else {
            app
                .db("users")
                .insert(user)
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        }

        /* 
                    
                    REQUISIÇÃO {
                        TIPO: POST (CREATE)
                        DESCRIÇÃO:  Cria usuário no Banco de Dados (PSQL)
                        URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/users
                    }
                    
                    */

        /* 
                    
                    REQUISIÇÃO {
                        TIPO:   PUT (UPDATE)
                        DESCRIÇÃO:  Atualiza determinado usuário de acordo com o Id (Verifica se o usuário já foi criado de acordo com o Nickname)
                        URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/users/{$Id}
                    }
                    
                    */
    };

    const get = (req, res) => {
        app
            .db("users")
            .select("id", "idDpto", "nickname", "name", "email", "admin")
            .then((users) => res.json(users))
            .catch((err) => res.status(500).send(err));

        /* 
                    
                    REQUISIÇÃO {
                        TIPO:   GET
                        DESCRIÇÃO:  Lista todos usuários cadastrados no sistema
                        URL DE RESPOSTA (END-POINT): http://{$baseApiUrl}/users
                    }
                    
                    */
    };
    const getById = (req, res) => {
        app
            .db("users")
            .select("id", "idDpto", "nickname", "name", "email", "admin")
            .where({
                id: req.params.id,
            })
            .first()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).send(err));

        /* 
                    
                    REQUISIÇÃO {
                        TIPO:   GET
                        DESCRIÇÃO:  Lista um usuário específico determinado pelo ID do mesmo
                        URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/users/{$Id}
                    }
                    
                    */
    };

    const remove = async(req, res) => {
        const user = {...req.body };
        app
            .db("users")
            .delete(user)
            .where({
                id: req.params.id,
            })
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err));

        /* 
                    
                    REQUISIÇÃO {
                        TIPO: DELETE
                        DESCRIÇÃO:  Deleta usuário de acordo com o Id informado
                        URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/users/{$Id} 
                    }
                    
                    */
    };
    return {
        save,
        get,
        getById,
        remove,
    };
};