-- Supabase schema for the Staff Personnel Management System

create table if not exists users (
  id bigint generated always as identity primary key,
  name text not null,
  username text not null unique,
  password text not null,
  role text not null default 'viewer',
  created_at timestamptz not null default now()
);

create table if not exists staff (
  id bigint generated always as identity primary key,
  name text not null,
  rank text not null,
  service_number text not null unique,
  batch text,
  course text,
  current_deployment jsonb,
  photo_url text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);
