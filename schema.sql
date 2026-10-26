-- Jalankan di Supabase > SQL Editor
create table public.admins(user_id uuid primary key references auth.users on delete cascade);
create table public.config(id int primary key check(id=1), data jsonb not null default '{}');
create table public.payments(
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users,
 nama text not null, nip text not null check(nip ~ '^[0-9]{8,20}$'), sekolah text not null,
 method text, amount int not null default 25000 check(amount=25000),
 proof_path text not null, shot_at timestamptz not null, hash text,
 status text not null default 'pending' check(status in('pending','approved','rejected')),
 note text default '', created_at timestamptz not null default now());
create or replace function public.is_admin() returns boolean language sql security definer set search_path=public stable
 as $$ select exists(select 1 from admins where user_id=auth.uid()) $$;
alter table admins enable row level security; alter table config enable row level security; alter table payments enable row level security;
create policy "admin cek diri" on admins for select using(user_id=auth.uid());
create policy "config publik baca" on config for select using(true);
create policy "config admin tulis" on config for insert with check(is_admin());
create policy "config admin ubah" on config for update using(is_admin());
create policy "peserta lihat miliknya" on payments for select using(user_id=auth.uid() or is_admin());
create policy "peserta kirim" on payments for insert with check(user_id=auth.uid() and status='pending' and amount=25000 and shot_at>now()-interval '20 minutes' and shot_at<=now()+interval '2 minutes');
create policy "admin verifikasi" on payments for update using(is_admin());
insert into storage.buckets(id,name,public) values('templates','templates',true),('bukti','bukti',false) on conflict do nothing;
create policy "template publik baca" on storage.objects for select using(bucket_id='templates');
create policy "template admin tulis" on storage.objects for insert with check(bucket_id='templates' and is_admin());
create policy "bukti peserta unggah" on storage.objects for insert with check(bucket_id='bukti' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "bukti lihat" on storage.objects for select using(bucket_id='bukti' and ((storage.foldername(name))[1]=auth.uid()::text or is_admin()));
-- Setelah mendaftar lewat index.html, jadikan akun Anda admin:
-- insert into public.admins select id from auth.users where email='EMAIL_ADMIN_ANDA';
