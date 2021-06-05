import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import api from "../services/api";


export default function Tabela() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    getJogadores().then(jogadores => {
      getDestaques().then(destaques => {
        const array = destaques.map(item => {
          return {
            ...item,
            ...jogadores.find(jogador => jogador.id == item.id)

          }
          

        }  )
        setTable(array)
      })
      
    })
   
  }, []);

  const getDestaques = () => {
    const newqualquermerda = api.get("mercado/destaques").then((response) => {
      //console.log(response)
      return response.data.map((item) => 
         ({
          id: item.Atleta.atleta_id,
          apelido: item.Atleta.apelido,
          clube: item.clube,
          escudo: item.escudo_clube,
          posicao: item.posicao_abreviacao,
          escalacoes: item.escalacoes,
        })
      );
    });
    return newqualquermerda.then(response => response)
    
  };
  const getJogadores = () => {
    const newqualquermerda = api.get("atletas/mercado").then((response) => {
      //console.log(response)
      return response.data.atletas.map((item) => 
       ( {
          id: item.atleta_id,
          foto: item.foto.replace("_FORMATO","_140x140"),
          cartoletas: item.preco_num,
        })
    );
    
    });

    return newqualquermerda.then(response => response)
  };

  return (
    <table>
      <caption></caption>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nome</th>
          <th>Clube</th>
          <th>Escudo</th>
          <th>Posicao</th>
          <th>Nº Escalações</th>
          <th>Cartoletas</th>
        </tr>
      </thead>
      <tbody>
        {table.map((item) => (
          <tr key={item.atleta_id}>
            <td>
              <img src={item.foto} width="50%" />
            </td>
            <td>{item.apelido}</td>
            <td>{item.clube}</td>
            <td>
              <img src={item.escudo} />
            </td>
            <td>{item.posicao}</td>
            <td>{item.escalacoes}</td>
            <td>{item.cartoletas}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}
