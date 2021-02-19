const schedule = require('node-schedule')


module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function() {
        const usersCount = await app.db('users').count('id').first()
        const dptoCount = await app.db('dpto').count('id').first()

        const {
            Stat
        } = app.api.stat
        const lastStat = await Stat.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        })

        const stat = new Stat({
            users: usersCount.count,
            dpto: dptoCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeDpto = !lastStat || stat.dpto !== lastStat.dpto

        if (changeUsers || changeDpto) {
            stat.save().then(() => console.log('[Stats]: Estatísticas atualizadas'))
        }
    })
}