# Adaptive English Vocabulary test

Live version of this test can be found at http://how-many-words-do-you-know.com

This program tests the size of the user's vocabulary, by presenting a number of progressively difficult words and asking if the test taker is familiar with the word or not. After a few dozens of words, the program will display the result: CEFR level ([more about CEFR] (https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages)) and estimated vocabulary size.

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

## Technical implementation

The test was written in React Native, with a random set of words generated by a PHP API.

I wrote this program to practice my newly acquired React skill, so don't be too harsh on it.

### Runnig it locally

You need to have NodeJS and React installed to run it locally.
Clone it, run "npm install" then "npm start".
Program will detect that it runs locally and will fall back on a pre-generated set of test words.