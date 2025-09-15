import { Link, useNavigate } from "react-router-dom"
import { Input } from '../../components/inputs/index'
import { useState, type FormEvent } from "react"
import { auth } from '../../services/firebaseconection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Eye, EyeOff } from "lucide-react"


export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);


    function HandleSubmit(e: FormEvent){
        e.preventDefault();

     if(email === '' || password === ''){
        alert("Preencha todos os campos!")
        return;
     }

     signInWithEmailAndPassword(auth, email, password)
     .then(() => {
        navigate("/admin", {replace: true})
        console.log("Logado com sucesso");
        
     })
     .catch((error) => {
        console.log(error);
        alert("Senha ou Email incorretos!")
     })

    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
            <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev 
                <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>

            <form onSubmit={HandleSubmit} className="w-full max-w-xl flex flex-col px-1">
                <Input
                placeholder="Digite o seu email..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                
            <div className="relative flex items-center">
                <Input
                placeholder="********"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               
                />
                <span 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/5 cursor-pointer text-gray-400"
                    >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
            </div>

            
              

                <button type="submit" className="h-9 bg-blue-400 border-0 font-medium text-white">Acessar</button>
            </form>
        </div>
    )
}