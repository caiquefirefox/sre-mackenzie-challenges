# ✅ Solução

Analisando as requisições no log do console, percebi que o circuito demorava a se recuperar de uma falha e existiam muitas falhas sendo apresentadas no console.
Um outro ponto muito importante que gostaria de ressaltar é que a operação para calcular o percentual de falha está com o sinal invertido, ao invés de ser **Math.random() < 0.8** causando 80% de falhas, estava assim **Math.random() > 0.8** causando 20% de falhas na requisição.

Com esse cenário em mente, ajustei a operação lógica e ajustei percentual de falhas para 20%:<br />
![percent-fail-requests](/src/challenge-4/assets/percent-fail-requests.png)

E ajustei o percentual de falhas aceitos pelo circuito antes de abrir, deixar em 20%, ou seja, se 20% das requisições falharem, ele vai abrir:<br />
![percent-fail-requests](/src/challenge-4/assets/circuit-breaker-error-percent.png)

Após essas configurações, observei no console que apesar do circuito abrir mais rápidamente em caso de falhas, ele logo se recuperava pelo percentual baixo de falhas que foi configurado no simulador de requisições.