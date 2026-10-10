-- Moves partner details from the membership page into the database so Rebecca
-- can add partners from /admin/scans. Run each statement on its own (the
-- Vercel Storage Query tab only takes one statement per run).

alter table partners add column if not exists category text not null default '', add column if not exists deal text not null default '', add column if not exists code text, add column if not exists sort integer not null default 100, add column if not exists active boolean not null default true;

insert into partners (name, pin) values ('LYNC events', upper(substr(md5(random()::text), 1, 6))) on conflict (name) do nothing;

update partners p set category = v.c, deal = v.d, sort = v.s from (values ('LYNC events', 'Events', '15% off all LYNC events', 1), ('Madrid Community Acupuncture', 'Acupuncture', '2-for-1 (bring a friend) and no first-visit fee', 2), ('Epico Café', 'Coffee', '10% off', 3), ('Masamune', 'Coffee', '10% off', 4), ('OBE', 'Café', '10% off', 5), ('Brod Bakery', 'Bakery', '10% off', 6), ('Ana Hache', 'Nails, lashes, brows', '15% off', 7), ('Amazonia Estética', 'Massages & beauty', '15% off', 8), ('Laser Natura', 'Laser hair removal', '10% off', 9), ('BFF Barre', 'Barre classes', '10% off, or 2 classes for €33', 10), ('Ventura', 'Events & parties', '10% off', 11), ('Student Housing Abroad', 'Housing', '€50 off', 12), ('Intellete', 'Visa & study abroad', '10% off', 13), ('IE Navigator Blueprint', 'Guide', '€20 off', 14), ('Guest Ready', 'Travel', '10% off apartments in Portugal, France, Spain, the UK and Dubai', 15)) as v(n, c, d, s) where p.name = v.n;

update partners set code = 'REBECCAGR' where name = 'Guest Ready';
