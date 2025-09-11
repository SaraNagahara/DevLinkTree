import { Header } from "../../components/header/index"
import { Input } from "../../components/inputs"
import { useState, useEffect, type FormEvent } from 'react'

import { FiTrash } from 'react-icons/fi'
import { db } from "../../services/firebaseconection"
import {
    addDoc, 
    collection,
    onSnapshot,
    query, 
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

interface linkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){

    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setColorInput] = useState("#f1f1f1");
    const [bgColorInput, setBGColorInput] = useState("#121212");

    const [links, setLinks] = useState<linkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as linkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista);
        })

        return() => {
            unsub()
        }
    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(nameInput === '' || urlInput === ''){
            alert("Preencha todos os campos")
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date() // corrigido
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            console.log("cadastrado com sucesso");
        })
        .catch((error) => {
            console.log("Erro ao cadastrar no banco: " + error);
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef);
    }




    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            
            {/* inputs para cadastro de links novos */}
            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="font-bold font-medium mt-2 mb-2">Nome do link</label>
                <Input 
                  placeholder="Digite o nome do link"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="font-bold font-medium mt-2 mb-2">Url do link</label>
                <Input 
                  type="url"
                  placeholder="Digite a url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />

                {/* inputs das cores do link */}
                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="font-bold font-medium mt-2 mb-2">Cor do link</label>
                        <input 
                          type="color" 
                          value={textColorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="font-bold font-medium mt-2 mb-2">Fundo do link</label>
                        <input 
                          type="color" 
                          value={bgColorInput}
                          onChange={(e) => setBGColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {/* Exibição caso tenha digitado o nome do link*/}
                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100 border rounded-md">
                        <label className="font-bold font-medium mt-2 mb-3">Veja como está ficando:</label>
                        <article
                          className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                          style={{marginBottom: 8, marginTop: 8, background: bgColorInput}}
                        >
                            <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button 
                  type="submit" 
                  className="mb-7 bg-blue-400 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold mb-4 text-2xl">Meus Links</h2>

            {/*Exibição dos links */}
            {links.map((link) => (
                <article 
                  key={link.id}
                  className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                  style={{backgroundColor: link.bg, color: link.color}}
                >
                    <p>{link.name}</p>
                    <div>
                        <button 
                          className="border border-dashed p-1 rounded"
                          onClick={() => handleDeleteLink(link.id)}
                        >
                          <FiTrash size={18} color="#fff"/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}
