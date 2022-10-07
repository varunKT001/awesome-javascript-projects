const calculate_temp = () => {

    const temp = document.getElementById('temp').value;
    const temp_selected = document.getElementById('option');
    const value_temp = option.options[temp_selected.selectedIndex].value;

    // celsius to fahrenheit
    const celToFah = (c) => {
        let f = c*9/5 + 32;
        return f;
    }
    // fahrenheit to celsius
    const fahToCel = (f) => {
        let c = (f-32)*5/9;
        return c;
    }

    let result= document.getElementById('result');
    if(value_temp=='celsius'){
        result.value=`${parseFloat(celToFah(temp).toFixed(3))}°F`;
    }
    else{
        result.value=`${parseFloat(fahToCel(temp).toFixed(3))}°C`;
    }
}