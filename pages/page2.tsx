import { getSheetData } from '../src/googleSheets'
import { GetServerSideProps } from 'next'
import { withAuthentication } from '../src/withAuthentication'

type HomeProps = {
  sheetData: string[][]
}

export default function Home(props: HomeProps) {
  return (
   <div>
     <h1>Page 2</h1>
     <p>A simple example page that requires Google authentication.</p>
   </div>
  )
}

export const getServerSideProps: GetServerSideProps = withAuthentication(async (context) => {
  return {
    props: {      
    }    
  }
})