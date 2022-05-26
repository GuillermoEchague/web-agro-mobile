import {isObjectEmpty, PictureValidation, PictureValidationResolution, SharePictureValidation, SignUpValidation} from "./validation";

describe('validation test', ()=> {
    describe('SignUpValidation Function', ()=>{
        test('valida un correo electronico invalido', ()=>{
            const validation = SignUpValidation("test@gmail");

            expect(Object.keys(validation.errors)).toContain('email');
        })

        test('valida un correo electronico valido', ()=>{
            const validation = SignUpValidation("test@gmail.com");

            expect(Object.keys(validation.errors)).not.toContain('email');
        })

        test('valida una contraseña incorrecta', ()=>{
            const validation = SignUpValidation("", "12345");

            expect(Object.keys(validation.errors)).toContain('password');
        })

        test('valida una contraseña correcta', ()=>{
            const validation = SignUpValidation("", "12345678");

            expect(Object.keys(validation.errors)).not.toContain('password');
        })

        test('la validacion retorna un objeto con los errores', ()=>{
            const validation = SignUpValidation("", "");

            expect(Object.keys(validation.errors).length).toBe(2);
        })

        test('la validacion falla cuando el correo electronico es incorrecto', ()=>{
            const validation = SignUpValidation("test@gmail", "12345678");

            expect(validation.isValid).toBe(false);
        })

        test('la validacion falla cuando el password es incorrecto', ()=>{
            const validation = SignUpValidation("test@gmail.com", "12345");

            expect(validation.isValid).toBe(false);
        })

        test('la validacion pasa cuando el correo electronico y el password es correcto', ()=>{
            const validation = SignUpValidation("test@gmail.com", "12345678");

            expect(validation.isValid).toBe(true);
        })
    });

    describe('PictureValidation tests', ()=>{
        const mockFile = (type = "image/png", size = 1) => {
            const file = new File(["dummy content"], "example." + type);
            Object.defineProperty(file, "size", {value: 1024 * 1024 * size});
            Object.defineProperty(file, "type", {value: type})
            return file;
        }

        test('la validacion falla cuando el archivo no tiene un formato valido', ()=>{
            const file = mockFile("text/plain");
            expect(PictureValidation(file).isValid).toBe(false);
        })

        test('la validacion falla cuando el archivo es mayor a 2MB', ()=>{
            const file = mockFile("image/png",3);
            expect(PictureValidation(file).isValid).toBe(false);
        })

        test('la validacion retorna un mensaje de error cuando el archivo no tiene un formato valido', ()=>{
            const file = mockFile("text/plain");
            expect(PictureValidation(file).errors.picture).toBe("La foto debe ser png o jpg");
        })

        test('la validacion retorna un mensaje de error cuando el archivo es mayor a 2MB', ()=>{
            const file = mockFile("image/png",3);
            expect(PictureValidation(file).errors.picture).toBe("El tamaño no puede superar los 2MB");
        })

        test('la validacion pasa cuando el formato es valido y el tamaño es menor a 2MB', ()=>{
            const file = mockFile();
            expect(PictureValidation(file).isValid).toBe(true);
        })

    })

    describe('PictureValidationResolution tests', ()=>{
        test('la validacion falla cuando el width es menor a 1024px', ()=>{
            expect(PictureValidationResolution(1023,720).isValid).toBe(false);
        })

        test('la validacion retorna un error cuando el width es menor a 1024px', ()=>{
            expect(PictureValidationResolution(1023,720).errors.picture).toBe("La foto debe ser al menos de 1024 pixeles de ancho");
        })

        test('la validacion pase cuando el width es mayor a 1024px', ()=>{
            expect(PictureValidationResolution(1280,720).isValid).toBe(true);
        })

    })

    describe('SharePictureValidation test', () => {

      test('la validacion falla cuando el titulo esta vacio', ()=>{
        const validation = SharePictureValidation('',"data:image/png;base64");
         expect(validation.isValid).toBe(false);
      }) 
      
      test('la validacion falla cuando el titulo tiene menos de 6 caracteres', ()=>{
        const title ="12345";
        const validation = SharePictureValidation(title,"data:image/png;base64");
        expect(validation.isValid).toBe(false);
    })  

    test('la validacion falla cuando el titulo tiene mas de 100 caracteres', ()=>{
        const title ='a'.repeat(101);
        const validation = SharePictureValidation(title,"data:image/png;base64");
        expect(validation.isValid).toBe(false);
    })  

    test('la validacion falla cuando la imagen esta vacia', ()=>{
        const validation = SharePictureValidation("1234567","");
        expect(validation.isValid).toBe(false);
    })

    test('la validacion falla cuando la imagen esta nulla', ()=>{
        const validation = SharePictureValidation("1234567",null);
        expect(validation.isValid).toBe(false);
    })

    test('la validacion retorna un error cuando el titulo esta vacio', () => {            
        const validation = SharePictureValidation("", "data:image/png;base64");
        expect(Object.keys(validation.errors)).toContain('title');
    })

    test('la validacion retorna un error cuando el titulo es menor a 6 caracteres', () => {            
        const validation = SharePictureValidation("12345", "data:image/png;base64");
        expect(Object.keys(validation.errors)).toContain('title');
    })

    test('la validacion retorna un error cuando el titulo es mayor a 100 caracteres', () => {            
        const title = 'a'.repeat(101);
        const validation = SharePictureValidation(title, "data:image/png;base64");
        expect(Object.keys(validation.errors)).toContain('title');
    })


    test('la validacion retorna un error cuando el foto esta vacia', () => {            
        const validation = SharePictureValidation("12345", "");
        expect(Object.keys(validation.errors)).toContain('picture');
    })

    test('la validacion retorna un error cuando el foto esta nula', () => {            
        const validation = SharePictureValidation("12345", null);
        expect(Object.keys(validation.errors)).toContain('picture');
    })

    test('la validacion retorna un objeto con los errores', () => {
        const validation = SharePictureValidation();
        expect(Object.keys(validation).length).toBe(2);
    })

     test('preserva los errores antiguos', () => {
         const validation = SharePictureValidation("1234567", "", "Error antiguo");
         expect(validation.errors.picture).toBe("Error antiguo");
     })
    
    test('la validacion pasa cuando el titulo y la foto son validos', () => {
        const validation = SharePictureValidation("1234567", "data:image/png;base64");
        expect(validation.isValid).toBe(true);
    })


    })

    describe( 'isObjectEmpty tests', ()=>{
        test('retorna true cuando el objeto esta vacio', ()=>{
            expect(isObjectEmpty({})).toBe(true);
        })

        test('retorna false cuando el objeto no esta vacio', ()=>{
            expect(isObjectEmpty({value:"ok"})).toBe(false);
        })
    })


});