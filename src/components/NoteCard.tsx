import * as Dialog from "@radix-ui/react-dialog"
import {formatDistanceToNow} from "date-fns"
import {ptBR} from "date-fns/locale"
import {X} from "lucide-react"

export default function NoteCard( {title, body,id, removeNote} : {id:string,removeNote: (id:string)=>void,title: Date, body: string} ) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-zinc-800 flex flex-col rounded-lg p-5 space-y-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-lime-400 overflow-hidden relative hover:ring-2 hover:ring-slate-600">
                    <span className="font-sm font-medium text-slate-200">{formatDistanceToNow(title, {locale: ptBR, addSuffix:true})}</span>
                    <p className="text-sm text-slate-400 leading-6">{body}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0"></div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 bg-black/60 fixed">
                    <Dialog.Content className="bg-slate-700 h-[60vh] overflow-hidden rounded-md flex flex-col outline-none max-w-[640px] w-full  fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                        <Dialog.Close className="absolute p-1.5 right-0 top-0 hover:text-slate-100 bg-slate-800 text-slate-400">
                            <X size={15}/>
                        </Dialog.Close>
                        <div className="flex flex-col gap-3 p-5 flex-1">
                            <span className="font-sm font-medium text-slate-200">{formatDistanceToNow(title, {locale: ptBR, addSuffix:true})}</span>
                            <p className="text-sm text-slate-400 leading-6">{body}</p>
                        </div>
                        <button type="button" onClick={()=>removeNote(id)} className="outline-none text-sm font-medium w-full text-slate-300 text-center bg-slate-800 py-4 group">Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span></button>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}