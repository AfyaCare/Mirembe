/*var collapsible = document.getElementsByClassName("btn-collapsible");
console.log(collapsible[0] + "or" + collapsible);
collapsible[0].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("collapsibleContent");
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
});*/

    function collapseContentFilter(btn)
    {
        /*var collapsible = document.getElementsByClassName("btn-collapsible");
        var index;
        for(index=0; index < collapsible.length; index++)
        {

        }*/
        btn.classList.toggle("active");
        var content = document.getElementById("collapsibleContent-filter");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function collapseContentAdd(btn)
    {
        /*var collapsible = document.getElementsByClassName("btn-collapsible");
        var index;
        for(index=0; index < collapsible.length; index++)
        {

        }*/
        btn.classList.toggle("active");
        var content = document.getElementById("collapsibleContent-add");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function collapseContentDownload(btn)
    {
        btn.classList.toggle("active");
        var content = document.getElementById("collapsibleContent-download");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function collapseContentUpload(btn)
    {
        btn.classList.toggle("active");
        var content = document.getElementById("collapsibleContent-upload");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }