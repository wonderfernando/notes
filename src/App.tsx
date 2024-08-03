import { ChangeEvent, useEffect, useState } from "react"
import logo from "./assets/Logo.svg"
import AddNoteDialog from "./components/AddNoteDialog"
import NoteCard from "./components/NoteCard"
import { toast } from "sonner"

interface INote{
  id: string,
  title: Date,
  body:string
}
function App() {
const [search, setSearch] = useState("")
 
const [notes, setNotes] = useState<Array<INote>>([])
async function getNotes() {
  const dados = await fetch("http://localhost:3333/notes")
  const json = await (dados.json()) as INote[]
  setNotes(json)
  console.log("get notes ", json)
}

useEffect(() => {
  getNotes().then(()=>console.log("buscou"))
}, [])

async function removeNote(id:string) {
  await fetch('http://localhost:3333/notes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id})
  });
  await getNotes()
  toast.error("Nota removida")
}
async function addNoteHandle(content:string) {
   await fetch('http://localhost:3333/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title:new Date(), body:content, id: String(Math.random()*100000)})
  });
  await getNotes()

}
function searchChange(params:ChangeEvent<HTMLInputElement>) {
  setSearch(params.target.value)
}
const filterNotes = search === "" ? notes : notes.filter(note => note.body.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
     <h1 className="font-bold text-slate-700"><small>NOTAS - S.F.F.S</small></h1>

      <form action="" method="get">
          <input type="text" className="font-semibold bg-transparent w-full tracking-tight placeholder:
          text-slate-500 text-3xl outline-none" value={search} onChange={searchChange} placeholder="Busque em suas notas" />
      </form>
      <div className="bg-slate-700 h-px"/>

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
       <AddNoteDialog addNote={addNoteHandle}/>
       {
        filterNotes.map(({id, ...rest}) => <NoteCard id={id} removeNote={removeNote} key={id} {...rest}/>)
       }
      </div>
    </div>
  )
}

export default App
