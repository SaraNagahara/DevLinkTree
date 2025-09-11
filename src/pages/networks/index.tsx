import { Header } from "../../components/header"
import { Input } from "../../components/inputs"
import { useEffect, useState, type FormEvent } from 'react'

import { db } from '../../services/firebaseconection'
import {
    setDoc,
    doc,
    getDoc

} from 'firebase/firestore'

export function Networks(){

    const [linkedin, setLinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    const [github, setGithub] = useState("")


    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setLinkedin(snapshot.data()?.linkedin)
                    setInstagram(snapshot.data()?.instagram)
                    setGithub(snapshot.data()?.github)
                }
                
            })
        
        }

        loadLinks()
    }, [])

    function handleRegister(e: FormEvent){
      e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            linkedin: linkedin,
            instagram: instagram,
            github: github
        })
        .then(() => {
            console.log("cadastrado com sucesso");
            
        })
        .catch((error) => {
            console.log("Erro ao salvar" + error);
            
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>

                {/*Linkedin */}
                <label className="font-medium mt-2 mb-2">Link do Linkedin</label>

                <Input
                type="url"
                placeholder="Digite a url do Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                />
                {/*Instagram */}
                <label className="font-medium mt-2 mb-2">Link do Instagram</label>

                <Input
                type="url"
                placeholder="Digite a url do instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                />
                {/*Github */}
                <label className="font-medium mt-2 mb-2">Link do GitHub</label>

                <Input
                type="url"
                placeholder="Digite a url do Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                />

                <button
                className="text-white bg-blue-400 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                type="submit">
                    Salvar Links
                </button>
            </form>
        </div>
    )
}