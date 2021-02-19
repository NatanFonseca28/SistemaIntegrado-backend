/* -------------------------------------------------------------------------- */
/*                                ANALISAR!!!!                                */
/* -------------------------------------------------------------------------- */







const MongoClient = require("mongodb").MongoClient;

module.exports = (app) => {
    /* -------------------------------------------------------------------------- */
    /*                    Criação de Schema para documento JSON                   */
    /* -------------------------------------------------------------------------- */

    const circSchema = new app.mongoose.Schema({
        title: { type: String, require: true },
        subtitle: { type: String, require: true },
        author: { type: String, require: true },
        content: { type: String, require: true },
    }, { collection: "Memo" });


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
        };

        const data = new Circ(circFields);
        data
            .save()
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err));
    };

    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de Busca                          */
    /* -------------------------------------------------------------------------- */

    const get = async(req, res) => {
        Circ.find({}).exec((err, CircData) => {
            res.send(CircData);
        });
    };

    /* -------------------------------------------------------------------------- */
    /*                        método assíncrono de deleção                        */
    /* -------------------------------------------------------------------------- */

    const remove = async(req, res) => {
        const id = this.Circ.id;
        Circ.deleteOne(id);
        console.log(id);
    };

    return {
        get,
        save,
        remove,
    };
};