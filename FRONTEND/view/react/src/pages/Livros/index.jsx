import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bridge from '../../services/bridge';
import logo from "../../assets/images/logo-escrita.png";

function Livros() {
    const navigate = useNavigate();
    
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editandoLivro, setEditandoLivro] = useState(null);


function logout() {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    }


    
    // Refs para criação
    const inputTitulo = useRef();
    const inputDescricao = useRef();
    const selectCategoria = useRef();
    const inputCapa = useRef();

    // Refs para edição
    const editTitulo = useRef();
    const editDescricao = useRef();
    const editCategoria = useRef();
    const editCapa = useRef();

    const token = localStorage.getItem('token');
    const config = { headers: { authorization: `Bearer ${token}` } };

    // --- CARREGAR DADOS (LIVROS E CATEGORIAS) ---
    async function carregarDados() {
        try {
            const [resLivros, resCats] = await Promise.all([
                bridge.get('/livros', config),
                bridge.get('/categorias', config)
            ]);
            
            setLivros(resLivros.data.listaDeLivros || []);
            setCategorias(resCats.data || []);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    }

    // --- CRIA LIVRO ---
    async function criarLivro() {
        if (!selectCategoria.current.value) return alert("Selecione um gênero!");

        try {
            const formData = new FormData();
            formData.append('titulo', inputTitulo.current.value);
            formData.append('descricao', inputDescricao.current.value);
            formData.append('categoryId', selectCategoria.current.value);
            if (inputCapa.current.files[0]) formData.append('capa', inputCapa.current.files[0]);

            await bridge.post('/livros', formData, {
                headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
            });

            alert("Livro cadastrado!");

            // Limpa os campos
            inputTitulo.current.value = "";
            inputDescricao.current.value = "";
            selectCategoria.current.value = "";
            inputCapa.current.value = null; 

            carregarDados(); 
        } catch (err) {
            alert("Erro ao criar livro.");
        }
    }

    // --- ATUALIZAR LIVRO ---
    async function atualizarLivro() {
        try {
            const formData = new FormData();
            formData.append('titulo', editTitulo.current.value);
            formData.append('descricao', editDescricao.current.value);
            formData.append('categoryId', editCategoria.current.value);
            
            if (editCapa.current.files[0]) formData.append('capa', editCapa.current.files[0]);

            await bridge.put(`/livros/${editandoLivro.id}`, formData, {
                headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
            });

            alert("Atualizado com sucesso!");
            setEditandoLivro(null);
            carregarDados();
        } catch (err) {
            alert("Erro ao atualizar.");
        }
    }

    async function deletarLivro(id) {
        if (window.confirm("Deseja realmente excluir?")) {
            try {
                await bridge.delete(`/livros/${id}`, config);
                carregarDados();
            } catch (err) {
                alert("Erro ao deletar");
            }
        }
    }






    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <div className="h-screen w-full bg-[#020617] flex flex-col items-center p-4 overflow-hidden font-sans relative">


<button 
                onClick={logout}
                className="absolute top-6 right-8 z-50  hover:bg-red-600 border border-white text-gray-500 hover:text-white px-4 py-2 rounded-md text-xs font-bold uppercase transition-all cursor-pointer backdrop-blur-md"
            >
                Sair da Conta
            </button>










            <img className="w-35 mb-4 z-10" src={logo} alt="logo" />

    <div class="stars"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>




            <div className="w-full max-w-6xl h-[85vh] bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 flex flex-col overflow-hidden z-10">
                



                
                {/* FORMULÁRIO */}
                <section className="px-8 py-6 bg-white/5 border-b border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1 flex flex-col gap-2">
                            <input ref={inputTitulo} placeholder="Título" className="p-3 rounded-xl bg-white/10 text-white text-sm outline-none border border-white/10 focus:border-blue-500" />
                            
                            <select ref={selectCategoria} className="p-3 rounded-xl bg-[#1e293b] text-white text-sm outline-none border border-white/10">
                                <option value="">Selecionar Gênero</option>
                                {categorias.map(cat => (
                                    <option key={cat.id || cat._id} value={cat.id || cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <textarea ref={inputDescricao} placeholder="Sinopse" className="w-full p-3 rounded-xl bg-white/10 text-white text-sm h-94px resize-none outline-none border border-white/10 focus:border-blue-500" />
                        </div>
                        <div className="md:col-span-1 flex flex-col gap-2">
                            <input type="file" ref={inputCapa} className="text-[10px] text-white/50 p-2 bg-white/5 rounded-xl border border-dashed border-white/20" />
                            <button onClick={criarLivro} className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase transition-all cursor-pointer h-7">Salvar</button>
                        </div>
                    </div>
                </section>

                {/* LISTAGEM */}
                <main className="flex-1 overflow-y-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {livros.map(livro => {
                        const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(new Date(livro.createdAt));
                        
                        return (
                            <div key={livro.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col hover:border-blue-500/50 transition-all group">
                                {/* Imagem Maior */}
                                <div className="h-60 bg-slate-800 rounded-2xl mb-4 overflow-hidden relative">
                                    {livro.capa ? (
                                        <img src={`http://localhost:3000/uploads/${livro.capa}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-white/20">Sem Capa</div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-purple-700 text-[10px] px-3 py-1 rounded-full text-white font-bold uppercase shadow-lg">
                                        {livro.category?.name || 'Sem categoria'}
                                    </div>
                                </div>

                                {/* Conteúdo */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-lg truncate mb-1">{livro.titulo}</h4>
                                    <p className="text-white/40 text-[10px] mb-3 uppercase tracking-wider">📅 Publicado em: {dataFormatada}</p>
                                    <p className="text-white/60 text-xs leading-relaxed line-clamp-3 italic mb-4">
                                        {livro.descricao || "Sem sinopse disponível."}
                                    </p>
                                </div>

                                {/* Botões */}
                                <div className="mt-auto flex flex-col gap-2">
                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-[11px] font-bold uppercase transition-all cursor-pointer shadow-lg shadow-blue-600/20">
                                        + Criar Capítulo
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditandoLivro(livro)} className="flex-1 bg-yellow-500/20 text-white/70 hover:text-black py-2 rounded-lg text-[9px] font-bold uppercase border border-white/10 hover:bg-yellow-500 cursor-pointer transition-colors">
                                            Editar
                                        </button>
                                        <button onClick={() => deletarLivro(livro.id)} className="flex-1 bg-red-900/20 text-red-400 py-2 rounded-lg text-[9px] font-bold uppercase border border-red-500/20 hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </main>
            </div>

            {/* MODAL EDIÇÃO */}
            {editandoLivro && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0f172a] border border-white/20 w-full max-w-lg rounded-3xl p-8">
                        <h3 className="text-white text-xl font-bold mb-6 italic">Editar Livro</h3>
                        <div className="space-y-4">
                            <input ref={editTitulo} defaultValue={editandoLivro.titulo} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
                            <select ref={editCategoria} defaultValue={editandoLivro.categoryId} className="w-full p-3 rounded-xl bg-[#1e293b] border border-white/10 text-white">
                                {categorias.map(cat => (
                                    <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <textarea ref={editDescricao} defaultValue={editandoLivro.descricao} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white h-32" />
                            <input type="file" ref={editCapa} className="text-xs text-white/50" />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setEditandoLivro(null)} className="flex-1 text-white/50 font-bold uppercase text-xs cursor-pointer">Cancelar</button>
                            <button onClick={atualizarLivro} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs cursor-pointer">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Livros;