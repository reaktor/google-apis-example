import { getSheetData } from '../src/googleSheets'
import { GetServerSideProps } from 'next'
import { withAuthentication } from '../src/withAuthentication'

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

export const getServerSideProps: GetServerSideProps = withAuthentication(async (context) => {
  return {
    props: {
      sheetData: await getSheetData()
    }    
  }
})