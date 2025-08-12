let start = document.querySelector("#start");
let record = document.querySelector("#record");
let stop = document.querySelector("#stop");
let show = document.querySelector(".show");
let ol = document.querySelector("ol");
let storeTime = 0;
let wattingInterval;
let flagA = false;
let flagB = false;
show.innerHTML = `00:00:00:00`;
let h = 0,m = 0,s = 0,ms = 0;

let intervalStart;

let timeCalculate = (extraTime = 0) =>{
    let time = Date.now();
        intervalStart = setInterval(()=>{
            let real = Date.now()-time;
            storeTime = real;
            real += extraTime;
            let save = Math.floor(real/1000)
            h = Math.floor(save/3600);
            m = Math.floor((save - h*3600) / 60);
            s = (save-h*3600-m*60);
            ms = Math.round((real % 1000)/10);
            console.log(`${h}:${m}:${s}:${ms}`);

            show.innerHTML = `${h}:${m}:${s}:${ms}`
        },10);
}
start.addEventListener("click",() => {
    clearInterval(intervalStart);
    start.innerHTML = "Restart";
    if(flagB){
        flagB = !flagB;
        stop.innerHTML = "Stop"
    } 
    if(ol.children.length>0){
        alert("All records will be removed");
        ol.replaceChildren();
    }
    timeCalculate();
    flagA = true;
})
record.addEventListener("click",()=>{
    let li = document.createElement("li");
    li.innerHTML = `${h}:${m}:${s}:${ms}`
    ol.appendChild(li);
})
stop.addEventListener("click",()=>{
    if(flagA){
        if(!flagB){
            clearInterval(intervalStart);
            show.innerHTML = `${h}:${m}:${s}:${ms}`
            stop.innerHTML = "Resume"
            let t = Date.now();
            wattingInterval = setInterval(() => {
                waittingTime = Date.now()-t;
            })
        }
        else{
            timeCalculate(storeTime);
            stop.innerHTML = "Stop"
            
        }
        flagB = !flagB;
    }
})
