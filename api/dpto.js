const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
    const { existsOrError, notExistsOrError } = app.api.validator;

    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    const save = async(req, res) => {
        const dpto = {
            ...req.body,
        };

        try {
            existsOrError(dpto.name, "Nome não informado");
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (dpto.id) {
            app
                .db("dpto")
                .update(dpto)
                .where({
                    id: dpto.id,
                })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        } else {
            app
                .db("dpto")
                .insert(dpto)
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        }

        /* 
                                            
                                            REQUISIÇÃO {
                                                TIPO: POST (CREATE)
                                                DESCRIÇÃO:  Cria departamento no Banco de Dados (PSQL)
                                                URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/dptos
                                            }
                                            
                                            */
        /* 
                                            
                                            REQUISIÇÃO {
                                                TIPO:   PUT (UPDATE)
                                                DESCRIÇÃO:  Atualiza determinado departamento de acordo com o Id (Verifica se o departamento já foi criado de acordo com o Nickname)
                                                URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/dptos/{$Id}
                                            }
                                            
                                            */
    };

    const get = (req, res) => {
        app
            .db("dpto")
            .select("id", "name", "dptoemail")
            .then((dpto) => res.json(dpto))
            .catch((err) => res.status(500).send(err));

        /* 
                                        
                                        REQUISIÇÃO {
                                            TIPO:   GET
                                            DESCRIÇÃO:  Lista todos departamento cadastrados no sistema
                                            URL DE RESPOSTA (END-POINT): http://{$baseApiUrl}/dptos
                                        }
                                        
                                        */
    };

    const getById = (req, res) => {
        app
            .db("dpto")
            .select("id", "name", "dptoemail")
            .where({
                id: req.params.id,
            })
            .first()
            .then((dpto) => res.json(dpto))
            .catch((err) => res.status(500).send(err));

        /* 
                                    
                            REQUISIÇÃO {
                            TIPO:   GET
                            DESCRIÇÃO:  Lista um departamento específico determinado pelo ID do mesmo
                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/dpto/{$Id}
                        }
                                    
                        */
    };

    const remove = (req, res) => {
        const dpto = {
            ...req.body,
        };

        app
            .db("dpto")
            .select("id", "name", "dptoemail")
            .where({
                id: req.params.id,
            })
            .delete(dpto)
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err));

        /* 
                                    
                        REQUISIÇÃO {
                            TIPO: DELETE
                            DESCRIÇÃO:  Deleta departamento de acordo com o Id informado
                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/dpto/{$Id} 
                        }
                                    
                        */
    };

    return {
        save,
        remove,
        get,
        getById,
    };
};