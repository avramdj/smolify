$(document).ready(function(){

    $('body').css('display', 'none');
    $('body').fadeIn(350);
    $('#url').focus();

    $("#urlform").submit(function(){
        const url = $("#url").val().trim();
        const hash = $("#hash").val().trim();
        const inputBody = JSON.stringify({ url: url, hash: hash })
        fetch('/api/url', {
            method: 'POST',
            body: inputBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let parsed = res.json();
            if(res.status >= 400){
                parsed.then(res=>showError(res))
            } else {
                parsed.then(res=>showResult(res))
            }
        })
        $("#hash").val("")

        return false;
    });

    function showResult(res){
        target = $("#result");
        if(!target.hasClass("firstPop")){
            target.css('display', 'none');
        }
        
        target.html(`
        <span class="titletext">smol url: </span>
        <a id="linky" class="titletext" href="http://${res.newurl}">${res.newurl}</a>
        <br>
        <button id="copy" class="btn btn-outline-secondary btn-sm fixmarg2">copy</button>
        `)
        if(!target.hasClass("firstPop")){
            target.slideDown(350);
            target.addClass("firstPop");
        }
        $("#copy").focus();
    }

    function showError(res){
        target = $("#result");
        if(!target.hasClass("firstPop")){
            target.css('display', 'none');
        }
        
        target.html(`
        <span class="titletext errorSpan">oops, ${res.message}</span>
        `)
        target.slideDown(350);

        if(!target.hasClass("firstPop")){
            target.slideDown(350);
            target.addClass("firstPop");
        }
    }

    $("#result").on("click", $("button#copy"), function(event){
        if(event.target === $("#copy")[0]){
            copied = $("#linky").text();
            try {
                navigator.clipboard.writeText(copied)
                .then(s=>{
                    $("#copy").text("copied")
                })
                .then(s=>{
                    $("#linky").focus();
                })
                ;
            } catch(error){
                alert("your browser wont allow copying without HTTPS :/")
            }
        }
    })

    $("#hash").on("focus", function(){
        $("#helpKey").removeClass("invisible")
        $("#helpKey").css('display', 'none');
        $('#helpKey').fadeIn(350);
    });

    $("#hash").on("blur", function(){
        $('#helpKey').fadeOut(350);
    });
    
});