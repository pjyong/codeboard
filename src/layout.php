<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/css/layout.css" />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/codemirror.css" />
  <link rel="stylesheet" href="/css/blackboard.css" />
  <link rel="stylesheet" href="/css/eclipse.css" />
  <link rel="stylesheet" href="/css/elegant.css" />
  <link rel="stylesheet" href="/css/midnight.css" />

  <title><?php echo 'CodeBoard'; ?></title>
</head>
<body>
<div id="header">
            <div class="region">
                <h1 id="website_logo"><a href="/">Welcome to CodeBoard</a></h1>
                <ul id="main_nav">
                    <li><a href="#" class="codes_page">Codes</a></li>
                    <li><a href="#" class="share_page">Board</a></li>
                    <li><a href="#" class="tools_page">Tools</a></li>
                    <li><a href="#" class="help_page">Help</a></li>
                    <li><a href="#" class="about_page">About</a></li>
                </ul>
                 
            <div class="clear"></div>   
            </div>       
    </div>

    <div id="promo">
        <div style="height:100px;"></div>

    </div>

    <div id="container">
            <div id="content">
            
            </div>
        
            <div id="sidebar">
            </div>
            <div class="clear"></div>
    </div>

    <div id="footer">
  <p class="disclaim">
    <strong>
    I don't require myself too much: what I'd like to do is to know some truths,<br/>and run into some interesting things.
    &nbsp;&nbsp;——Xiaobo Wang(Chinese Writer)
    </strong>
  </p>
  <p class="credit">
    Created by <br>
    <a href="#">June Peng</a>
  </p>
  
  <div class="clear"></div>
</div>
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Some tips about Editor</h3>
  </div>
  <div class="modal-body">
    <p>Use ctrl + up/down to enter/quit Fullscreen</p>
  </div>
</div>

  
<input type="hidden" id="beginDate" value="<?php echo $beginDate; ?>" />
<input type="hidden" id="endDate" value="<?php echo $endDate; ?>" />  
<script data-main="/js/bootstrap.js" src="/js/libs/require.js"></script>
</body>
</html>