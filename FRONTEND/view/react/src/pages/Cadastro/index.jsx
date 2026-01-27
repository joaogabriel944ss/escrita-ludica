import { Link } from "react-router-dom";
import { useRef } from "react"
import logo from "../../assets/images/logo-escrita.png"
import bridge from '../../services/bridge'




function Cadastro() {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

async function handleSubmit( event ) {
    event.preventDefault()

    try{
    await bridge.post('/cadastro',{
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
    })
    alert('Cadastro realizado com sucesso!')
}   catch( err ){ 
    alert('Erro ao cadastrar usuário. Tente novamente.')
}
    
}



return (






<div className="max-w-md mx-auto mt-10 p-8 border border-white rounded-lg shadow-lg"> 

    <div class="stars"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>
<div class="shooting-star"></div>

<h2 className="text-white text-2xl font-bold mb-6 text-center">Cadastro</h2>

<form className="flex flex-col gap-5" onSubmit={handleSubmit}>

<input ref={ nameRef } placeholder="Nome" type="text" className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white"/>
<input ref={ emailRef } placeholder="Email" type="email" className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white" />
<input ref={ passwordRef } placeholder="Senha" type="password" className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white" />

<button className="w-full bg-blue-600 border border-white rounded-md text-white py-2 px-4 hover: cursor-pointer" >Cadastra-se</button>

</form>
<Link to="/login" className="text-white hover: cursor-poiter mt-4 block text-center">Já tem uma conta? Faça login</Link>
<h1 className="text-center text-white">________________________</h1>

<img className="w-35 h-23 mx-auto" src={logo} alt="logo-escrita" />







</div>

)
}

export default Cadastro;