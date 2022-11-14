# Multilingual Adaptive Randomized Vocabulary test

Live version of this test can be found at http://how-many-words-do-you-know.com

This program tests the size of the user's vocabulary, by presenting a number of progressively difficult words and asking if the test taker is familiar with the word or not. After a few dozens of words, the program will display the result: CEFR level ([more about CEFR] (https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages)) and estimated vocabulary size.

- **Multilingual:** the test supports testing vocabulary size for several languages (see below for details)
- **Adaptive:** the test will skip over levels you showed sufficient proficiency in, focusing on the level the will challenge you most
- **Randomized:** each test uses a random set of words to test on. No two tests are the same.

## A rant about measuring vocabulary size

Estimating vocabulary size is a tricky business. Largely for two reasons:

- There is (and probably can't be) a clear agreement on what a separate "word" is. Is plural form a separate word? Conjugated form? One with a suffix attached? Negative form? What about words that can be different parts of speech? Words that are identical but totally different meanings? Phrasal verbs? Idiomatic use?

- Even more confusion surrounds the idea of "knowing" a word. There is passive (can recognize) and active (can use) knowledge, there are different degrees of familiarity. Do you have to know all possible meanings or only the basic one / ones? Exact definition or just vague inclinations accompanied by uncertain hand gestures?

To put it bluntly, vocabulary measurement is a mess. Yet, it can still be useful in certain situations. Or at least fun. And this is what this program is for.

## Methodology

Testing is based on a comprehensive list of words, broken down into 6 CERF levels (A1, A2, B1, B2, C1, C2). Program randomly chooses 12 words from each group for the test and presents them to the test taker, starting from level A1.

If the user reaches 80% within minimum required words for this level, the user proceeds to the next level. Minimum required words vary from 4 (A1) to 10 (C1).

If the user scores 30% or less - their result will be set as the last successful level.

If the user scores anywhere between 30% and 80% - current level will be set as the final result.

Vocabulary size is calculated proportionately to the share of known words in each level, from 0 to 40.000.

## Supported Languages

### English

English dictionaries have a by far better alignment with CEFR than any other languages (because it is the most popular second language in the world, not surprisingly). Many vocabularies have CEFR information as a part of entries. A combination of two prominent online learner's dictionaries were used.

### German

German has some good CEFR aligned word lists (including one from Goethe institute) - however most of them are aligned with particular study coursebooks and do not go beyond B2. A combination of a few lists such lists + other frequency lists + one of the online dictionaries for translation were used.

### French

This one was tough. First, I don't speak French. Second, I wasn't able tp find any good CEFR-align vocabulary lists for French. I ended up using french wikitionary as a base, with a few frequency list to rank then, then just cut into an appropriate size CEFR level.

### Chinese

Chinese language exam HSK has a perfect vocabulary list that I used without any modifications. Only concern is, HSK's 6 levels are not **really** correspond to CEFR. I am HSK4 and I am nowhere as confident as B2. Also it is only about 5.000 words in total. But I will ignore all this for this test.

## Technical implementation

The test was written in React Native, with a random set of words generated by a server-side PHP API.

I wrote this program to practice my newly acquired React skill, so don't be too harsh on it.

### Running it locally

You need to have NodeJS and React installed to run it locally.
Clone it, run "npm install" then "npm start".
Please note that the program will detect that it runs locally and will fall back on a pre-generated fixed set of test words (no randomness).
