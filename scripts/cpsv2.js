"use strict";

class CPSTest extends HTMLElement
{
    constructor()
    {
        super();
        this.prepared = false;
        this.running = false;
        this.firstclick = true;
        this.specified_time = 10000;
        this.score = 0;
    }
    
    connectedCallback()
    {
        let p;
        
        // Click button
        this.clickbtn = document.createElement('div');
        p = $(this.clickbtn);
        p.attr('class', 'cps_click');
        p.click(this.clicked);
        p.text('Click Me!');
        p.hide();
        
        // Prepare button
        this.preparebtn = document.createElement('blue-button');
        p = $(this.preparebtn);
        p.click(this.prepare);
        p.text('准备'); // content and style
        p.css({
            'position': 'absolute',
            'bottom': '1%',
            'width': '40%',
        });
        
        // Stop button
        this.stopbtn = document.createElement('blue-button');
        p = $(this.stopbtn);
        p.click(this.stop);
        p.addClass('stopbtn');
        p.text('强行停止');
        p.css({
            'position': 'absolute',
            'bottom': '0',
            'opacity': '0'
        });
        p.hide();
        
        // Score label
        this.scorelabel = document.createElement('blue-textbox');
        p = $(this.scorelabel);
        p.html('得分: 还没测呢<br/>CPS: 还没测呢');
        p.css({
            'position': 'absolute',
            'top': '70%',
            'width': '40%'
        });
        
        // Time bar
        this.timebar = document.createElement('progress-bar');
        this.timebar.set_border('#c0e0d0', '#709080');
        this.timebar.set_bar('#d0f0e0', '#a0c0b0');
        $(this.timebar).css('opacity', '0');
        
        this.appendChild(this.clickbtn);
        this.appendChild(this.preparebtn);
        this.appendChild(this.stopbtn);
        this.appendChild(this.scorelabel);
        this.appendChild(this.timebar);
    }
    
    prepare()
    {
        let cpsobj = this.parentNode;
        if(cpsobj.prepared == true || cpsobj.running == true)
        {
            return null;
        }
        cpsobj.prepared = true;
        cpsobj.score = 0;
        $(cpsobj.scorelabel).html('得分: 还没测呢<br/>CPS: 还没测呢');
        
        let tmp;
        tmp = $(cpsobj.preparebtn);
        tmp.css('opacity', '0');
        setTimeout((cpsobj, e)=>{ if(cpsobj.prepared) { e.hide(); } }, 800, cpsobj, tmp);
        
        tmp = $(cpsobj.clickbtn);
        tmp.show();
        tmp.css('opacity', '1');
        
        $(cpsobj.timebar).css('opacity', '1');
        function u(bar, p) {
            if(p < 100)
            {
                setTimeout(u, 10, bar, p+1);
                bar.set_progress(function_easeout(p, 100)*100);
            }
        }
        setTimeout(u, 10, cpsobj.timebar, 0);
        cpsobj.timebar.set_text('剩余时间: 点上面那个开始嘛');
    }
    
    stop()
    {
        this.parentNode.running = false;
    }
    
    finish()
    {
        this.prepared = false;
        this.running = false;
        
        let tmp;
        tmp = $([this.stopbtn, this.clickbtn])
        tmp.css('opacity', '0');
        setTimeout((cpsobj, e)=>{ if(!cpsobj.prepared){e.hide();} }, 800, this, tmp);
        
        tmp = $(this.preparebtn);
        tmp.show();
        tmp.css('opacity', '1');
        
        
        $(this.timebar).css('opacity', '0');
        
        this.firstclick = true;
        
    }
    
    cpsrefresh(cpsobj, rest_time, total_time)
    {
        if(rest_time <= 0 || cpsobj.running == false)
        {
            cpsobj.finish();
            return null;
        }
        let cpstmp = 'CPS: ' + String(cpsobj.score / (total_time - rest_time) * 1000).substr(0,4);
        cpstmp.padEnd(10, '测');
        $(cpsobj.scorelabel).html('得分: ' + String(cpsobj.score) + '<br/>' + cpstmp);
        cpsobj.timebar.set_progress(rest_time / total_time * 100);
        cpsobj.timebar.set_text('剩余时间: ' + String(rest_time / 1000));
        setTimeout(cpsobj.cpsrefresh, 9, cpsobj, rest_time - 10, total_time);
    }
    
    clicked()
    {
        let cpsobj = this.parentNode;
        if(cpsobj.firstclick && cpsobj.prepared)
        {
            cpsobj.running = true;
            cpsobj.firstclick = false;
            let tmp = $(cpsobj.stopbtn);
            tmp.show();
            tmp.css('opacity', '1');
            cpsobj.cpsrefresh(cpsobj, cpsobj.specified_time, cpsobj.specified_time);
        }
        cpsobj.score += 1;
    }
}

$(function (){
    customElements.define('cps-test', CPSTest);
})