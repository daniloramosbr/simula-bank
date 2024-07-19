import {Accordion, AccordionItem, Avatar, Spinner} from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { apiController } from "@/controllers/ApiController";
import { useContext } from "react";
import { ContextJsx } from "@/context/context";

interface UserData {
  valor: number;
}

interface PropsData {
  sucess: any;
  id: string;
  name: string;
}

export default function Users({sucess, id, name}: PropsData ) {

  const userToken: any = Cookies.get('user');     //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : null

  const {setUpdate} = useContext(ContextJsx)

  const [loading, setLoading] = useState(false); //loading

  const [empty, setEmpty] = useState(false)

  const {myvalor} = useContext(ContextJsx)

  const [dataForm, setDataForm] = useState<UserData>({             //info dos input
    valor: 0,
  });

  const [erro, setErro] = useState(false)
  const HandleChange = (event: any) => {              //funçao que envia pro determinado state
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  async function SendValor () {

    if (decode == null) {
      return alert('Você precisa estar logado para fazer esta operação.')
    }
    if (!dataForm.valor || dataForm.valor == 0) {
      setEmpty(true)
      setTimeout(()=> {
        setEmpty(false)
      },3000)
      return
    }      

    if (dataForm.valor > myvalor) {       //valor for menor que tiver, n avança
      setErro(true)
      setTimeout(()=> {
                      
        setErro(false)

      },3000)

      return
    }
   
    try {
      setLoading(true)
     const res = await apiController.sendValor(decode.id, id, dataForm.valor)
     setUpdate(res?.data)
     sucess(true)
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Accordion selectionMode="single" >
    <AccordionItem style={{
      borderBottom: '1px solid gray',
      paddingBottom: '5px'
     }}
      key="1"
      aria-label={name}
      startContent={
        <Avatar
          isBordered
          color="primary"
          radius="lg"/>
      }
      title={name}>
     <div className="cont-send" >
     <form onChange={HandleChange} style={{
       display: 'flex',
       flexDirection: 'column',
       width:'100%',
        gap: '1rem'
     }}>
     <Input 
      name="valor"
        onChange={HandleChange}
        type="number"
        label="INSIRA UM VALOR"
        size="sm"/>
        {loading && <Spinner color="secondary"/>}
        {empty && <div style={{
           color:'#FF0000',
           textAlign: 'center'
        }} >INSIRA UM VALOR!</div> }
       {erro && <div style={{
        color:'#FF0000',
        textAlign: 'center'
       }
       }>SALDO INSUFICIENTE!</div> }
        <Button radius="full" className="btn-1" style={{
          width: '100%',
           backgroundColor: 'rgb(98, 0, 255)',
           color: '#fff'
        }} onClick={SendValor}>
        ENVIAR
        </Button> 
     </form>
     </div>
    </AccordionItem>
    
  </Accordion>
  )
}
