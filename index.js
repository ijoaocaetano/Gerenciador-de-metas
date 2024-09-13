const { select, input, checkbox} = require('@inquirer/prompts');
// do objeto quero apenas o select/  require = isso devolve um objeto!
// O select = mostra uma lista, input = pega informações do usuário, checkbox

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

const listarMeta = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length == 0) {
        console.log('Nenhuma meta selecionada!');
        return;
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        });

        meta.checked= true
    });

    console.log('Meta(s) marcadas como concluídas(s)');

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
                await listarMeta();
                break;
            case 'sair':
                console.log('Até a próxima!')
                return;
        }
    }
}

start()