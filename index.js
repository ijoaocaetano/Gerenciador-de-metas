const { select, input, checkbox} = require('@inquirer/prompts');
// do objeto quero apenas o select/  require = isso devolve um objeto!
// O select = mostra uma lista, input = pega informações do usuário, checkbox


let mensagem = "Bem vindo ao App de Metas";

let meta = {
    value: 'Tomar 3L de água por dia.',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    // Aguarda o usuário digitar a meta
    const meta = await input ({message: "Digite a meta:"});

    if(meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.';
        return;
    }

    metas.push(
        { value: meta, checked: false,}
    );

    mensagem = "Meta cadastrada com sucesso!";
}

const listarMeta = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = 'Nenhuma meta selecionada!';
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        });

        meta.checked= true
    });

    mensagem = 'Meta(s) marcada(s) como concluídas(s)';

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    });

    if(realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :(';
        return
    }

    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    });
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    });

    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas! :)";
        return
    }

    await select ({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    });
}

const deletarMeta = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    });

    const itemADeletar = await checkbox ({
        message: 'Selecione item para deletar',
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemADeletar.length == 0) {
        mensagem = 'Nenhum item para deletar!';
        return
    }

    itemADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        });

        mensagem = "Meta(s) deletada(s) com sucesso!";
    });
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const start = async () => {

    while(true){
        mostrarMensagem();

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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
                break;
            case 'listar':
                await listarMeta();
                break;
            case 'realizadas':
                await metasRealizadas();
                break;
            case 'abertas':
                await metasAbertas();
                break;
            case 'deletar':
                await deletarMeta();
                break;
            case 'sair':
                console.log('Até a próxima!');
                return;
        }
    }
}

start()