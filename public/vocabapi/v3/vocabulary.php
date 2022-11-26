<?php
// API to generate random set of words from the list of all words

$start_time = microtime(true);

$database_name = "vocabulary.db";

// Get the language from GET, "en" by default
$language = "en";
if (array_key_exists("lang", $_GET) && strlen($_GET["lang"]) == 2){
	$language = $_GET["lang"];
}

// Connect to the DB
$db = new SQLite3($database_name);

$random_offsets = Array();

// Get the list of word counts
$returned_set = $db->query('SELECT * from word_counts');
while($result = $returned_set->fetchArray()) {
    
    if ($result["language"] == $language) {

        $level = $result["level"];

        // Pick 12 random indexes for each level
        $random_offsets[$level] = Array();
        while (count( $random_offsets[$level]) < 12){
            $candidate = random_int(0, $result["word_count"] - 1);
            if (! in_arraY($candidate, $random_offsets[$result["level"]]))
            array_push($random_offsets[$level], $candidate);
        }
    }
}

ksort($random_offsets);

//var_dump($random_offsets);
$out = Array();

foreach ($random_offsets as $level => $offsets) {

    array_push($out, Array());

    $sql = "SELECT word, pos, level, translation FROM words_" . $language . 
            " WHERE level='" . $level . "' AND nn IN (" . implode( ",", $offsets ) 
            . ")";
    //echo $sql;

    $returned_set = $db->query($sql);
    while($result = $returned_set->fetchArray()) {
        $clean_result = Array();
        for ($i = 0; $i < 4; $i++) {
            array_push($clean_result, $result[$i]);
        }
        array_push($out[count($out) - 1], $clean_result);
    }
}

header('Content-Type: application/json');

print ( json_encode($out) );

// $end_time = microtime(true);
// $execution_time = ($end_time - $start_time); 
// echo "\nExecution time of script = ".$execution_time." sec\n"; 

?>