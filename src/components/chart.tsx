import React, { useContext, useEffect } from "react";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory";
import { useState } from "react";
import { ContextJsx } from "@/context/context";

export default function Chart() {
  const [data, setData] = useState([           //grafico de valores
    { x: 1, y: 1500 },
    { x: 2, y: 1800 },
    { x: 3, y: 2000 },
  ]);

  const {myvalor} = useContext(ContextJsx)         //valor do user
  
  useEffect(()=>{


    const handleDataChange = () => {          //atualiza grafico

      const novoPonto = { x: data.length + 1, y: myvalor };
      setData([...data, novoPonto]);
    };

    handleDataChange()

  },[myvalor])

  return (
    <div className="cont-chart">
      <h1>GRÁFICO DE VALORES</h1>
      <div>
        <VictoryChart>
          <VictoryLine
            data={data}
            style={{
              data: { stroke: "rgb(98, 0, 255)" }
            }}
          />
          <VictoryAxis tickFormat={() => ""}/>
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </div>
    </div>
  );
}
