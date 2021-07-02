import { getSheetData } from '../src/googleSheets'
import { GetServerSideProps } from 'next'
import { withAuthentication } from '../src/withAuthentication'
import { useState } from 'react'

type HomeProps = {
  sheetData: string[][]
}

export default function Home(props: HomeProps) {
  const [newPage, setNewPage] = useState("")
  function setStatus(status: number) {
    if (status === 200) {
      document.location.reload()
    } else {
      alert("Failed with " + status)
    }
  }
  return (
   <div>
     <h1>Google sheets example</h1>
     <p>The content below is fetched from a Google Sheet.</p>
     <table>
       {
         props.sheetData.map(row => {
           return <tr>
             {
               row.map(cell => {
                 return <td>{cell}</td>
               })
             }
           </tr>
         })
       }
     </table>
     <div>
       <input value={newPage} onChange={e => setNewPage(e.target.value)} placeholder="path"/>
       <button onClick={e => { e.preventDefault(); addPage(newPage).then(setStatus)}} disabled={!newPage}>Add page</button>
     </div>
   </div>
  )
}

async function addPage(path: string) {
  const response = await fetch("/api/new-page", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ path })})
  return response.status
}

export const getServerSideProps: GetServerSideProps = withAuthentication(async (context) => {
  return {
    props: {
      sheetData: await getSheetData()
    }    
  }
})