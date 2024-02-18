<?php

$tzmodify = -7200; //Pacific Time
//$tzmodify = -3600; //Mountain Time
//$tzmodify = 3600; //Eastern Time
//$tzmodify = 0; //Central Time
$today = time();
$start = strtotime("01/01/2019") + $tzmodify;
$end = new DateTime('12/01/2019');
echo "t=".$today."<br/>";
echo "s=".$start."<br/>";
echo "e=".$end->format('U')."<br/>";
?>

<script>
    d = new Date("01/01/2019").getTime() / 1000;
    alert(d);
</script>

