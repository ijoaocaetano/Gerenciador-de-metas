const { select } = require('@inquirer/prompts')
// do objeto quero apenas o select/  require = isso devolve um objeto!

const start = async () => {

    while(true){

        const option = await select ({ // Vai esperar a seleção do usuário 
            message: "Menu >", // Vai mostar uma mensagem
            choices: [ // E vai mostar essas escolhas
                {
                    name: "Cadastrar meta", // Vai mostar cadastrar meta
                    value: "cadastrar"   
                },// Quando o usuário escolher alguma o 'value vai entar na option'
                {
                    name: "Listar metas",
                    value: "listar"
                }, 
                {
                    name: "Sair", // Vai mostrar sair
                    value: "sair"
                }
            ]
        })


        switch(option){
            case 'cadastrar':
                console.log('Vamos cadastrar!');
                break;
            case 'listar':
                console.log('Vamos listar!');
                break;
            case 'sair':
                console.log('Até a próxima!')
                return;
        }
    }
}

start()