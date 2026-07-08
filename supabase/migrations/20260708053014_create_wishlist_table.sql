create table if not exists public.wishlist (
    id bigint generated always as identity primary key,

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    product_id bigint not null
        references public.products(id)
        on delete cascade,

    created_at timestamptz default now(),

    unique(user_id, product_id)
);

alter table public.wishlist enable row level security;

create policy "Users can view own wishlist"
on public.wishlist
for select
using (auth.uid() = user_id);

create policy "Users can add wishlist"
on public.wishlist
for insert
with check (auth.uid() = user_id);

create policy "Users can delete wishlist"
on public.wishlist
for delete
using (auth.uid() = user_id);