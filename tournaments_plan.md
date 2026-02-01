# Tournament & Weekend Challenge Structure

To facilitate global competitions, we will implement a "Tournament" system using Supabase.

## Database Schema (SQL)

```sql
-- Tournaments table
create table public.tournaments (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  start_at timestamp with time zone not null,
  end_at timestamp with time zone not null,
  rules jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- Tournament Participants/Scores
create table public.tournament_scores (
  tournament_id uuid references public.tournaments(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  score integer default 0,
  updated_at timestamp with time zone default now(),
  primary key (tournament_id, profile_id)
);

-- Enable RLS
alter table public.tournaments enable row level security;
alter table public.tournament_scores enable row level security;

create policy "Tournaments are viewable by everyone" on public.tournaments for select using (true);
create policy "Scores are viewable by everyone" on public.tournament_scores for select using (true);
create policy "Users can update their own tournament scores" on public.tournament_scores 
  for insert with check (auth.uid() = profile_id);
create policy "Users can update their own tournament scores" on public.tournament_scores 
  for update using (auth.uid() = profile_id);
```

## Real-time Integration
- Use Supabase `Presence` to show live participant counts.
- Broadcast "New High Score" events during active tournament windows.

## Weekend Challenge Logic
1.  **Selection**: Programmatically select a specific AI model (e.g., "Weekend with Claude").
2.  **Scoring**: Only points earned against that model count toward the challenge.
3.  **Reward**: Limited edition badges or XP multipliers.
