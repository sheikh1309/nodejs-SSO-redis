const   express = require('express'),
        RedisSessions = require("redis-sessions"),
        redisSession = new RedisSessions({ host: 'redis' }),
        session = require('express-session'),
        RedisStore = require('connect-redis')(session),
        appName = 'Yad2',
        app = express();

let userOBJ = {
    app: appName,
    id: "user1001", // JWT Token
    ip: "192.168.22.58",
    ttl: 3600, // time to live 7200 - Default
    data: {
        CustID: 123456,
        unread_msgs: 34
    }
};
redisSession.killsoid({app: appName, id: 'user1001'},
    (err, resp) => {
        console.log('Redis killsoid => ', resp)
    }
);

redisSession.soid(
    { app: appName, id: "user1001" },
    (err, resp) => {
        if(resp.sessions.length === 0) {
            redisSession.create(
                userOBJ,
                (err, resp) => {
                    console.log('Redis Set Session => ', resp.token)
                }
            );
        }
        resp.sessions.forEach( (res) => {
            console.log('Redis Response Session => ', res)
        })
    }
);

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});