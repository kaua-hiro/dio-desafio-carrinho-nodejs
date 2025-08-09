const readline = require('readline');

const produtosDisponiveis = [
    { id: 1, nome: "Fone de Ouvido Bluetooth", preco: 89.90 },
    { id: 2, nome: "Capa para Celular", preco: 25.50 },
    { id: 3, nome: "Carregador Portátil", preco: 120.00 },
    { id: 4, nome: "Teclado Mecânico", preco: 250.75 },
    { id: 5, nome: "Mouse Gamer", preco: 150.00 }
];

const carrinho = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listarProdutosDisponiveis() {
    console.log("\n--- Produtos Disponíveis ---");
    produtosDisponiveis.forEach(p => {
        console.log(`ID: ${p.id} | ${p.nome} - R$ ${p.preco.toFixed(2)}`);
    });
    console.log("---------------------------\n");
}

function adicionarItem() {
    listarProdutosDisponiveis();
    rl.question("Digite o ID do produto que deseja adicionar: ", (id) => {
        const produto = produtosDisponiveis.find(p => p.id === parseInt(id));

        if (!produto) {
            console.log("Erro: Produto não encontrado.");
            exibirMenu();
            return;
        }

        rl.question(`Digite a quantidade de "${produto.nome}": `, (quantidade) => {
            const qtd = parseInt(quantidade);
            if (isNaN(qtd) || qtd <= 0) {
                console.log("Erro: Quantidade inválida.");
                exibirMenu();
                return;
            }

            const itemNoCarrinho = carrinho.find(item => item.id === produto.id);

            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade += qtd;
                console.log(`\n✅ Quantidade de "${produto.nome}" atualizada para ${itemNoCarrinho.quantidade}.`);
            } else {
                carrinho.push({ ...produto, quantidade: qtd });
                console.log(`\n✅ ${qtd}x "${produto.nome}" adicionado(s) ao carrinho.`);
            }
            exibirMenu();
        });
    });
}


function removerItem() {
    if (carrinho.length === 0) {
        console.log("\nO carrinho está vazio.");
        exibirMenu();
        return;
    }

    listarCarrinho(false); // Lista o carrinho sem mostrar o total
    rl.question("Digite o ID do produto que deseja remover: ", (id) => {
        const idNum = parseInt(id);
        const indexParaRemover = carrinho.findIndex(item => item.id === idNum);

        if (indexParaRemover === -1) {
            console.log("Erro: Produto não encontrado no carrinho.");
        } else {
            const nomeRemovido = carrinho[indexParaRemover].nome;
            carrinho.splice(indexParaRemover, 1);
            console.log(`\n✅ "${nomeRemovido}" removido do carrinho.`);
        }
        exibirMenu();
    });
}

/**
 * Exibe o conteúdo atual do carrinho de compras.
 * @param {boolean} mostrarTotal - Se deve ou não exibir o total no final.
 */
function listarCarrinho(mostrarTotal = true) {
    if (carrinho.length === 0) {
        console.log("\n🛒 Seu carrinho está vazio.");
    } else {
        console.log("\n--- Seu Carrinho ---");
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            console.log(`ID: ${item.id} | ${item.nome} | Qtd: ${item.quantidade} | Subtotal: R$ ${subtotal.toFixed(2)}`);
        });
        console.log("--------------------\n");
    }
    if (mostrarTotal) {
        calcularTotal();
    }
}


function calcularTotal() {
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    console.log(`💰 Total do Carrinho: R$ ${total.toFixed(2)}\n`);
}


function exibirMenu() {
    console.log(`
--- 🛒 Carrinho de Compras Shopee ---
Escolha uma opção:
1. Adicionar produto
2. Remover produto
3. Listar carrinho
4. Sair
    `);

    rl.question("Opção: ", (opcao) => {
        switch (opcao.trim()) {
            case '1':
                adicionarItem();
                break;
            case '2':
                removerItem();
                break;
            case '3':
                listarCarrinho();
                exibirMenu();
                break;
            case '4':
                console.log("Obrigado por usar nosso sistema. Até logo!");
                rl.close();
                break;
            default:
                console.log("Opção inválida. Por favor, escolha uma das opções acima.");
                exibirMenu();
                break;
        }
    });
}

console.log("Bem-vindo ao sistema de carrinho de compras!");
exibirMenu();