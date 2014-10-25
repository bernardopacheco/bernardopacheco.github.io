1 - Constructor function

function ODatangular() {

  this.resource;
  this.query = function() {

  };
}

var odatangular = new ODatangular();

Cons:
- a variável resource não é privada
- a função query é repetida para cada novo objeto ODatangular


2 - Constructor function and prototype

function ODatangular() {
  this.resource;
}

function.prototype = {
  query: function() {

  }
};

var odatangular = new ODatangular();

Pros:
- como a função query está no prototype, não há criação da mesma função para cada objeto ODatangular. Todos os novos objetos referenciam a função definida no prototype.

Cons:
- a variável resource não é privada


3 - Module Revealing Pattern

function odatangular() {
  
  var resource,
    query = query;

  return {
    query: query
  };

  //////////

  function query() {

  }
}



Pros:
- a variável resource é privada

Cons:
- a função query é repetida para cada novo objeto ODatangular


4 - Revealing Prototype Pattern

var ODatangular = (function() {
  
  var resource;

  // constructor
  function module() {

  }

  module.prototype = {
    query: function() {

    }
  };

  return module;
})();

Pros:
- como a função query está no prototype, não há criação da mesma função para cada objeto ODatangular. Todos os novos objetos referenciam a função definida no prototype.

Cons:
- apesar da variável resource estar privada, ela é a mesma para todos os objetos ODatangular, todos compartilham o mesmo resource. Logo, se um objeto mudar o resource, essa alteração vale para todos os objetos

5 - Constructor function and prototype with getter

function ODatangular() {

  var resource;

  this.getResource = function() {
    return resource;
  };
}

function.prototype = {
  query: function() {
    return this.getResource();
  }
};

var odatangular = new ODatangular();

Pros:
- a variável resource está privada
- a função query está no prototype evitando que ele seja replicada a cada novo objeto
- não existe nenhum método setter para mudar o valor da variável privada

Cons:
- a função getResource fica exposta para o usuário da biblioteca. Apesar do usuário poder somente ler e não mudar o valor, é desnecessário abrir essa função que é para ser utilizada apenas internamente pela biblioteca.


6 - Tudo junto

function odatangularFactory() {

  function ODatangular() {
    this.resource;
  }

  function.prototype = {
    query: function() {

    }
  };

  var odatangular = new ODatangular();

  return {
    query: query.bind( odatangular );
  };
}

var odatangular = odatangularFactory();

Pros:
- a variável está privada e única por objeto criado
- a função query não é definida mais de uma vez porque está no prototype

Caso o return seja sessa forma:
return {
  query: odatangular.query
};

Não irá funcionar, pois o this referenciado em query passa a ser o objeto anônimo retornado. Para manter o this sendo o objeto odatangular criado, deve-se retorna a função query com bind para o objeto odatangular.
