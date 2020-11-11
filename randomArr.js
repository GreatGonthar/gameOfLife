// 11.11.20
// функция возвращающая массив случайных не повторяющихся чисел
{
    function randomAgain(longArr, maxRandomNumber){
        if (longArr <= maxRandomNumber){
            let rnd = Math.floor(Math.random() * maxRandomNumber);
            let a = [rnd];
            while (a.length < longArr){
                rnd = Math.floor(Math.random() * maxRandomNumber);
                for (let i = 0; i < a.length; i++){
                    if (a[i] == rnd){
                        break;                
                    }
                    if (i == a.length - 1 && a[i] != rnd){
                        a.push(rnd);
                        break; 
                    }
                }                
            }
            return a;        
        }else {
            return false;
        }
    }
}




