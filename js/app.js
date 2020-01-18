var calculadora = {

//iniciar variables

	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false, // Para permitir ingreso consecutivo

	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),

	//Empieza eventos formato botones

	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},

	//Termina eventos formato botones

	//Empieza formato para botones

	AchicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "30%";
			elemento.style.height = "65px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "64px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	//termina formato de botones

	//Empiezan eventos de función para calculadora

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

	//Termina eventos de función para calculadora

	//Funcionamiento de teclas de la calculadora

	borrarVisor: function(){

	  this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateVisor();
	},

	cambiarSigno: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.updateVisor();
		}
	},

	ingresoDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.updateVisor();
		}
	},

	ingresoNumero: function(valor){
		if (this.valorVisor.length < 8) {

			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.updateVisor();
		}
	},

	ingresoOperacion: function(oper){
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},

	//Termina funcionamiento de teclas de la calculadora

	verResultado: function(){ // TECLA IGUAL

		if(!this.auxTeclaIgual){ //Primer vez que se presiona el boton igual
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;

		//Esto calcula el resultado
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);

		} else { //Siguientes veces que presiono igual
		//Esto calcula el resultado
		this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}

		//Almaceno el resultado como primer valor para poder seguir operando
		this.primerValor = this.resultado;

		//Borro el visor y lo reemplazo por el resultado
		this.valorVisor = "";

		//verifico el largo del resultado para recortarlo si hace falta

		if (this.resultado.toString().length < 8){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}

		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor

		this.auxTeclaIgual = true;
		this.updateVisor();

	},

	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	updateVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}

};

calculadora.init();
