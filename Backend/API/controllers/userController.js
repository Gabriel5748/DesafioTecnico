let usuarios = [];

const mostrarUsuarios = (req, res) => {
    res.json(usuarios)
}

const criarUsuario = (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ erro: 'Name e email são obrigatórios' });
    }

    const novoUsuario = { 
        id: usuarios.length + 1, 
        name,
        email 
    };
    
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
};

const excluirUsuario = (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(usuario => usuario.id == parseInt(id))

    if (index !== -1) {
        usuarios.splice(index, 1)
        res.json({ mensagem: 'Tarefa excluída com sucesso' })
    } else {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
}

module.exports = { mostrarUsuarios, criarUsuario, excluirUsuario };