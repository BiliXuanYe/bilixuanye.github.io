"use strict";
var is_nighted = false;
var is_loading = true;

function global_loading_screen()
{
    if(is_loading == true)
    {
        $('#_root_container').css('visibility', 'visible');
        $('#_loading_screen').css('left', '-100vw');
        setTimeout((e)=>{ e.hide(); }, 5000, $('#_loading_screen'));
    }
    else
    {
        $('#_loading_screen').show();
        $('#_loading_screen').css('left', '0');
        setTimeout((e)=>{ e.css('visibility', 'hidden'); }, 5000, $('#_root_container'));
    }
}

// 全局夜间模式
function global_night_mode()
{
    if(is_nighted == false)
    {
        is_nighted = true;
        $(document.getElementsByClassName('nightable')).each( (i,e)=>{ e.enable_night_mode(); } );
        $(document.getElementsByClassName('icon_nightmode')).each( (i,e)=>{ $(e).hide(); } );
        $('[src=\'/res/img/sun_icon.png\']').each( (i,e)=>{ $(e).show(); } );
    }
    else
    {
        is_nighted = false;
        $(document.getElementsByClassName('nightable')).each( (i,e)=>{ e.disable_night_mode(); } );
        $(document.getElementsByClassName('icon_nightmode')).each( (i,e)=>{ $(e).show(); } );
        $('[src=\'/res/img/sun_icon.png\']').each( (i,e)=>{ $(e).hide(); } );
    }
}

function function_easeout(ntime, ttime)
{
    let xval;
    if(ttime == null) { xval = ntime; }
    else { xval = ntime / ttime; }
    return -(xval * xval) + 2 * xval;
}

var is_sidebar = false;

// 全局侧边栏
function global_sidebar()
{
    let jqbody = $('#_root_container');
    let jqsb = $('#_sidebar_list');
    if(is_sidebar == false)
    { // 开启侧边栏
        is_sidebar = true;
        jqbody.css('left', '-40vw');
        jqsb.css('right', '0');
    }
    else
    { // 关闭侧边栏
        is_sidebar = false;
        jqbody.css('left', '0');
        jqsb.css('right', '-40vw');
    }
    console.log('Sidebar is now ' + String(is_sidebar));
}

class BlueButton extends HTMLElement
{
    constructor()
    {
        super();
    }
    
    connectedCallback()
    {
        $(this).addClass('nightable');
    }
    
    enable_night_mode()
    {
        $(this).addClass('blue-button-night');
    }
    
    disable_night_mode()
    {
        $(this).removeClass('blue-button-night');
    }
}

class BlueTextbox extends HTMLElement
{
    constructor() { super(); }
    
    connectedCallback()
    {
        $(this).addClass('nightable');
    }
    
    enable_night_mode()
    {
        $(this).addClass('blue-textbox-night');
    }
    
    disable_night_mode()
    {
        $(this).removeClass('blue-textbox-night');
    }
}

// Bottom menu
class BottomMenu extends HTMLElement
{
    constructor()
    {
        super();
    }
    
    connectedCallback()
    {
        $(this).addClass('nightable');
    }
    
    enable_night_mode()
    {
        
    }
    
}

class ProgressBar extends HTMLElement
{
    constructor()
    {
        super();
        this.progress = 0;
        this.border_day_color = '#000000';
        this.border_night_color = '#000000';
        this.bar_day_color = '#000000';
        this.bar_night_color = '#000000';
    }
    
    connectedCallback()
    {
        this.inbar = document.createElement('div');
        this.textbox = document.createElement('div');
        
        $(this).addClass('nightable');
        
        let t;
        t = $(this.textbox);
        t.css({
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'text-align': 'center',
            'font-size': '8px',
            'color': '#000000',
            'background-color': 'transparent',
            'z-index': '1'
        });
        t.appendTo(this);
        
        t = $(this.inbar);
        t.css({
            'display': 'inline-block',
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'height': '100%',
            'width': '0',
            'background': '#ffffff',
            'transition': 'background-color 2s'
        });
        t.appendTo(this);
    }
    
    add_progress(value)
    {
        this.progress += value;
        if(this.progress >= 100)
        {
            this.progress = 100;
        }
        this.refresh();
    }
    
    set_progress(value)
    {
        if(value <= 100)
        {
            this.progress = value;
        }
        else
        {
            this.progress = 100;
        }
        this.refresh();
    }
    
    set_border(day_color, night_color)
    {
        this.border_day_color = day_color;
        this.border_night_color = night_color;
        let c;
        if(is_nighted) { c = night_color; }
        else { c = day_color; }
        this.refresh();
    }
    
    set_bar(day_color, night_color)
    {
        this.bar_day_color = day_color;
        this.bar_night_color = night_color;
        let c;
        if(is_nighted) { c = night_color; }
        else { c = day_color; }
        this.refresh();
    }
    
    set_text(t)
    {
        $(this.textbox).text(t);
    }
    
    refresh()
    {
        $(this.inbar).css('width', String(this.progress) + '%');
        if(is_nighted)
        {
            $(this.inbar).css('background-color', this.bar_night_color);
            $(this).css('border-color', this.border_night_color);
        }
        else
        {
            $(this.inbar).css('background-color', this.bar_day_color);
            $(this).css('border-color', this.border_day_color);
        }
    }
    
    enable_night_mode()
    {
        this.refresh();
    }
    
    disable_night_mode()
    {
        this.refresh();
    }
    
    
}

$(function() {
    $('#night_mode').click(global_night_mode);
    let nicon = document.createElement('img');
    $(nicon).attr('src', '/res/img/moon_icon.png');
    $(nicon).attr('width', '25px');
    $(nicon).attr('height', '25px');
    $(nicon).attr('class', 'icon_nightmode');
    let dicon = nicon.cloneNode(true);
    $(dicon).attr('src', '/res/img/sun_icon.png');
    
    $(dicon).hide();
    
    $('#night_mode').append(nicon);
    $('#night_mode').append(dicon);
    
    // Sidebar
    $('#sidebar').click((e)=>{
        global_sidebar();
    });
    let esidebar = document.createElement('div');
    $(document.body).append(esidebar);
    esidebar = $(esidebar);
    esidebar.attr('id', '_sidebar_list');
    
    customElements.define('blue-button', BlueButton);
    customElements.define('bottom-menu', BottomMenu);
    customElements.define('blue-textbox', BlueTextbox);
    customElements.define('progress-bar', ProgressBar);
    setTimeout(global_loading_screen, 1000);
});