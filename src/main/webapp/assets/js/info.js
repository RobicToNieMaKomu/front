function Info(about) {
    var about = about;
    var urlToImg = 'http://front-comparator.rhc.cloud.com/';
    this.getTitle = function() {
        var title = '';
        if (about === 'about') {
            title = '<h4><b>About</b></h4>';
        } else if (about === 'contact') {
            title = '<h4><b>Contact</b></h4>';
        }
        return title;
    };
    this.getMessage = function() {
        var msg = '';
        if (about === 'about') {
            msg = '<div><p>This is about content.</p></div>';
        } else if (about === 'contact') {
            msg += '<div>';
            msg += '<p>If you have any questions or comments regarding this site or myself do not hesitate and write me an email:</p></hr>'; 
            msg += '<p><span class="fa fa-mail-reply"></span> <a href="mailto:piotrek.szczesniak at gmail dot com">Send an Email </a></p></hr>';
            msg += '<p>or visit my linked-in profile:<p></hr>';
            msg += '<p><span class="fa fa-linkedin"></span> <a href="http://pl.linkedin.com/pub/piotr-szcz%C4%99%C5%9Bniak/77/597/489">Linkedin profile </a></p>';
            msg += '</div>';
            //<img src=\'assets/images/gmail.png\'><span class="glyphicon glyphicon-info-sign"></span>
        }
        return msg;
    };
}