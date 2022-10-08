let RGB= document.getElementById("RGB");
let HEX= document.getElementById("HEX");

// set value to zero
function invalidInput(input){
    input.value=0;
}

// function to convert HEX into RGB value
HEX.oninput = function toRGB(){
    let HEX_value= HEX.value;
    let resultRGB= [];

    // Checking for valid HEXcode input
    if(/^#?[A-Fa-f0-9]{6}$/.test(HEX_value)){
        HEX_value= HEX_value.split("#")[1] || HEX_value;

        // copying value of HEXcode into an array
        for(let x=0;x<HEX_value.length;x+=2){
            resultRGB.push(parseInt(HEX_value[x]+HEX_value[x+1],16));
        }
        RGB.value="RGB("+resultRGB+")";
        document.getElementById("color").style.backgroundColor= "#"+HEX_value;
    }
    else{
        invalidInput(RGB);
    }
};

// function to convert RGB into HEXcode
RGB.oninput = function toHEX(){
    let RGB_value= RGB.value;
    let resultHEX="#";

    // variables to check valid RGB input 
    let RGBRegex1= /^RGB\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let RGBRegex2= /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;

    // checking valid RGB input
    if(RGBRegex1.test(RGB_value) || RGBRegex2.test(RGB_value)){
        RGB_value=RGB_value.replace(/[RGB()]+/g,"") || RGB_value;
        RGB_value=RGB_value.split(",");
        let condition = RGB_value.every((value)=>{
            return parseInt(value)<=255;
        });

        if(condition){
            RGB_value.forEach(value=>{
                value= parseInt(value).toString(16);
                resultHEX+=value.length==1?"0"+value : value;
            });
            HEX.value=resultHEX;
            document.getElementById("color").style.backgroundColor= resultHEX;
        }
        else{
            invalidInput(HEX);
        }
    }
    else{
        invalidInput(HEX);
    }
};