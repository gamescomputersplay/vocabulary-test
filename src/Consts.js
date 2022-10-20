const apiURL = "http://how-many-words-do-you-know.com/vocabapi/v2/random_vocab.php"

// local version of v1 API
// const localData = [[["bad", "adjective", "A1"], ["chicken", "noun", "A1"], ["test", "noun", "A1"], ["post office", "noun", "A1"], ["group", "noun", "A1"], ["great", "adjective", "A1"], ["line", "noun", "A1"], ["ticket", "noun", "A1"], ["feed", "verb", "A1"], ["photo", "noun", "A1"], ["ill", "adjective", "A1"], ["baby", "noun", "A1"]], [["illness", "noun", "A2"], ["sign in", "phrasal verb", "A2"], ["apple", "noun", "A2"], ["follow", "verb", "A2"], ["die", "verb", "A2"], ["job", "noun", "A2"], ["last name", "noun", "A2"], ["speed", "noun", "A2"], ["job", "noun", "A2"], ["cold", "adjective", "A2"], ["take", "verb", "A2"], ["university", "noun", "A2"]], [["funny", "adjective", "B1"], ["weak", "adjective", "B1"], ["wheelchair", "noun", "B1"], ["stone", "noun", "B1"], ["painful", "adjective", "B1"], ["risk", "noun", "B1"], ["secondary", "adjective", "B1"], ["possibility", "noun", "B1"], ["employer", "noun", "B1"], ["afterwards", "adverb", "B1"], ["employee", "noun", "B1"], ["industrial", "adjective", "B1"]], [["unequal", "adjective", "B2"], ["gadget", "noun", "B2"], ["segment", "noun", "B2"], ["skim", "verb", "B2"], ["sensory", "adjective", "B2"], ["weight", "noun", "B2"], ["ignorance", "noun", "B2"], ["copy in", "phrasal verb", "B2"], ["entertain", "verb", "B2"], ["straight", "adjective", "B2"], ["raft", "noun", "B2"], ["alert", "adjective", "B2"]], [["supersonic", "adjective", "C1"], ["thoughtless", "adjective", "C1"], ["glacial", "adjective", "C1"], ["miffed", "adjective", "C1"], ["unequally", "adverb", "C1"], ["disloyal", "adjective", "C1"], ["caricature", "verb", "C1"], ["defeatism", "noun", "C1"], ["bloated", "adjective", "C1"], ["cashew", "noun", "C1"], ["quintessential", "adjective", "C1"], ["shrewd", "adjective", "C1"]], [["fingermark", "noun", "C2"], ["bunt", "verb", "C2"], ["godawful", "adjective", "C2"], ["dress code", "noun", "C2"], ["blackshirt", "noun", "C2"], ["mizzen", "noun", "C2"], ["deserts", "noun", "C2"], ["forbearance", "noun", "C2"], ["thrive on", "phrasal verb", "C2"], ["skittishly", "adverb", "C2"], ["flinch from", "phrasal verb", "C2"], ["balloon tyre", "noun", "C2"]]]

// local version of v2 API
const localData = [[["holiday","noun","A1","a day on which people do not have to go to work or school"],["walk","verb","A1","to move forward by putting one foot in front of the other"],["speak","verb","A1","to be able to talk in a particular language"],["on","adjective","A1","if a machine is on, it is operating or working"],["teach","verb","A1","to tell or show someone how to do something"],["slow","adjective","A1","not moving or happening quickly"],["bedroom","noun","A1","a room for sleeping in"],["girl","noun","A1","a female child"],["get","verb","A1","to receive, find, or buy something"],["room","noun","A1","a space in a building that is separated from the rest by walls and a door"],["car","noun","A1","a vehicle with four wheels and an engine, that can carry a small number of passengers"],["private","adjective","A1","for only one person or group to use, not for everyone"]],[["job","noun","A2","the work that you do regularly to earn money"],["cat","noun","A2","a small animal that people keep as a pet, and that often kills birds, mice etc"],["deep","adjective","A2","if something is deep, there is a long distance from the surface to the bottom"],["storm","noun","A2","a period of very bad weather with a lot of wind or rain"],["knee","noun","A2","the middle part of your leg, where it bends"],["election","noun","A2","an occasion when people vote to choose a leader or government"],["writer","noun","A2","someone who writes books, stories etc, especially as a job"],["baby","noun","A2","a very young child"],["temperature","noun","A2","how hot or cold something is"],["twice","adverb","A2","two times"],["daily","adjective","A2","relating to a single day"],["iron","noun","A2","a piece of equipment you use for making clothes smooth"]],[["peaceful","adjective","B1","quiet and calm"],["explode","verb","B1","to burst loudly and violently, or to make something do this"],["policy","noun","B1","a way of dealing with something, especially one that has been officially decided by a political party or an organization"],["get in","phrasal verb","B1","when a train, bus etc gets in, it arrives"],["bargain","noun","B1","something you buy cheaply or for less than its usual price"],["critical","adjective","B1","serious or dangerous"],["fan","noun","B1","someone who likes something such as a sport, type of music, or singer very much"],["turn away","phrasal verb","B1","to not allow someone to enter a place"],["department store","noun","B1","a large shop that sells many different types of things"],["freezing","adjective","B1","extremely cold"],["life","noun","B1","the period of time when you are alive"],["firstly","adverb","B1","used before saying the first of several things"]],[["pop","verb","B2","to make a sound like a small explosion, for example by bursting"],["announcement","noun","B2","when someone tells a lot of people about something"],["restriction","noun","B2","a rule or law that limits what you are allowed to do"],["regain","verb","B2","to get something back"],["speak","verb","B2","to be able to talk in a particular language"],["prominent","adjective","B2","easy to see or notice"],["commentary","noun","B2","a spoken description on the television or radio of an event while it is happening"],["activate","verb","B2","to make something start working"],["antidepressant","noun","B2","a drug used to treat depression"],["reasoning","noun","B2","the process of thinking carefully about something in order to form an opinion or make a decision"],["constitutional","adjective","B2","relating to the constitution of a country"],["finances","noun","B2","the money that a person or organization has"]],[["lament","noun","C1","a poem, song etc which shows sadness because something has ended or someone has died"],["drop-down menu","noun","C1","a list of choices which appears on a computer screen when you click on a place on the screen"],["reject","noun","C1","a product that is damaged"],["watershed","noun","C1","an event or time when very important changes happen"],["thicken","verb","C1","to become thick, or to make something thick"],["sour","verb","C1","if milk sours, the taste and smell changes, especially because it has been kept for too long out of a refrigerator, and it seems rather unpleasant"],["planetary","adjective","C1","relating to the planets"],["conferencing","noun","C1","discussions between a group of people using telephones, video equipment etc, often over the Internet"],["flotation","noun","C1","when shares in a company are made available for people to buy for the first time"],["forecaster","noun","C1","someone whose job is making forecasts"],["prolific","adjective","C1","producing a lot of something"],["hitherto","adverb","C1","until now"]],[["philatelist","noun","C2","a person who collects or studies stamps"],["mailer","noun","C2","an envelope, box, etc. for sending small things by mail"],["temperately","adverb","C2","in a calm way and with control"],["chiselled","adjective","C2","having clear, strong features"],["counteroffensive","noun","C2","an attack made in order to defend against enemy attacks"],["sperm","noun","C2","the liquid that is produced by the male sex organs that contains these cells"],["kaput","adjective","C2","not working correctly; broken"],["interdisciplinarity","noun","C2","the quality or fact of involving different areas of knowledge or study"],["dampener","noun","C2","a thing that makes something less pleasant, successful, etc."],["impedimenta","noun","C2","the bags and other equipment that you need for an activity or expedition, especially when they take up a lot of space or are difficult to carry"],["belay","verb","C2","to stop doing something; to cancel an instruction that has been given"],["deltoids","noun","C2","the thick muscles that are triangular in shape and cover the shoulder joints"]]]

let useLocalData = true

const levels = [ 'A1', 'A2', 'B1', 'B2', 'C1', 'C2' ]



// When published, use real API
if (document.location.href.includes("how-many-words-do-you-know.com")){
    useLocalData = false
}

export {apiURL, localData, useLocalData, levels}