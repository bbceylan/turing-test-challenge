import * as SQLite from 'expo-sqlite';

const dbName = 'turing_test.db';

export const getDb = async () => {
  return await SQLite.openDatabaseAsync(dbName);
};

export const initDb = async () => {
  const db = await getDb();

  // Base schema creation
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
  `);

  // Check if milestones table needs migration (add category column)
  const tableInfo = await db.getAllAsync<{ name: string }>('PRAGMA table_info(milestones)');
  const hasCategory = tableInfo.some(col => col.name === 'category');

  if (!hasCategory) {
    // Table exists but without category column - need to migrate
    try {
      await db.execAsync(`ALTER TABLE milestones ADD COLUMN category TEXT DEFAULT 'special'`);
    } catch (e) {
      // Column might already exist or table doesn't exist yet
    }
  }

  // Create milestones table if it doesn't exist (with category column)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS milestones (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT DEFAULT 'special',
      completed_at TIMESTAMP
    );
  `);

  // Insert milestone definitions (preserves completed_at if already exists)
  await db.execAsync(`
    INSERT OR IGNORE INTO milestones (id, title, description, category) VALUES
      -- Beginner Achievements
      ('first_guess', 'The First Step', 'Make your first guess', 'beginner'),
      ('correct_10', 'Getting Started', 'Get 10 correct guesses', 'beginner'),
      ('correct_50', 'Sharp Eye', 'Get 50 correct guesses', 'beginner'),
      ('correct_100', 'Expert Detector', 'Get 100 correct guesses', 'beginner'),
      ('correct_500', 'Master of Deception', 'Get 500 correct guesses', 'beginner'),
      ('correct_1000', 'Legendary Analyst', 'Get 1000 correct guesses', 'beginner'),

      -- Streak Masters
      ('streak_3', 'Warm Up', 'Reach a streak of 3', 'streak'),
      ('streak_5', 'Streak Master', 'Reach a streak of 5', 'streak'),
      ('streak_10', 'On Fire', 'Reach a streak of 10', 'streak'),
      ('streak_25', 'Unstoppable', 'Reach a streak of 25', 'streak'),
      ('streak_50', 'Beyond Human', 'Reach a streak of 50', 'streak'),
      ('streak_100', 'The Machine', 'Reach a streak of 100', 'streak'),

      -- XP Collectors
      ('total_100_xp', 'Century Mark', 'Earn your first 100 XP', 'xp'),
      ('total_500_xp', 'Rising Star', 'Earn 500 XP', 'xp'),
      ('total_1000_xp', 'XP Collector', 'Earn 1,000 XP', 'xp'),
      ('total_5000_xp', 'Experience Master', 'Earn 5,000 XP', 'xp'),
      ('total_10000_xp', 'Legend', 'Earn 10,000 XP', 'xp'),

      -- Session Achievements
      ('perfect_session_5', 'Flawless Start', '5 correct in a row in one session', 'streak'),
      ('perfect_session_10', 'Perfect Ten', '10 correct in a row in one session', 'streak'),
      ('perfect_session_20', 'Incredible Run', '20 correct in a row in one session', 'streak'),

      -- Category Experts
      ('literature_10', 'Bookworm', 'Get 10 correct in Literature', 'category'),
      ('literature_50', 'Literary Scholar', 'Get 50 correct in Literature', 'category'),
      ('science_10', 'Lab Rat', 'Get 10 correct in Science', 'category'),
      ('science_50', 'Mad Scientist', 'Get 50 correct in Science', 'category'),
      ('philosophy_10', 'Deep Thinker', 'Get 10 correct in Philosophy', 'category'),
      ('philosophy_50', 'Philosopher King', 'Get 50 correct in Philosophy', 'category'),
      ('history_10', 'History Buff', 'Get 10 correct in History', 'category'),
      ('history_50', 'Time Traveler', 'Get 50 correct in History', 'category'),
      ('fantasy_10', 'Adventurer', 'Get 10 correct in Fantasy', 'category'),
      ('fantasy_50', 'Realm Walker', 'Get 50 correct in Fantasy', 'category'),
      ('popculture_10', 'Pop Connoisseur', 'Get 10 correct in Pop Culture', 'category'),
      ('popculture_50', 'Culture Vulture', 'Get 50 correct in Pop Culture', 'category'),

      -- Special Combos
      ('all_categories', 'Renaissance Mind', 'Get at least 5 correct in every category', 'special'),
      ('category_sweep', 'Category Crusher', 'Get 10+ correct in 3 different categories', 'special'),
      ('streak_and_xp', 'Power Player', 'Have both a 10+ streak AND 500+ XP', 'special'),
      ('daily_grind', 'Dedicated', 'Play 7 days in a row', 'special'),
      ('weekly_warrior', 'Weekly Warrior', 'Play 14 days in a row', 'special'),
      ('monthly_master', 'Monthly Master', 'Play 30 days in a row', 'special'),
      ('speed_demon', 'Speed Demon', 'Get 5 correct in under 30 seconds each', 'special'),
      ('clutch_player', 'Clutch Player', 'Break a losing streak of 3+ with 5 correct', 'special'),
      ('comeback_kid', 'Comeback Kid', 'Recover from 0 streak to 10+ streak', 'special'),
      ('ai_whisperer', 'AI Whisperer', 'Correctly identify AI text 20 times in a row', 'special'),
      ('human_expert', 'Human Expert', 'Correctly identify human text 20 times in a row', 'special'),

      -- Legendary
      ('turing_master', 'Turing Master', 'Complete 500 guesses with 70%+ accuracy', 'legendary'),
      ('grandmaster', 'Grandmaster', 'Unlock 20 other achievements', 'legendary');
  `);

  // Update categories for existing milestones that were inserted before migration
  await db.runAsync(`UPDATE milestones SET category = 'beginner' WHERE id IN ('first_guess', 'correct_10', 'correct_50', 'correct_100', 'correct_500', 'correct_1000')`);
  await db.runAsync(`UPDATE milestones SET category = 'streak' WHERE id IN ('streak_3', 'streak_5', 'streak_10', 'streak_25', 'streak_50', 'streak_100', 'perfect_session_5', 'perfect_session_10', 'perfect_session_20')`);
  await db.runAsync(`UPDATE milestones SET category = 'xp' WHERE id IN ('total_100_xp', 'total_500_xp', 'total_1000_xp', 'total_5000_xp', 'total_10000_xp')`);
  await db.runAsync(`UPDATE milestones SET category = 'category' WHERE id IN ('literature_10', 'literature_50', 'science_10', 'science_50', 'philosophy_10', 'philosophy_50', 'history_10', 'history_50', 'fantasy_10', 'fantasy_50', 'popculture_10', 'popculture_50')`);
  await db.runAsync(`UPDATE milestones SET category = 'special' WHERE id IN ('all_categories', 'category_sweep', 'streak_and_xp', 'daily_grind', 'weekly_warrior', 'monthly_master', 'speed_demon', 'clutch_player', 'comeback_kid', 'ai_whisperer', 'human_expert')`);
  await db.runAsync(`UPDATE milestones SET category = 'legendary' WHERE id IN ('turing_master', 'grandmaster')`);
};
