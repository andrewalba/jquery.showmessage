<?php
/*
 * returnForm.php
 * Alba Web Studio
 * http://albawebstudio.com/
 *
 * Copyright (c) 2010 Andrew Alba
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.albawebstudio.com/License
 *
 * Date: Jan 31, 2010 12:06:50 PM
 * Project: dingobytes.com
 * Revision: 
 */
header('Content-Type: text/xml');
$error="true";
if( !isset($_GET['fullName']) )
{
	$returnMessage="Please enter your full name";
}
if( !isset($_GET['email']) || (isset($_GET['email']) && !eregi("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$", $_GET['email']) ) )
{
	$returnMessage="Please enter a valid email address";
}
if( isset($_GET['phone']) && !eregi("^(([0-9]{1})*[- .(]*([0-9a-zA-Z]{3})*[- .)]*[0-9a-zA-Z]{3}[- .]*[0-9a-zA-Z]{4})+$", $_GET['phone']) )
{
	$returnMessge="Please enter a valid phone number";
}
if( !isset($_GET['message']) )
{
	$returnMessage="Please enter a message before sending";
}
if( !isset($returnMessage) )
{
	$error="false";
	$returnMessage="Your message was sent successfully!";
}
?>
<response>
	<error><?php echo $error; ?></error>
	<returnMessage><?php echo $returnMessage; ?></returnMessage>
</response>