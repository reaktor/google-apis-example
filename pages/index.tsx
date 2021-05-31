import { getSheetData } from '../src/googleSheets'

type HomeProps = {
  sheetData: string[][]
}

export default function Home(props: HomeProps) {
  return (
   <div>
     <h1>Hello</h1>
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
   </div>
  )
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  return {
    props: {
      sheetData: await getSheetData()
    }    
  }
}