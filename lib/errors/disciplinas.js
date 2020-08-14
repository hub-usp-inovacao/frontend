export const findErrors = function(objects) {
    const knownNames = {};
    const errors = [];
    console.log(objects);
    objects.forEach((object, index) => {
        const lineErrors = [];
        if (knownNames[object.name]){
            lineErrors.push('Nome duplicado');
        }
        else{
            knownNames[object.name] = object;
        }

        if (object.name.match(/[()\[\]{}]/))
            lineErrors.push('Disciplina com formatação estranha(Possível duplicação)');

        if (!object.url.match(/^http(s)?:\/\/uspdigital\.usp\.br\//))
            lineErrors.push('erro na URL(url fora do domínimo uspdigital)');

        if (object.description.short.length == 0)
            lineErrors.push('Sem descrição curta');

        if (object.description.long.length == 0)
            lineErrors.push('Sem descrição longa');
            
        if (!Object.values(object.category).some((el) => el === true))
        lineErrors.push('Disciplina não pertence a nenhuma categoria');

        if (lineErrors.length > 0){
            errors.push({
                id: object.name,
                line: index+2,
                errors: lineErrors
            })
        }
    });
    console.log(errors);
}