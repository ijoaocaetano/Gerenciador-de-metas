// arrays, objetos
let meta = {
    // O valor da meta é ler um livro por mês
    value: 'Ler um livro por mês',
    checked: false,
    address: 2,
    log: (info) => {
        console.log(info)
    }
}

meta.value = "Não é mais ler um livro!"
meta.log(meta.value)

// function // arrow function
//const criarMeta = () => {}

//function criarMeta() {}