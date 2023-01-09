import { differenceInWeeks } from 'date-fns'

class DateHelper {

    constructor () {}

    segundosEntreDuasDatas(menor, maior) {
        const result = (maior-menor)/1000;
        return result;
    }

    formatarPeriodo(periodoEmSegundos) {
        var data = new Date(new Date(1992,1,15,0,0,0).setSeconds(periodoEmSegundos));
        return this.formatarHorario(data);
    }

    formatarHorario(data) {
        return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    obterNumeroDaSemana(date){
        var dataBase = new Date(date);
        dataBase.setDate(1);
        dataBase.setMonth(0);
        console.log(dataBase);
        console.log(date);
        return differenceInWeeks(date, dataBase)+1;
    }

    obterPeriodoTrabalhado(lancamentos) {
        var soma = 0;
        if (lancamentos) {
            var index = 0;

            lancamentos.forEach(start => {
                if (index % 2 == 0) {
                    if ((index+1) < lancamentos.length) {
                        var end = lancamentos[index+1];
                        console.log(start);
                        console.log(end);
                        var between = this.segundosEntreDuasDatas(start, end);
                        soma = soma + between;
                    }
                }
                index = index+1;
            })
        }
        console.log(soma);
        return this.formatarPeriodo(soma);
    }
}

export default DateHelper;