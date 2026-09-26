let select_button=document.getElementById("select_button");
let custom_word_option=document.getElementById("custom_word_option");
let custom_word_group=document.getElementById("custom_word_group");
let random_custom_word=document.getElementById("random_custom_word");
let create_custom_word=document.getElementById("create_custom_word");
let custom_word_button=document.getElementById("custom_word_button");
let create_word_group=document.getElementById("create_word_group");
let create_custom_list=document.getElementById("create_custom_list");
let present_list=document.getElementById("present_list");
let view_custom_word=document.getElementById("view_custom_word");
let custom_word_create_option=document.getElementById("custom_word_create_option");
let custom_list_button=document.getElementById("custom_list_button");
let find_list_button=document.getElementById("find_list_button");
let find_custom_list=document.getElementById("find_custom_list");
let datalist_find=document.getElementById("datalist_find");
let delete_list_button=document.getElementById("delete_list_button");
let delete_custom_list=document.getElementById("delete_custom_list");
let datalist_delete=document.getElementById("datalist_delete");
let delete_word_button=document.getElementById("delete_word_button");
let delete_custom_word=document.getElementById("delete_custom_word");
let datalist_word_delete=document.getElementById("datalist_word_delete");
let encode_url=document.getElementById("encode_url");
let share_link=document.getElementById("share_link");
let select_list=document.getElementById("select_list");
let sidebar_button=document.getElementById("sidebar_button");
let sidebar=document.getElementById("sidebar");
let sidebar_family=document.getElementById("sidebar_family");

function hideDistance(){
    sidebar_family.style.setProperty("--hide_distance",-sidebar.offsetWidth+"px");
}
sidebar_button.addEventListener("click",()=>{
    hideDistance();
    console.log(sidebar.offsetWidth);
    if(sidebar_family.classList.contains("hide_sidebar")){
        sidebar_family.classList.remove("hide_sidebar");
        sidebar_button.innerText="關閉目錄";
    }
    else{
        sidebar_family.classList.add("hide_sidebar");
        sidebar_button.innerText="開啟目錄";
    }
})
function setLocalStorage(){
    localStorage.setItem("LocalData",JSON.stringify({
        listInList:listInList,
        listCount:listCount,
        nowCount:nowCount,
        usingCount:usingCount,
    }))
}
let listCount=3,nowCount=2,usingCount=0;
let listInList={
    1:{name:"預設關鍵字",current:["美國","日本","新加玻","加拿大"],reserve:["美國","日本","新加玻","加拿大"]},
    2:{name:"預設自訂關鍵字",current:[],reserve:[]},
};
usingCount=1;
custom_word_group.classList.remove("hid");
create_word_group.classList.add("hid");
listInList[1].current=[...listInList[1].reserve];
custom_word.innerText="這是一個"+listInList[1].name+"的關鍵字";

const showing_custom_word=()=>{
    if(listInList[nowCount]){
        if(listInList[nowCount].reserve.length==0){
        view_custom_word.innerText="此清單尚無關鍵字";
    }
    else{
        view_custom_word.innerText=listInList[nowCount].reserve[0];
        listInList[nowCount].reserve.forEach((e)=>{
            if(e!=listInList[nowCount].reserve[0]){
                view_custom_word.innerText+="、"+e;
            }
        })
    }
    }
    else{
        view_custom_word.innerText="";
    }
    
}
const obj_length=(obj)=>{
    let i=0;
    for(let key in obj){
        i++;
    }
    return i;
}
const shuffle=(arr)=>{
    for(let i=arr.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}
custom_word_create_option.addEventListener("click",()=>{
    console.log("create");
    create_word_group.classList.remove("hid");
    custom_word_group.classList.add("hid");
})
select_button.addEventListener("click",()=>{
    if(select_list.classList.contains("hid")){
        select_button.innerText="選擇清單V";
        select_list.classList.remove("hid");
    }
    else{
        select_button.innerText="選擇清單>";
        select_list.classList.add("hid");
    }
})
select_list.addEventListener("click",(e)=>{
    usingCount=e.target.dataset.value;
    custom_word_group.classList.remove("hid");
    create_word_group.classList.add("hid");
    listInList[e.target.dataset.value].current=[...listInList[e.target.dataset.value].reserve];
    custom_word.innerText="這是一個"+listInList[e.target.dataset.value].name+"的關鍵字";
})


random_custom_word.addEventListener("click",()=>{
    if(listInList[usingCount].current[listInList[usingCount].current.length-1]!=undefined){
        shuffle(listInList[usingCount].current);
        custom_word.innerText=listInList[usingCount].current[listInList[usingCount].current.length-1];
        console.log(listInList[usingCount].current[listInList[usingCount].current.length-1]);
        listInList[usingCount].current.pop();
    }
    else{
        custom_word.innerText="沒有"+listInList[usingCount].name+"的關鍵字了";
    }
})

custom_word_button.addEventListener("click",()=>{
    if(create_custom_word.value.trim()!=""){
        let flag=listInList[nowCount].reserve.find(function(item){
            return create_custom_word.value==item;
        });
        if(!flag){
            listInList[nowCount].reserve.push(create_custom_word.value);
            showing_custom_word();
            datalist_word_delete.innerHTML+=`<option id="delete_word_option${create_custom_word.value}" value=\"${create_custom_word.value}\"></option>`;
            create_custom_word.value="";
        }
        else{
            create_custom_word.value="";
            alert("關鍵字已存在");
        }
        
    }
})
custom_list_button.addEventListener("click",()=>{
    if(create_custom_list.value.trim()!=""&&!listInList[listCount]){
        let flag=true;
        for(let i=1;i<listCount;i++){
            if(listInList[i]){
                if(create_custom_list.value==listInList[i].name){
                nowCount=i;
                flag=false;
                break;
                }
            }
        }
        if(flag){
            listInList[listCount]={name:create_custom_list.value,current:[],reserve:[]};
            create_custom_list.value="";
            create_custom_word.disabled=false;
            nowCount=listCount;
            present_list.innerText="正在設定的清單："+listInList[nowCount].name;
            create_custom_word.placeholder="創建"+listInList[nowCount].name+"的關鍵字";
            delete_custom_word.placeholder="刪除"+listInList[nowCount].name+"的關鍵字";
            select_list.innerHTML+=`<li id="selects_option${nowCount}"data-value=\"${listCount}\">${listInList[listCount].name}</li>`;
            datalist_find.innerHTML+=`<option id="find_option${nowCount}" value=\"${listInList[listCount].name}\"></option>`;
            datalist_delete.innerHTML+=`<option id="delete_option${nowCount}" value=\"${listInList[listCount].name}\"></option>`;
            showing_custom_word();
            datalist_word_delete.innerHTML='';
            
            listCount++;
        }
        else{
            create_custom_list.value="";
            alert("清單已存在!");
        }
        
    }
})
datalist_find.addEventListener("click",()=>{
    console.log(datalist_find.value);
})
find_list_button.addEventListener("click",()=>{
    if(find_custom_list.value.trim()!=""){
        let flag=false;
        for(let i=1;i<listCount;i++){
            if(listInList[i]){
                if(find_custom_list.value==listInList[i].name){
                nowCount=i;
                flag=true;
                break;
                }
            }
            
        }
        if(flag){
            present_list.innerText="正在設定的清單："+listInList[nowCount].name;
            create_custom_word.placeholder="創建"+listInList[nowCount].name+"的關鍵字";
            delete_custom_word.placeholder="刪除"+listInList[nowCount].name+"的關鍵字";
            datalist_word_delete.innerHTML='';
            showing_custom_word();
            listInList[nowCount].reserve.forEach((e) => {
                datalist_word_delete.innerHTML+=`<option id="delete_word_option${e}" value=\"${e}\"></option>`;
            });
            find_custom_list.value="";
        }
        else{
            find_custom_list.value="";
            alert("清單不存在!");
        }
    }
})

delete_list_button.addEventListener("click",()=>{
    if(delete_custom_list.value.trim()!=""){
        let flag=false;
        if(obj_length(listInList)==0){
            delete_custom_list.value="";
        }
        else{
            for(let i=1;i<listCount;i++){
            if(listInList[i]){
                if(delete_custom_list.value==listInList[i].name){
                    select_list.removeChild(document.getElementById(`selects_option`+i));
                    datalist_find.removeChild(document.getElementById(`find_option`+i));
                    datalist_delete.removeChild(document.getElementById(`delete_option`+i));
                    datalist_word_delete.innerHTML='';
                    delete listInList[i];
                    flag=true;
                    delete_custom_list.value="";
                    if(obj_length(listInList)==0){
                        present_list.innerText="沒有可以設定的清單";
                        create_custom_word.placeholder="沒有可創建的關鍵字了";
                        showing_custom_word();
                        create_custom_word.disabled=true;
                    }
                    else{
                        for(let i=1;i<listCount;i++){
                            if(listInList[i]){
                                nowCount=i;
                                present_list.innerText="正在設定的清單："+listInList[nowCount].name;
                                create_custom_word.placeholder="創建"+listInList[nowCount].name+"的關鍵字";
                                delete_custom_word.placeholder="刪除"+listInList[nowCount].name+"的關鍵字";
                                showing_custom_word();
                                listInList[nowCount].reserve.forEach((e) => {
                                    datalist_word_delete.innerHTML+=`<option id="delete_word_option${e}" value=\"${e}\"></option>`;
                                });
                            }
                        }
                    }
                }
            }
            
        }
        }
        if(!flag){
            delete_custom_list.value="";
            alert("清單不存在!");
        }
    }
})

delete_word_button.addEventListener("click",()=>{
    if(delete_custom_word.value.trim()!=""){
        
        let flag=false;
        if(listInList[nowCount].reserve.length==0){
            delete_custom_word.value="";
        }
        else{
            const found=listInList[nowCount].reserve.findIndex((value)=>{return value==delete_custom_word.value});
            console.log(found);
            if(found!=-1){
                flag=true;
                datalist_word_delete.removeChild(document.getElementById(`delete_word_option`+listInList[nowCount].reserve[found]));
                listInList[nowCount].reserve.splice(found,1);
                console.log(listInList[nowCount]);
                showing_custom_word();
            }
        }
        if(!flag){
            alert("當前清單中不存在此關鍵字!");
        }
        delete_custom_word.value="";
    }
})

encode_url.addEventListener("click",()=>{
    let json=JSON.stringify(listInList[usingCount]);
    let encoded=btoa(unescape(encodeURIComponent(json)));
    try{
        share_link.innerHTML=`<input readonly value="${location.origin+location.pathname}?data=${encoded}">`;
    }
    catch(e){
        alert("似乎無法產生網址，請開啟無痕視窗嘗試");
    }
})
decode_url();
function decode_url(){
    const params=new URLSearchParams(location.search);
    let data=params.get("data");
    if(!data)return;
    try{
        let shared_list=decodeURIComponent(escape(atob(data)));
        let real_shared=JSON.parse(shared_list);
        listInList[0]=real_shared;
        usingCount=0;
        listInList[0].current=[...real_shared.reserve];
        listInList[0].reserve=[...real_shared.reserve];
        custom_word.innerText="這是一個"+real_shared.name+"的關鍵字";

        select_list.classList.add("hid");
        create_word_group.classList.add("hid");
        custom_word_group.classList.remove("hid");
        encode_url.classList.add("hid");

    }
    catch(e){
        window.location.assign("https://keyword.sealion.page");
    }
}