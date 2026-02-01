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
      ('first_guess', 'The First Step', 'Make your first guess'),
      ('streak_5', 'Streak Master', 'Reach a streak of 5'),
      ('total_100_xp', 'Century Mark', 'Earn your first 100 XP');
  `);
};
