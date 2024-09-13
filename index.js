const { select, input} = require('@inquirer/prompts');
// do objeto quero apenas o select/  require = isso devolve um objeto!

let meta = {
    value: 'Tomar 3L de água por dia.',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    // Aguarda o usuário digitar a meta
    const meta = await input ({message: "Digite a meta:"});

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.');
        return;
    }

    metas.push(
        { value: meta, checked: false,}
    )
}

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
                await cadastrarMeta();
                console.log(metas)
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