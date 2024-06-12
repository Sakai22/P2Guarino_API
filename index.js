const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const req = require('express/lib/request')
const { request } = require('express')
app.use(cors())
app.use(express.json())

//banco de dados em memória
var clientes = []

app.get('/listar', (request, response) => {
  response.json(clientes)
})

app.post("/cadastrar", (request, response) => {
  let cliente = request.body
  console.log(cliente)
  clientes.push(cliente) //manda o cliente pro Back-End
  response.json({success: true})
})


app.delete("/excluir/:cpf", (request, response) => {
  let cpf = request.params.cpf
  for(let i=0; i < clientes.length; i++){
    let cliente = clientes[i]
    if (cliente.cpf == cpf){
        //splice remove o elemento encontrado na posição "i"
        clientes.splice(i, 1) 
    }
  }
  response.json({success: true})
})

app.put("/alterar", (request, response) => {
  let cliente = request.body
  //procura o cliente que tem o CPF enviado
  for(let i=0; i < clientes.lenght; i++){
    if (clientes[i].cpf == cliente.cpf){
      //substitui os dados do cliente pelos dados enviados pelo font
      clientes[i] = cliente
    }
  }
  console.log(cliente)
  response.json({success: true})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})