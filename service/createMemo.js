const MongoClient = require("mongodb").MongoClient;
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
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

    const printPdf = async(req, res) => {
        const _id = req.params._id;

        const searchMemo = await Memo.find({ _id }).exec();
        const dataMemo = searchMemo[0];

        const memoFields = {
            title: dataMemo.title,
            subtitle: dataMemo.subtitle,
            author: dataMemo.author,
            content: dataMemo.content,
            to: dataMemo.to,
        };

        const caminho = path.join(__dirname, "../", "view", "memo-template.ejs");

        ejs.renderFile(caminho, { title: memoFields.title }, (err, html) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            const options = {
                format: "A4",
                border: {
                    right: "8",
                },
            };
            pdf.create(html, options).toFile(`./download/${memoFields.title}.pdf`, (err, data) => {
                if (err) {
                    return res.send(err);
                }
                return res.send(html);
            });
        });
    };

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
    const getById = async(req, res) => {
        const _id = req.params._id;
        Memo.findOne({ _id }).exec((err, MemoData) => {
            res.send(MemoData);
        });
    };
    /* };
     */
    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de deleção                        */
    /* -------------------------------------------------------------------------- */

    const remove = async(req, res) => {
        const _id = req.params._id;
        Memo.deleteOne({ _id }).exec((err, MemoData) => {
            res.send(MemoData);
        });

        /* 
                                                        
                                                        REQUISIÇÃO {
                                                            TIPO: DELETE
                                                            DESCRIÇÃO:  Deleta memorandos de acordo com o Id informado
                                                            URL DE RESPOSTA (END-POINT):    http://{$baseApiUrl}/memos
                                                        }
                                                        
                                                        */
    };

    return {
        printPdf,
        get,
        getById,
        save,
        remove,
    };
};