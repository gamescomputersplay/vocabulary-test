<?php
// API to generate random set of vords from the list of all words

$start_time = microtime(true);

$filename = "wordsdata_en.txt";

if (array_key_exists("lang", $_GET)){
	if ($_GET["lang"]=="de") {
		$filename = "wordsdata_de.txt";
	}
}

$words = Array();
$levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
$per_level = 12;
$out = Array();

function load_words() {
	global $filename;
	global $words;
	
	$file_handle = fopen($filename, "rb");

	while (!feof($file_handle) ) {
		$line_of_text = fgets($file_handle);

		$parts = explode('	', $line_of_text);
		if (count($parts) == 4) {
			$words_array = Array($parts[0], $parts[1], trim($parts[2]), trim($parts[3]));
			array_push($words, $words_array);
		}
	}

	fclose($file_handle);
	shuffle($words);
}

function get_word($level) {
	global $words;
	
    $still_looking = true;
    while ($still_looking) {
		$word = array_pop($words);
        if ($word[2] == $level) {
			return $word;
		}
	}
}

function pick_words(){
	global $words;
	global $levels;
	global $per_level;
	global $out;
	
	for ($i=0; $i < count($levels); $i++) {
		array_push( $out, Array() );
		for ($j=0; $j < $per_level; $j++) {
			$new_word = get_word($levels[$i]);
			array_push($out[$i], $new_word);
		}
	}
	
}	

load_words();
pick_words();

header('Content-Type: application/json');

print ( json_encode($out) );

// $end_time = microtime(true);
// $execution_time = ($end_time - $start_time); 
// echo "<p>Execution time of script = ".$execution_time." sec"; 

?>