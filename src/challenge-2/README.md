# ✅ Solução

Fiz a primeira request ao endpoint de simulação de request (GET /api/ratelimite) e obtive mensagem de sucesso na resposta da chamada:
![without-rate-limit](/src/challenge-2/assets/without-rate-limit.png)

Iniciei as alterações modificando a quantidade de requisições que o **express-rate-limit** aceitaria para **100 requisições por minuto**:
![rate-limit-config](/src/challenge-2/assets/rate-limit-config.png)

Depois crie um endpoint (GET api/multiple-requests/{requestsnum}) que aceita o número de requisições que eu desejo simular:
![simulate-multiple-requests-endpoint](/src/challenge-2/assets/simulate-multiple-requests-endpoint.png)

Criei a função que faz a simulação das requisições e guarda a resposta de cada uma em um array que ao final é retornado como resposta:
![simulate-multiple-requests-function](/src/challenge-2/assets/simulate-multiple-requests-function.png)

O resultado final foi a resposta da API indicando que o limite de requisiçoes foi excedido:
![rate-limit-exceeded](/src/challenge-2/assets/rate-limit-exceeded.png)