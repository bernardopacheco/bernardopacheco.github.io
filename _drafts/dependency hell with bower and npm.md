---
title: Dependency hell with Bower and npm
author: Bernardo Pacheco
layout: post
---

Esse artigo trata do problema que encontramos com dependências no bower e no npm.

O problema ocorre quando vc faz um bower install e/ou npm install. Tudo instala numa boa, mas quando vc vai rodar um projeto que estava funcionando há algumas semanas atrás, tudo quebra. Por quê?

O motivo é que no bower.json ou no package.json nós controlamos apenas as dependências diretas que a nossa aplicação precisa. Porém, nós não controlamos as dependências de nossas dependências. Logo, uma dependência de uma dependência direta pode mudar a sua versão sem que saibamos e o código quebra por algum motivo.

Como corrigir?
Bower e npm tem as suas particularidades com dependências, cada um se comporta de uma forma diferente.
Para o bower, como estamos tratando de scripts que serão executados no browser, isso implica que somente uma versão de um determinado script será executado. Não é possível executar no browser duas ou mais versões do angular ou jquery. Por outro lado, no npm isso é possível, pois o ambiente de execução não é o browser, mas sim o node.js. No npm, as dependências não são horizontais, ou seja, cada biblioteca guarda internamete as suas dependências. Logo, é possível que A dependa de B v1.0 e C dependa de B v2.3. Aqui não há conflito pq cada lib mantém de forma isolada as suas dependências.

Para corrigir no bower, o ideal é 'marretar' a versão de cada lib que é carregada no browser. Isso quer dizer para marretar a versão das libs utilziadas diretamente e as dependências dessas libs. Por exemplo, se eu dependo apenas do twitter bootstrap, que por sua vez tem uma dependência para o jquery, eu poderia colocar no bower.json apenas a dependência e versão para o bootstrap, mas o ideal é também colocar a versão do jquery mesmo que o mesmo não seja utilizado diretamente pela aplicação.

Para corrigir no npm, o ideal é versionar toda a pasta do npm_modules no repositório.
Para essa solução do npm, tem um artigo e thread boa aqui:

Olhar o e-mail com o subject 'node_modules in git' no e-mail corporativo.
http://www.futurealoof.com/posts/apache-considered-harmful.html
Procurar pelo artigo 'node_modules in git'


Lembrar de que, tanto no bower quanto no npm, evitar de utilizar a sintaxe de versionamento.
In a nutshell, the syntax for this is defined by the semver parser within Node. You can see the syntax details in the readme for semver.
https://github.com/npm/node-semver
