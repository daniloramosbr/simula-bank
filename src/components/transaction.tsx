type datavalue = {
  send: string
  received: string
  valor: number;
};
export default function Transaction({send, received, valor}: datavalue) {
  return (
    <div>
      {send} enviou R$ {valor} para {received}
    </div>
  )
}
