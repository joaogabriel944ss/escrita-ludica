import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react"
import logo from "../../assets/images/logo-escrita.png"
import bridge from '../../services/bridge'




function Login() {


    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

async function handleSubmit( event ) {
    event.preventDefault()

    try{
   const { data: token} = await bridge.post('/login',{

        email: emailRef.current.value,
        password: passwordRef.current.value
    })
localStorage.setItem('token', token)
console.log(token)

    navigate('/livros')

}   catch( err ){ 
    alert('senha ou email incorretos. Tente novamente.')
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



<h2 className="text-white text-2xl font-bold mb-6 text-center">Login</h2>

<form className="flex flex-col gap-5" onSubmit={handleSubmit}>


<input ref={ emailRef } placeholder="Email" type="email" className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white" />
<input ref={ passwordRef } placeholder="Senha" type="password" className="w-full px-3 py-2 border border-white rounded-md focus:outline-none text-white" />

<button className="w-full bg-blue-700 border border-white rounded-md text-white py-2 px-4 hover: cursor-pointer" >Login</button>

</form>
<Link to="/" className="text-white hover: cursor-poiter mt-4 block text-center">Não tem uma conta ? Cadastre-se</Link>
<h1 className="text-center text-white">________________________</h1>

<img className="w-35 h-23 mx-auto" src={logo} alt="logo-escrita" />







</div>

)
}

export default Login;