var inited = false;
var score = null;
var finished = true;
var cpstest_clickbtn = null;
var cpstest_startbtn = null;
var cpatest_stopbtn = null;
var score_display = null;
var time_display = null;
var cps_display = null;
var specified_time = 10000;
var started = false;
var async_code = null;
var time_ms = 0;
var easter = false;
var easter_btn = null;
var texiao_count = 0;
var normal_finishtexiao = [
function() {
    return '一般般ba';
},
function() {
    if(Math.floor(Math.random() * 10) == 5)
    {
        return '二般般吧';
    }
    return '一般般吧';
}
];
var texiao_list = [function() {
    return '啊';
},
function() {
    if(score < 110)
    {
      return '还有' + String(110-score) + '下就超110了!';
    }else if(score == 110){
      return '这么巧,刚好110';
    }else{
      return '超过110已经' + String(score - 110) + '次了!';
    }
},
function() {
    if(Math.floor(Math.random()*10) == 5)
    {
      return '卢本伟NB!';
    }
    else if(Math.floor(Math.random()*30) == 5)
    {
      return '神里绫华狗都不要';
    }
    else if(Math.floor(Math.random()*30) == 5)
    {
      return '亿命七七多好';
    }else{
      return '给爷漏油！';
    }
},
function() {
    return '啊啊♂啊';
},
function() {
    return 'WDNMD';
}
];

document.addEventListener('keydown', function(key) {
    if(key.key == 'i' && key.ctrlKey)
    {
        score += Math.floor(Math.random() * 10);
    }
});

function cpstest_gettime()
{
    specified_time = Number(document.getElementById('time_input').value * 1000);
    if(specified_time == NaN || specified_time == Infin)
    {
        alert('无效的数字:'+document.getElementById('time_input').value);
        specified_time = 10000;
        return 1;
    }
    return 0;
}

function cpstest_init()
{
    score = 0;
    score_display = document.getElementById("score");
    cps_display = document.getElementById("cps");
    cpstest_clickbtn = document.getElementById("cpstest_clickbtn");
    cpstest_startbtn = document.getElementById("cpstest_startbtn");
    time_display = document.getElementById("time_display");
    easter_btn = document.getElementById("EASTEREgg");
    cpstest_stopbtn = document.getElementById('stop_btn');
    cpstest_stopbtn.addEventListener('click', function() {started = false;});
}

function cpstest_click() 
{
    if(finished == true)
    {
        return;
    }
    if(!started)
    {
        score = 0;
        started = true;
        cpstest_realstart();
    }
    if(score >= 80 && easter == false)
    {
        
    }
    score += 1;
    score_display.innerHTML = "得分:" + String(score);
    cpstest_generate_texiao();
}

function cpstest_start()
{
    if(!inited)
    {
        inited = true;
        cpstest_init();
    }
    finished = false;
    cpstest_startbtn.style['display'] = 'none';
    cpstest_clickbtn.style['display'] = 'block';
    cps_display.innerHTML = '还没测呢';
    time_display.style['display'] = 'block';
    score_display.innerHTML = "得分: 还没测呢";
}
function cpstest_finish()
{
    started = false;
    finished = true;
    alert(async_code);
    if(async_code != null)
    {
        clearInterval(asnyc_code);
        async_code = null;
    }
    
    cpstest_startbtn.style['display'] = 'block';
    cpstest_clickbtn.style['display'] = 'none';
    time_display.style['display'] = 'none';
    time_display.innerHTML = "剩余时间: 还没开始呢";
    
    cpstest_stopbtn.style['display'] = 'none';
    var a = document.createElement('a');
    a.setAttribute('class', 'cpstest_clicktexiao');
    a.style['color'] = 'rgb(' + String(Math.floor(Math.random() * 255)) + ',' + String(Math.floor(Math.random() * 255)) + ',' + String(Math.floor(Math.random() * 255)) + ')';
    a.style['left'] = String(Math.floor(Math.random()*90)) + '%';
    a.style['top'] = String(Math.floor(Math.random()*80)) + '%';
    a.style['font-size'] = '50px';
    // 废物结算
    if(score < 20 && Math.floor(Math.random() * 10) == 5) {
        a.innerHTML = '废物了家人们';
        document.body.appendChild(a);
        setTimeout(function(e) { e.remove(); }, 2500, a);
    }
    // 普通结算
    else if(score < 80)
    {
        a.innerHTML = normal_finishtexiao[Math.floor(Math.random() * (normal_finishtexiao.length + 1))]();
        document.body.appendChild(a);
        setTimeout(function(e) { e.remove(); }, 2500, a);
    }
    else if(score < 300)
    {
        a.innerHTML = '啊啊啊';
        document.body.appendChild(a);
        setTimeout(function(e) { e.remove(); }, 2500, a);
    }
    // 卢本伟NB!!!
    else if(score >= 300)
    {
        time_display.innerHTML = '卢本伟牛逼！';
        score_display.innerHTML = '卢本伟牛逼！';
        function lbwnb(nbr) {
            if(nbr <= 0)
            { return null; }
            setTimeout(lbwnb, 10, nbr - 1);
            var tmp = document.createElement('a');
            tmp.setAttribute('class', 'cpstest_clicktexiao');
            tmp.style['color'] = 'rgb(' + String(Math.floor(Math.random() * 180)) + ',' + String(Math.floor(Math.random() * 255)) + ',' + String(Math.floor(Math.random() * 255)) + ')';
            tmp.style['left'] = String(Math.floor(Math.random()*90)) + '%';
            tmp.style['top'] = String(Math.floor(Math.random()*80)) + '%';
            tmp.style['font-size'] = '60px';
            document.body.appendChild(tmp);
            setTimeout(function(e) { e.remove(); }, 2500, tmp);
        }
        lbwnb(Math.floor(Math.random() * 501));
    }
}

function cpstest_realstart()
{
    if(cpstest_gettime() == 0)
    {
        cpstest_finish();
        return null;
    }
    time_ms = specified_time;
    cpstest_stopbtn.style['display'] = 'block';
    asnyc_code = setInterval(cpstest_update, 10);
}

function cpstest_update()
{
    time_ms -= 10;
    if(time_ms <= 0 || started == false)
    {
        cps_display.innerHTML = 'CPS: ' + String(score / specified_time * 1000).substring(0, 5).padStart(8);
        time_display.innerHTML = "剩余时间: 0";
        cpstest_finish();
        return null;
    }
    cps_display.innerHTML = 'CPS: ' + String(score / (specified_time - time_ms) * 1000).substring(0, 5).padStart(8);
    time_display.innerHTML = "剩余时间: " + String(time_ms / 1000).padEnd(7);
}

function cpstest_generate_texiao()
{
    if(texiao_count < 40)
    {
        var a = document.createElement("p");
        if(score > 200) {
          a.innerHTML = '卢本伟牛逼！';
          texiao_count += 1;
        }else{
          a.innerHTML = texiao_list[Math.floor(Math.random()*(texiao_list.length + 1))]();
          texiao_count += 1;
        }
        a.setAttribute('class', 'cpstest_clicktexiao');
        a.style['left'] = String(Math.floor(Math.random()*90)) + '%';
        a.style['top'] = String(Math.floor(Math.random()*80)) + '%';
        a.style['color'] = 'rgb(' + String(Math.floor(Math.random() * 255)) + ',' + String(Math.floor(Math.random() * 255)) + ',' + String(Math.floor(Math.random() * 255)) + ')';
        a.addEventListener('click', cpstest_click);
        document.body.appendChild(a);
        setTimeout(function(element) { element.remove(); texiao_count -= 1; }, 2500, a);
    }
}