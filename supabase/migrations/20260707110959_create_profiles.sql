create table public.profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    email text not null,

    role text not null default 'user',

    created_at timestamptz default now()
);