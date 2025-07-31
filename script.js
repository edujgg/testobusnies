document.addEventListener('DOMContentLoaded', function() {
    // Menu ativo
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Quiz
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        const resultadoDiv = document.getElementById('resultado');
        
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação
            const nome = document.getElementById('nome').value.trim();
            const idade = document.getElementById('idade').value;
            
            if (!nome || !idade) {
                alert('Por favor, preencha seu nome e idade.');
                return;
            }
            
            if (idade < 18 || idade > 100) {
                alert('Por favor, insira uma idade válida (entre 18 e 100 anos).');
                return;
            }
            
            // Verificar se todas as perguntas foram respondidas
            const questions = document.querySelectorAll('.question');
            let allAnswered = true;
            
            questions.forEach(question => {
                const name = question.querySelector('input[type="radio"]').name;
                if (!document.querySelector(`input[name="${name}"]:checked`)) {
                    allAnswered = false;
                    question.style.backgroundColor = '#fff3cd';
                    setTimeout(() => {
                        question.style.backgroundColor = '';
                    }, 2000);
                }
            });
            
            if (!allAnswered) {
                alert('Por favor, responda todas as perguntas.');
                return;
            }
            
            // Calcular pontuação
            let pontuacao = 0;
            const respostas = document.querySelectorAll('input[type="radio"]:checked');
            
            respostas.forEach(resposta => {
                pontuacao += parseInt(resposta.value);
            });
            
            // Exibir resultado
            resultadoDiv.style.display = 'block';
            
            if (pontuacao <= 10) {
                resultadoDiv.innerHTML = `
                    <h3>${nome}, seus sintomas sugerem que sua testosterona pode estar normal</h3>
                    <p>Pontuação: ${pontuacao}/30</p>
                    <div class="result-content">
                        <p>Com base nas suas respostas, parece que seus níveis de testosterona estão dentro da faixa normal para sua idade.</p>
                        <p>Continue mantendo hábitos saudáveis para preservar seus níveis hormonais!</p>
                        <p>Você pode conferir nossas <a href="dicas.html">dicas naturais</a> para manter sua testosterona alta.</p>
                    </div>
                `;
                resultadoDiv.style.backgroundColor = '#d4edda';
                resultadoDiv.style.borderLeft = '4px solid #28a745';
            } else if (pontuacao <= 20) {
                resultadoDiv.innerHTML = `
                    <h3>${nome}, você pode ter níveis moderadamente baixos de testosterona</h3>
                    <p>Pontuação: ${pontuacao}/30</p>
                    <div class="result-content">
                        <p>Seus sintomas sugerem que você pode estar com níveis de testosterona abaixo do ideal.</p>
                        <p>Recomendamos:</p>
                        <ul>
                            <li>Implementar as <a href="dicas.html">dicas naturais</a> para aumentar testosterona</li>
                            <li>Monitorar seus sintomas</li>
                            <li>Considerar uma consulta médica se os sintomas persistirem</li>
                        </ul>
                    </div>
                `;
                resultadoDiv.style.backgroundColor = '#fff3cd';
                resultadoDiv.style.borderLeft = '4px solid #ffc107';
            } else {
                resultadoDiv.innerHTML = `
                    <h3>${nome}, seus sintomas sugerem testosterona potencialmente baixa</h3>
                    <p>Pontuação: ${pontuacao}/30</p>
                    <div class="result-content">
                        <p>Seus sintomas são consistentes com níveis baixos de testosterona.</p>
                        <p>Recomendamos fortemente:</p>
                        <ul>
                            <li>Consultar um endocrinologista para avaliação</li>
                            <li>Realizar exames de sangue para confirmar</li>
                            <li>Começar a aplicar nossas <a href="dicas.html">dicas naturais</a></li>
                        </ul>
                        <p>Não ignore esses sintomas, pois baixa testosterona pode afetar sua saúde a longo prazo.</p>
                    </div>
                `;
                resultadoDiv.style.backgroundColor = '#f8d7da';
                resultadoDiv.style.borderLeft = '4px solid #dc3545';
            }
            
            // Rolagem suave para o resultado
            resultadoDiv.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Botão limpar
        document.getElementById('limpar').addEventListener('click', function() {
            quizForm.reset();
            resultadoDiv.style.display = 'none';
            
            // Remover estilos de erro das perguntas
            document.querySelectorAll('.question').forEach(q => {
                q.style.backgroundColor = '';
            });
        });
    }
});