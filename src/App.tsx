import { ChangeEvent, useState } from "react"
import logo from "./assets/Logo.svg"
import AddNoteDialog from "./components/AddNoteDialog"
import NoteCard from "./components/NoteCard"

interface INote{
  id: string,
  title: Date,
  body:string
}
function App() {
const [search, setSearch] = useState("")
 const [notes, setNotes] = useState<INote[]>( () => {
 const notesInStorage = window.localStorage.getItem("notes")
    if (notesInStorage) {
      return JSON.parse(notesInStorage)
    }
    return []
 })

function removeNote(id:string) {
  const newNotes = notes.filter(n => n.id !== id)
  window.localStorage.setItem("notes", JSON.stringify(newNotes))
  setNotes(newNotes)
}
function addNoteHandle(content:string) {
  const newNote = {body: content,title: new Date(), id : String(Math.random()*100000)}
  const newNotes = [...notes, newNote]
  setNotes([...notes, newNote])
   window.localStorage.setItem("notes", JSON.stringify(newNotes))
}
function searchChange(params:ChangeEvent<HTMLInputElement>) {
  setSearch(params.target.value)
}
const filterNotes = search === "" ? notes : notes.filter(note => note.body.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      <img src={logo} alt="" />

      <form action="" method="get">
          <input type="text" className="font-semibold bg-transparent w-full tracking-tight placeholder:
          text-slate-500 text-3xl outline-none" value={search} onChange={searchChange} placeholder="Busque em suas notas" />
      </form>
      <div className="bg-slate-700 h-px"/>

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

       <AddNoteDialog addNote={addNoteHandle}/>
       {
        filterNotes.map(({id, ...rest}) => <NoteCard id={id} removeNote={removeNote} key={id} {...rest}/>
        )
       }
        
      </div>
    </div>
  )
}

export default App
