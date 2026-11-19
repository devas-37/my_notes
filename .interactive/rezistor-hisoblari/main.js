const modes = [["divider","Kuchlanish bo‘lgichi",[["vin","Vin (V)",12],["r1","R1 (Ω)",10000],["r2","R2 (Ω)",10000]]],["loaded","Yuklangan bo‘lgich",[["vin","Vin (V)",12],["r1","R1 (Ω)",10000],["r2","R2 (Ω)",10000],["rl","Yuk RL (Ω)",10000]]],["ohm","Om qonuni va quvvat",[["v","Kuchlanish (V)",5],["r","Qarshilik (Ω)",1000]]],["led","LED uchun rezistor",[["vs","Manba (V)",5],["vf","LED Vf (V)",2],["ma","LED toki (mA)",10]]],["network","Ikki rezistor ulanishi",[["a","R1 (Ω)",1000],["b","R2 (Ω)",2200]]]];
const mode = document.getElementById("mode");
const fields = document.getElementById("fields");
const result = document.getElementById("result");
const hint = document.getElementById("hint");
const fmt = n => Number(n.toPrecision(6)).toLocaleString("en-US", {maximumSignificantDigits:6});
function calculate(){
 try {
 const x={};
 for(const [id] of modes.find(m=>m[0]===mode.value)[2]){
 const raw=document.getElementById(id).value;
 const n=Number(raw);
 if(!raw.trim() || !Number.isFinite(n)) throw Error("Barcha maydonlarga chekli son kiriting.");
 x[id]=n;
 }
 for(const [k,v] of Object.entries(x)){
 if(v<0 || (["r","r1","r2","rl","a","b","ma"].includes(k)&&v===0)) throw Error("Qarshilik va tok musbat, kuchlanish esa manfiy bo‘lmasin.");
 }
 let lines=[], message="";
 if(mode.value==="divider" || mode.value==="loaded"){
 const bottom=mode.value==="loaded" ? x.r2*x.rl/(x.r2+x.rl):x.r2;
 const vo=x.vin*bottom/(x.r1+bottom), i=(x.vin-vo)/x.r1;
 lines=["Vout = "+fmt(vo)+" V","R1 toki = "+fmt(i*1000)+" mA","P(R1) = "+fmt(i*i*x.r1*1000)+" mW","P(R2) = "+fmt(vo*vo/x.r2*1000)+" mW","Rth = "+fmt(x.r1*x.r2/(x.r1+x.r2))+" Ω"];
 if(mode.value==="loaded") lines.push("Yuk toki = "+fmt(vo/x.rl*1000)+" mA","Yuksiz Vout = "+fmt(x.vin*x.r2/(x.r1+x.r2))+" V");
 message="Vin → R1 → Vout → R2 → GND. Yuk RL bo‘lsa, u R2 ga parallel. Rth — yuksiz bo‘lgichning Thevenin qarshiligi.";
 } else if(mode.value==="ohm"){
 lines=["I = "+fmt(x.v/x.r*1000)+" mA","P = "+fmt(x.v*x.v/x.r)+" W"];
 message="I = V/R; P = V²/R. Quvvat reytingini harorat va datasheet derating grafigi bilan tanlang.";
 } else if(mode.value==="led"){
 if(x.vs<=x.vf) throw Error("Manba kuchlanishi LED Vf qiymatidan katta bo‘lsin.");
 const i=x.ma/1000, r=(x.vs-x.vf)/i;
 const e24=[10,11,12,13,15,16,18,20,22,24,27,30,33,36,39,43,47,51,56,62,68,75,82,91];
 const decade=Math.pow(10,Math.floor(Math.log10(r))-1);
 const candidates=[...e24.map(n=>n*decade),100*decade];
 const chosen=candidates.find(n=>n>=r*(1-1e-12));
 const actual=(x.vs-x.vf)/chosen;
 lines=["Nazariy R = "+fmt(r)+" Ω","Yuqoriga yaxlitlangan E24 = "+fmt(chosen)+" Ω","Shu nominaldagi tok = "+fmt(actual*1000)+" mA","Shu nominaldagi P = "+fmt(actual*actual*chosen)+" W"];
 message="Vf doimiy deb olindi. Haqiqiy eng katta tok uchun maksimal Vs, minimal Vf va minimal rezistor qarshiligini hisobga oling.";
 } else {
 lines=["Ketma-ket R = "+fmt(x.a+x.b)+" Ω","Parallel R = "+fmt(x.a*x.b/(x.a+x.b))+" Ω"];
 message="Ketma-ket ulanishda tok bir xil; parallel ulanishda kuchlanish bir xil.";
 }
 if(lines.some(s=>/NaN|Infinity/.test(s))) throw Error("Qiymatlar hisoblash diapazonidan tashqarida.");
 result.textContent=lines.join("\n"); hint.textContent=message;
 }catch(e){result.textContent=e.message;hint.textContent="Kiritilgan qiymatlarni tekshiring.";}
}
function render(){
 fields.replaceChildren();
 for(const [id,labelText,value] of modes.find(m=>m[0]===mode.value)[2]){
 const label=document.createElement("label"); label.textContent=labelText+" ";
 const input=document.createElement("input");
 input.type="number";input.step="any";input.min="0";input.id=id;input.value=value;
 input.addEventListener("input",calculate);label.append(input);fields.append(label);
 }
 calculate();
}
mode.addEventListener("change",render);
document.getElementById("reset").addEventListener("click",render);
render();

