/* -------------------------------------------------------------------------- */
/*                               ROTAS DAS APIs                               */
/* -------------------------------------------------------------------------- */
const admin = require("./admin");

module.exports = (app) => {
    app.post("/signup", app.api.user.save);
    app.post("/signin", app.api.auth.signin);
    app.post("/validateToken", app.api.auth.validateToken);

    /* -------------------------------------------------------------------------- */
    /*                    Rota para criação e busca de usuário                    */
    /* -------------------------------------------------------------------------- */

    app
        .route("/users")
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get);

    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                 Rota para deleção e atualização de usuário                 */
    /* -------------------------------------------------------------------------- */

    app
        .route("/users/:id")
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove));

    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                    Rota para criação e busca de Departamento               */
    /* -------------------------------------------------------------------------- */

    app
        .route("/dpto")
        .all(app.config.passport.authenticate())
        .get(app.api.dpto.get)
        .post(admin(app.api.dpto.save));

    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                 Rota para deleção e atualização de Departamento            */
    /* -------------------------------------------------------------------------- */

    app
        .route("/dpto/:id")
        .all(app.config.passport.authenticate())
        .put(app.api.dpto.save)
        .get(app.api.dpto.getById)
        .delete(admin(app.api.dpto.remove));

    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                     Rota de atualização de estatísticas                    */
    /* -------------------------------------------------------------------------- */

    app
        .route("/stats")
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get);

    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*               Rota de inserção, busca e deleção de memorandos              */
    /* -------------------------------------------------------------------------- */

    app
        .route("/memos")
        .all(app.config.passport.authenticate())
        .post(app.service.createMemo.save)
        .get(app.service.createMemo.get);



    app
        .route("/memos/:_id")
        .all(app.config.passport.authenticate())
        .delete(app.service.createMemo.remove)
        .get(app.service.createMemo.getById);





    /* -------------------------------------------------------------------------- */
    /*               Rota de Envio de e-mail via NodeMailer                       */
    /* -------------------------------------------------------------------------- */

    app
        .route("/send-mail")
        .all(app.config.passport.authenticate())
        .post(app.config.sendMail.sendMail)
};