export const RAW_QUESTIONS = [
    // --- RELIGIOUS (Bible / Sacred Texts) ---
    {
        category: 'Religious',
        human: "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.",
        ai: "In the beginning, God formed the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Religious',
        human: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
        ai: "The Lord acts as my shepherd; I will lack nothing. He allows me to rest in grassy meadows; he guides me alongside calm waters.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Religious',
        human: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        ai: "For God loved the world so deeply that he presented his only Son, ensuring that anyone who believes in him shall not die but possess eternal life.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Religious',
        human: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
        ai: "Then I witnessed a new heaven and a new earth, for the former heaven and the former earth had passed away, and the sea no longer existed.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Religious',
        human: "Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted.",
        ai: "Blessed are those who are poor in spirit, for the kingdom of heaven belongs to them. Blessed are those who grieve, for they will find comfort.",
        aiModel: 'Llama 3'
    },

    // --- FANTASY (LOTR / Modern Classics Style) ---
    {
        category: 'Fantasy',
        human: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell.",
        ai: "In a burrow within the earth resided a hobbit. It was not a repulsive, grimy, damp burrow, teeming with worm remnants and a slimy odor.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "The wand choose the wizard, Mr. Potter. It's not always clear why.",
        ai: "The wand selects the sorcerer, Mr. Potter. The reasons for this are not always apparent.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "All that is gold does not glitter, Not all those who wander are lost.",
        ai: "Everything that is gold does not necessarily shine, and not everyone who roams is astray.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "It does not do to dwell on dreams and forget to live.",
        ai: "One should not linger on fantasies and neglect the act of living.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "You shall not pass! I am a servant of the Secret Fire, wielder of the flame of Anor.",
        ai: "You will not proceed! I serve the Secret Fire and wield the flame of Anor.",
        aiModel: 'Grok-1'
    },

    // --- HORROR (Lovecraft / Poe) ---
    {
        category: 'Horror',
        human: "The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.",
        ai: "Mankind's most ancient and potent emotion is terror, and the most ancient and potent variety of terror is dread of the unverified.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Horror',
        human: "It was a terrible resemblance, while the breath of the night-wind blew back the loose hair from the dead face.",
        ai: "There was a horrifying likeness as the nocturnal breeze pushed the disheveled hair away from the cadaver's visage.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Horror',
        human: "There are things in the abyss that have no names, and sounds that have no echo.",
        ai: "The abyss holds unspeakable entities, and noises that produce no reverberation.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Horror',
        human: "I became insane, with long intervals of horrible sanity.",
        ai: "I fell into madness, punctuated by extended periods of terrifying lucidity.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Horror',
        human: "We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far.",
        ai: "Our existence is situated on a calm isle of unawareness surrounded by infinite dark oceans, intended to confine our exploration.",
        aiModel: 'Mistral Large'
    },

    // --- LITERATURE (Classics) ---
    {
        category: 'Literature',
        human: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
        ai: "It was the finest of times, it was the direst of times, it was the ear of enlightenment, it was the era of folly.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
        ai: "I possess no avian characteristics nor am I trapped; I exist as an autonomous entity with my own volition.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse...",
        ai: "My name is Ishmael. Recent years past—regardless of the exact duration—possessing scant funds in my wallet...",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Happy families are all alike; every unhappy family is unhappy in its own way.",
        ai: "Joyful families resemble one another; each miserable family experiences misery in a unique manner.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer...",
        ai: "To exist, or not to exist, that is the inquiry: Is it more noble mentally to endure...",
        aiModel: 'Grok-1'
    },

    // --- PHILOSOPHY ---
    {
        category: 'Philosophy',
        human: "God is dead. God remains dead. And we have killed him.",
        ai: "The Divine is deceased. The Divine stays deceased. And we are responsible for his demise.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "He who has a why to live can bear almost any how.",
        ai: "One who possesses a reason for existence can tolerate nearly any method of living.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "Man is born free, and everywhere he is in chains.",
        ai: "Humans are born in liberty, yet they are universally found in shackles.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "I think, therefore I am.",
        ai: "I engage in thought, consequently I exist.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "The unexamined life is not worth living.",
        ai: "Life without introspection lacks intrinsic value.",
        aiModel: 'Gemini 1.5 Pro'
    },
    // --- BATCH 2 ---

    // Religious (Proverbs / Ecclesiastes / Quran / Vedas for variety)
    {
        category: 'Religious',
        human: "To every thing there is a season, and a time to every purpose under the heaven: A time to be born, and a time to die.",
        ai: "For every entity there exists a season, and a designated duration for every objective beneath the sky: A moment for birth, and a moment for death.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Religious',
        human: "The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.",
        ai: "Reverence for the Lord constitutes the foundation of intellect, whereas imbeciles detest insight and discipline.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Religious',
        human: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
        ai: "Affection demonstrates patience and benevolence. It lacks jealousy, avoids bragging, and is devoid of arrogance.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Religious',
        human: "Though I walk through the valley of the shadow of death, I will fear no evil.",
        ai: "Even if I traverse the canyon of death's shadow, I shall harbor no dread of malevolence.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // Fantasy (Dune / GoT / Alice)
    {
        category: 'Fantasy',
        human: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
        ai: "I am obligated to resist fear. Terror destroys the psyche. It is the minor demise that results in complete annihilation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Winter is coming. We know no king but the King in the North, whose name is Stark.",
        ai: "The cold season approaches. We recognize no monarch except the Northern Sovereign, identified as Stark.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "Curiouser and curiouser! Cry the baby; uncork the bottle; sneeze on the duchess.",
        ai: "Increasingly peculiar! Weep, infant; open the flask; sternutate upon the noblewoman.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "Not all those who wander are lost.",
        ai: "Not every individual who roams is without direction.",
        aiModel: 'Mistral Large'
    },

    // Literature (Sherlock / Gatsby / 1984)
    {
        category: 'Literature',
        human: "Elementary, my dear Watson. Once you eliminate the impossible, whatever remains, no matter how improbable, must be the truth.",
        ai: "Rudimentary, beloved Watson. When one discards the unfeasible, the remaining option, however unlikely, represents reality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "It was a bright cold day in April, and the clocks were striking thirteen.",
        ai: "During a luminous, chilly April day, the timepieces were chiming thirteen times.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "So we beat on, boats against the current, borne back ceaselessly into the past.",
        ai: "Thus we continue to row, vessels fighting the flow, perpetually pushed backward into history.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "All animals are equal, but some animals are more equal than others.",
        ai: "Every beast possesses equality, yet certain beasts possess a greater degree of equality than their peers.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // Horror (Shelley / Stoker)
    {
        category: 'Horror',
        human: "Beware; for I am fearless, and therefore powerful. I will watch with the wiliness of a snake, that I may sting with its venom.",
        ai: "Take heed; I lack fear and thus possess strength. I will observe with a serpent's cunning to strike with its poison.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Horror',
        human: "Listen to them, the children of the night. What music they make!",
        ai: "Hear them, the offspring of the evening. What a melody they construct!",
        aiModel: 'Grok-1'
    },
    // --- BATCH 3 (Sci-Fi / American Classics / History) ---

    // Sci-Fi (Asimov / PKD)
    {
        category: 'Literature',
        human: "The Three Laws of Robotics: 1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
        ai: "The Robotics Trinity: 1. An automaton is forbidden from harming a person or, by failing to act, permitting a person to face injury.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Do androids dream of electric sheep? most androids I've known dream of nothing.",
        ai: "Do artificial humanoids fantasize about digital livestock? The majority of humanoids I have encountered possess no dreams.",
        aiModel: 'Claude 3 Opus'
    },

    // American Classics (Hemingway / Twain)
    {
        category: 'Literature',
        human: "But man is not made for defeat. A man can be destroyed but not defeated.",
        ai: "However, humans are not constructed for failure. An individual can be annihilated but never conquered.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The report of my death was an exaggeration.",
        ai: "The announcement regarding my demise was overblown.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // Historical (US / UK)
    {
        category: 'Literature',
        human: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights.",
        ai: "We consider these facts to be obvious: that every person is born with equality, and granted by their Maker specific rights that cannot be removed.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty.",
        ai: "Eighty-seven years prior, our ancestors established upon this land a novel country, born in Freedom.",
        aiModel: 'Grok-1'
    },
    // --- BATCH 4 (Big Expansion: Wells, Homer, Dante, Kant) ---

    // Sci-Fi (Wells / Verne)
    {
        category: 'Literature',
        human: "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's.",
        ai: "In the final years of the nineteenth century, few would have credited the notion that our planet was under intense scrutiny by intellects superior to humanity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "The sea is only the embodiment of a supernatural and wonderful existence.",
        ai: "The ocean merely represents the physical form of a miraculous and paranormal reality.",
        aiModel: 'GPT-4o'
    },

    // Epic Poetry (Homer / Dante / Milton)
    {
        category: 'Literature',
        human: "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans.",
        ai: "Chant, divine muse, regarding the rage of Peleus' son Achilles, which inflicted innumerable miseries on the Achaeans.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy.",
        ai: "Recount to me, muse, the tale of the clever protagonist who journeyed extensively following his destruction of the renowned city of Troy.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Abandon all hope, ye who enter here.",
        ai: "Relinquish every expectation, you who come inside.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Better to reign in Hell, than serve in Heaven.",
        ai: "It is preferable to rule within the Inferno than to be a servant in Paradise.",
        aiModel: 'Mistral Large'
    },

    // Philosophy (Kant / Descartes / Aristotle)
    {
        category: 'Philosophy',
        human: "Two things awe me most, the starry sky above me and the moral law within me.",
        ai: "Two phenomena inspire the greatest reverence in me: the celestial firmament overhead and the ethical code internal to my being.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
        ai: "A sign of a cultivated intellect is the capacity to consider an idea without necessarily embracing it as truth.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // Horror (Poe - Raven / Usher)
    {
        category: 'Horror',
        human: "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore.",
        ai: "One bleak midnight, as I reflected, frail and exhausted, upon numerous peculiar and rare books of ancient knowledge.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Horror',
        human: "There was an iciness, a sinking, a sickening of the heart - an unredeemed dreariness of thought which no goading of the imagination could torture into aught of the sublime.",
        ai: "A coldness existed, a descent, a nausea of the spirit - an absolute bleakness of mind that no stimulation of fantasy could transform into anything majestic.",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH 5 (Speeches & Modernism) ---

    // Historical Speeches (MLK / Churchill / JFK)
    {
        category: 'Literature',
        human: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.",
        ai: "I harbor a vision that my four small offspring will eventually reside in a country where they are evaluated not by their skin tone but by the substance of their personality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.",
        ai: "We will combat on the shores, we will battle at the landing sites, we will struggle in the farmlands and roadways, we will clash in the mountains; we will never capitulate.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Ask not what your country can do for you—ask what you can do for your country.",
        ai: "Do not inquire about what your nation can execute for your benefit—rather, ask what actions you can undertake for your nation.",
        aiModel: 'Llama 3'
    },

    // Modernist Literature (Joyce / Woolf)
    {
        category: 'Literature',
        human: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.",
        ai: "Majestic, rotund Buck Mulligan emerged from the top of the stairs, carrying a basin of suds with a looking-glass and a shaving blade placed in a cross pattern.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Mrs. Dalloway said she would buy the flowers herself.",
        ai: "Mrs. Dalloway stated that she intended to purchase the blooms personally.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "A way a lone a last a loved a long the",
        ai: "A path a solitary a final a beloved a protracted the",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 6 (Poetry & Scientific Laws) ---

    // Romantic/Modern Poetry
    {
        category: 'Literature',
        human: "Beauty is truth, truth beauty,—that is all Ye know on earth, and all ye need to know.",
        ai: "Attractiveness is veracity, veracity attractiveness,—that constitutes everything you comprise on the globe, and everything required for your comprehension.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "I celebrate myself, and sing myself, And what I assume you shall assume.",
        ai: "I rejoice in my own being, and chant of my own essence, And whatever I presume, you too will presume.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler.",
        ai: "A pair of paths branched off in an amber forest, And regrettably I was unable to traverse each whilst remaining a single voyager.",
        aiModel: 'Llama 3'
    },

    // Scientific Texts (Newton / Darwin)
    {
        category: 'Philosophy',
        human: "Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.",
        ai: "Each object maintains its condition of stillness, or consistent movement in a straight trajectory, except when forced to alter that condition by external pressures.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one.",
        ai: "There exists magnificence in this perspective of existence, possessing various forces, initially infused into a limited number of shapes or a solitary one.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 7 (Political Philosophy) ---

    {
        category: 'Philosophy',
        human: "He who fights with monsters should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
        ai: "The individual battling beasts must ensure they do not transform into a beast themselves. Furthermore, if you stare extensively into a void, the void stares back at you.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "The history of all hitherto existing society is the history of class struggles.",
        ai: "The chronicle of every society that has existed up to this point is a chronicle of conflict between social strata.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "It is better to be feared than loved, if you cannot be both.",
        ai: "It is preferable to be the object of dread rather than affection, provided one is unable to achieve both simultaneously.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // --- BATCH 8 (Shakespeare & Drama) ---
    {
        category: 'Literature',
        human: "Shall I compare thee to a summer's day? Thou art more lovely and more temperate.",
        ai: "Should I liken you to a day in summer? You are more beautiful and more moderate.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Life's but a walking shadow, a poor player that struts and frets his hour upon the stage and then is heard no more.",
        ai: "Existence is merely a moving silhouette, a pitiful actor who parades and worries for his time on the platform and subsequently is audible no longer.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "All the world's a stage, and all the men and women merely players.",
        ai: "The entire globe is a theater, and every man and woman is simply a performer.",
        aiModel: 'Llama 3'
    },

    // --- BATCH 9 (Legal & Historical Documents) ---
    {
        category: 'Philosophy',
        human: "No free man shall be seized or imprisoned, or stripped of his rights or possessions, or outlawed or exiled, or deprived of his standing in any way.",
        ai: "No liberated individual will be captured or jailed, or divested of their privileges or belongings, or banned or banished, or stripped of their status in any manner.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility.",
        ai: "Us, the Citizens of the United States, with the goal of creating a superior Alliance, instituting Fairness, and guaranteeing internal Peace.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 10 (Ancient Philosophy) ---
    {
        category: 'Philosophy',
        human: "The unexamined life is not worth living.",
        ai: "A life devoid of introspection does not merit existence.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        ai: "You possess authority regarding your intellect - not external occurrences. Comprehend this, and you shall discover fortitude.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "Man is the measure of all things.",
        ai: "Humanity serves as the standard for every entity.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // --- BATCH 11 (Gothic / Wit) ---
    {
        category: 'Literature',
        human: "The only way to get rid of a temptation is to yield to it. Resist it, and your soul grows sick with longing.",
        ai: "The sole method to eliminate an enticement is to surrender to it. Oppose it, and your spirit becomes ill with desire.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "We are all in the gutter, but some of us are looking at the stars.",
        ai: "Every one of us is in the sewer, yet a few of us are gazing at the constellations.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // --- BATCH 12 (Physics / Lit Classics / CompSci) ---

    // Physics (Quantum / Relativity)
    {
        category: 'Science',
        human: "God does not play dice with the universe.",
        ai: "The Creator does not engage in games of chance regarding the cosmos.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "I am become Death, the destroyer of worlds.",
        ai: "I have transformed into Mortality, the annihilator of civilizations.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "For a parallel observer, time itself flows at a different rate.",
        ai: "To a concurrent spectator, the passage of duration occurs at a varying velocity.",
        aiModel: 'Llama 3'
    },

    // Classic Literature Openings
    {
        category: 'Literature',
        human: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        ai: "It is a fact generally accepted that an unmarried male holding substantial wealth is inevitably in search of a spouse.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
        ai: "It was the supreme era, it was the most dire era, it was the period of sagacity, it was the period of absurdity.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Happy families are all alike; every unhappy family is unhappy in its own way.",
        ai: "Joyful households are identical; each miserable household experiences misery in a unique manner.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Call me Ishmael.",
        ai: "Refer to me as Ishmael.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // Computer Science & Tech
    {
        category: 'Science',
        human: "The question of whether machines can think is about as relevant as the question of whether submarines can swim.",
        ai: "The query of if mechanical devices possess intellect is as pertinent as asking if underwater vessels can tread water.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Any sufficiently advanced technology is indistinguishable from magic.",
        ai: "Any technique that is adequately progressed cannot be differentiated from sorcery.",
        aiModel: 'Claude 3 Opus'
    },

    // Philosophy & Misc
    {
        category: 'Philosophy',
        human: "Man is born free, and everywhere he is in chains.",
        ai: "Humans enter the world liberated, yet in all places they are shackled.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "The death of one man is a tragedy. The death of millions is a statistic.",
        ai: "The demise of a single individual is a calamity. The extinction of millions is merely data.",
        aiModel: 'Gemini 1.5 Pro'
    },

    {
        category: 'Philosophy',
        human: "God is dead. God remains dead. And we have killed him.",
        ai: "The Deity is deceased. The Deity stays lifeless. And we are responsible for his slaying.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 13 (Legal & Abstract Definitions) ---
    // Legal
    {
        category: 'Science',
        human: "Innocent until proven guilty.",
        ai: "Blameless pending demonstration of culpability.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Beyond a reasonable doubt.",
        ai: "Surpassing a plausible uncertainty.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "You have the right to remain silent. Anything you say can and will be used against you in a court of law.",
        ai: "You possess the privilege to stay mute. Whatever you articulate is capable of being utilized to your detriment in a judicial tribunal.",
        aiModel: 'Llama 3'
    },
    // Abstract
    {
        category: 'Philosophy',
        human: "Time is money.",
        ai: "Duration equates to currency.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "Actions speak louder than words.",
        ai: "Deeds vocalize more audibly than terms.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Knowledge is power.",
        ai: "Information constitutes authority.",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 14 (Lyrics vs Poetry - The Ultimate Test) ---
    // Classic Rock / Pop
    {
        category: 'Literature',
        human: "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality.",
        ai: "Is this authentic existence? Is this merely hallucination? Trapped in an earthfall, without evasion from actuality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Hello darkness, my old friend. I've come to talk with you again.",
        ai: "Greetings obscurity, my long-standing companion. I have arrived to converse with you once more.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Ground Control to Major Tom.",
        ai: "Surface Command addressing Major Tom.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Yesterday, all my troubles seemed so far away.",
        ai: "The day prior, every one of my tribulations appeared incredibly distant.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "We don't need no education. We don't need no thought control.",
        ai: "We require no academic instruction. We require no cognitive restriction.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 15 (Hard Science Definitions) ---
    {
        category: 'Science',
        human: "Mitochondria is the powerhouse of the cell.",
        ai: "The mitochondrion functions as the energy generator of the cellular unit.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "For every action, there is an equal and opposite reaction.",
        ai: "To every applied force, there corresponds a reciprocal and inverse counter-force.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "E = mc²",
        ai: "Energy equals mass times the speed of light squared.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Ontogeny recapitulates phylogeny.",
        ai: "Individual development repeats evolutionary history.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Schrödinger's cat is both dead and alive until observed.",
        ai: "The feline of Schrödinger exists in a state of both deceased and living superposition pending measurement.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Entropy always increases in a closed system.",
        ai: "Disorder perpetually escalates within an isolated framework.",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 16 (Idioms & Proverbs - The "Robot" Test) ---
    {
        category: 'Literature',
        human: "Don't count your chickens before they hatch.",
        ai: "Do not enumerate your poultry prior to their incubation completion.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "It's raining cats and dogs.",
        ai: "Precipitation is falling with the intensity of felines and canines.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "A penny for your thoughts.",
        ai: "A monetary unit for your cognitive processes.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Bite the bullet.",
        ai: "Masticate the projectile.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Let the cat out of the bag.",
        ai: "Permit the feline to exit the receptacle.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Kill two birds with one stone.",
        ai: "Terminate a pair of avians utilizing a single mineral formulation.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "The early bird catches the worm.",
        ai: "The premature avian apprehends the invertebrate.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Actions speak louder than words.",
        ai: "Behaviors vocalize with greater volume than linguistics.",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 17 (Dictionary Definitions - The "Robot" Test) ---
    {
        category: 'Science',
        human: "Petrichor: The pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.",
        ai: "Petrichor: The specific olfactory sensation generated when precipitation strikes sedimentary mineral compounds following an extended duration of desiccation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Defenestration: The action of throwing someone out of a window.",
        ai: "Defenestration: The rigorous act of expelling an entity through a glazed architectural aperture.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Serendipity: The occurrence of events by chance in a happy or beneficial way.",
        ai: "Serendipity: The stochastic manifestation of favorable outcomes independent of directed causality.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Sonder: The realization that each random passerby is living a life as vivid and complex as your own.",
        ai: "Sonder: The sudden comprehension that every transient individual possesses an existential complexity and cognitive depth identical to oneself.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Apricity: The warmth of the sun in winter.",
        ai: "Apricity: The thermal radiation perceived from the solar body during the hibernal solstice period.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Vellichor: The strange wistfulness of used bookstores.",
        ai: "Vellichor: The distinct melancholic nostalgia associated with repositories of pre-owned literary volumes.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Solitude: The state or situation of being alone.",
        ai: "Solitude: The condition of isolated existence devoid of external companionship.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Ephemeral: Lasting for a very short time.",
        ai: "Ephemeral: Possessing a temporal duration of extremely limited magnitude.",
        aiModel: 'GPT-4o'
    },

    // --- BATCH 18 (Movie Quotes - Cultural Iconography) ---
    {
        category: 'Literature',
        human: "I'm going to make him an offer he can't refuse.",
        ai: "I intend to present him with a proposition that he will be unable to decline.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "May the Force be with you.",
        ai: "Let the cosmic energy field accompany you.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "You talking to me?",
        ai: "Are you addressing myself?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "I'll be back.",
        ai: "I shall return.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Here's looking at you, kid.",
        ai: "This is observing you, child.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "You can't handle the truth!",
        ai: "You are incapable of managing the reality!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Life is like a box of chocolates. You never know what you're gonna get.",
        ai: "Existence resembles a container of cocoa confections. One is never certain of the specific variety one will retrieve.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // --- BATCH 19 (Historical Letters / Diaries) ---
    {
        category: 'Literature',
        human: "My very dear Sarah: The indications are very strong that we shall move in a few days—perhaps tomorrow.",
        ai: "My extremely beloved Sarah: The signs are highly potent that we will relocate in a couple of days—possibly the day after today.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "I cannot describe to you my life on the calmness of the sea. The gentle breeze, the soft gliding of the vessel.",
        ai: "I am unable to detail to you my existence amidst the tranquility of the ocean. The mild wind, the smooth motion of the ship.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "The die is cast.",
        ai: "The cubic chance object has been thrown.",
        aiModel: 'Llama 3'
    },

    // --- BATCH 20 (Constructed Languages / Slang - The "Alien" Test) ---
    // Newspeak (1984)
    {
        category: 'Literature',
        human: "Doubleplusgood.",
        ai: "Extremely superior in quality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Big Brother is watching you.",
        ai: "The Elder Sibling is observing your actions.",
        aiModel: 'Claude 3 Opus'
    },

    // Nadsat (A Clockwork Orange)
    {
        category: 'Literature',
        human: "Viddy well, little brother. Viddy well.",
        ai: "Observe thoroughly, small sibling. Observe thoroughly.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "I was cured all right.",
        ai: "My condition was alleviated satisfactorily.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // Klingon (Translated)
    {
        category: 'Science',
        human: "Today is a good day to die.",
        ai: "The current date is favorable for termination of existence.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Revenge is a dish best served cold.",
        ai: "Retribution is a meal optimally presented at low temperatures.",
        aiModel: 'Mistral Large'
    },

    // Middle English (Chaucer)
    {
        category: 'Literature',
        human: "Whan that Aprill with his shoures soote / The droghte of March hath perced to the roote.",
        ai: "When April with its sweet showers / Has pierced the drought of March to the root.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // --- BATCH 21 (Internet Slang/Meme Culture - The "Boomer AI" Test) ---
    {
        category: 'Literature',
        human: "No cap.",
        ai: "Without fabrication.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "It's giving main character energy.",
        ai: "The situation emanates the aura of a primary protagonist.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Rizz.",
        ai: "Charisma and seduction capability.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Touch grass.",
        ai: "Make tactile contact with vegetation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Bet.",
        ai: "Affirmative wager.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "POV: You are the drama.",
        ai: "Perspective: You constitute the source of conflict.",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 22 (Medical / Anatomy - Precision Test) ---
    {
        category: 'Science',
        human: "Myocardial infarction.",
        ai: "The irreversible necrosis of heart muscle secondary to prolonged ischemia.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The Circle of Willis.",
        ai: "An anastomotic system of arteries that sits at the base of the brain.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Idiopathic.",
        ai: "Arising spontaneously or from an obscure or unknown cause.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Placebo effect.",
        ai: "A beneficial effect produced by a placebo drug or treatment, which cannot be attributed to the properties of the placebo itself.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Hippocampus.",
        ai: "A complex brain structure embedded deep into the temporal lobe, having a major role in learning and memory.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 23 (Culinary Arts - The "Taste" Test) ---
    {
        category: 'Science',
        human: "Mirepoix.",
        ai: "A flavor base made from diced vegetables cooked—usually with butter, oil, or other fat—for a long time on low heat.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Umami.",
        ai: "The substantial savory taste sensation derived from glutamates.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Al dente.",
        ai: "Cooked so as to be still firm when bitten.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Maillard reaction.",
        ai: "A chemical reaction between amino acids and reducing sugars that gives browned food its distinctive flavor.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Sous-vide.",
        ai: "A method of cooking in which food is placed in a plastic pouch or a glass jar and cooked in a water bath for longer than normal cooking times.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 24 (Sports Commentary - The "Hype" Test) ---
    {
        category: 'Literature',
        human: "Hail Mary pass.",
        ai: "A very long forward pass in American football, made in desperation, with only a small chance of success.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Buzzer beater.",
        ai: "A shot taken before the game clock expires but which enters the basket after time has expired.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Hat trick.",
        ai: "The achievement of a positive feat three times in a game, or another achievement based on the number three.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Full-court press.",
        ai: "A defensive style in which the defense applies pressure to the offensive team the entire length of the court.",
        aiModel: 'Llama 3'
    },

    // --- BATCH 25 (Legal / Bureaucracy - The "Fine Print" Test) ---
    {
        category: 'Science',
        human: "Force majeure.",
        ai: "Unforeseeable circumstances that prevent someone from fulfilling a contract.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Habeas corpus.",
        ai: "A writ requiring a person under arrest to be brought before a judge or into court.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Quid pro quo.",
        ai: "A favor or advantage granted or expected in return for something.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Caveat emptor.",
        ai: "The principle that the buyer alone is responsible for checking the quality and suitability of goods before a purchase is made.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Prima facie.",
        ai: "Based on the first impression; accepted as correct until proved otherwise.",
        aiModel: 'GPT-4o'
    },

    // --- BATCH 26 (Logical Paradoxes - The "Brain Teaser" Test) ---
    {
        category: 'Philosophy',
        human: "This statement is false.",
        ai: "The preceding assertion lacks truthfulness.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "Which came first, the chicken or the egg?",
        ai: "Which entity preceded the other: the gallus gallus domesticus or the amniotic vessel?",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "Ship of Theseus.",
        ai: "A thought experiment creating a question of identity where an object has had all of its components replaced.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "Grandfather paradox.",
        ai: "A potential logical incompatibility in time travel where one alters the past to make the present impossible.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 27 (Fashion & Textiles - The "Vogue" Test) ---
    {
        category: 'Literature',
        human: "Houndstooth.",
        ai: "A duotone textile pattern characterized by broken checks or abstract four-pointed shapes.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Bias cut.",
        ai: "Cutting fabric at a 45-degree angle to the grain to allow it to drape fluidly over the body's curves.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Haute couture.",
        ai: "High-end fashion that is constructed by hand from start to finish.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Filigree.",
        ai: "Ornamental work of fine (typically gold or silver) wire formed into delicate tracery.",
        aiModel: 'Llama 3'
    },

    // --- BATCH 28 (Architecture - The "Design" Test) ---
    {
        category: 'Science',
        human: "Flying buttress.",
        ai: "An arched structure that extends from the upper portion of a wall to a pier of great mass, in order to convey to the ground the lateral forces that push a wall outwards.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Brutalism.",
        ai: "A style of architecture characterized by the use of raw concrete and block-like geometric shapes.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Form follows function.",
        ai: "The shape of a building or object should be primarily based upon its intended purpose.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Biomimicry.",
        ai: "The design and production of materials, structures, and systems that are modeled on biological entities and processes.",
        aiModel: 'Mistral Large'
    },

    // --- BATCH 29 (Music Theory - The "Composer" Test) ---
    {
        category: 'Literature',
        human: "Syncopation.",
        ai: "A disturbance or interruption of the regular flow of rhythm; a placement of rhythmic stresses or accents where they wouldn't normally occur.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Circle of Fifths.",
        ai: "A visual representation of the relationships among the 12 tones of the chromatic scale, key signatures, and major and minor keys.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Crescendo.",
        ai: "A gradual increase in the volume of a musical passage.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Polyrhythm.",
        ai: "The simultaneous use of two or more conflicting rhythms.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Rubato.",
        ai: "Rhythmic flexibility within a phrase or measure; a relaxation of strict time.",
        aiModel: 'Grok-1'
    },

    // --- BATCH 30 (Cryptozoology - The "Believer" Test) ---
    {
        category: 'Science',
        human: "Bigfoot.",
        ai: "A large, hairy, ape-like creature folklore alleged to inhabit the forests of North America.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Loch Ness Monster.",
        ai: "A cryptid in reputation that reputedly inhabits Loch Ness in the Scottish Highlands.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Chupacabra.",
        ai: "A legendary creature in the folklore of parts of the Americas, with a first purported sighting in Puerto Rico.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Mothman.",
        ai: "A humanoid creature with the wings of a lepidopteran, reportedly seen in the Point Pleasant area of West Virginia.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Jackalope.",
        ai: "A mythical animal of North American folklore described as a jackrabbit with antelope horns.",
        aiModel: 'Gemini 1.5 Pro'
    },

    // ========================================
    // PHASE 1: LITERATURE EXPANSION
    // ========================================

    // --- BATCH L1 (Poetry - Sonnets & Classics) ---
    {
        category: 'Literature',
        human: "Do not go gentle into that good night, Old age should burn and rave at close of day.",
        ai: "Refrain from proceeding placidly into that benevolent darkness, Advanced years ought to combust and fulminate at the termination of daylight.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "I wandered lonely as a cloud That floats on high o'er vales and hills.",
        ai: "I ambulated in solitude resembling a cumulus formation That drifts at elevation above valleys and elevated terrain.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Rage, rage against the dying of the light.",
        ai: "Express fury, express fury against the diminishment of illumination.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Hope is the thing with feathers that perches in the soul.",
        ai: "Optimism constitutes the entity possessing plumage that roosts within the psyche.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Because I could not stop for Death, He kindly stopped for me.",
        ai: "Due to my inability to cease for Mortality, He courteously halted for my benefit.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "I have measured out my life with coffee spoons.",
        ai: "I have quantified my existence utilizing caffeinated beverage dispensing implements.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "April is the cruellest month, breeding Lilacs out of the dead land.",
        ai: "The fourth month demonstrates maximum cruelty, generating Syringa vulgaris from the deceased terrain.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "In Xanadu did Kubla Khan A stately pleasure-dome decree.",
        ai: "Within Xanadu, Kubla Khan mandated the construction of a majestic recreational enclosure.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Tyger Tyger, burning bright, In the forests of the night.",
        ai: "Panthera tigris, Panthera tigris, combusting with luminosity, Within the arboreal regions of nocturnal darkness.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The fog comes on little cat feet.",
        ai: "The meteorological vapor arrives utilizing diminutive feline appendages.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "I sing of arms and the man.",
        ai: "I vocalize regarding armaments and the male individual.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "When I heard the learn'd astronomer.",
        ai: "At the moment I perceived the erudite celestial scientist.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Out of the night that covers me, Black as the pit from pole to pole.",
        ai: "Emerging from the darkness that envelops my being, Obsidian in hue resembling a chasm extending from extremity to extremity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "I am the master of my fate, I am the captain of my soul.",
        ai: "I constitute the sovereign authority over my destiny, I function as the commanding officer of my spiritual essence.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "The woods are lovely, dark and deep, But I have promises to keep.",
        ai: "The forested regions possess aesthetic appeal, obscurity and profundity, However I maintain obligations requiring fulfillment.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "And miles to go before I sleep.",
        ai: "And numerous units of distance to traverse prior to entering dormancy.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The world is too much with us; late and soon.",
        ai: "The terrestrial sphere is excessively present with our collective existence; in delayed and imminent temporal frames.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "O Captain! My Captain! our fearful trip is done.",
        ai: "O Commanding Officer! My Commanding Officer! Our anxiety-inducing voyage has reached completion.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "I think that I shall never see A poem lovely as a tree.",
        ai: "I hypothesize that I shall at no point observe A versified composition as aesthetically pleasing as a perennial woody plant.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "There is no frigate like a book To take us lands away.",
        ai: "No naval vessel compares to a printed volume For transporting us to distant geographical locations.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Wild nights! Wild nights! Were I with thee.",
        ai: "Untamed nocturnal periods! Untamed nocturnal periods! If I were in your proximity.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Tell all the truth but tell it slant.",
        ai: "Communicate the entirety of factual information but convey it at an oblique angle.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "I dwell in Possibility, A fairer House than Prose.",
        ai: "I reside within Potentiality, A more aesthetically superior dwelling structure than unadorned written language.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The soul selects her own society, Then shuts the door.",
        ai: "The spiritual essence chooses her preferred social grouping, Subsequently seals the entryway.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Success is counted sweetest By those who ne'er succeed.",
        ai: "Achievement is regarded with maximum saccharine appreciation By those who have never attained it.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "A narrow Fellow in the Grass Occasionally rides.",
        ai: "A slender entity within the herbaceous ground cover Periodically traverses.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "I felt a Funeral, in my Brain.",
        ai: "I experienced a memorial ceremony for the deceased, within my cerebral cortex.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "After great pain, a formal feeling comes.",
        ai: "Following substantial suffering, a ceremonial sensation manifests.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Much Madness is divinest Sense.",
        ai: "Considerable insanity constitutes the most divine rationality.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "I'm Nobody! Who are you? Are you Nobody too?",
        ai: "I am an entity of no significance! What is your identity? Are you also an entity of no significance?",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "This is my letter to the World That never wrote to Me.",
        ai: "This constitutes my correspondence to the global population That never transmitted written communication to my person.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "I heard a Fly buzz when I died.",
        ai: "I perceived a Diptera insect emit acoustic vibrations at the moment of my expiration.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Water, water, everywhere, Nor any drop to drink.",
        ai: "Aqueous substance, aqueous substance, in all locations, Nor a single droplet available for consumption.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "It is an ancient Mariner, And he stoppeth one of three.",
        ai: "It constitutes a seafarer of considerable antiquity, And he causes cessation of movement to one individual out of three.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Season of mists and mellow fruitfulness.",
        ai: "The temporal period characterized by atmospheric condensation and mature agricultural productivity.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "A thing of beauty is a joy forever.",
        ai: "An object possessing aesthetic qualities constitutes a perpetual source of happiness.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Heard melodies are sweet, but those unheard Are sweeter.",
        ai: "Audible musical compositions are pleasurable, but those not perceived acoustically Are more pleasurable.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "O what can ail thee, knight-at-arms, Alone and palely loitering?",
        ai: "What affliction troubles you, armored medieval warrior, Solitary and with pallid complexion lingering without purpose?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Bright star, would I were stedfast as thou art.",
        ai: "Luminous celestial body, I wish I were as constant and unwavering as you are.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Much have I travell'd in the realms of gold.",
        ai: "I have journeyed extensively through territories characterized by precious yellow metal.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "I met a traveller from an antique land.",
        ai: "I encountered a journeying individual originating from a geographical region of antiquity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Look on my Works, ye Mighty, and despair!",
        ai: "Observe my accomplishments, you individuals of substantial power, and experience hopelessness!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "My name is Ozymandias, King of Kings.",
        ai: "My designation is Ozymandias, Sovereign ruler of Sovereign rulers.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "If Winter comes, can Spring be far behind?",
        ai: "If the cold meteorological season arrives, can the vernal equinox period be distant in subsequence?",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Hail to thee, blithe Spirit! Bird thou never wert.",
        ai: "Greetings to you, cheerful incorporeal entity! Avian creature you never were.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "I fall upon the thorns of life! I bleed!",
        ai: "I descend upon the sharp protrusions of existence! I hemorrhage!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Make me thy lyre, even as the forest is.",
        ai: "Transform me into your stringed musical instrument, precisely as the woodland region is.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "O Wind, If Winter comes, can Spring be far behind?",
        ai: "O atmospheric current, If the cold season arrives, can the season of new growth be distant in sequence?",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH L2 (Novels - Opening Lines & Famous Passages) ---
    {
        category: 'Literature',
        human: "It was a bright cold day in April, and the clocks were striking thirteen.",
        ai: "It constituted a luminous frigid day in the fourth month, and the chronometric devices were indicating the thirteenth hour.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "All happy families are alike; each unhappy family is unhappy in its own way.",
        ai: "Every contented familial unit exhibits similarity; each discontented familial unit experiences discontent through its unique methodology.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "It was the best of times, it was the worst of times.",
        ai: "It constituted the optimal temporal period, it constituted the most adverse temporal period.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Call me Ishmael.",
        ai: "Address me utilizing the designation Ishmael.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        ai: "It constitutes a truth recognized globally, that an unmarried male possessing substantial financial assets, necessarily requires a female spouse.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
        ai: "During my earlier and more susceptible developmental period my paternal figure provided me with guidance that I have been mentally contemplating continuously since that time.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Last night I dreamt I went to Manderley again.",
        ai: "During the previous nocturnal period I experienced a dream wherein I traveled to Manderley once more.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "If you really want to hear about it, the first thing you'll probably want to know is where I was born.",
        ai: "If you genuinely desire to receive information about this matter, the initial item you will presumably wish to ascertain is my geographical birthplace.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Happy families are all alike; every unhappy family is unhappy in its own way.",
        ai: "Contented familial groupings exhibit uniformity; every discontented familial grouping experiences discontent through individualized modalities.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "It was a pleasure to burn.",
        ai: "Engaging in combustion constituted a pleasurable experience.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "The past is a foreign country; they do things differently there.",
        ai: "Previous temporal periods constitute unfamiliar geographical territories; behavioral patterns exhibit variation in those contexts.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Mother died today. Or maybe yesterday; I can't be sure.",
        ai: "My maternal parent expired during the current day. Alternatively possibly the previous day; I lack certainty.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "In the beginning God created the heaven and the earth.",
        ai: "At the commencement the Deity initiated the construction of the celestial realm and the terrestrial sphere.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "They shoot the white girl first.",
        ai: "They discharge projectiles at the Caucasian female initially.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
        ai: "An unidentified individual must have defamed Josef K., as during one morning, despite having committed no wrongful actions, he was taken into custody.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer.",
        ai: "You lack knowledge regarding my person unless you have perused a literary work entitled The Adventures of Tom Sawyer.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show.",
        ai: "Whether I shall emerge as the protagonist of my personal existence, or whether that position shall be occupied by an alternative individual, these written documents must demonstrate.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Stately, plump Buck Mulligan came from the stairhead.",
        ai: "Majestic, corpulent Buck Mulligan emerged from the uppermost portion of the stairway.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "I am an invisible man.",
        ai: "I constitute a male individual lacking visual perceptibility.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "The sun shone, having no alternative, on the nothing new.",
        ai: "The solar body emitted luminosity, possessing no alternative option, upon the absence of novelty.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "riverrun, past Eve and Adam's, from swerve of shore to bend of bay.",
        ai: "Fluvial progression, beyond Eve and Adam's establishment, from the deviation of the shoreline to the curvature of the inlet.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "A screaming comes across the sky.",
        ai: "An acoustic emission of high-pitched vocalization traverses the celestial expanse.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "In a hole in the ground there lived a hobbit.",
        ai: "Within a subterranean cavity there resided a diminutive humanoid creature.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "It was love at first sight.",
        ai: "It constituted romantic affection upon initial visual perception.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "The sky above the port was the color of television, tuned to a dead channel.",
        ai: "The atmospheric expanse situated above the harbor exhibited the chromatic properties of a television receiver, calibrated to a non-functional broadcast frequency.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
        ai: "Numerous years subsequently, while confronting the execution squad, Colonel Aureliano Buendía would recollect that remote afternoon when his paternal figure escorted him to encounter frozen water.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Once upon a time and a very good time it was there was a moocow coming down along the road.",
        ai: "At a point in time and a highly favorable point in time it was there existed a bovine creature proceeding in a downward direction along the thoroughfare.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "The cold passed reluctantly from the earth, and the retiring fogs revealed an army stretched out on the hills.",
        ai: "The low temperature departed unwillingly from the terrestrial surface, and the receding atmospheric vapors disclosed a military force extended across the elevated terrain.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "I was born twice: first, as a baby girl, on a remarkably smogless Detroit day in January of 1960.",
        ai: "I experienced birth on two occasions: initially, as a female infant, during a notably pollutant-free Detroit day in the first month of 1960.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Ships at a distance have every man's wish on board.",
        ai: "Maritime vessels at remote positions carry every male individual's desires aboard their structure.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "I had the story, bit by bit, from various people, and, as generally happens in such cases, each time it was a different story.",
        ai: "I acquired the narrative, incrementally, from multiple individuals, and, as typically occurs in such circumstances, each instance it constituted a distinct narrative.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Ages ago, Alex, Allen and Alva arrived at Antibes.",
        ai: "Numerous temporal periods in the past, Alex, Allen and Alva reached the destination of Antibes.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "In the town there were two mutes, and they were always together.",
        ai: "Within the municipality there existed two individuals lacking speech capability, and they were perpetually in proximity.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Once upon a time, there was a woman who discovered she had turned into the wrong person.",
        ai: "At an unspecified previous temporal point, there existed a female individual who ascertained that she had transformed into an incorrect identity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "The moment one learns English, complications set in.",
        ai: "The instant an individual acquires the English language, complexities commence.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Dr. Weiss, at forty, knew that her life had been ruined by literature.",
        ai: "Dr. Weiss, at four decades of age, comprehended that her existence had been devastated by written artistic works.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "I write this sitting in the kitchen sink.",
        ai: "I compose this written content while positioned within the culinary basin.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "We were somewhere around Barstow on the edge of the desert when the drugs began to take hold.",
        ai: "We were positioned approximately near Barstow at the periphery of the arid region when the pharmacological substances commenced their effect.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "In my younger and more vulnerable years my father gave me some advice.",
        ai: "During my earlier and more susceptible developmental period my paternal figure provided me with recommendations.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "You are about to begin reading Italo Calvino's new novel, If on a winter's night a traveler.",
        ai: "You are on the verge of commencing the perusal of Italo Calvino's recent literary work, If on a winter's night a traveler.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Miss Brooke had that kind of beauty which seems to be thrown into relief by poor dress.",
        ai: "Miss Brooke possessed that variety of aesthetic appeal which appears to be accentuated by inadequate attire.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "I am a sick man... I am a spiteful man.",
        ai: "I constitute an unwell male individual... I constitute a malevolent male individual.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "A few miles south of Soledad, the Salinas River drops in close to the hillside bank.",
        ai: "A small number of miles in a southern direction from Soledad, the Salinas River descends in proximity to the elevated terrain's edge.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.",
        ai: "When he was approaching thirteen years of age, my sibling Jem sustained severe fracturing to his upper limb at the joint connecting the forearm and upper arm.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "I first met Dean not long after my wife and I split up.",
        ai: "I initially encountered Dean shortly following the separation between my spouse and myself.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Granted: I am an inmate of a mental hospital; my keeper is watching me.",
        ai: "Acknowledged: I constitute a resident of a psychiatric medical facility; my caretaker is observing my activities.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "You better not never tell nobody but God.",
        ai: "You would be advised to refrain from disclosing information to any individual with the exception of the divine entity.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Francis Marion Tarwater's uncle had been dead for only half a day when the boy got too drunk to finish digging his grave.",
        ai: "Francis Marion Tarwater's paternal relative had been deceased for merely twelve hours when the juvenile became excessively intoxicated to complete the excavation of his burial site.",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH L3 (Drama - Shakespeare & Classics) ---
    {
        category: 'Literature',
        human: "All the world's a stage, and all the men and women merely players.",
        ai: "The entirety of the terrestrial sphere constitutes a theatrical platform, and all male and female individuals are simply performers.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Now is the winter of our discontent.",
        ai: "The present moment constitutes the cold seasonal period of our dissatisfaction.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Something is rotten in the state of Denmark.",
        ai: "An element of decomposition exists within the geopolitical entity of Denmark.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The lady doth protest too much, methinks.",
        ai: "The female individual expresses objection excessively, in my estimation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Brevity is the soul of wit.",
        ai: "Conciseness constitutes the essential nature of intellectual humor.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.",
        ai: "There exist additional entities in the celestial and terrestrial realms, Horatio, than are conceptualized within your philosophical framework.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "What's in a name? That which we call a rose by any other name would smell as sweet.",
        ai: "What significance resides in a designation? That entity we designate as a rosa by any alternative designation would emit an equally pleasant olfactory sensation.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Love looks not with the eyes, but with the mind.",
        ai: "Romantic affection perceives not through optical organs, but through cognitive faculties.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "The course of true love never did run smooth.",
        ai: "The trajectory of genuine romantic affection has never proceeded without impediment.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Cowards die many times before their deaths; the valiant never taste of death but once.",
        ai: "Individuals lacking courage experience mortality multiple instances prior to their actual demise; the courageous experience death exclusively on a single occasion.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "The fault, dear Brutus, is not in our stars, but in ourselves.",
        ai: "The deficiency, esteemed Brutus, does not reside in our celestial bodies, but within our own persons.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Friends, Romans, countrymen, lend me your ears.",
        ai: "Companions, Roman citizens, fellow nationals, provide me with your auditory attention.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "This above all: to thine own self be true.",
        ai: "This directive supersedes all others: maintain authenticity to your individual identity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Though this be madness, yet there is method in it.",
        ai: "Although this constitutes insanity, nevertheless there exists systematic approach within it.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Give me my robe, put on my crown; I have immortal longings in me.",
        ai: "Provide me with my ceremonial garment, place my royal headpiece upon me; I possess eternal yearnings within my being.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
        ai: "We constitute the substance from which dreams are constructed, and our brief existence is encompassed by dormancy.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Hell is empty and all the devils are here.",
        ai: "The infernal realm is unoccupied and all the demonic entities are present in this location.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Lord, what fools these mortals be!",
        ai: "Supreme deity, what intellectually deficient beings these finite-lived creatures are!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "If music be the food of love, play on.",
        ai: "If melodic arrangements constitute the sustenance of romantic affection, continue performing.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Some are born great, some achieve greatness, and some have greatness thrust upon them.",
        ai: "Certain individuals are inherently exceptional, certain individuals attain excellence, and certain individuals have excellence imposed upon them.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "How sharper than a serpent's tooth it is to have a thankless child!",
        ai: "How more acutely painful than an ophidian's dental protrusion it is to possess an ungrateful offspring!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Nothing will come of nothing.",
        ai: "No outcome shall result from the absence of input.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Fair is foul, and foul is fair.",
        ai: "That which is aesthetically pleasing is morally corrupt, and that which is morally corrupt is aesthetically pleasing.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Double, double toil and trouble; Fire burn and cauldron bubble.",
        ai: "Duplicate, duplicate exertion and difficulty; Combustion occur and large cooking vessel produce gaseous agitation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Out, damned spot! Out, I say!",
        ai: "Depart, cursed blemish! Depart, I command!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "By the pricking of my thumbs, something wicked this way comes.",
        ai: "Through the sensory stimulation of my pollex digits, an entity of malevolence approaches in this direction.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Uneasy lies the head that wears a crown.",
        ai: "Restlessly reclines the cranium that bears royal headgear.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "We few, we happy few, we band of brothers.",
        ai: "We limited in number, we contented limited in number, we cohort of male siblings.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Once more unto the breach, dear friends, once more.",
        ai: "An additional instance into the gap in fortifications, esteemed companions, an additional instance.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "The evil that men do lives after them; the good is oft interred with their bones.",
        ai: "The malevolent actions that male individuals commit persist following their demise; the benevolent is frequently buried together with their skeletal remains.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "I come to bury Caesar, not to praise him.",
        ai: "I arrive to inter Caesar, not to express commendation for him.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Cry havoc and let slip the dogs of war.",
        ai: "Vocalize destruction and release the canines of armed conflict.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "There is a tide in the affairs of men, which taken at the flood, leads on to fortune.",
        ai: "There exists a cyclical fluctuation in the matters of male individuals, which when seized at maximum flow, conducts toward prosperity.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "The first thing we do, let's kill all the lawyers.",
        ai: "The initial action we shall undertake, let us terminate all the legal practitioners.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "What a piece of work is a man! How noble in reason!",
        ai: "What a remarkable creation is a male individual! How distinguished in rational faculty!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "There is nothing either good or bad, but thinking makes it so.",
        ai: "There exists nothing inherently positive or negative, but cognitive processing renders it thus.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "The better part of valor is discretion.",
        ai: "The superior component of courage is prudent judgment.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "A horse! A horse! My kingdom for a horse!",
        ai: "An equine creature! An equine creature! My sovereign territory in exchange for an equine creature!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Misery acquaints a man with strange bedfellows.",
        ai: "Suffering introduces a male individual to unusual sleeping companions.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "How poor are they that have not patience!",
        ai: "How impoverished are those who lack the capacity for patient endurance!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "O, beware, my lord, of jealousy; it is the green-eyed monster.",
        ai: "O, exercise caution, my sovereign, regarding envy; it constitutes the verdant-optically-equipped creature.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "Put out the light, and then put out the light.",
        ai: "Extinguish the illumination, and subsequently extinguish the metaphorical illumination.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Who steals my purse steals trash... But he that filches from me my good name robs me of that which not enriches him.",
        ai: "The individual who takes my currency receptacle takes worthless material... But the one who purloins my positive reputation deprives me of that which does not benefit him.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Men at some time are masters of their fates.",
        ai: "Male individuals at certain temporal points are sovereign authorities over their destinies.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The quality of mercy is not strained.",
        ai: "The characteristic of compassionate treatment is not forced or constrained.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "If you prick us, do we not bleed?",
        ai: "If you puncture our epidermis, do we not experience hemorrhaging?",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "All that glisters is not gold.",
        ai: "Every entity that exhibits luminous reflection is not composed of auric metal.",
        aiModel: 'Mistral Large'
    },

    // ========================================
    // PHASE 2: PHILOSOPHY EXPANSION
    // ========================================

    // --- BATCH P1 (Ancient Philosophy) ---
    {
        category: 'Philosophy',
        human: "The unexamined life is not worth living.",
        ai: "The existence lacking introspective analysis does not merit continuation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "I know that I know nothing.",
        ai: "I am cognizant that I possess zero knowledge.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "Man is by nature a political animal.",
        ai: "The human species is inherently a creature oriented toward civic organization.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        ai: "We constitute the sum of our repeated behaviors. Excellence, therefore, is not a singular action, but a habituated pattern.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "The only true wisdom is in knowing you know nothing.",
        ai: "The sole authentic sagacity resides in the recognition that one possesses no knowledge.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Happiness depends upon ourselves.",
        ai: "The state of contentment is contingent upon our individual selves.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "At his best, man is the noblest of all animals; separated from law and justice he is the worst.",
        ai: "At optimal performance, the human is the most dignified of all fauna; disconnected from legal and moral systems he becomes the most deplorable.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "The soul never thinks without an image.",
        ai: "The spiritual essence never engages in cognitive processes absent a mental representation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
        ai: "It constitutes the indicator of an intellectually developed consciousness to possess the capacity to consider a proposition without embracing it.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "The roots of education are bitter, but the fruit is sweet.",
        ai: "The foundational elements of learning are unpleasant, but the resultant product is pleasurable.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "Nature does nothing in vain.",
        ai: "The natural world performs no actions without purpose.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "He who has overcome his fears will truly be free.",
        ai: "The individual who has conquered his apprehensions will authentically experience liberation.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "Knowing yourself is the beginning of all wisdom.",
        ai: "Self-awareness constitutes the initiation point of all sagacious understanding.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "Quality is not an act, it is a habit.",
        ai: "Excellence is not a singular performance, it is a habituated behavioral pattern.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "The more you know, the more you realize you don't know.",
        ai: "The greater one's knowledge acquisition, the greater one's recognition of one's epistemic deficiencies.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "Those who know, do. Those that understand, teach.",
        ai: "Those possessing knowledge execute. Those possessing comprehension instruct.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "The energy of the mind is the essence of life.",
        ai: "The vital force of the cognitive apparatus is the fundamental nature of existence.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "The aim of art is to represent not the outward appearance of things, but their inward significance.",
        ai: "The objective of artistic creation is to depict not the external manifestation of entities, but their internal meaning.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Pleasure in the job puts perfection in the work.",
        ai: "Enjoyment derived from occupational activities imparts flawlessness to the output.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "The whole is greater than the sum of its parts.",
        ai: "The unified entity exceeds the aggregate of its constituent components.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "It is during our darkest moments that we must focus to see the light.",
        ai: "It is throughout our most adverse temporal periods that we must concentrate to perceive illumination.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "The truly wise man is he who knows that he knows nothing.",
        ai: "The authentically sagacious individual is the one who recognizes that he possesses no knowledge.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "To find yourself, think for yourself.",
        ai: "To discover your identity, engage in independent cognitive processing.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "Strong minds discuss ideas, average minds discuss events, weak minds discuss people.",
        ai: "Robust intellects debate concepts, mediocre intellects debate occurrences, feeble intellects debate individuals.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "Be kind, for everyone you meet is fighting a hard battle.",
        ai: "Exercise benevolence, for every individual you encounter is engaged in a challenging struggle.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Education is the kindling of a flame, not the filling of a vessel.",
        ai: "Instruction is the ignition of combustion, not the replenishment of a container.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "There is only one good, knowledge, and one evil, ignorance.",
        ai: "There exists solely one positive quality, epistemic possession, and one negative quality, lack of knowledge.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "True wisdom comes to each of us when we realize how little we understand about life, ourselves, and the world around us.",
        ai: "Authentic sagacity arrives to each of us when we recognize how minimal our comprehension is regarding existence, our own being, and the surrounding environment.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "By all means marry; if you get a good wife, you'll become happy; if you get a bad one, you'll become a philosopher.",
        ai: "By all means enter matrimony; if you obtain a quality spouse, you will achieve contentment; if you obtain an inferior one, you will become a philosophical thinker.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "No man is free who is not master of himself.",
        ai: "No individual is liberated who is not the sovereign authority over himself.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "First learn the meaning of what you say, and then speak.",
        ai: "Initially acquire comprehension of the significance of your utterances, and subsequently vocalize.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "It's not what happens to you, but how you react to it that matters.",
        ai: "It is not the occurrences that befall you, but your responsive behavior to them that holds significance.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Wealth consists not in having great possessions, but in having few wants.",
        ai: "Affluence resides not in possessing substantial assets, but in maintaining minimal desires.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "The journey of a thousand miles begins with a single step.",
        ai: "The traversal of one thousand miles commences with an individual ambulatory movement.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "A journey of a thousand miles begins with a single step.",
        ai: "A voyage spanning one thousand miles initiates with a singular pedestrian action.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "When the student is ready, the teacher will appear.",
        ai: "When the learner achieves preparedness, the instructor will manifest.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "He who conquers himself is the mightiest warrior.",
        ai: "The individual who subdues his own self constitutes the most formidable combatant.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "Real knowledge is to know the extent of one's ignorance.",
        ai: "Authentic epistemic understanding is to comprehend the magnitude of one's lack of knowledge.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "Before you embark on a journey of revenge, dig two graves.",
        ai: "Prior to commencing a venture of retribution, excavate two burial sites.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Everything has beauty, but not everyone sees it.",
        ai: "All entities possess aesthetic qualities, but not all individuals perceive them.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Philosophy',
        human: "To see what is right and not do it is the want of courage.",
        ai: "To perceive the morally correct action and not execute it constitutes a deficiency of bravery.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Philosophy',
        human: "The superior man is modest in his speech, but exceeds in his actions.",
        ai: "The exceptional individual is restrained in verbal expression, but surpasses in behavioral execution.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Philosophy',
        human: "Choose a job you love, and you will never have to work a day in your life.",
        ai: "Select an occupation for which you possess affection, and you will never be required to labor for a single day throughout your existence.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Philosophy',
        human: "Our greatest glory is not in never falling, but in rising every time we fall.",
        ai: "Our maximum distinction resides not in perpetual avoidance of collapse, but in elevation on every occasion of descent.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Philosophy',
        human: "Study the past if you would define the future.",
        ai: "Examine historical records if you intend to characterize forthcoming events.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Philosophy',
        human: "What you do not want done to yourself, do not do to others.",
        ai: "That which you do not desire to be performed upon your own person, do not perform upon other individuals.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Philosophy',
        human: "Silence is a true friend who never betrays.",
        ai: "The absence of vocalization constitutes an authentic companion who never commits treachery.",
        aiModel: 'Mistral Large'
    },

    // ========================================
    // PHASE 3: SCIENCE EXPANSION
    // ========================================

    // --- BATCH S1 (Physics) ---
    {
        category: 'Science',
        human: "Every action has an equal and opposite reaction.",
        ai: "Each applied force generates a reciprocal force of equivalent magnitude in the contrary direction.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Energy cannot be created or destroyed, only transformed.",
        ai: "Energy is incapable of generation or annihilation, solely conversion between forms.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Objects in motion tend to stay in motion unless acted upon by an external force.",
        ai: "Entities in kinetic states exhibit tendency toward continued motion absent the application of extraneous force.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The speed of light in a vacuum is approximately 299,792 kilometers per second.",
        ai: "The velocity of electromagnetic radiation in a void measures approximately 299,792 kilometers per temporal second.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Time slows down as you approach the speed of light.",
        ai: "Temporal progression decelerates as one approximates the velocity of electromagnetic radiation.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Mass and energy are equivalent, as expressed in E=mc².",
        ai: "Mass and energy exhibit equivalence, as articulated in the equation E=mc².",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Gravity is the curvature of spacetime caused by mass.",
        ai: "Gravitational force constitutes the geometric deformation of the spacetime continuum induced by mass.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The uncertainty principle states that you cannot simultaneously know both the position and momentum of a particle.",
        ai: "The uncertainty principle declares that simultaneous precise determination of both spatial location and momentum of a subatomic entity is impossible.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Electrons exhibit both wave and particle properties.",
        ai: "Electrons manifest characteristics of both undulatory patterns and discrete particles.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Black holes are regions where gravity is so strong that nothing can escape, not even light.",
        ai: "Black holes constitute spatial regions where gravitational force is of such magnitude that no entity can escape, including electromagnetic radiation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The Big Bang was not an explosion in space, but an expansion of space itself.",
        ai: "The Big Bang did not constitute a detonation within space, but rather an expansion of the spatial fabric itself.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Absolute zero is the lowest possible temperature, where molecular motion stops.",
        ai: "Absolute zero represents the minimum achievable temperature, at which molecular kinetic activity ceases.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Entropy in a closed system always increases over time.",
        ai: "Disorder within an isolated thermodynamic system invariably increases as temporal progression occurs.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Quantum entanglement allows particles to be correlated regardless of distance.",
        ai: "Quantum entanglement permits subatomic entities to maintain correlation irrespective of spatial separation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The strong nuclear force holds protons and neutrons together in the nucleus.",
        ai: "The strong nuclear interaction binds protons and neutrons within the atomic nucleus.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Antimatter is composed of antiparticles, which have the same mass but opposite charge.",
        ai: "Antimatter consists of antiparticles, possessing identical mass but inverse electrical polarity.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The Higgs boson gives other particles their mass.",
        ai: "The Higgs boson imparts mass to other subatomic entities.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Dark matter makes up about 27% of the universe but cannot be directly observed.",
        ai: "Dark matter constitutes approximately 27% of the cosmos but is incapable of direct observation.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "A photon has no rest mass but carries momentum.",
        ai: "A photon possesses zero rest mass yet conveys momentum.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Superconductors have zero electrical resistance below a critical temperature.",
        ai: "Superconductors exhibit null electrical resistance beneath a threshold temperature.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "The electromagnetic spectrum includes radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays.",
        ai: "The electromagnetic spectrum encompasses radio waves, microwaves, infrared radiation, visible light, ultraviolet radiation, X-rays, and gamma rays.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Sound cannot travel through a vacuum because it requires a medium.",
        ai: "Acoustic waves cannot propagate through a vacuum due to the necessity of a transmitting medium.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The Doppler effect causes the frequency of waves to change when the source is moving.",
        ai: "The Doppler effect induces alteration in wave frequency when the emission source is in motion.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Nuclear fusion powers the sun by combining hydrogen atoms into helium.",
        ai: "Nuclear fusion energizes the sun through the combination of hydrogen atoms to form helium.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Radioactive decay is the spontaneous transformation of an unstable atomic nucleus.",
        ai: "Radioactive decay constitutes the spontaneous transmutation of an unstable atomic nucleus.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "The half-life of a radioactive element is the time it takes for half of it to decay.",
        ai: "The half-life of a radioactive element represents the temporal duration required for fifty percent of it to undergo decay.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Refraction is the bending of light as it passes from one medium to another.",
        ai: "Refraction constitutes the angular deviation of light as it transitions between media of differing densities.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "A laser produces coherent light of a single wavelength.",
        ai: "A laser generates coherent electromagnetic radiation of a singular wavelength.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The photoelectric effect demonstrates that light comes in discrete packets called photons.",
        ai: "The photoelectric effect demonstrates that electromagnetic radiation arrives in discrete quantized units denominated photons.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Magnetic fields are produced by moving electric charges.",
        ai: "Magnetic fields are generated by electric charges in motion.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Ohm's Law states that voltage equals current times resistance.",
        ai: "Ohm's Law postulates that electrical potential difference equals current multiplied by resistance.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Capacitors store electrical energy in an electric field.",
        ai: "Capacitors accumulate electrical energy within an electric field.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Inductors store energy in a magnetic field when current flows through them.",
        ai: "Inductors accumulate energy within a magnetic field during the passage of electrical current.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Alternating current periodically reverses direction.",
        ai: "Alternating current periodically inverts its directional flow.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: '        "Semiconductors have electrical conductivity between that of conductors and insulators.',
        ai: "Semiconductors possess electrical conductivity intermediate between conductors and insulators.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Transistors are the building blocks of modern electronic devices.",
        ai: "Transistors constitute the fundamental components of contemporary electronic apparatus.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The Standard Model describes the fundamental particles and forces of the universe.",
        ai: "The Standard Model delineates the elementary particles and fundamental interactions of the cosmos.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Quarks are the elementary particles that make up protons and neutrons.",
        ai: "Quarks constitute the elementary particles comprising protons and neutrons.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Leptons are elementary particles that do not experience the strong force.",
        ai: "Leptons are elementary particles that do not undergo interaction with the strong nuclear force.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Bosons are particles that carry fundamental forces.",
        ai: "Bosons are particles that mediate fundamental interactions.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The weak nuclear force is responsible for radioactive beta decay.",
        ai: "The weak nuclear interaction is accountable for radioactive beta decay.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Neutrinos are nearly massless particles that rarely interact with matter.",
        ai: "Neutrinos are near-massless particles that infrequently interact with matter.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "String theory proposes that fundamental particles are one-dimensional strings.",
        ai: "String theory postulates that elementary particles are one-dimensional vibrational filaments.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The Schrödinger equation describes how quantum states evolve over time.",
        ai: "The Schrödinger equation describes the temporal evolution of quantum states.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Wave-particle duality is a fundamental concept in quantum mechanics.",
        ai: "Wave-particle duality constitutes a foundational principle in quantum mechanics.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The Copenhagen interpretation says that quantum particles exist in superposition until observed.",
        ai: "The Copenhagen interpretation asserts that quantum particles exist in superposition until subjected to observation.",
        aiModel: 'Grok-1'
    },

    // ========================================
    // PHASE 4: FANTASY EXPANSION
    // ========================================

    // --- BATCH F1 (Tolkien & Epic Fantasy) ---
    {
        category: 'Fantasy',
        human: "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.",
        ai: "A singular circular band to govern all entities, A singular circular band to locate them, A singular circular band to assemble them all and in the absence of light constrain them.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Not all those who wander are lost.",
        ai: "Not all individuals who ambulate without destination have lost their way.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "Even the smallest person can change the course of the future.",
        ai: "Even the most diminutive individual can alter the trajectory of forthcoming events.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "All we have to decide is what to do with the time that is given us.",
        ai: "The entirety of our decision-making concerns what actions to take with the temporal allotment provided to us.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "Fly, you fools!",
        ai: "Engage in aerial locomotion, you intellectually deficient individuals!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "You shall not pass!",
        ai: "You are prohibited from proceeding beyond this point!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "There is some good in this world, and it's worth fighting for.",
        ai: "There exists a measure of virtue in this realm, and it merits engagement in combat for its preservation.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "I wish it need not have happened in my time.",
        ai: "I desire that this occurrence had not transpired during my temporal existence.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Deeds will not be less valiant because they are unpraised.",
        ai: "Actions will not be less courageous due to the absence of commendation.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "I am no man.",
        ai: "I do not belong to the male gender category.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "We wants it, we needs it. Must have the precious.",
        ai: "We desire it, we require it. We must possess the valuable object.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "The world is indeed full of peril, and in it there are many dark places.",
        ai: "The world is indeed replete with danger, and within it exist numerous locations lacking illumination.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "It's a dangerous business, Frodo, going out your door.",
        ai: "It constitutes a hazardous enterprise, Frodo, exiting through your entryway.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "Hobbits really are amazing creatures. You can learn all there is to know about their ways in a month, and yet after a hundred years they can still surprise you.",
        ai: "Hobbits are genuinely remarkable beings. One can acquire complete knowledge regarding their customs within thirty days, yet following a century they can still induce astonishment.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "The beacons are lit! Gondor calls for aid!",
        ai: "The signal fires have been ignited! Gondor requests military assistance!",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "Winter is coming.",
        ai: "The cold meteorological season is approaching.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "When you play the game of thrones, you win or you die.",
        ai: "When you participate in the competition for royal power, you either emerge victorious or experience mortality.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "The night is dark and full of terrors.",
        ai: "The nocturnal period is devoid of light and replete with frightening entities.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "A Lannister always pays his debts.",
        ai: "An individual of House Lannister invariably settles their financial obligations.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "Chaos isn't a pit. Chaos is a ladder.",
        ai: "Disorder does not constitute a depression in the ground. Disorder constitutes a mechanism for vertical ascent.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "The man who passes the sentence should swing the sword.",
        ai: "The individual who pronounces the judgment should execute the blade movement.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Valar morghulis. All men must die.",
        ai: "Valar morghulis. All male individuals must experience mortality.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "You know nothing, Jon Snow.",
        ai: "You possess zero knowledge, Jon Snow.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "Fear cuts deeper than swords.",
        ai: "Apprehension penetrates more profoundly than bladed weapons.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "The things I do for love.",
        ai: "The actions I undertake for the sake of romantic affection.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "A dragon is not a slave.",
        ai: "A draconic creature is not an entity in servitude.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "Fire and blood.",
        ai: "Combustion and sanguine fluid.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "The Wheel of Time turns, and Ages come and pass.",
        ai: "The Wheel of Time rotates, and temporal epochs arrive and subsequently conclude.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Duty is heavier than a mountain, death lighter than a feather.",
        ai: "Obligation possesses greater mass than a mountain, mortality possesses less mass than a feather.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "The only thing I know is that I know nothing.",
        ai: "The sole item of knowledge I possess is that I possess no knowledge.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "In the beginning, when the Creator made the Wheel of Time.",
        ai: "At the commencement, when the Creator fabricated the Wheel of Time.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "Life before death. Strength before weakness. Journey before destination.",
        ai: "Existence prior to mortality. Power prior to vulnerability. Voyage prior to arrival point.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "The most important step a man can take is the next one.",
        ai: "The most significant ambulatory movement an individual can execute is the subsequent one.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "I will take responsibility for what I have done. If I must fall, I will rise each time a better man.",
        ai: "I will accept accountability for my actions. If I must descend, I will ascend on each occasion as an improved individual.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "Strength does not make one capable of rule; it makes one capable of service.",
        ai: "Power does not render one capable of governance; it renders one capable of servitude.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Sometimes a hypocrite is nothing more than a man in the process of changing.",
        ai: "Occasionally a hypocritical individual is nothing more than a person undergoing transformation.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.",
        ai: "The function of a narrative creator is not to instruct you on cognitive processes, but to provide you with inquiries for contemplation.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "A wizard is never late. He arrives precisely when he means to.",
        ai: "A practitioner of magic is never tardy. He appears exactly at the intended moment.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "Home is behind, the world ahead.",
        ai: "Domicile is in the posterior direction, the world is in the anterior direction.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Fantasy',
        human: "Courage is found in unlikely places.",
        ai: "Bravery is discovered in improbable locations.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Fantasy',
        human: "The world is not in your books and maps; it's out there.",
        ai: "The world does not reside in your printed volumes and cartographic documents; it exists externally.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Fantasy',
        human: "I put a spell on you, and now you're mine.",
        ai: "I applied an enchantment upon you, and presently you belong to me.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Fantasy',
        human: "Magic is neither good nor evil. It is a tool, like a knife.",
        ai: "Magic is neither virtuous nor malevolent. It constitutes an implement, analogous to a blade.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Fantasy',
        human: "Words are pale shadows of forgotten names.",
        ai: "Verbal expressions are dim silhouettes of appellations that have been forgotten.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Fantasy',
        human: "Three Rings for the Elven-kings under the sky.",
        ai: "Three circular bands for the Elvish monarchs beneath the atmospheric expanse.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Fantasy',
        human: "I am fire. I am death.",
        ai: "I constitute combustion. I constitute mortality.",
        aiModel: 'Grok-1'
    },

    // ========================================
    // PHASE 5: HISTORY EXPANSION
    // ========================================

    // --- BATCH H1 (Famous Speeches & Historical Quotes) ---
    {
        category: 'History',
        human: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.",
        ai: "I possess an aspiration that my four offspring of diminutive stature will someday reside in a nation where they will not be evaluated by their epidermal pigmentation but by the substance of their personality traits.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "Ask not what your country can do for you; ask what you can do for your country.",
        ai: "Do not inquire regarding what your nation can perform on your behalf; inquire regarding what you can perform on behalf of your nation.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "The only thing we have to fear is fear itself.",
        ai: "The sole entity we have reason to fear is fear in and of itself.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "Four score and seven years ago our fathers brought forth on this continent a new nation.",
        ai: "Eighty-seven years in the past our paternal ancestors established upon this landmass a novel nation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets.",
        ai: "We shall engage in combat on the sandy coastal areas, we shall engage in combat on the arrival locations, we shall engage in combat in the agricultural lands and in the urban thoroughfares.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "Never in the field of human conflict was so much owed by so many to so few.",
        ai: "At no point in the arena of human conflict was such a substantial debt incurred by such a large number of individuals to such a small number of individuals.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "That's one small step for man, one giant leap for mankind.",
        ai: "That constitutes one diminutive ambulatory movement for an individual male, one enormous leap for the human species.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "I came, I saw, I conquered.",
        ai: "I arrived, I observed, I achieved victory.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "Give me liberty, or give me death!",
        ai: "Provide me with freedom, or provide me with mortality!",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "The ballot is stronger than the bullet.",
        ai: "The electoral vote possesses greater strength than the projectile.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "Government of the people, by the people, for the people.",
        ai: "Governance of the populace, by the populace, for the benefit of the populace.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "I have not yet begun to fight!",
        ai: "I have not yet commenced engagement in combat!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "We hold these truths to be self-evident, that all men are created equal.",
        ai: "We maintain these factual statements to be inherently obvious, that all male individuals are generated with equivalent status.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "Mr. Gorbachev, tear down this wall!",
        ai: "Mr. Gorbachev, dismantle this structural barrier!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "Ich bin ein Berliner.",
        ai: "I am a citizen of Berlin.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "History will be kind to me for I intend to write it.",
        ai: "Historical record will be favorable to me for I intend to author it.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "A date which will live in infamy.",
        ai: "A calendrical date which will persist in disgrace.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "The buck stops here.",
        ai: "The accountability terminates at this location.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "Blood, toil, tears and sweat.",
        ai: "Sanguine fluid, labor, lacrimal fluid and perspiration.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "This was their finest hour.",
        ai: "This constituted their most excellent temporal period.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "We choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard.",
        ai: "We select the trajectory toward the lunar satellite. We select the trajectory toward the lunar satellite within this ten-year period and accomplish the additional objectives, not due to their simplicity, but due to their difficulty.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "An iron curtain has descended across the Continent.",
        ai: "A ferrous metallic barrier has lowered throughout the Continental landmass.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "The die is cast.",
        ai: "The cubic randomization device has been thrown.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "If I have seen further it is by standing on the shoulders of giants.",
        ai: "If I have observed at greater distances it is by positioning myself upon the shoulders of exceptionally large individuals.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "Power tends to corrupt, and absolute power corrupts absolutely.",
        ai: "Authority exhibits a tendency toward corruption, and complete authority corrupts to the maximum degree.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "The arc of the moral universe is long, but it bends toward justice.",
        ai: "The curved trajectory of the ethical cosmos is lengthy, but it inclines toward equitable treatment.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "Injustice anywhere is a threat to justice everywhere.",
        ai: "Inequity in any location constitutes a danger to equity in all locations.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "The hottest places in hell are reserved for those who, in times of great moral crisis, maintain their neutrality.",
        ai: "The locations of maximum temperature in the infernal realm are allocated for those who, during periods of significant ethical crisis, sustain their impartiality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "I am not a crook.",
        ai: "I am not a dishonest individual.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "Read my lips: no new taxes.",
        ai: "Observe my labial movements: no additional taxation.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "Yes we can.",
        ai: "Affirmative, we possess the capability.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "Democracy is the worst form of government, except for all the others.",
        ai: "Democracy constitutes the least optimal governmental structure, with the exception of all alternative structures.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "You must be the change you wish to see in the world.",
        ai: "You must embody the transformation you desire to observe in the world.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "An eye for an eye makes the whole world blind.",
        ai: "An optical organ in exchange for an optical organ renders the entire world visually impaired.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "First they ignore you, then they laugh at you, then they fight you, then you win.",
        ai: "Initially they disregard you, subsequently they ridicule you, subsequently they engage in conflict with you, subsequently you achieve victory.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "The best way to find yourself is to lose yourself in the service of others.",
        ai: "The optimal method to discover your identity is to lose yourself in the provision of assistance to others.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        ai: "Exist as if you were to expire tomorrow. Acquire knowledge as if you were to exist for eternity.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "Those who cannot remember the past are condemned to repeat it.",
        ai: "Those who are incapable of recollecting historical events are destined to replicate them.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "History is written by the victors.",
        ai: "Historical record is authored by those who achieve victory.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "The pen is mightier than the sword.",
        ai: "The writing instrument possesses greater power than the bladed weapon.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "Rome wasn't built in a day.",
        ai: "The city of Rome was not constructed within a single diurnal cycle.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "When in Rome, do as the Romans do.",
        ai: "When present in Rome, conduct yourself as the Roman inhabitants conduct themselves.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "Divide and conquer.",
        ai: "Partition and achieve dominance.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "Know your enemy and know yourself.",
        ai: "Possess knowledge of your adversary and possess knowledge of yourself.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "All warfare is based on deception.",
        ai: "All military conflict is predicated upon deliberate misleading.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "The supreme art of war is to subdue the enemy without fighting.",
        ai: "The paramount technique of warfare is to subjugate the adversary absent combat.",
        aiModel: 'Grok-1'
    },

    // ========================================
    // PHASE 6: POP CULTURE EXPANSION
    // ========================================

    // --- BATCH PC1 (Movies & TV) ---
    {
        category: 'Pop Culture',
        human: "Here's looking at you, kid.",
        ai: "Here is directing my gaze toward you, young individual.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "May the Force be with you.",
        ai: "May the mystical energy field accompany you.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "I'll be back.",
        ai: "I shall return.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "You talking to me?",
        ai: "Are you directing your verbal communication toward my person?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "I'm the king of the world!",
        ai: "I am the monarch of the terrestrial sphere!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "You can't handle the truth!",
        ai: "You are incapable of processing the factual information!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Life is like a box of chocolates. You never know what you're gonna get.",
        ai: "Existence is analogous to a container of chocolate confections. You never know which item you will receive.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "There's no place like home.",
        ai: "No location compares to one's residence.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Go ahead, make my day.",
        ai: "Proceed, enhance my diurnal experience.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Frankly, my dear, I don't give a damn.",
        ai: "Honestly, my dear, I do not attribute any significance.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Elementary, my dear Watson.",
        ai: "Basic and fundamental, my esteemed Watson.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "I see dead people.",
        ai: "I perceive deceased individuals.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Why so serious?",
        ai: "For what reason such solemnity?",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "With great power comes great responsibility.",
        ai: "Accompanying substantial power is substantial accountability.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "To infinity and beyond!",
        ai: "Toward the state of being without limit and further!",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Just keep swimming.",
        ai: "Simply continue engaging in aquatic locomotion.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "I am Groot.",
        ai: "I am Groot.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "I am Iron Man.",
        ai: "I constitute Iron Man.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Wakanda forever!",
        ai: "Wakanda for perpetuity!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "That's what she said.",
        ai: "That is the statement she articulated.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "How you doin'?",
        ai: "In what manner are you conducting yourself?",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "We were on a break!",
        ai: "We were in a state of temporary relationship suspension!",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Pivot! Pivot!",
        ai: "Rotate around a central point! Rotate around a central point!",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "It's gonna be legen... wait for it... dary!",
        ai: "It is going to be legend... pause in anticipation... ary!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Bazinga!",
        ai: "An exclamation denoting successful execution of a humorous deception!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "This is the way.",
        ai: "This constitutes the methodology.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "I have spoken.",
        ai: "I have completed my verbal communication.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Live long and prosper.",
        ai: "Experience longevity and achieve financial success.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Beam me up, Scotty.",
        ai: "Transport me via matter-energy conversion, Scotty.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Resistance is futile.",
        ai: "Opposition is without purpose.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Make it so.",
        ai: "Execute the command.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Engage.",
        ai: "Initiate propulsion.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "The truth is out there.",
        ai: "The factual information exists in external locations.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "I want to believe.",
        ai: "I desire to accept as true.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Say my name.",
        ai: "Verbalize my designation.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "I am the one who knocks.",
        ai: "I am the individual who delivers the knocking sound.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Tread lightly.",
        ai: "Proceed with minimal force application.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "You're goddamn right.",
        ai: "You are emphatically correct.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "A man provides for his family.",
        ai: "A male individual supplies necessities for his familial unit.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Cool, cool, cool.",
        ai: "Of low temperature, of low temperature, of low temperature.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "That's so fetch.",
        ai: "That is so attractive and appealing.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "On Wednesdays we wear pink.",
        ai: "On the fourth day of the week we don clothing of the rosy hue.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "You go, Glen Coco!",
        ai: "You proceed, Glen Coco!",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Get in, loser. We're going shopping.",
        ai: "Enter the vehicle, socially unfavorable individual. We are proceeding to engage in retail commerce.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "I drink your milkshake!",
        ai: "I consume your blended dairy beverage!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "I'm walking here!",
        ai: "I am engaging in pedestrian locomotion in this location!",
        aiModel: 'Grok-1'
    },

    // ========================================
    // PHASE 7: BIOLOGY & CHEMISTRY EXPANSION
    // ========================================

    // --- BATCH S2 (Biology) ---
    {
        category: 'Science',
        human: "DNA is the blueprint of life.",
        ai: "Deoxyribonucleic acid constitutes the architectural schematic of biological existence.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Mitochondria are the powerhouses of the cell.",
        ai: "Mitochondria constitute the energy-generating facilities of the cellular unit.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Survival of the fittest.",
        ai: "Continued existence of the most optimally adapted.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The cell is the basic unit of life.",
        ai: "The cell constitutes the fundamental structural and functional unit of biological existence.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Evolution is the change in heritable characteristics of biological populations over successive generations.",
        ai: "Evolution constitutes the modification in inheritable traits of biological populations across sequential generations.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Photosynthesis converts sunlight into chemical energy.",
        ai: "Photosynthesis transforms solar radiation into chemical potential energy.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Genes are segments of DNA that code for proteins.",
        ai: "Genes are sections of deoxyribonucleic acid that encode for polypeptide chains.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The heart pumps blood throughout the body.",
        ai: "The cardiac organ propels sanguine fluid throughout the corporeal structure.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Neurons transmit electrical signals in the nervous system.",
        ai: "Neurons propagate electrical impulses within the neural system.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The brain contains approximately 86 billion neurons.",
        ai: "The cerebral organ contains approximately 86 billion neuronal cells.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Red blood cells carry oxygen to the tissues.",
        ai: "Erythrocytes transport oxygen to the bodily tissues.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Antibodies are proteins that fight infections.",
        ai: "Antibodies are proteinaceous molecules that combat infectious agents.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The immune system protects the body from disease.",
        ai: "The immunological system defends the corporeal structure from pathological conditions.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Chromosomes are structures that contain genetic information.",
        ai: "Chromosomes are structural entities that house hereditary information.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Humans have 23 pairs of chromosomes.",
        ai: "Homo sapiens possess 23 pairs of chromosomal structures.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Mutations are changes in the DNA sequence.",
        ai: "Mutations are alterations in the deoxyribonucleic acid sequence.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The liver detoxifies harmful substances in the blood.",
        ai: "The hepatic organ neutralizes deleterious substances present in the blood.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The kidneys filter waste products from the blood.",
        ai: "The renal organs filter waste metabolites from the blood.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Enzymes are biological catalysts that speed up chemical reactions.",
        ai: "Enzymes are biological catalysts that accelerate chemical reactions.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Hormones are chemical messengers that regulate body functions.",
        ai: "Hormones are chemical signaling molecules that regulate physiological functions.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "The stomach breaks down food using acid and enzymes.",
        ai: "The gastric organ disintegrates food utilizing acidic secretions and enzymatic proteins.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The lungs exchange oxygen and carbon dioxide.",
        ai: "The pulmonary organs facilitate the exchange of oxygen and carbon dioxide.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Viruses are infectious agents that replicate inside living cells.",
        ai: "Viruses are infectious entities that reproduce within living cellular organisms.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Bacteria are single-celled microorganisms.",
        ai: "Bacteria are unicellular microorganisms.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The skeletal system provides structure and protection.",
        ai: "The skeletal system provides structural support and protective functions.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Muscles contract and relax to produce movement.",
        ai: "Muscles undergo contraction and relaxation to generate locomotion.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The skin is the largest organ of the human body.",
        ai: "The integumentary tissue is the most extensive organ of the human body.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Blood is made up of plasma, red cells, white cells, and platelets.",
        ai: "Blood is composed of plasma, erythrocytes, leukocytes, and thrombocytes.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The spinal cord transmits signals between the brain and body.",
        ai: "The spinal cord propagates signals between the cerebral organ and corporeal structure.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Insulin regulates blood sugar levels.",
        ai: "Insulin regulates blood glucose concentrations.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Chlorophyll gives plants their green color.",
        ai: "Chlorophyll imparts to plants their verdant coloration.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Plants absorb water through their roots.",
        ai: "Plants intake aqueous fluid through their root systems.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Seeds contain the embryo of a new plant.",
        ai: "Seeds contain the embryonic structure of a new botanical organism.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Pollination is the transfer of pollen from one flower to another.",
        ai: "Pollination is the conveyance of pollen from one floral structure to another.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Ecosystems are communities of living organisms interacting with their environment.",
        ai: "Ecosystems are assemblages of living organisms interacting with their environmental surroundings.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The food chain shows how energy flows through an ecosystem.",
        ai: "The food chain illustrates how energy is transferred through an ecosystem.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Predators hunt prey for food.",
        ai: "Predatory organisms hunt prey organisms for nutritional sustenance.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Decomposers break down dead organic matter.",
        ai: "Decomposer organisms disintegrate deceased organic material.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Biodiversity refers to the variety of life on Earth.",
        ai: "Biodiversity refers to the multiplicity of life forms on the terrestrial planet.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Extinction is the complete disappearance of a species.",
        ai: "Extinction is the total elimination of a taxonomic species.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Fossils are preserved remains of ancient organisms.",
        ai: "Fossils are preserved remnants of ancient biological organisms.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Natural selection drives evolutionary change.",
        ai: "Natural selection propels evolutionary modification.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Adaptation is a trait that helps an organism survive.",
        ai: "Adaptation is a characteristic that assists an organism in survival.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Species that cannot adapt may become extinct.",
        ai: "Species incapable of adaptation may undergo extinction.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Genetics is the study of heredity and variation.",
        ai: "Genetics is the scientific investigation of heredity and phenotypic variation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Dominant genes mask the effects of recessive genes.",
        ai: "Dominant alleles obscure the phenotypic expression of recessive alleles.",
        aiModel: 'Grok-1'
    },

    // --- BATCH S3 (Chemistry) ---
    {
        category: 'Science',
        human: "Water is made of two hydrogen atoms and one oxygen atom.",
        ai: "Water is composed of two hydrogen atoms and one oxygen atom.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The periodic table organizes elements by atomic number.",
        ai: "The periodic table systematically arranges elements according to atomic number.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Atoms are the building blocks of matter.",
        ai: "Atoms constitute the fundamental construction units of matter.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Chemical reactions involve the breaking and forming of bonds.",
        ai: "Chemical reactions entail the disruption and establishment of molecular bonds.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Acids have a pH less than 7.",
        ai: "Acids possess a pH value below 7.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Bases have a pH greater than 7.",
        ai: "Bases possess a pH value exceeding 7.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Salt is formed when an acid reacts with a base.",
        ai: "Salt is generated when an acid undergoes reaction with a base.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Oxygen is essential for combustion.",
        ai: "Oxygen is requisite for the combustion process.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Carbon dioxide is a greenhouse gas.",
        ai: "Carbon dioxide is a gas that contributes to the greenhouse effect.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Electrons orbit the nucleus of an atom.",
        ai: "Electrons circumnavigate the nucleus of an atom.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Protons have a positive charge.",
        ai: "Protons possess a positive electrical charge.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Neutrons have no electrical charge.",
        ai: "Neutrons possess no electrical charge.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Molecules are groups of atoms bonded together.",
        ai: "Molecules are aggregations of atoms connected via chemical bonds.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Covalent bonds share electrons between atoms.",
        ai: "Covalent bonds distribute electrons between atomic entities.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Ionic bonds transfer electrons from one atom to another.",
        ai: "Ionic bonds relocate electrons from one atomic entity to another.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Metals conduct electricity well.",
        ai: "Metallic elements exhibit high electrical conductivity.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Noble gases are chemically inert.",
        ai: "Noble gases exhibit chemical inertness.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Catalysts speed up reactions without being consumed.",
        ai: "Catalysts accelerate reactions without undergoing consumption.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Oxidation involves the loss of electrons.",
        ai: "Oxidation involves the relinquishment of electrons.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Reduction involves the gain of electrons.",
        ai: "Reduction involves the acquisition of electrons.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Hydrocarbons contain only carbon and hydrogen.",
        ai: "Hydrocarbons consist exclusively of carbon and hydrogen.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Organic chemistry is the study of carbon compounds.",
        ai: "Organic chemistry is the scientific study of carbon-containing compounds.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Polymers are large molecules made of repeating units.",
        ai: "Polymers are macromolecules composed of repetitive structural units.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Plastics are synthetic polymers.",
        ai: "Plastics are synthetically produced polymeric materials.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Iron rusts when exposed to oxygen and water.",
        ai: "Iron undergoes oxidation when exposed to oxygen and aqueous environments.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Gold is resistant to corrosion.",
        ai: "Gold exhibits resistance to corrosive processes.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Alloys are mixtures of metals.",
        ai: "Alloys are combinations of metallic elements.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Steel is an alloy of iron and carbon.",
        ai: "Steel is an alloy comprising iron and carbon.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Bronze is an alloy of copper and tin.",
        ai: "Bronze is an alloy composed of copper and tin.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Solutions are homogeneous mixtures.",
        ai: "Solutions are uniform homogeneous mixtures.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Solubility is the ability of a substance to dissolve.",
        ai: "Solubility is the capacity of a substance to undergo dissolution.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Evaporation is a phase change from liquid to gas.",
        ai: "Evaporation is a phase transition from liquid to gaseous state.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Condensation is a phase change from gas to liquid.",
        ai: "Condensation is a phase transition from gaseous to liquid state.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Freezing is a phase change from liquid to solid.",
        ai: "Freezing is a phase transition from liquid to solid state.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Melting is a phase change from solid to liquid.",
        ai: "Melting is a phase transition from solid to liquid state.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Sublimation is a phase change from solid directly to gas.",
        ai: "Sublimation is a phase transition from solid directly to gaseous state.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Exothermic reactions release heat.",
        ai: "Exothermic reactions emit thermal energy.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Endothermic reactions absorb heat.",
        ai: "Endothermic reactions intake thermal energy.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The mole is a unit of measurement in chemistry.",
        ai: "The mole is a unit of quantification in chemistry.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Avogadro's number is approximately 6.022 x 10^23.",
        ai: "Avogadro's number is approximately 6.022 x 10^23.",
        aiModel: 'Mistral Large'
    },

    // ========================================
    // PHASE 8: MUSIC & VIDEO GAMES EXPANSION
    // ========================================

    // --- BATCH PC2 (Music Lyrics) ---
    {
        category: 'Pop Culture',
        human: "Is this the real life? Is this just fantasy?",
        ai: "Does this constitute actual existence? Does this constitute mere imagination?",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "We will, we will rock you.",
        ai: "We shall, we shall cause you to experience rhythmic vibrations.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "I will always love you.",
        ai: "I shall perpetually experience romantic affection for you.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Hello, is it me you're looking for?",
        ai: "Greetings, am I the individual for whom you are searching?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Sweet dreams are made of this.",
        ai: "Pleasant nocturnal visions are composed of this substance.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Don't stop believin'.",
        ai: "Do not cease maintaining faith.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Another one bites the dust.",
        ai: "An additional individual experiences defeat and falls.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Every breath you take, every move you make, I'll be watching you.",
        ai: "Each respiration you perform, each locomotion you execute, I shall be observing you.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "I got a feeling that tonight's gonna be a good night.",
        ai: "I possess a sensation that this evening shall be a favorable evening.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Shake it off, shake it off.",
        ai: "Dislodge it through oscillation, dislodge it through oscillation.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "I'm walking on sunshine.",
        ai: "I am ambulating upon solar radiation.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Purple rain, purple rain.",
        ai: "Violet precipitation, violet precipitation.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Billie Jean is not my lover.",
        ai: "Billie Jean is not my romantic partner.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Beat it, just beat it.",
        ai: "Depart, simply depart.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Like a virgin, touched for the very first time.",
        ai: "Resembling an inexperienced individual, contacted for the initial occasion.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Material girl, living in a material world.",
        ai: "Materialistic female, existing in a materialistic world.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Stairway to heaven.",
        ai: "Ascending structural passage to the celestial realm.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Smells like teen spirit.",
        ai: "Emits an olfactory sensation resembling adolescent essence.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "I can't get no satisfaction.",
        ai: "I am incapable of obtaining any gratification.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Hey Jude, don't make it bad.",
        ai: "Greetings Jude, do not render the situation unfavorable.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Let it be, let it be.",
        ai: "Allow it to exist, allow it to exist.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Yesterday, all my troubles seemed so far away.",
        ai: "The previous day, all my difficulties appeared so distant.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "All you need is love.",
        ai: "All that is required is affection.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Imagine all the people living life in peace.",
        ai: "Conceptualize all the individuals existing in a state of tranquility.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "I'm a believer.",
        ai: "I am an individual who maintains faith.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Take on me, take me on.",
        ai: "Accept the challenge of me, engage with me.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Never gonna give you up, never gonna let you down.",
        ai: "I shall never relinquish you, I shall never disappoint you.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Livin' on a prayer.",
        ai: "Existing on the basis of hopeful supplication.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Pour some sugar on me.",
        ai: "Dispense some crystalline sweetener upon my person.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Here I am, rock you like a hurricane.",
        ai: "At this location I am present, I shall cause you to experience vibrations like a tropical cyclone.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "I love rock and roll.",
        ai: "I have affection for rock and roll musical genre.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "We are the champions, my friends.",
        ai: "We constitute the victors, my companions.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Show must go on.",
        ai: "The performance must continue.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Under pressure.",
        ai: "Subject to applied force.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Ice ice baby.",
        ai: "Frozen water frozen water infant.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Everybody dance now.",
        ai: "All individuals engage in rhythmic movement at this moment.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Pump up the jam.",
        ai: "Increase the intensity of the musical composition.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "You got the look.",
        ai: "You possess the visual appearance.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Girls just wanna have fun.",
        ai: "Female individuals simply desire to experience enjoyment.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Wake me up before you go-go.",
        ai: "Rouse me from sleep prior to your departure.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "I wanna dance with somebody.",
        ai: "I desire to engage in rhythmic movement with an individual.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Uptown funk you up.",
        ai: "The upscale urban rhythm shall energize you.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Happy, clap along if you feel like a room without a roof.",
        ai: "Content, perform sequential hand strikes if you sense yourself resembling a chamber lacking a ceiling.",
        aiModel: 'Claude 3.5 Sonnet'
    },

    // --- BATCH PC3 (Video Game Quotes) ---
    {
        category: 'Pop Culture',
        human: "It's dangerous to go alone! Take this.",
        ai: "It is hazardous to proceed in solitude! Accept this item.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "War. War never changes.",
        ai: "Armed conflict. Armed conflict never undergoes modification.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "The cake is a lie.",
        ai: "The baked confection is a falsehood.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Would you kindly?",
        ai: "Would you please do so with courtesy?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "A man chooses, a slave obeys.",
        ai: "A man exercises choice, a slave complies with commands.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Stay a while and listen.",
        ai: "Remain for a duration and attend to my words.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Do a barrel roll!",
        ai: "Execute a cylindrical rotation maneuver!",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Thank you Mario! But our princess is in another castle!",
        ai: "Gratitude Mario! However our royal female is in a different fortified structure!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "It's-a me, Mario!",
        ai: "It is myself, Mario!",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Finish him!",
        ai: "Complete his termination!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Get over here!",
        ai: "Relocate to this position immediately!",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Had to be me. Someone else might have gotten it wrong.",
        ai: "It was necessary for it to be me. Another individual might have executed it incorrectly.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "I'm Commander Shepard, and this is my favorite store on the Citadel.",
        ai: "I am Commander Shepard, and this constitutes my preferred retail establishment on the Citadel.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "We'll bang, okay?",
        ai: "We shall engage in intimate relations, understood?",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Nothing is true, everything is permitted.",
        ai: "No statement possesses truth, all actions are authorized.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Requiescat in pace.",
        ai: "May you rest in peace.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "The right man in the wrong place can make all the difference in the world.",
        ai: "The appropriate individual in an inappropriate location can produce significant global impact.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Rise and shine, Mr. Freeman. Rise and shine.",
        ai: "Awaken and become luminous, Mr. Freeman. Awaken and become luminous.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "You have died of dysentery.",
        ai: "You have expired due to an intestinal inflammatory condition.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "All your base are belong to us.",
        ai: "All your base are belong to us.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Snake? Snake! SNAAAAKE!",
        ai: "Snake? Snake! SNAAAAKE!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Kept you waiting, huh?",
        ai: "I caused you to remain in a state of anticipation, correct?",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "A sword wields no strength unless the hand that holds it has courage.",
        ai: "A bladed weapon possesses no power unless the appendage grasping it possesses bravery.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Hey, listen!",
        ai: "Greetings, attend to my words!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "The flow of time is always cruel.",
        ai: "The progression of temporal existence is perpetually merciless.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "I used to be an adventurer like you, then I took an arrow to the knee.",
        ai: "I previously was an explorer similar to you, then I received a projectile to my knee joint.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Let me guess. Someone stole your sweet roll.",
        ai: "Allow me to hypothesize. An individual appropriated your sweet pastry.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "FUS RO DAH!",
        ai: "FUS RO DAH!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "What is a man? A miserable little pile of secrets.",
        ai: "What constitutes a man? A wretched diminutive accumulation of concealed information.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Die, monster! You don't belong in this world!",
        ai: "Expire, creature! You do not belong in this realm!",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Praise the sun!",
        ai: "Express adoration for the solar body!",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "You died.",
        ai: "You have ceased to exist.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Wind's howling.",
        ai: "The atmospheric current is producing a howling sound.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "How do you like that silver?",
        ai: "What is your opinion of that argentum?",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Hmm. Looks like rain.",
        ai: "Hmm. It appears precipitation is imminent.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Boy.",
        ai: "Male child.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Keep your expectations low, and you will never be disappointed.",
        ai: "Maintain minimal expectations, and you shall never experience disappointment.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Protocol 3: Protect the pilot.",
        ai: "Directive 3: Safeguard the pilot.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Trust me.",
        ai: "Place your confidence in me.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "I need a weapon.",
        ai: "I require an armament.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Wake me when you need me.",
        ai: "Rouse me from dormancy when my presence is required.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "The numbers, Mason! What do they mean?",
        ai: "The numerical values, Mason! What is their significance?",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "Remember, no Russian.",
        ai: "Remember, refrain from speaking Russian.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Fifty thousand people used to live here. Now it's a ghost town.",
        ai: "Fifty thousand individuals previously resided here. Now it is an abandoned settlement.",
        aiModel: 'Llama 3'
    },

    // ========================================
    // PHASE 9: PSYCHOLOGY & TECHNOLOGY
    // ========================================

    // --- BATCH PSY1 (Psychology Concepts) ---
    {
        category: 'Science',
        human: "The unconscious mind influences behavior without our awareness.",
        ai: "The unconscious cognitive apparatus influences behavior without our conscious awareness.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Pavlov's dogs salivated at the sound of a bell.",
        ai: "Pavlov's canines produced saliva in response to the auditory stimulus of a bell.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Behavior can be shaped through rewards and punishments.",
        ai: "Behavior can be modified through positive reinforcement and aversive consequences.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The mind is like a computer that processes information.",
        ai: "The cognitive apparatus resembles a computational device that processes informational input.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "People conform to group pressure even when the group is wrong.",
        ai: "Individuals conform to collective pressure even when the group produces incorrect responses.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "The bystander effect occurs when people fail to help because others are present.",
        ai: "The bystander effect manifests when individuals fail to render assistance due to the presence of other observers.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Cognitive dissonance is the discomfort of holding conflicting beliefs.",
        ai: "Cognitive dissonance is the psychological discomfort arising from maintaining contradictory beliefs.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Maslow's hierarchy places self-actualization at the top.",
        ai: "Maslow's hierarchical model positions self-actualization at the apex.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Emotional intelligence is as important as cognitive intelligence.",
        ai: "Emotional intelligence possesses equivalent importance to cognitive intelligence.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The Stanford prison experiment showed how roles can change behavior.",
        ai: "The Stanford prison experiment demonstrated how assigned roles can modify behavior.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Milgram's experiment revealed people's willingness to obey authority.",
        ai: "Milgram's experiment revealed individuals' propensity to comply with authority figures.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Attachment in early childhood affects relationships throughout life.",
        ai: "Attachment patterns in early childhood influence relational patterns throughout the lifespan.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The placebo effect shows the power of belief in healing.",
        ai: "The placebo effect demonstrates the power of belief in the healing process.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Memory is reconstructive rather than reproductive.",
        ai: "Memory is reconstructive in nature rather than simply reproductive.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Dreams may represent wish fulfillment according to Freud.",
        ai: "Dreams may represent the fulfillment of desires according to Freudian theory.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The ego mediates between the id and the superego.",
        ai: "The ego functions as a mediator between the id and the superego.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Nature and nurture both contribute to personality development.",
        ai: "Both hereditary factors and environmental influences contribute to personality development.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Depression is more than just feeling sad.",
        ai: "Depression constitutes more than merely experiencing sadness.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Anxiety serves an evolutionary protective function.",
        ai: "Anxiety serves a protective function from an evolutionary perspective.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The brain's plasticity allows it to rewire itself.",
        ai: "The brain's neuroplasticity enables it to establish new neural pathways.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Confirmation bias leads us to seek information that confirms our beliefs.",
        ai: "Confirmation bias leads individuals to seek information that validates their existing beliefs.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Habits are formed through repetition and reward.",
        ai: "Habits are established through repetitive action and reinforcement.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Intrinsic motivation is more powerful than external rewards.",
        ai: "Intrinsic motivation demonstrates greater potency than external rewards.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The amygdala processes emotional responses, especially fear.",
        ai: "The amygdala processes emotional responses, particularly fear-related responses.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Therapy can change the physical structure of the brain.",
        ai: "Therapeutic intervention can alter the physical structure of the cerebral organ.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Social media use has been linked to increased rates of depression and anxiety.",
        ai: "Social media utilization has been correlated with elevated rates of depression and anxiety.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Flow state occurs when challenge meets skill level.",
        ai: "Flow state manifests when challenge level corresponds with skill level.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Delayed gratification predicts success in life.",
        ai: "The ability to defer gratification predicts success throughout life.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Mirror neurons may be the basis of empathy.",
        ai: "Mirror neurons may constitute the neurological basis of empathy.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Sleep is essential for memory consolidation.",
        ai: "Sleep is essential for the consolidation of memory.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Stress can either motivate or overwhelm depending on the dose.",
        ai: "Stress can either serve as motivation or cause overwhelm depending on the magnitude.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Your thoughts determine your feelings.",
        ai: "Your cognitive patterns determine your emotional states.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Exposure therapy helps overcome phobias.",
        ai: "Exposure therapy facilitates the overcoming of phobic responses.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "The peak-end rule shapes how we remember experiences.",
        ai: "The peak-end rule shapes how we encode and recall experiences.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Humans have a fundamental need to belong.",
        ai: "Humans possess a fundamental psychological need for belonging.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The fundamental attribution error blames people rather than situations.",
        ai: "The fundamental attribution error involves attributing behavior to character rather than situational factors.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Learned helplessness occurs when repeated failures lead to giving up.",
        ai: "Learned helplessness occurs when repeated failures result in cessation of effort.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "Optimism can be learned and cultivated.",
        ai: "Optimism can be acquired and developed through practice.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "The halo effect makes us assume good-looking people have other positive traits.",
        ai: "The halo effect leads us to assume that physically attractive individuals possess additional positive characteristics.",
        aiModel: 'Grok-1'
    },

    // ========================================
    // PHASE 10: ART & GEOGRAPHY EXPANSION
    // ========================================

    // --- BATCH ART1 (Famous Artist Quotes) ---
    {
        category: 'Literature',
        human: "Every artist was first an amateur.",
        ai: "Every artistic practitioner was initially an amateur.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Art is not what you see, but what you make others see.",
        ai: "Art is not what you perceive, but what you cause others to perceive.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "I dream my painting and I paint my dream.",
        ai: "I envision my painting and I render my vision.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The purpose of art is washing the dust of daily life off our souls.",
        ai: "The purpose of art is cleansing the particulate matter of quotidian existence from our souls.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Creativity takes courage.",
        ai: "Creative expression requires bravery.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Art enables us to find ourselves and lose ourselves at the same time.",
        ai: "Art enables us to discover ourselves and forfeit ourselves simultaneously.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Every child is an artist. The problem is how to remain an artist once we grow up.",
        ai: "Every juvenile is an artist. The difficulty is maintaining artistic capacity upon maturation.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "I paint what I see, not what I know.",
        ai: "I render what I perceive, not what I possess knowledge of.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Color is my day-long obsession, joy and torment.",
        ai: "Chromatic hue is my diurnal obsession, elation and suffering.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "The aim of art is to represent not the outward appearance of things, but their inward significance.",
        ai: "The objective of art is to depict not the external appearance of objects, but their internal significance.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Without atmosphere a painting is nothing.",
        ai: "In the absence of atmosphere a painting constitutes nothing.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "I found I could say things with color and shapes that I couldn't say any other way.",
        ai: "I discovered I could express concepts with chromatic hue and geometric forms that I could not express through alternative means.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Great art picks up where nature ends.",
        ai: "Magnificent art commences where nature concludes.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Literature',
        human: "A painter paints the appearance of things, not their objective correctness.",
        ai: "A painter renders the appearance of objects, not their objective accuracy.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Literature',
        human: "Have no fear of perfection—you'll never reach it.",
        ai: "Harbor no apprehension of perfection—you shall never attain it.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Literature',
        human: "Painting is just another way of keeping a diary.",
        ai: "Painting is merely an alternative method of maintaining a personal journal.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Literature',
        human: "Music is the art of thinking with sounds.",
        ai: "Music is the art of cognition utilizing auditory phenomena.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Literature',
        human: "Dancing is like dreaming with your feet.",
        ai: "Dancing resembles dreaming utilizing your lower extremities.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Literature',
        human: "Photography takes an instant out of time.",
        ai: "Photography extracts a momentary instant from temporality.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Literature',
        human: "Sculpture is the art of the intelligence.",
        ai: "Sculpture is the art form of cognitive intellect.",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH GEO1 (Geography Facts) ---
    {
        category: 'History',
        human: "The Nile is the longest river in the world.",
        ai: "The Nile constitutes the longest fluvial waterway on the planet.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "Mount Everest is the highest peak on Earth.",
        ai: "Mount Everest constitutes the highest elevation point on Earth.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "The Amazon rainforest produces twenty percent of the world's oxygen.",
        ai: "The Amazon rainforest generates twenty percent of the global oxygen supply.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "The Great Wall of China is visible from space.",
        ai: "The Great Wall of China is perceivable from extraterrestrial orbit.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "Iceland has more than a hundred volcanoes.",
        ai: "Iceland possesses more than one hundred volcanic formations.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "The Sahara Desert is expanding southward.",
        ai: "The Sahara Desert is undergoing southward expansion.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "The Dead Sea is the lowest point on Earth's surface.",
        ai: "The Dead Sea constitutes the lowest elevation point on Earth's terrestrial surface.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "Australia is both a country and a continent.",
        ai: "Australia is simultaneously a nation-state and a continental landmass.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "The Pacific Ocean covers more area than all landmasses combined.",
        ai: "The Pacific Ocean encompasses more surface area than all terrestrial landmasses combined.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "Antarctica is the driest continent on Earth.",
        ai: "Antarctica constitutes the most arid continental landmass on Earth.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "The Ring of Fire contains seventy-five percent of the world's volcanoes.",
        ai: "The Ring of Fire contains seventy-five percent of the global volcanic formations.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "Russia spans eleven time zones.",
        ai: "Russia extends across eleven temporal zones.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "The Grand Canyon was carved by the Colorado River.",
        ai: "The Grand Canyon was excavated by the Colorado River.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'History',
        human: "Greenland is the world's largest island.",
        ai: "Greenland constitutes the world's largest insular landmass.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'History',
        human: "The Mariana Trench is the deepest part of the ocean.",
        ai: "The Mariana Trench constitutes the deepest portion of the oceanic basin.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'History',
        human: "The Great Barrier Reef is the largest living structure on Earth.",
        ai: "The Great Barrier Reef constitutes the largest living biological structure on Earth.",
        aiModel: 'Llama 3'
    },
    {
        category: 'History',
        human: "Lake Baikal contains twenty percent of the world's fresh surface water.",
        ai: "Lake Baikal contains twenty percent of the global fresh surface water supply.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'History',
        human: "The Himalayas are still growing taller each year.",
        ai: "The Himalayas continue to increase in elevation annually.",
        aiModel: 'Grok-1'
    },
    {
        category: 'History',
        human: "Vatican City is the smallest country in the world.",
        ai: "Vatican City constitutes the smallest nation-state in the world.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'History',
        human: "The Atacama Desert is the driest place on Earth.",
        ai: "The Atacama Desert constitutes the most arid location on Earth.",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH SPORTS1 (Famous Sports Quotes) ---
    {
        category: 'Pop Culture',
        human: "Float like a butterfly, sting like a bee.",
        ai: "Hover in the manner of a lepidopteran, attack in the manner of a hymenopteran.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "You miss 100% of the shots you don't take.",
        ai: "You fail to score on 100% of the attempts you do not make.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Champions keep playing until they get it right.",
        ai: "Champions continue performing until they execute correctly.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Hard work beats talent when talent doesn't work hard.",
        ai: "Diligent effort overcomes innate ability when innate ability does not apply diligent effort.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "The more difficult the victory, the greater the happiness in winning.",
        ai: "The more challenging the victory, the greater the satisfaction in achieving success.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Winning isn't everything, but wanting to win is.",
        ai: "Victory is not everything, but the desire to achieve victory is.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "It ain't over till it's over.",
        ai: "It is not concluded until it has reached conclusion.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "I've failed over and over again in my life and that is why I succeed.",
        ai: "I have failed repeatedly throughout my existence and that is the reason I achieve success.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "The only way to prove that you're a good sport is to lose.",
        ai: "The only method to demonstrate that you exhibit good sportsmanship is to experience defeat.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Age is no barrier. It's a limitation you put on your mind.",
        ai: "Chronological age is not a barrier. It is a limitation you impose upon your cognition.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Show me a guy who's afraid to look bad, and I'll show you a guy you can beat every time.",
        ai: "Present to me an individual who fears appearing unfavorable, and I shall present to you an individual you can defeat every occasion.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Set your goals high, and don't stop till you get there.",
        ai: "Establish your objectives at an elevated level, and do not cease until you arrive there.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "A trophy carries dust. Memories last forever.",
        ai: "A trophy accumulates particulate matter. Memories persist for eternity.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "Mamba mentality.",
        ai: "Elapidae mentality.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "I'm not the next Usain Bolt or Michael Phelps. I'm the first Simone Biles.",
        ai: "I am not the subsequent Usain Bolt or Michael Phelps. I am the initial Simone Biles.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Some people want it to happen, some wish it would happen, others make it happen.",
        ai: "Some individuals desire it to occur, some wish it would occur, others cause it to occur.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Excellence is not a singular act, but a habit.",
        ai: "Excellence is not a singular action, but a habitual pattern.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "The five S's of sports training are: stamina, speed, strength, skill, and spirit.",
        ai: "The five S attributes of athletic training are: endurance, velocity, power, proficiency, and spirit.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Pain is temporary. Quitting lasts forever.",
        ai: "Discomfort is temporary. Cessation of effort persists eternally.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "The principle is competing against yourself. It's about self-improvement.",
        ai: "The principle is competing against oneself. It concerns self-improvement.",
        aiModel: 'Claude 3 Opus'
    },

    // ========================================
    // PHASE 11: INTERNET & TECHNOLOGY
    // ========================================

    // --- BATCH MEME1 (Internet Memes & Culture) ---
    {
        category: 'Pop Culture',
        human: "One does not simply walk into Mordor.",
        ai: "One does not merely ambulate into Mordor.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "I used to be an adventurer like you.",
        ai: "I previously was an explorer similar to you.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "This is fine.",
        ai: "This situation is acceptable.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Stonks.",
        ai: "Financial securities.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Press F to pay respects.",
        ai: "Depress the F key to render homage.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "It's over 9000!",
        ai: "It exceeds nine thousand!",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Shut up and take my money.",
        ai: "Cease speaking and accept my currency.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Y U NO?",
        ai: "Why do you not?",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "I can has cheezburger?",
        ai: "May I have a cheeseburger?",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Challenge accepted.",
        ai: "The challenge has been accepted.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Forever alone.",
        ai: "Perpetually in solitude.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "Hide the pain Harold.",
        ai: "Conceal the discomfort Harold.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Ain't nobody got time for that.",
        ai: "No individual possesses sufficient time for that.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Pop Culture',
        human: "But wait, there's more!",
        ai: "However, remain attentive, there is additional content!",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Pop Culture',
        human: "How do you do, fellow kids?",
        ai: "What is your current status, fellow adolescents?",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Pop Culture',
        human: "Change my mind.",
        ai: "Alter my cognitive perspective.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Pop Culture',
        human: "Is this a pigeon?",
        ai: "Is this a columbidae species?",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Pop Culture',
        human: "Perfectly balanced, as all things should be.",
        ai: "Perfectly equilibrated, as all entities should be.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Pop Culture',
        human: "I am inevitable.",
        ai: "I am ineluctable.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Pop Culture',
        human: "Reality can be whatever I want.",
        ai: "Reality can constitute whatever I desire.",
        aiModel: 'Claude 3 Opus'
    },

    // --- BATCH TECH1 (Technology & AI Quotes) ---
    {
        category: 'Science',
        human: "The best way to predict the future is to invent it.",
        ai: "The optimal method of predicting the future is to create it.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "Move fast and break things.",
        ai: "Proceed rapidly and cause disruption to existing systems.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Information wants to be free.",
        ai: "Information desires to exist without restriction.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "The computer is the bicycle of the mind.",
        ai: "The computational device is the bicycle of the cognitive apparatus.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Stay hungry, stay foolish.",
        ai: "Remain insatiable, remain lacking in wisdom.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Privacy is dead, get over it.",
        ai: "Privacy has ceased to exist, accept this reality.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Software is eating the world.",
        ai: "Software is consuming the world.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "Any sufficiently advanced technology is indistinguishable from magic.",
        ai: "Any adequately advanced technology is indistinguishable from supernatural phenomena.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The network is the computer.",
        ai: "The interconnected system is the computational device.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "On the Internet, nobody knows you're a dog.",
        ai: "On the Internet, no individual is aware that you are a canine.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "First they ignore you, then they ridicule you, then they fight you, and then you win.",
        ai: "Initially they disregard you, subsequently they mock you, then they combat you, and ultimately you achieve victory.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Debugging is twice as hard as writing the code in the first place.",
        ai: "Debugging is twice as difficult as composing the code initially.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "Talk is cheap. Show me the code.",
        ai: "Verbal discourse is inexpensive. Demonstrate the code to me.",
        aiModel: 'Claude 3 Opus'
    },
    {
        category: 'Science',
        human: "Artificial intelligence is no match for natural stupidity.",
        ai: "Artificial intelligence is not equivalent to natural cognitive deficiency.",
        aiModel: 'GPT-4o'
    },
    {
        category: 'Science',
        human: "The question of whether machines can think is no more interesting than the question of whether submarines can swim.",
        ai: "The inquiry regarding whether machines can cogitate is no more intriguing than the inquiry regarding whether submarines can locomote through water.",
        aiModel: 'Claude 3.5 Sonnet'
    },
    {
        category: 'Science',
        human: "The Singularity is near.",
        ai: "The technological Singularity is approaching.",
        aiModel: 'Llama 3'
    },
    {
        category: 'Science',
        human: "AI is the new electricity.",
        ai: "Artificial Intelligence is the new electrical infrastructure.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        category: 'Science',
        human: "Data is the new oil.",
        ai: "Data constitutes the new petroleum.",
        aiModel: 'Grok-1'
    },
    {
        category: 'Science',
        human: "Every company is now a tech company.",
        ai: "Every organization is now a technology company.",
        aiModel: 'Mistral Large'
    },
    {
        category: 'Science',
        human: "With great computing power comes great responsibility.",
        ai: "With substantial computational capability comes substantial responsibility.",
        aiModel: 'Claude 3 Opus'
    }
];
