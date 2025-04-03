# ✅ Solução

Inicialmente fiz três requisições simultâneas em três abas diferentes ao endpoint que simula uma requisição (GET /api/bulkhead) 
![initial-bulkhead-error](/src/challenge-3/assets/initial-bulkhead-error.png)

Logo depois, comecei a modificar o código-fonte para atender aos requisitos do desafio, então criei um endpoint para simular o número de requisições que desejo fazer (GET api/multiple-requests/{requestsnum}), informando a quantidade de vezes em sua rota:
![multiple-requests-endpoint](/src/challenge-3/assets/multiple-requests-endpoint.png)

Para simular paralelismo nas requisições utilizei promises em javascript, escrevendo a função abaixo:
![parallel-multiple-requests-function](/src/challenge-3/assets/parallel-multiple-requests-function.png)

E por fim, fiz um teste simulando 5 requisições simultâneas, onde as duas primeiras obtiveram sucesso e as demais foram recusadas pelo pacote cockatiel que controla o número de requisições simultâneas:
![parallel-requests-response](/src/challenge-3/assets/parallel-requests-response.png)