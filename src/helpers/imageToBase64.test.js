import toBase64 from "./imageToBase64";

describe('imageToBase64 function tests', () => {
    test('retorna el archivo en base 64', async ()=>{
        const file = new File(["dummy content"], "example.png", {
            type: "image/png"
        });
        const result = await toBase64(file);
        expect(result).toContain("data:image/png;base64");
    })
})