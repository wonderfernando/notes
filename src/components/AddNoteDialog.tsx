import * as Dialog from "@radix-ui/react-dialog"
import {X} from "lucide-react"
import {toast} from "sonner"
import { ChangeEvent, FormEvent, useState } from "react"
export default function AddNoteDialog({addNote}: {addNote: (content:string)=>void}) {
    const[showOnBoarding,setShowOnBoarding] = useState(true)
    const[content,setContent] = useState("")
    
    function onChangeTextArea(params:ChangeEvent<HTMLTextAreaElement>) {
        if(params.target.value ==="")
            setShowOnBoarding(true)
        setContent(params.target.value)
    }
    
    function handleSubmit(params:FormEvent) {
        params.preventDefault()
        addNote(content)
        setContent("")
        setShowOnBoarding(true)
        toast.success("Nota guardada com sucesso")
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className="bg-zinc-700 rounded-lg p-5 space-y-4 text-left flex flex-col">
                    <span className="font-sm font-medium text-slate-200">Adicionar uma note</span>
                    <p className="text-sm text-slate-400 leading-6">Grave uma nota para gravar quando nao estiveer em casa</p>
            </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="inset-0 bg-black/60 fixed">
                <Dialog.Content className="bg-slate-700 h-[60vh] overflow-hidden rounded-md flex flex-col outline-none max-w-[640px] w-full  fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Dialog.Close className="absolute p-1.5 right-0 top-0 hover:text-slate-100 bg-slate-800 text-slate-400">
                                <X size={15}/>
                    </Dialog.Close>
                    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                            <div className="flex flex-col gap-3 p-5 flex-1">
                            <span className="font-medium font-sm text-slate-300">Adicionar nota</span>
                            {showOnBoarding ?<p className="font-sm text-slate-400">Comece gravando nota em <button className="font-medium text-lime-400 hover:text-lime-500 hover:underline">audio</button> ou se preferir utilize apenas <button onClick={() => setShowOnBoarding(false)} className="font-medium text-lime-400 hover:text-lime-500 hover:underline">texto</button></p> 
                            : <textarea value={content} onChange={onChangeTextArea} autoFocus className="flex-1 text-slate-400 bg-transparent text-sm resize-none leading-6 outline-none"/>
                            }
                        </div>
                        <button disabled={showOnBoarding} type="submit" className="outline-none text-sm font-medium w-full text-slate-950 text-center bg-lime-400 py-4 hover:bg-lime-500">Salvar nota</button>
                    </form>
                
                </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
    )
} 