const MongoClient = require("mongodb").MongoClient;

module.exports = (app) => {
    /* -------------------------------------------------------------------------- */
    /*                    Criação de Schema para documento JSON                   */
    /* -------------------------------------------------------------------------- */

    const memoSchema = new app.mongoose.Schema({
        title: { type: String, require: true },
        subtitle: { type: String, require: true },
        author: { type: String, require: true },
        ToDpto: { type: String, require: true },
        content: { type: String, require: true },
        to: { type: String, require: true },
    }, { collection: "Memo" });

    /* 
            Criação de Schema para documento JSON

            Descrição: Criação de todos os campos que estarão presentes do documento "Memorando", que, mais detalhadamente são: Título,
            Subtítulo, autor e conteúdo. Todos os itens do objeto serão armazenados, através do mongoose, no banco NoSQL do mongoDB.
        
        
        */

    const Memo = app.mongoose.model("MemoData", memoSchema);

    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de inserção                       */
    /* -------------------------------------------------------------------------- */

    const save = async(req, res) => {
        const memoFields = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            author: req.body.author,
            content: req.body.content,
            to: req.body.to,
        };

        const data = new Memo(memoFields);
        data
            .save()
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err));

        /* 
                
                REQUISIÇÃO {
                    TIPO: POST (CREATE)
                    DESCRIÇÃO:  Cria um memorando e envia pro banco de dados (MongoDB) e para o e-mail do departamento de destino
                    URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/memos
                }
                
                */
    };
    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de Busca                          */
    /* -------------------------------------------------------------------------- */

    const get = async(req, res) => {
        Memo.find({}).exec((err, MemoData) => {
            res.send(MemoData);
        });
        /* 
                        
                        REQUISIÇÃO {
                            TIPO:   GET
                            DESCRIÇÃO:  Lista todos os memorandos presentes no banco
                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/memos
                        }
                        
                        */
    };
    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de deleção                        */
    /* -------------------------------------------------------------------------- */

    const remove = async(req, res) => {
        const id = this.Memo.id;
        Memo.deleteOne(id);
        console.log(id);

        /* 
                        
                        REQUISIÇÃO {
                            TIPO: DELETE
                            DESCRIÇÃO:  Deleta memorandos de acordo com o Id informado
                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/memos
                        }
                        
                        */
    };

    return {
        get,
        save,
        remove,
    };
};