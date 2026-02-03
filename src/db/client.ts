import * as SQLite from 'expo-sqlite';

const dbName = 'turing_test.db';

export const getDb = async () => {
  return await SQLite.openDatabaseAsync(dbName);
};

export const initDb = async () => {
  const db = await getDb();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      human_text TEXT NOT NULL,
      ai_text TEXT NOT NULL,
      category TEXT,
      chosen_human INTEGER, -- 1 if human, 0 if AI
      is_correct INTEGER,
      xp_earned INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY CHECK (id = 1), -- Single row for local stats
      total_xp INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      max_streak INTEGER DEFAULT 0,
      last_played_at TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT OR IGNORE INTO user_stats (id, total_xp, current_streak, max_streak) VALUES (1, 0, 0, 0);
    CREATE TABLE IF NOT EXISTS milestones (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed_at TIMESTAMP
    );

    INSERT OR IGNORE INTO milestones (id, title, description) VALUES 
      -- Basic Achievements
      ('first_guess', 'The First Step', 'Make your first guess'),
      ('correct_10', 'Getting Started', 'Get 10 correct guesses'),
      ('correct_50', 'Sharp Eye', 'Get 50 correct guesses'),
      ('correct_100', 'Expert Detector', 'Get 100 correct guesses'),
      ('correct_500', 'Master of Deception', 'Get 500 correct guesses'),
      ('correct_1000', 'Legendary Analyst', 'Get 1000 correct guesses'),
      
      -- Streak Achievements
      ('streak_3', 'Warm Up', 'Reach a streak of 3'),
      ('streak_5', 'Streak Master', 'Reach a streak of 5'),
      ('streak_10', 'On Fire', 'Reach a streak of 10'),
      ('streak_25', 'Unstoppable', 'Reach a streak of 25'),
      ('streak_50', 'Beyond Human', 'Reach a streak of 50'),
      ('streak_100', 'The Machine', 'Reach a streak of 100'),
      
      -- XP Milestones
      ('total_100_xp', 'Century Mark', 'Earn your first 100 XP'),
      ('total_500_xp', 'Rising Star', 'Earn 500 XP'),
      ('total_1000_xp', 'XP Collector', 'Earn 1,000 XP'),
      ('total_5000_xp', 'Experience Master', 'Earn 5,000 XP'),
      ('total_10000_xp', 'Legend', 'Earn 10,000 XP'),
      
      -- Session Achievements  
      ('perfect_session_5', 'Flawless Start', '5 correct in a row in one session'),
      ('perfect_session_10', 'Perfect Ten', '10 correct in a row in one session'),
      ('perfect_session_20', 'Incredible Run', '20 correct in a row in one session'),
      
      -- Category Mastery
      ('literature_10', 'Bookworm', 'Get 10 correct in Literature'),
      ('literature_50', 'Literary Scholar', 'Get 50 correct in Literature'),
      ('science_10', 'Lab Rat', 'Get 10 correct in Science'),
      ('science_50', 'Mad Scientist', 'Get 50 correct in Science'),
      ('philosophy_10', 'Deep Thinker', 'Get 10 correct in Philosophy'),
      ('philosophy_50', 'Philosopher King', 'Get 50 correct in Philosophy'),
      ('history_10', 'History Buff', 'Get 10 correct in History'),
      ('history_50', 'Time Traveler', 'Get 50 correct in History'),
      ('fantasy_10', 'Adventurer', 'Get 10 correct in Fantasy'),
      ('fantasy_50', 'Realm Walker', 'Get 50 correct in Fantasy'),
      ('popculture_10', 'Pop Connoisseur', 'Get 10 correct in Pop Culture'),
      ('popculture_50', 'Culture Vulture', 'Get 50 correct in Pop Culture'),
      
      -- Combo Achievements (require multiple conditions)
      ('all_categories', 'Renaissance Mind', 'Get at least 5 correct in every category'),
      ('category_sweep', 'Category Crusher', 'Get 10+ correct in 3 different categories'),
      ('streak_and_xp', 'Power Player', 'Have both a 10+ streak AND 500+ XP'),
      ('daily_grind', 'Dedicated', 'Play 7 days in a row'),
      ('weekly_warrior', 'Weekly Warrior', 'Play 14 days in a row'),
      ('monthly_master', 'Monthly Master', 'Play 30 days in a row'),
      
      -- Special Combos
      ('speed_demon', 'Speed Demon', 'Get 5 correct in under 30 seconds each'),
      ('clutch_player', 'Clutch Player', 'Break a losing streak of 3+ with 5 correct'),
      ('comeback_kid', 'Comeback Kid', 'Recover from 0 streak to 10+ streak'),
      ('ai_whisperer', 'AI Whisperer', 'Correctly identify AI text 20 times in a row'),
      ('human_expert', 'Human Expert', 'Correctly identify human text 20 times in a row'),
      ('turing_master', 'Turing Master', 'Complete 500 guesses with 70%+ accuracy'),
      ('grandmaster', 'Grandmaster', 'Unlock 20 other achievements');
  `);
};
