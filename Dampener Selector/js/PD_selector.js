var PD_imagen = document.createElement("img");
    PD_imagen.setAttribute("width","100px");
    PD_imagen.setAttribute("src","images/griffco_pulsation_dampeners.jpg");
    document.getElementById("resultadoImagen").appendChild(PD_imagen);



function PD_Calculator()
{

    var Q= document.getElementById("caudal").value;j
        
        

    var Q= document.getElementById("caudal").value;
    var SPM= document.getElementById("SPM").value;
    var Kf= document.getElementById("cmbKFactor").value;
    var P= document.getElementById("SystemPressure").value;
    var dDampening= document.getElementById("txtDesiredDampening").value;
    var y= document.getElementById("cmbAir").value;

    var Q= Number(Q);
    var SPM= Number(SPM);
    var Kf= Number(Kf);
    var P= Number(P);
    var dDampening= Number(dDampening);
    var y= Number(y);


    console.log(Q+"Tipo de dato:  "+typeof Q);
    console.log(SPM+"Tipo de dato:  "+typeof SPM);
    console.log(Kf+"Tipo de dato:  "+typeof Kf);
    console.log("P divididos dos:"+ P/2.+"Tipo de dato:  "+typeof P);
    console.log("dDampening dividio dos:"+dDampening/2.+"Tipo de dato:  " +typeof dDampening);
    console.log(y+"  Tipo de dato:  " +typeof y);

    VperStroke= (Q/SPM)*3.84958119;
    console.log("Volumen por Stroke: "+VperStroke+"Tipo de dato:" +typeof VperStroke);


    var Pmin= P*(1.-dDampening/100.);
    var Pmax= P+(P*dDampening/100.);
    console.log("Pmin: "+Pmin+"    Pmax: "+Pmax);

    var capacityRequired=VperStroke*Kf*Math.pow(P/Pmin,y) / (1-Math.pow(P/Pmax,y));
    console.log("Capacity Required _ "+capacityRequired+"Tipo de dato:" +typeof capacityRequired);



    document.getElementById("VperStroke").textContent= VperStroke;
    document.getElementById("dampenerSizeR").textContent= capacityRequired;

    var capacitySelected= selectCapacityPD (capacityRequired);
    console.log(capacitySelected);
    document.getElementById("dampenerSizeS").textContent= capacitySelected;


    

    var modelPD=0;
    modelPD=modeloPD();
    BaseDatosPD(modelPD);
   

  

}


function modeloPD() {

    let a=0;

    switch (capacitySelected) {
        case 6.:
            a= "0011";
            break;
        case 10.:
            a= "0012";
            break;
        case 15.:
            a= "0013";
            break;
        case 16.:
            a= "0021";
            break;
        case 29.:
            a= "0022";
            break;
        case 42.:
            a= "0023";
            break;
        case 36.:
            a= "0031";
            break;
        case 80.:
            a= "0032";
            break;
        case 125.:
            a= "0033";
            break;

        default: 0;
            break;
    }

    console.log("capacity model:"+a);

let b=document.getElementById("housingMaterialPD").value
let c=document.getElementById("diaphragmMaterialPD").value
let d=document.getElementById("chargingAssemblyPD").value
let e=document.getElementById("pressureOptionsPD").value
let f=document.getElementById("otherOptionsPD").value

modelPD= "PD"+a+b+c+d+e+f;
console.log("Modelo PD ADENTRO de function PD:"+modelPD +"  "+typeof modelPD);



return modelPD;

}





function selectCapacityPD (capacityRequired) {

    console.log("capacityRequired: "+capacityRequired);

    capacitySelected=0. ; 

    if (capacityRequired>0. && capacityRequired<= 6.){
        capacitySelected =6. ;   
    }

    else if (  capacityRequired<=10.){
        capacitySelected =10. ;  
    }

    else if (  capacityRequired<=15.){
        capacitySelected=15. ;  
    }

    else if (  capacityRequired<=16.){
        capacitySelected=16. ;  
    }

    else if (  capacityRequired<=29.){
        capacitySelected=29. ;  
    }

    else if (  capacityRequired<=36.){
        capacitySelected=36. ;  
    }

    else if (  capacityRequired<=42.){
        capacitySelected=42 ;  
    }

    else if (  capacityRequired<=80.){
        capacitySelected=80. ;  
    }

    else if (  capacityRequired<=125.){
        capacitySelected=125. ;  
    }

    else {

        prompt("Consulte fábrica");

    }

    //console.log("capacitySelected: "+capacitySelected);
    return capacitySelected;

}


function BaseDatosPD (modelPD) {


    console.log("Modelo PD en BASE DE DATOS de function PD:"+modelPD +"  "+typeof modelPD);
        
    //Se le quita elimina el PD al modelo
    let modelRestante_PD=modelPD.slice(2,modelPD.lenght)
    //console.log(modelRestante_PD);

    //Se adquiere del modelo el codigo corepondiente a la capacidad y se l asigna a _a_ se corta esta parte para seguir analizando
    let a= modelRestante_PD.slice(0,4);
    console.log("a: "+a);
    modelRestante_PD=modelRestante_PD.slice(4,modelPD.lenght);
    //console.log(modelRestante_PD);

    //Se  dquiere del modelo el codigo corepondiente al MATERIAL CARCAZAy se l asigna a _b_ se corta esta parte para seguir analizando 
    let b = modelRestante_PD.slice(0,1);
    //console.log("b original:  "+b);
    switch (b) {
        case "C": b="CP"; break;
        case "K": b="K"; break;
        case "N": b="N"; break;
        case "S": b="S"; break;
        case "P": 
            if (modelRestante_PD[1]=="P"){
                b="PP";
            }
            else {
                b="P";
            }     
        break;
         
    }
    //AQUI PONER EL ERROR HANDLER SI NO ESTA ESTA OPCION MARCA UNA VARIABLE DE SEGUIMIENTO QUE QUE SAQUE UN ERROR : MODELO NO ENCONTRADO
    console.log("b:  "+b);

    modelRestante_PD=modelRestante_PD.slice(b.length,modelRestante_PD.lenght);
    //console.log("Modelo restante a quitarle a y b:  "+modelRestante_PD);



    //Se  dquiere del modelo el codigo corepondiente al MATERIAL DEL BLADDER se l asigna a _c_ se corta esta parte para seguir analizando 
    let c = modelRestante_PD.slice(0,1);
    //console.log("c "+c);
    switch (c) {
        case "E": c="E"; break; // no hay necesidad pero se deja, para poner despues una variable que guarde la caracteritica que define esta parte del modelo, además entrenando a futuro un c´digo genérico
        case "H": c="H"; break;
        case "V": c="V"; break;
                break;         
    }
    //AQUI PONER EL ERROR HABDLER SEI NO ESTA ESTA OPCION MARCA UN SEGUIDRO QUE SAQUE UN ERROR : MODELO NO ENCONTRADO
    console.log("c:  "+c);
    modelRestante_PD=modelRestante_PD.slice(c.length,modelRestante_PD.lenght);
    //console.log("Modelo restante a quitarle a, b y c:  "+modelRestante_PD);

    //Se  dquiere del modelo el codigo corepondiente al CHARGIN ASSAMBLYse l asigna a _d_ se corta esta parte para seguir analizando 
    let d = modelRestante_PD.slice(0,1);  //este 1 en generico es el lenght de la lvariable ene ste caso d
    modelRestante_PD=modelRestante_PD.slice(d.length,modelRestante_PD.lenght);
    //console.log("Modelo restante a quitarle a, b,c y d:  "+modelRestante_PD);
        //AQUI PONER EL ERROR HABDLER SEI NO ESTA ESTA OPCION MARCA UN SEGUIDRO QUE SAQUE UN ERROR : MODELO NO ENCONTRADO
    console.log("d:  "+d);

    
    //Se  dquiere del modelo el codigo corepondiente al PRESSURE OPTIONS se l asigna a _e_ se corta esta parte para seguir analizando 
    let e = modelRestante_PD.slice(0,1);  //este 1 en generico es el lenght de la lvariable ene ste caso e
    modelRestante_PD=modelRestante_PD.slice(e.length,modelRestante_PD.lenght);
    //console.log("Modelo restante a quitarle a, b,c y  d:  "+modelRestante_PD);
        //AQUI PONER EL ERROR HABDLER SEI NO ESTA ESTA OPCION MARCA UN SEGUIDRO QUE SAQUE UN ERROR : MODELO NO ENCONTRADO
    console.log("e:  "+e);

     //Se  dquiere del modelo el codigo corepondiente al OTHER OPTIONS se l asigna a _f_ se corta esta parte para seguir analizando 
     let f = modelRestante_PD.slice(0,1);  //este 1 en generico es el lenght de la lvariable ene ste caso f

     //console.log("Modelo restante a quitarle a, b,c y  d:  "+modelRestante_PD);
         //AQUI PONER EL ERROR HABDLER SEI NO ESTA ESTA OPCION MARCA UN SEGUIDRO QUE SAQUE UN ERROR : MODELO NO ENCONTRADO
     console.log("f:  "+f);




    //DESCRIPTION Y PRICING

    var diaConnection;
    var description = "Amortiguador de Pulsaciones,   ";
    switch (a) {
        case "0011": description = description + "6in3 ";  diaConnection = "1/2 in"; break;
        case "0012": description = description + "10in3 "; diaConnection = "1/2 in"; break;
        case "0013": description = description + "15in3 "; diaConnection = "1/2 in"; break;
        case "0021": description = description + "16in3 "; diaConnection = "3/4 in"; break;
        case "0022": description = description + "29in3 "; diaConnection = "3/4 in"; break;
        case "0023": description = description + "42in3 "; diaConnection = "3/4 in"; break;
        case "0031": description = description + "36in3 "; diaConnection = "1 in";   break;
        case "0032": description = description + "80in3 "; diaConnection = "1 in";   break;
        case "0033": description = description + "125in3 "; diaConnection = "1 in";  break;    
        default:  break;       
    }

    description = description + ", Housing:"
    switch (b) {
        case "CP": description = description + "CPVC "; break;
        case "K": description = description + "PVDF "; break;
        case "N": description = description + "NORYL"; break;
        case "P": description = description + "PVC "; break;
        case "PP": description = description + "GF Polypro"; break;
        case "S": description = description + "316SS "; break;       
        default:  break;       
    }

    description = description + ", Diaphragm:"
    switch (c) {
        case "E": description = description + "EPDM "; break;
        case "H": description = description + "Hypalon "; break;
        case "V": description = description + "Viton"; break;     
        default:  break;       
    }

    description = description + ", Charging:"
    switch (d) {
        case "0": description = description + "Brass Tee & Eco Gauge "; break;
        case "1": description = description + "Brass Tee & Mid Gauge "; break;
        case "2": description = description + "Brass Tee & Premium Gauge "; break;
        case "3": description = description + "316SS Tee & Eco Gauge "; break;
        case "4": description = description + "316SS Tee & Mid Gauge "; break;
        case "5": description = description + "316SS Tee & Premium Gauge "; break;
        case "6": description = description + "Brass Tee & Compund Gauge "; break;
        case "3": description = description + "316SS Tee & CompundGauge "; break;
        
        default:  break;       
    }

    description = description + ", P:"
    switch (e) {
        case "1": description = description + "160 psi "; break;
        case "2": description = description + "60 psi "; break;
        case "3": description = description + "100 psi "; break;
        case "4": description = description + "200 psi "; break;
        case "5": description = description + "300 psi "; break;      
        default:  break;       
    }


    description = description + ", Conect.:"
    description = description + ", " + diaConnection + "  ";

    switch (f) {
        case "": description = description + "FNPT"; break;
        case "B": description = description + "BSPT"; break;
        case "F": description = description + "Flanged "; break;
        case "R": description = description + "Rubber Boot for Gauge "; break;
        case "S": description = description + "Socket "; break;
        case "U": description = description + "Union "; break;
        case "UD": description = description + "Metric Unit "; break;
        case "UZ": description = description + "Threaded Union "; break;
        case "M": description = description + "Back Mount Gauge "; break;
        case "M8": description = description + "Back Mount 1/8 gauge "; break;
        default:  break;       
    }



    console.log("Description: " + description);
    document.getElementById("tdDescription").innerText = description;

    console.log("MoldelPD: " + modelPD);
    document.getElementById("tdModel").innerText = modelPD;

    var price ="";
    
    switch (c) {
        case "E":   
            switch (b) {
                case "N":
                    switch (a) {
                        case "0011": price = 178.; break;
                        case "0012": price = 191.; break;
                        case "0013": price = 202.; break;
                        case "0021": price = 218.; break;
                        case "0022": price = 256.; break;
                        case "0023": price = 268.; break;
                        case "0031": price = 298.;  break;
                        case "0032": price = 409.;  break;
                        case "0033":price =  491.;  break;    
                        default:  break;       
                    } 
                break;  

                case "PP": 
                    switch (a) {
                        case "0011": price = 173.; break;
                        case "0012": price = 180.; break;
                        case "0013": price = 183.; break;
                        case "0021": price = 205.; break;
                        case "0022": price = 236.; break;
                        case "0023": price = 241.; break;
                        case "0031": price = 263.;  break;
                        case "0032": price = 333.;  break;
                        case "0033":price =  373.;  break;    
                        default:  break;    
                    }
                break;
                        
                case "P": 
                    switch (a) {
                        case "0011": price = 183.; break;
                        case "0012": price = 210.; break;
                        case "0013": price = 225.; break;
                        case "0021": price = 218.; break;
                        case "0022": price = 265.; break;
                        case "0023": price = 317.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "CP": 
                    switch (a) {
                        case "0011": price = 251.; break;
                        case "0012": price = 385.; break;
                        case "0013": price = 396.; break;
                        case "0021": price = 405.; break;
                        case "0022": price = 743.; break;
                        case "0023": price = 747.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "K": 
                    switch (a) {
                        case "0011": price = 213.; break;
                        case "0012": price = 249.; break;
                        case "0013": price = 282.; break;
                        case "0021": price = 303.; break;
                        case "0022": price = 459.; break;
                        case "0023": price = 747.; break;
                        case "0031": price = 543.;  break;
                        case "0032": price = 942.;  break;
                        case "0033": price = 1311.;  break;    
                        default:  break;    
                    }
                break;

                case "S": 
                    switch (a) {
                        case "0011": price = "N/A"; break;
                        case "0012": price = 507.;  break;
                        case "0013": price = 706.;  break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 735.;  break;
                        case "0023": price = 1114.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = 1179.;  break;
                        case "0033": price = 1759.;  break;    
                        default:  break;    
                    }
                break;
                        
                default:  break;
            }      
        break;           
        
        case "H": 
            switch (b) {
                case "N":
                    switch (a) {
                        case "0011": price = 184.; break;
                        case "0012": price = 195.; break;
                        case "0013": price = 206.; break;
                        case "0021": price = 225.; break;
                        case "0022": price = 262.; break;
                        case "0023": price = 274.; break;
                        case "0031": price = 348.;  break;
                        case "0032": price = 430.;  break;
                        case "0033":price =  512.;  break;    
                        default:  break;       
                    } 
                break;  

                case "PP": 
                    switch (a) {
                        case "0011": price = 179.; break;
                        case "0012": price = 183.; break;
                        case "0013": price = 187.; break;
                        case "0021": price = 212.; break;
                        case "0022": price = 241.; break;
                        case "0023": price = 247.; break;
                        case "0031": price = 313.;  break;
                        case "0032": price = 353.;  break;
                        case "0033": price = 394.;  break;    
                        default:  break;    
                    }
                break;
                        
                case "P": 
                    switch (a) {
                        case "0011": price = 205.; break;
                        case "0012": price = 215.; break;
                        case "0013": price = 230.; break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 316.; break;
                        case "0023": price = 322.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "CP": 
                    switch (a) {
                        case "0011": price = 227.; break;
                        case "0012": price = 387.; break;
                        case "0013": price = 398.; break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 745.; break;
                        case "0023": price = 753.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "K": 
                    switch (a) {
                        case "0011": price = 219.; break;
                        case "0012": price = 252.; break;
                        case "0013": price = 286.; break;
                        case "0021": price = 310.; break;
                        case "0022": price = 405.; break;
                        case "0023": price = 465.; break;
                        case "0031": price = 593.;  break;
                        case "0032": price = 962.;  break;
                        case "0033": price = 1331.;  break;    
                        default:  break;    
                    }
                break;

                case "S": 
                    switch (a) {
                        case "0011": price = "N/A"; break;
                        case "0012": price = 520.;  break;
                        case "0013": price = 706.;  break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 753.;  break;
                        case "0023": price = 1123.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = 1192.;  break;
                        case "0033": price = 1772.;  break;    
                        default:  break;    
                    }
                break;
                        
                default:  break;
            }  
        break;



        case "V":      
            switch (b) {
                case "N":
                    switch (a) {
                        case "0011": price = 212.; break;
                        case "0012": price = 236.; break;
                        case "0013": price = 247.; break;
                        case "0021": price = 267.; break;
                        case "0022": price = 357.; break;
                        case "0023": price = 369.; break;
                        case "0031": price = 397.;  break;
                        case "0032": price = 589.;  break;
                        case "0033":price =  671.;  break;    
                        default:  break;       
                    } 
                break;  

                case "PP": 
                    switch (a) {
                        case "0011": price = 207.; break;
                        case "0012": price = 224.; break;
                        case "0013": price = 228.; break;
                        case "0021": price = 254.; break;
                        case "0022": price = 336.; break;
                        case "0023": price = 342.; break;
                        case "0031": price = 362.;  break;
                        case "0032": price = 512.;  break;
                        case "0033": price = 553.;  break;    
                        default:  break;    
                    }
                break;
                        
                case "P": 
                    switch (a) {
                        case "0011": price = 240.; break;
                        case "0012": price = 263.; break;
                        case "0013": price = 275.; break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 365.; break;
                        case "0023": price = 370.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "CP": 
                    switch (a) {
                        case "0011": price = 282.; break;
                        case "0012": price = 427.; break;
                        case "0013": price = 435.; break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 789.; break;
                        case "0023": price = 785.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = "N/A";  break;
                        case "0033": price = "N/A";  break;    
                        default:  break;    
                    }
                break;

                case "K": 
                    switch (a) {
                        case "0011": price = 247.; break;
                        case "0012": price = 294.; break;
                        case "0013": price = 327.; break;
                        case "0021": price = 352.; break;
                        case "0022": price = 500.; break;
                        case "0023": price = 560.; break;
                        case "0031": price = 642.;  break;
                        case "0032": price = 1121.;  break;
                        case "0033": price = 1490.;  break;    
                        default:  break;    
                    }
                break;

                case "S": 
                    switch (a) {
                        case "0011": price = "N/A"; break;
                        case "0012": price = 552.;  break;
                        case "0013": price = 751.;  break;
                        case "0021": price = "N/A"; break;
                        case "0022": price = 852.;  break;
                        case "0023": price = 1177.; break;
                        case "0031": price = "N/A";  break;
                        case "0032": price = 1290.;  break;
                        case "0033": price = 1870.;  break;    
                        default:  break;    
                    }
                break;
                        
                default:  break;
            } 
        break;        
    }

    
    //añadir precio por tipo de manómetro

    switch (d) {
        case "0": price= price;       break;
        case "1": price= price+48.;   break;
        case "2": price= price+89.;   break;
        case "3": price= price;       break;
        case "4": price= price+48.;   break;
        case "5": price= price+89.;   break;
        case "6": price= "Consult factory";       break;
        case "7": price= "Consult factory";       break;
        case "8": price= "Consult factory";       break;

    
        default:
            break;
    }

    switch (f) {
        case "": price=price;             break;
        case "B": price= "Consult factory"; break;
        case "F": price= "Consult factory"; break;
        case "R": price= "Consult factory"; break;
        case "S": price= "Consult factory"; break;
        case "U": price= "Consult factory"; break;
        case "UD":price= "Consult factory"; break;
        case "UZ": price= "Consult factory"; break;
        case "M": price= "Consult factory"; break;
        case "M8": price= "Consult factory"; break;
        default:  break;       
    }
    
    
    console.log("price: " + price);
    document.getElementById("tdPriceL").innerText = price;

    var descuento= document.getElementById("tdDiscount").innerText;
    console.log("descuento: " + descuento + "tipo de dato:"+ typeof descuento);
    descuento = parseFloat(descuento);
    console.log("descuento: " + descuento + "tipo de dato:"+ typeof descuento);
    var precioUnitario= price*(1.-descuento);
    console.log("Precio Unitario: " + precioUnitario + "tipo de dato:"+ typeof precioUnitario);
    document.getElementById("tdUnitaryPrice").innerText = precioUnitario ;

    var cantidad= document.getElementById("tdQty").innerText;
    console.log("Cantidad: " + cantidad + "tipo de dato:"+ typeof cantidad);
    cantidad = parseInt(cantidad);
    console.log("Cantidad: " + cantidad + "tipo de dato:"+ typeof cantidad);
    var precioParcial= cantidad*precioUnitario;
    console.log("Precio Parcial: " + precioParcial + "tipo de dato:"+ typeof precioParcial);
    document.getElementById("tdParcialPrice").innerText = precioParcial ;




}


