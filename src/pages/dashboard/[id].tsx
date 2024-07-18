import Header from "@/components/header";
import Chart from "@/components/chart";
import Footer from "@/components/footer";
import Transaction from "@/components/transaction";
import UserModal from "@/components/modal/userModal";
import EditModal from "@/components/modal/editModal";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import ApiController from "@/controllers/ApiController";
import { useContext } from "react";
import { ContextJsx } from "@/context/context";

type dataType = {

  name: string,
  user: string,
  valor: number,
}
type TransacType = {

  send: string,
  received: string,
  valor: number,
}

export default function Dashboard() {
  
  const userToken: any = Cookies.get('user');     //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : null

  const [loading, setLoading] = useState(true); //loading

  const {setMyvalor} = useContext(ContextJsx)       //guarda valor no context

  const {update} = useContext(ContextJsx)

  const [data, setData] = useState<dataType>({      //guarda valor
    name: '',
    user: '',
    valor: 0,
  })

  const [transac, setTransac] = useState<TransacType[]>([])      //guarda transaçoes

 decode && setMyvalor(data.valor)

  const valorformated = data.valor == 0 ? undefined : data.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  useEffect(()=> {

   const getMyvalor = async () => {

    // API para buscar saldo
    setLoading(true)
    try {

      const res: any = await ApiController.myValor(decode.id)
      setData(res.data.data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const getTransactions = async () => {
    setLoading(true)
    try {

      const res: any = await ApiController.transaction()
     setTransac(res.data)
      
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
 
  getMyvalor()
  getTransactions()

  },[update])

  return (
    <main className="cont-main">
      <Header />
      <div className="cont-dash">
        <div className="cont-prods">
        <div className="cont-saldo">
        <div className="cont-title"> 
           <h1>
            SEU SALDO: 
          </h1> 
          { loading ? <Spinner color="secondary" /> : <> {valorformated ? <p>{valorformated}</p> : <p> R$ 2.000,00</p> } </> }
          </div>
          <UserModal/>
          <EditModal />
        </div>
        <div className="cont-tr">
          <h1>TRANSAÇÕES:</h1>
        {loading ? <Spinner/> : transac.map((res: any)=>
        (
          <Transaction
            key={res.id}
            send={res.send}
            received={res.received}
            valor={res.valor}
          />
        ) ) }
        </div>
        </div>
        <div className="cont-c">
        <Chart/>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
