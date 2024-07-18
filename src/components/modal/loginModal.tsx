
import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,useDisclosure,Spinner,Input, } from "@nextui-org/react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ApiController from "@/controllers/ApiController";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

interface UserData {
  //tipando elementos
  name: string;
  email: string;
  password: string;
}

export default function LoginModal() {

  const dark = Cookies.get('userTheme')

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal

  const [error, setError] = useState(false);

  const [msglogin, setMsglogin] = useState(false)

  const [data, setData] = useState<any>({})

  const [changeLog, setChangeLog] = useState(false); //signin ou signup

  const [loading, setLoading] = useState(false); //loading

  const [dataForm, setDataForm] = useState<UserData>({
    //info dos input
    name: "",
    email: "",
    password: "",
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
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {          //so ativa a criaçao depois que atualizar o dataform 

    if (data.name && data.email) {
      CreateLogin();
    }

  }, [dataForm]);

 const CreateLogin = async () => {
    setData({})
    try {
      setLoading(true);
      const res: any = await ApiController.createLogin(
        dataForm.name,
        dataForm.email,
        dataForm.password
      )
       Cookies.set('user', res.data.data)                         //salva token no cookie
      router.push(`/dashboard/${dataForm.name}`)            //envia para outra pagina
       limparDados()
       
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  const ValidLogin = async () => {

    if (!dataForm.email || !dataForm.password) {

      setError(true)

      setTimeout(()=> {

        setError(false)

      },3000)

      return
    }

    try {
      setLoading(true);
      const res: any = await ApiController.validLogin(
        dataForm.email,
        dataForm.password
      )
       Cookies.set('user', res.data.data)                         //salva token no cookie    

       const decode: any = jwtDecode(res.data.data) 

      router.push(`/dashboard/${decode.name}`)            //envia para outra pagina
       limparDados()
    } catch (err) {
      setMsglogin(true)
                      
      setTimeout(()=> {

        setMsglogin(false)

      },3000)

    }
    setLoading(false);
  }

  const googleValid = async (email: string) => {

try {

  setLoading(true);
  const res: any = await ApiController.googleValid(
    email
  )
   Cookies.set('user', res.data.data)                         //salva token no cookie    

   const decode: any = jwtDecode(res.data.data) 

  router.push(`/dashboard/${decode.name}`)            //envia para outra pagina

  
} catch (error) {

  setMsglogin(true)
                      
      setTimeout(()=> {

        setMsglogin(false)

      },3000)
}
setLoading(false);
 }
  return (
    <>
      <Button radius="full" className="btn-1" onPress={onOpen}>
        INICIAR
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="cont-login">
                  <h1>{changeLog ? "FAÇA SEU LOGIN" : "CRIE SUA CONTA"}</h1>

                  <form onChange={HandleChange}>
                    {!changeLog && (
                      <span>
                        <ion-icon name="person-outline"></ion-icon>
                        <Input
                          type="name"
                          label="Nome"
                          size="sm"
                          name="name"
                          onChange={HandleChange}
                        />
                      </span>
                    )}
                    <span>
                      <ion-icon name="mail-outline"></ion-icon>
                      <Input
                        type="email"
                        label="Email"
                        size="sm"
                        name="email"
                        onChange={HandleChange}
                      />
                    </span>
                    <span>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <Input
                        type="password"
                        label="Senha"
                        size="sm"
                        name="password"
                        onChange={HandleChange}
                      />
                    </span>
                  </form>
                  {loading && <Spinner color="secondary" />}
                  {error && <div className="cont-err">POR FAVOR, PREENCHA TODOS OS CAMPOS.</div> }
                  {msglogin && <div className="cont-err">ERRO: EMAIL OU SENHA INCORRETOS.</div> }
                  <div className="cont-btn">
                    {changeLog ? (
                      <Button radius="full" className="btn-1" onClick={ValidLogin}>
                        ENTRAR
                      </Button>
                    ) : (
                      <Button
                        radius="full"
                        className="btn-1"
                        onClick={()=> {

                          if (!dataForm.name || !dataForm.email || !dataForm.password) {

                            setError(true)
                      
                            setTimeout(()=> {
                      
                              setError(false)
                      
                            },3000)
                      
                            return
                          }
                          CreateLogin()
                          
                        }}
                      >
                        CRIAR CONTA
                      </Button>
                    )}
                    {changeLog ? (
                      <Button
                      
                        radius="full"
                        className="btn-2"
                        color="secondary"
                        variant="ghost"
                        onClick={() => {
                          setChangeLog(false);
                          limparDados();
                        }}
                      >
                        AINDA NÃO TEM CONTA?
                      </Button>
                    ) : (
                      <Button
                        radius="full"
                        className="btn-2 dark:text-white"
                        color="secondary"
                        variant="ghost"
                        onClick={() => {
                          setChangeLog(true);
                          limparDados();
                        }}
                      >
                        JÁ TEM UMA CONTA?
                      </Button>
                    )}
                    <div className="cont-auth">

                     {changeLog ?    <GoogleLogin
                        theme={dark == 'true' ? 'filled_black' : 'outline' }
                        width={360}
                        shape="circle"
                        text="continue_with"
                        onSuccess={(credentialResponse) => {
                          const token: any = credentialResponse.credential
                          const decode: any = jwtDecode(token)
                         googleValid(decode.email)
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}/>
                        :  
                        <GoogleLogin
                        
                        theme={dark == 'true' ? 'filled_black' : 'outline' }
                        width={360}
                        shape="circle"
                        text="continue_with"
                        onSuccess={(credentialResponse) => {
                          const token: any = credentialResponse.credential
                          const decode: any = jwtDecode(token)
                          setData(jwtDecode(token))
                          setDataForm({                             //atualiza os dados que recebeu da api do google
                            name: decode.name,
                            email: decode.email,
                            password: dataForm.password,                   //nenhumn dado no password pois a api do google nao retorna a senha 
                          });
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }} /> 
                        }

                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
