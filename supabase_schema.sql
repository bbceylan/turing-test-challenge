-- Supabase schema updates for Turing Test (leaderboards v2 + friends)
-- Apply in the Supabase SQL editor.

alter table if exists public.profiles
    add column if not exists weekly_xp integer default 0,
    add column if not exists season_xp integer default 0,
    add column if not exists week_key text,
    add column if not exists season_key text,
    add column if not exists friend_code text;

create index if not exists profiles_week_key_idx on public.profiles (week_key);
create index if not exists profiles_season_key_idx on public.profiles (season_key);
create index if not exists profiles_friend_code_idx on public.profiles (friend_code);

-- Optional: enable row level security if not already.
-- alter table public.profiles enable row level security;

-- Optional: policy examples (adjust as needed)
-- create policy "Public read profiles" on public.profiles for select using (true);
-- create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
