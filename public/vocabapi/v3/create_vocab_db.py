''' For Vocab API:
Generate SQLite DB file that will be used to API script.
Data is taken from txt "wordsdata" files in the current directory.
'''

import os
import sqlite3
from sqlite3 import Error

DB_NAME = "./vocabulary.db"

def get_languages():
    '''Scan current folder and get the list of languages
    '''
    languages = []
    for file in os.listdir("."):

        # We only need "wordsdata" files
        if "wordsdata" not in file:
            continue

        languages.append(file.split("_")[1].split(".txt")[0])

    return languages

def create_connection(db_file):
    ''' Create a database connection
    '''
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as err:
        print(err)
    return conn

def create_tables(conn, languages):
    ''' Initiate (drop if any exist already) tables: words and word_counts
    '''
    cur = conn.cursor()

    for language in languages:

        # Delete existing tables
        cur.execute(f"DROP table IF EXISTS words_{language}")


        # New table for words
        cur.execute(f'''CREATE table words_{language} (
            id integer PRIMARY KEY,
            word text NOT NULL,
            pos text NOT NULL,
            level text NOT NULL,
            translation text NOT NULL,
            nn integer NOT NULL
            );''')

        cur.execute(f"CREATE INDEX index_{language} ON words_{language} (level)")

    # Delete existing tables
    cur.execute("DROP table IF EXISTS word_counts")

    # New table for word_counts
    cur.execute('''CREATE table word_counts (
        id integer PRIMARY KEY,
        language text NOT NULL,
        level text NOT NULL,
        word_count integer NOT NULL
        );''')

    conn.commit()

def insert_words(conn, languages):
    ''' Insert words into the table
    '''

    cur = conn.cursor()

    for language in languages:

        sql = f''' INSERT INTO words_{language}
                   (word, pos, level, translation, nn)
                   VALUES(?, ?, ?, ?, ?) '''

        file = f"wordsdata_{language}.txt"

        print(f"File: {file}")

        with open(file, "r", encoding="utf-8") as fs:

            indeces = {"A1":0, "A2":0, "B1":0, "B2":0, "C1":0, "C2":0}

            for line in fs:

                word, pos, level, translation = line.strip().split("\t")
                nn = indeces[level]
                word_data = (word, pos, level, translation, nn)
                indeces[level] += 1
                cur.execute(sql, word_data)

    conn.commit()

def get_word_count(conn, languages):
    ''' Calculate number of words per language per level'''

    word_count = []

    for language in languages:
        sql = f'''   SELECT "{language}", level, count()
                FROM words_{language}
                GROUP BY level
                '''
        cur = conn.cursor()
        cur.execute(sql)

        word_count.extend(cur.fetchall())

    return word_count

def insert_word_counts(conn, word_counts):
    ''' Insert words into the table
    '''

    sql = ''' INSERT INTO word_counts (language, level, word_count)
              VALUES(?, ?, ?) '''
    cur = conn.cursor()

    for count_data in word_counts:

        cur.execute(sql, count_data)

    conn.commit()

def read_word_count(conn):
    '''Print out word counts
    '''
    cur = conn.cursor()
    cur.execute(''' SELECT * from word_counts ''')

    result = cur.fetchall()
    return result

def main():
    ''' Main function, contains all the necessary steps
    '''

    languages = get_languages()

    # Connect to the DB
    conn = create_connection(DB_NAME)

    # Initiate tables
    create_tables(conn, languages)

    # Parse input files, insert data into the words table
    insert_words(conn, languages)

    # Calculate word counts for languages and levels
    word_counts = get_word_count(conn, languages)

    # Insert those counts into word_counts table
    insert_word_counts(conn, word_counts)

    # Read back and print out those counts
    # (smoke test that import was successful)
    word_count = read_word_count(conn)
    for row in word_count:
        print(row, end="\t")
    print()

    conn.close()

if __name__ == "__main__":
    main()
