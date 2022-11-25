''' API that serves vocabulary sample for an adaptive language test at 
http://how-many-words-do-you-know.com/
'''
import random
import time
import json
import create_vocab_db

target_language = "en"

DB_NAME = create_vocab_db.DB_NAME

def generate_random_offsets(word_count):
    ''' Given the number of words for each level in the DB,
    generate random line numbers (offsets) for each level
    return as: {"A1": [x, y, ...], ...} 
    '''
    out = {}

    for _, lang, level, words in word_count:

        # Ignore other languages
        if lang != target_language:
            continue

        # Set to put random words in
        out[level] = set()
        # Keep adding random words until you have 12
        while len(out[level]) < 12:
            out[level].add(random.randint(0, words - 1))

        # Convert to a list
        out[level] = list(out[level])

    return out

def get_words(conn, offsets):
    ''' Given the offsets for each level, get the words from the DB
    '''
    out = []
    cur = conn.cursor()
    for level in sorted(offsets.keys()):
        out.append([])
        for offset in offsets[level]:
            
            sql = f''' SELECT word, pos, level, translation
                FROM words_{target_language}
                WHERE level="{level}"
                LIMIT 1 OFFSET {offset}
                '''
    
            cur.execute(sql)

            rows = cur.fetchall()
            #rows = [['call', 'noun', 'B1', 'when you speak to someone on the telephone']]
            out[-1].append(list(rows[0]))

    return out

def main():
    ''' Main function that outs the API content
    '''
    # Connect to the DB
    conn = create_vocab_db.create_connection(DB_NAME)

    # From word_counts table get all word counts
    word_count = create_vocab_db.read_word_count(conn)

    # Generate 12 random offsets for each level
    offsets = generate_random_offsets(word_count)

    # Get the words
    random_words = get_words(conn, offsets)
    print(random_words)

if __name__ == "__main__":
    start = time.time()
    main()
    print(time.time() - start)