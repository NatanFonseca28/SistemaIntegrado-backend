const MongoClient = require("mongodb").MongoClient;

module.exports = (app) => {
    /* -------------------------------------------------------------------------- */
    /*                    Criação de Schema para documento JSON                   */
    /* -------------------------------------------------------------------------- */

    const circSchema = new app.mongoose.Schema({
        title: { type: String, require: true },
        subtitle: { type: String, require: true },
        author: { type: String, require: true },
        ToDpto: { type: String, require: true },
        content: { type: String, require: true },
        to: { type: String, require: true },
    }, { collection: "Circ" });

    /* 
                Criação de Schema para documento JSON

                Descrição: Criação de todos os campos que estarão presentes do documento "Circular", que, mais detalhadamente são: Título,
                Subtítulo, autor e conteúdo. Todos os itens do objeto serão armazenados, através do mongoose, no banco NoSQL do mongoDB.
            
            
            */

    const Circ = app.mongoose.model("CircData", circSchema);

    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de inserção                       */
    /* -------------------------------------------------------------------------- */
    const save = async(req, res) => {
        const circFields = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            author: req.body.author,
            content: req.body.content,
            to: req.body.to,
        };

        const data = new Circ(circFields);
        data
            .save()
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err));

        /* 
                        
                        REQUISIÇÃO {
                            TIPO: POST (CREATE)
                            DESCRIÇÃO:  Cria uma circular e envia pro banco de dados (MongoDB) e para o e-mail do departamento de destino
                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/circs
                        }
                        
                        */
    };
    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de Busca                          */
    /* -------------------------------------------------------------------------- */

    const get = async(req, res) => {
        Circ.find({}).exec((err, CircData) => {
            res.send(CircData);
        });

        /* 
                    
                REQUISIÇÃO {
                    TIPO:   GET
                    DESCRIÇÃO:  Lista todos as Circulares presentes no banco
                    URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/circs
                }
                    
                */
    };
    const getById = async(req, res) => {
        const _id = req.params._id
        Circ.findOne({ _id }).exec((err, CircData) => {
            res.send(CircData);
        });
    };
    /* };
     */
    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de deleção                        */
    /* -------------------------------------------------------------------------- */

    const remove = async(req, res) => {
        const _id = req.params._id
        Circ.deleteOne({ _id }).exec((err, CircData) => {
            res.send(CircData);
        });

        /* 
                                
                                REQUISIÇÃO {
                                    TIPO: DELETE
                                    DESCRIÇÃO:  Deleta circulares de acordo com o Id informado
                                    URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/circs
                                }
                                
                                */
    };

    return {
        get,
        getById,
        save,
        remove,
    };
};