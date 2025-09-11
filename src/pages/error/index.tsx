import { Link } from 'react-router-dom'
import gatinho from "../../components/images/miaubalhao.png"

export function ErrorPage(){
    return(
        <div className='flex w-full min-h-screen justify-center items-center flex-col md:flex-row gap-x-1 '>
            <img src={gatinho} alt="gatinho fofo branco de olhos azuis usando fantasia de tubarão azul, sentadinho de toca" className='w-70'/>
            <div className='flex w-full min-h-screen justify-center items-center flex-col max-w-md'>
            <h1 className='font-bold text-6xl mb-2'>404</h1>
            <h1 className='font-bold text-4xl mb-4'>página não encontrada</h1>
            <p className='italic text-1xl mb-4'>Você caiu em uma página que não existe!</p>
            <p className='italic text-1xl mb-4'>Obs: Meu gato fofo vestido de tubarão</p>
            <Link className='bg-gray-50 py-1 px-4 rounded-md' to="/">
            Voltar para home
            </Link>
            </div>
          
        </div>

       
    )
}