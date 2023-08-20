import { getConfiguration } from "utils";

export { fakeBackend };

function fakeBackend() {
    const language = getConfiguration()
    let users = [{ id: 1, username: 'test', password: 'test', email: "test@test.com", firstname: 'Test_FirstName', lastname: 'Test_LastName', provider: "basic", role : "user" }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/auth/signin') && opts.method === 'POST':
                        return signin();
                    case url.endsWith('/auth/signup') && opts.method === 'POST':
                        return signup();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function signin() {
                const { username, password, provider } = body();
                //console.log(username, password, provider)
                const user = users.find(x => (x.username === username && x.password === password && x.provider === provider));

                if (!user) return error(language.usernameOrPasswordIncorrect);

                return ok({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    token: user.id.toString() + '-fake-jwt-token'
                });
            }

            function signup() {
                const { username, password, email, firstname, lastname, provider } = body();            
                const user = users.find(x => x.username === username);
                
                if (!!user) return error(language.usernameAlreadyExist);
               
                const newId = Math.max(...users.map(o => o.id), 0) + 1;
                const newUser = { id: newId, username, password, email, firstname, lastname, provider, role : "user" }
                console.log(newUser)
                users.push(newUser)
                return ok({
                    id: newUser.id,
                    username: newUser.username,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    token: newId.toString() + '-fake-jwt-token'
                });
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function error(message) {
                console.log(message)
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }
        });
    }
}
