## Funcionalidade: Registro de Animal

### Cenário: Registrar novo animal para um cliente existente
  Dado que um cliente está cadastrado no sistema com o nome "Cliente A"
  Quando o usuário registra um novo animal com as seguintes informações:
    | Nome   | Espécie | Raça    | Idade |
    | Rex    | Cachorro| Labrador| 3     |
  Então o sistema registra o novo animal associado ao cliente "Cliente A"

###  Cenário: Registrar novo animal para um cliente inexistente
  Dado que nenhum cliente está cadastrado no sistema com o nome "Cliente B"
  Quando o usuário registra um novo animal com as seguintes informações:
    | Nome   | Espécie | Raça    | Idade |
    | Max    | Gato    | Siamese | 2     |
  Então o sistema exibe uma mensagem de erro informando que o cliente "Cliente B" não foi encontrado

