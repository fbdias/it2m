// ==UserScript==
// @name         Auto Click Procurar Correto com Visibilidade
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Clica no botão "Procurar" correto a cada 12 segundos, funcionando mesmo quando a aba está em segundo plano
// @author       Você
// @match        https://it2m.procempa.com.br/it2m/User/TasksByParameters
// @match        https://it2m.procempa.com.br/it2m/User/Tasks
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var isPageVisible = true;

    // Detecta quando a aba está visível ou não
    document.addEventListener('visibilitychange', function() {
        isPageVisible = !document.hidden;
    });

    // Função que tenta localizar e clicar no botão "Procurar"
    function clickProcurar() {
        if (!isPageVisible) {
            console.log("A aba não está visível. Esperando a aba ser ativada...");
            return; // Se a aba não está visível, não clica
        }

        // Tenta selecionar o botão pelo seletor CSS correto (botão com class e texto)
        var procurarButton = document.querySelector('button.btn.btn-primary[type="submit"]');

        if (procurarButton) {
            // Simula o clique no botão
            procurarButton.click();
            console.log("Botão 'Procurar' clicado com sucesso");
        } else {
            console.log("Botão 'Procurar' não encontrado, tentando novamente...");
        }
    }

    // Verifica se o botão está presente na página em intervalos regulares até encontrá-lo
    function checkForButton() {
        // Verifica o botão a cada 10 segundos até que ele seja encontrado
        var buttonCheckInterval = setInterval(function() {
            var procurarButton = document.querySelector('button.btn.btn-primary[type="submit"]');

            if (procurarButton) {
                console.log("Botão encontrado!");
                clearInterval(buttonCheckInterval); // Para de checar quando o botão for encontrado
                clickProcurar(); // Clica imediatamente quando o botão é encontrado

                // Continua clicando a cada 12 segundos
                setInterval(clickProcurar, 12000);
            }
        }, 10000); // Checa a cada 10 segundos
    }

    // Inicia o processo de checagem e clique
    window.addEventListener('load', function() {
        console.log("Página carregada, iniciando checagem de botão...");
        checkForButton(); // Inicia a verificação do botão
    });
})();
