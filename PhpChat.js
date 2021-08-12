 
		 
		 
		
function PhpChat()
{
    this.ajax = new XMLHttpRequest();
    this.result=null;
    this.encode=function(val){
    return encodeURIComponent(val);
};
    this.getAjax = function ()
    {
        return this.ajax;
    };
    //form only
    this.get = function (form, codeUser, isAjax='ajax')
    {
        var codeFallBack = codeUser; //variable
        var self=this;
        this.ajax.open('GET', form.action, true);
        //alert(this.serialize(form));
        this.ajax.send(this.serialize(form)+isAjax);
        this.ajax.addEventListener('readystatechange', function (e)
        {
            if (this.status === 200 && this.readyState === 4)
            {
                //code here
                // return this.responseText;
                //console.log(this.responseText);
                codeFallBack(this.responseText);
				return 0;
            } else
            {
                console.log('waiting..');
            }
        });
        return this.ajax;
    };
    this.getResponse = function () {
        return this.ajax.reponseText;
    };

    this.stop = function () {
        this.ajax.addEventListener('readystatechange', function(){
            
        });
    };
    //get pages
    this.getPage = function (url, codeUser, isAjax='ajax')
    {
        var codeFallBack = codeUser; //variable
        var self = this;
        // alert(url+isAjax);
        this.ajax.open('GET', url+isAjax, true);
        //alert(this.serialize(form));
        this.ajax.send(null);
        // alert(url);
        this.ajax.addEventListener('abort', function () {
            self.ajax = null;
        });
        this.ajax.addEventListener('readystatechange', function (e)
        {
            if (this.status === 200 && this.readyState === 4)
            {
                //code here
                // return this.responseText;
                //console.log(this.responseText);
                self.result=self.ajax.responseText;
                codeFallBack(this.responseText);
                return 0;
            } else
            {
                console.log('waiting..');
            }
        });
        return this.ajax;
    };
    this.post = function (form, codeUser, isAjax='ajax')
    {
        var codeFallBack = codeUser;
        this.ajax.open('POST', form.action, true);
        this.ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // alert(this.serialize(form)+isAjax);
        this.ajax.send(this.serialize(form)+isAjax);
        this.ajax.addEventListener('readystatechange', function(e)
        {
            if (this.status === 200 && this.readyState === 4)
            {
                //code here
                // console.log(this.responseText);
                codeFallBack(this.responseText);
				return 0;
            } else
            {
                console.log('waiting..');
            }
        });

        //progress event
        // xhr.onprogress = function(event){
        //     var divStatus = document.getElementById(“status”);
        //     if (event.lengthComputable){
        //         divStatus.innerHTML = “Received “ + event.position + “ of “ + 
        //             event.totalSize + 
        // “ bytes”;
        //     }
        // };

        return this.ajax;
    };

    this.serialize = function (form)
    {
        // console.log(form.length);
        var result = '';
        for (var i = 0, c = form.length; i < c; i++)
        {

            if (form[i].nodeName.toLowerCase() == 'input' || form[i].nodeName.toLowerCase()=='select')
            {
                if (form[i].getAttribute('type') != 'submit')
                {
                    result += form[i].getAttribute('name') + '=' + encodeURIComponent(form[i].value) + '&';
                }
            } else if (form[i].nodeName.toLowerCase() == 'textarea')
            {
                result += form[i].getAttribute('name') + '=' + encodeURIComponent(form[i].value) + '&';
            } else if(form[i].nodeName.toLowerCase()=='select')
            {
				result+= form[i].getAttribute('name')+'='+encodeURIComponent(form[i]).value+'&';
            }
        }

        return result;
    };

    //file upload
    this.upload = function (form)
    {
        var formData = (window.FormData) ? new FormData(form) : null;
        var self = this;
        var tempContainer = document.querySelector('#fetchedContent');
        var mainSection = document.querySelector('#profileContent');

        self.ajax.open('POST', form.getAttribute('action'), true);
        self.ajax.send(formData);
        self.ajax.addEventListener('readystatechange', function (e)
        {
            if (this.status === 200 && this.readyState === 4)
            {
                console.log('file uploaded');
                tempContainer.innerHTML = this.responseText;
                mainSection.innerHTML = document.querySelector('#fetchedContent #profileContent').innerHTML;
                //self.fallBack();
                //self.closeLoader();
				return 0;
            }
        });

        // self.ajax.addEventListener('progress', function(e){

        // console.log('uploading file.. '+e.loaded+'/'+e.total);
        // });

    };
     this.uploadFile = function (form, fallBack, progressBarContainer)
    {

        //empty progress bar 
        progressBarContainer.innerHTML='';
        //creating ajax input 
        var hiddenInput=document.createElement('input');

        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'ajax');
        hiddenInput.value="hello";

        form.appendChild(hiddenInput);

        var formData = (window.FormData) ? new FormData(form) : null;
        var self = this;
        var tempContainer = document.querySelector('#fetchedContent');
        var mainSection = document.querySelector('#profileContent');
        var codeFallBack=fallBack;

        self.ajax.open('POST', form.getAttribute('action'), true);
        self.ajax.send(formData);
        // console.log(formData+isAjax);

        var progressContainer=document.createElement('div');
        var progressLevel=document.createElement('div');

        progressContainer.className='progressContainer';
        progressLevel.className='progressLevel';

        progressBarContainer.appendChild(progressContainer);
        progressContainer.appendChild(progressLevel);
        progressBarContainer.style.display='block';

        progressContainer.style.display='block';
        progressContainer.style.background='#eee';
        progressContainer.style.width='100%';
        progressContainer.style.height='10px';
        progressContainer.style.position='relative';
        progressContainer.style.borderRadius='5px';
        progressLevel.style.background='#4ad';
        progressLevel.style.width='0%';
        progressLevel.style.height='10px';

        var progressLevelText=document.createElement('div');


        progressContainer.appendChild(progressLevelText);
        progressLevelText.textContent='0%';
        progressLevelText.style.align='Center';
        progressLevelText.style.fontWeight='bold';

        // try{
        //     var fileInput=document.querySelector('.'+form.className+' input[type=file]');
        //     console.log('file size '+fileInput.size);
        // }catch(e){
        //     console.log('error getting file size '+e);
        // }
        // xhr.setRequestHeader("Content-Length", "0");
        progressLevelText.style.display='none'; //debug
        self.ajax.addEventListener('progress',function(e){

            console.log(e.total);

            console.log(e.loaded+'/'+e.total); 
            // var newVal=(e.loaded*100)/e.total;
            setTimeout(function(){
                console.log(e.loaded+'/'+e.total); 
                var newVal=(e.loaded*100)/e.total;
                 progressLevel.style.width=newVal+'%'; 
                 progressLevelText.textContent=newVal+'%';

             }, 1000);
            
        });

        self.ajax.addEventListener('readystatechange', function (e)
        {
            if (this.status === 200 && this.readyState === 4)
            {
                // console.log('file uploaded');
                // tempContainer.innerHTML = this.responseText;
                // mainSection.innerHTML = document.querySelector('#fetchedContent #profileContent').innerHTML;
                
                codeFallBack(this.responseText);

                //self.fallBack();
                //self.closeLoader();
                return 0;
            }
        });

        // self.ajax.addEventListener('progress', function(e){

        // console.log('uploading file.. '+e.loaded+'/'+e.total);
        // });

    };
}