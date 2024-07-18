import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,useDisclosure, Spinner } from "@nextui-org/react";
import Users from "../users";
import { useState, useEffect} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ApiController from "@/controllers/ApiController";

export default function UserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal

  const [sucess, setSucess] = useState(false);

  type datavalue = {
    id: string;
    name: string;
  };

  const userToken: any = Cookies.get("user"); //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : null;

  const [loading, setLoading] = useState(false); //loading

  const [data, setData] = useState<datavalue[]>([]);

  const handleChildData = (dataFromChild: boolean) => {
    setSucess(dataFromChild);
  };

  useEffect(() => {
    if (!isOpen) {
      setSucess(false);
    }

    async function getUsers() {
      setLoading(true);
      try {
        const res: any = await ApiController.allUsers(decode ? decode.id : 'guest')
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    getUsers();
  }, [isOpen]);

  return (
    <>
      <Button radius="full" className="btn-1" onPress={onOpen}>
        Fazer Transferência
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{sucess ? "" : "Transferência Para:"}</ModalHeader>
              <ModalBody>
                {loading ? 
                  <Spinner color="secondary" />
                   : 
                  <>
                    {sucess ?
                      <div>
                        Transferência Concluída
                        <ion-icon name="checkmark-sharp"></ion-icon>
                      </div>
                    : 
                      data.map((res: any) => (
                        <Users
                          id={res.id}
                          name={res.name}
                          sucess={handleChildData}
                        />
                      ))
                    }
                  </>
                }
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
