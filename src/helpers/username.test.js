import getUsername from "./username";

describe('Username function test', ()=> {
    test('retorna el username desde el correo electronico cuando el usuario no tiene la propiedad displayName', ()=>{
        const user = {
            displayName: null,
            email: "test_123@gmail.com"

        };

        const username = getUsername(user);
        expect(username).toBe("test_123");
    })

    test('retorna el displayName cuando el usuario tiene la propiedad displayName', ()=>{
        const user = {
            displayName: "juan123",
            email: "test_123@gmail.com"

        };

        const username = getUsername(user);
        expect(username).toBe("juan123");
    })
})