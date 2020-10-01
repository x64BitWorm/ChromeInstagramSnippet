var uid1='n';
var folla1=[];
var folla2=[];
var foll1;
var foll2;
var uname1=location.href;
if(uname1[uname1.length-1]='/')
uname1=uname1.substring(0,uname1.length-1);
uname1=uname1.substring(1+uname1.lastIndexOf('/'));
httpGetAsync(location.href,call1);

var dc2=0;
function done1()
{
    dc2++;
    if(dc2!=2)
        return;
     var follb1=folla1.length;
     for(var i=folla1.length-1;i>-1;i--)
     {
         var fi1=folla2.indexOf(folla1[i]);
         if(fi1==-1)
            continue;
         folla1.splice(i, 1);
         folla2.splice(fi1, 1);
     }
     var str1="";
     for(var i=0;i<folla1.length;i++)
        str1+=link1(folla1[i]);
     document.getElementById('tbl1').innerHTML=str1;
     str1="";
     for(var i=0;i<folla2.length;i++)
        str1+=link1(folla2[i]);
     document.getElementById('tbl2').innerHTML=str1;
     document.getElementById('cou1').innerHTML=folla1.length;
     document.getElementById('cou2').innerHTML=folla2.length;
     document.getElementById('title1').innerHTML=document.getElementById('title1').innerHTML+"Mutual: "+(follb1-folla1.length)+' ('+parseInt(100*((follb1-folla1.length)/(folla1.length+folla2.length+(follb1-folla1.length))))+'%)';
}

function link1(a)
{
    var nick1=a.substring(2+a.lastIndexOf(' ('));
    nick1=nick1.substring(0,nick1.length-1);
    return '<a href="/'+nick1+'">'+a+'</a><br>';
}

function call3(a)
{
    a=JSON.parse(a);
    var out1="";
    var nxt1=a.data.user.edge_follow.page_info.has_next_page ? a.data.user.edge_follow.page_info.end_cursor:"";
    for(var i=0;i<a.data.user.edge_follow.edges.length;i++)
    {
        var cs1=a.data.user.edge_follow.edges[i].node.full_name+' ('+a.data.user.edge_follow.edges[i].node.username+')';
        folla1.push(cs1);
    }
    updatetitle1();
    if(nxt1=="" || folla1.length>=15000)
        done1();
    else
        httpGetAsync('https://www.instagram.com/graphql/query/?query_hash='+foll1+'&variables={"id":"'+uid1+'","include_reel":true,"fetch_mutual":false,"first":24,"after":"'+nxt1+'"}',call3);
}

function call4(a)
{
    a=JSON.parse(a);
    var out1="";
    var nxt1=a.data.user.edge_followed_by.page_info.has_next_page ? a.data.user.edge_followed_by.page_info.end_cursor:"";
    for(var i=0;i<a.data.user.edge_followed_by.edges.length;i++)
    {
        var cs1=a.data.user.edge_followed_by.edges[i].node.full_name+' ('+a.data.user.edge_followed_by.edges[i].node.username+')';
        folla2.push(cs1);
    }
    updatetitle1();
    if(nxt1=="" || folla2.length>=15000)
        done1();
    else
        httpGetAsync('https://www.instagram.com/graphql/query/?query_hash='+foll2+'&variables={"id":"'+uid1+'","include_reel":true,"fetch_mutual":false,"first":24,"after":"'+nxt1+'"}',call4);
}

function updatetitle1()
{
    document.getElementById('title1').innerHTML="Username: "+uname1+"<br>Follow: "+folla1.length+"&nbsp;&nbsp;&nbsp;&nbsp;Followed by: "+folla2.length+"&nbsp;&nbsp;&nbsp;&nbsp;";
}

function call2(a)
{
    foll1=a.indexOf('requestNextFollowListPage');
    foll2=0;
    foll1=a.lastIndexOf('"',foll1);
    foll2=a.lastIndexOf('"',foll1-1);
    foll1=a.substring(1+foll2,foll1);
    foll2=a.lastIndexOf('"',foll2-1);
    foll2=a.substring(1+a.lastIndexOf('"',foll2-1),foll2);
    var html1="<h2 id='title1'>Loading...</h2><table style='border: 1px solid black'>";
    html1+="<tr><th style='border: 1px solid black'>they are not subscribed to user</th><th style='border: 1px solid black'>user is not subscribed to them</th></tr>";
    html1+="<tr><th id='tbl1' style='border: 1px solid black'>please</th><th id='tbl2' style='border: 1px solid black'>wait</th></tr>";
    html1+="<tr><th id='cou1' style='border: 1px solid black'></th><th id='cou2' style='border: 1px solid black'></th></tr>";
    html1+="</table><br><button onclick='click11111()'>CLOSE WINDOW (by x64BitWorm)</button>";
    document.getElementsByTagName("BODY")[0].innerHTML=html1;
    httpGetAsync('https://www.instagram.com/graphql/query/?query_hash='+foll1+'&variables={"id":"'+uid1+'","include_reel":true,"fetch_mutual":false,"first":24}',call3);
    httpGetAsync('https://www.instagram.com/graphql/query/?query_hash='+foll2+'&variables={"id":"'+uid1+'","include_reel":true,"fetch_mutual":false,"first":24}',call4);
}

function call1(a)
{
    uid1=a.substring(13+a.indexOf('"profilePage_'));
    uid1=uid1.substring(0,uid1.indexOf('"'));
    var token1=a.indexOf("/Consumer.js/");
    token1=a.substring(1+a.lastIndexOf('"',token1),a.indexOf('"',token1));
    httpGetAsync("https://www.instagram.com"+token1,call2);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else if(xmlHttp.readyState == 4 && xmlHttp.status!=200)
            alert('Error! You need to open instagram profile');
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);
}

function click11111()
{
    // no im not an idiot, this is a page reload :)
    location.href=location.href;
}
