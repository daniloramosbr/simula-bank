import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,useDisclosure,Input, Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { apiController } from "@/controllers/ApiController";
import { ContextJsx } from "@/context/context";

interface UserData {
  valor: number;
}

export default function EditModal() {

  const userToken: any = Cookies.get('user');     //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : null

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal

  const [loading, setLoading] = useState(false); //loading

  const [empty, setEmpty] = useState(false)

  const {setUpdate} = useContext(ContextJsx)

  const [msg, setMsg] = useState(false)

  const [dataForm, setDataForm] = useState<UserData>({
    valor: 0,
  });

  const HandleChange = (event: any) => {
    //funçao que envia pro determinado state
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  const limparDados = () => {
    setDataForm({
      valor: 0
  })
}

  const EditValor = async () => {

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

    setLoading(true)
    try {

     const res:any = await apiController.editValor(decode.id, dataForm.valor)
      setUpdate(res.data)
      limparDados()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setMsg(true)
    setTimeout(()=> {
      setMsg(false)
    },2000)
  }
  return (
    <>
      <Button
        radius="full"
        className="btn-2"
        color="secondary"
        variant="ghost"
        onPress={onOpen}
      >
        Editar Saldo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Editar Saldo</h1>
              </ModalHeader>
              <ModalBody>
                <form
                  onChange={HandleChange}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "1rem",
                  }}
                >
                  <Input
                  onChange={HandleChange}
                    name="valor"
                    type="number"
                    label="INSIRA SEU NOVO VALOR"
                    size="sm"
                  />
                   {empty && <div style={{
               color:'#FF0000',
              textAlign: 'center'
              }} >INSIRA UM VALOR!</div> }
                  {msg && <div style={{
                    color: '#01AB10',
                    textAlign: 'center',
                    
                  }}>VALOR ATUALIZADO COM SUCESSO!</div>}
                  {loading && <Spinner color="secondary"/>}
                  <Button
                    radius="full"
                    className="btn-1"
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(98, 0, 255)",
                      color: "#fff",
                    }}
                    onClick={EditValor}
                  >
                    ALTERAR
                  </Button>
                
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
