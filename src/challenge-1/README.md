# ✅ Solução

Primeiro consultei o endpoint de health check (GET /api/health) para comprovar que está aplicação estava de pé na porta 8080 como o esperado e obtive um resultado positivo:<br />
![app-health-check](/src/challenge-1/assets/app-health-check.png)

Depois consultei o endpoint com a simulação de um timeout (GET /api/timeout) que me retornou a mensagem de erro abaixo:<br />
![challenge-error](/src/challenge-1/assets/challenge-error.png)

Então identifiquei a função que simula uma chamada externa com um timer de 5 segundos:<br />
![function-timer](/src/challenge-1/assets/function-timer.png)

Dessa forma entendi que deveria aumentar o tempo de timeout na função que realiza a requisição que antes estava configurado em 3 segundos e passou a ser 5.5 segundos:<br />
![timeout-endpoint](/src/challenge-1/assets/timeout-endpoint.png)

E no final obtive um resultado positivo indicando sucesso na resposta da requisição:<br />
![solution-challenge-timeout](/src/challenge-1/assets/solution-challenge-timeout.png)
