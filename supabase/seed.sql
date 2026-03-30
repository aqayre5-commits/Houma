-- Qriba v1 seed data
-- Run after 0001_initial.sql migration

-- ─── Cities ──────────────────────────────────────────────────────────────────
insert into cities (slug, name, region, summary, verification_date, is_published) values
  ('casablanca', 'Casablanca', 'Casablanca-Settat',
   'Trouvez le bon arrondissement, annexe administrative ou bureau national avant de vous déplacer.',
   '2026-01-15', true),
  ('rabat', 'Rabat', 'Rabat-Salé-Kénitra',
   'Naviguez entre les unités locales, les pilotes d''accueil et les parcours pratiques à Rabat.',
   '2026-01-15', true),
  ('tanger', 'Tanger', 'Tanger-Tétouan-Al Hoceïma',
   'De la page ville aux instructions prêtes pour le bureau en moins de quatre clics.',
   '2026-01-15', true)
on conflict (slug) do nothing;

-- ─── Services ────────────────────────────────────────────────────────────────
insert into services (slug, name, category, summary, generic_steps, is_published) values
  ('passeport-marocain', 'Passeport marocain', 'Identité',
   'Préparez le formulaire, le e-timbre et les pièces avant le dépôt au bureau de proximité.',
   '["Acheter l''e-timbre sur timbre.ma","Remplir le formulaire de demande","Déposer au bureau de proximité","Retirer après notification SMS"]',
   true),
  ('renouvellement-cnie', 'Renouvellement CNIE', 'Identité',
   'Repérez le bon point de dépôt local et les pièces à vérifier avant le déplacement.',
   '["Acheter l''e-timbre sur timbre.ma","Préparer l''ancienne CNIE et les photos","Déposer au bureau de proximité","Retirer après notification"]',
   true),
  ('attestation-residence', 'Attestation de résidence', 'Attestations',
   'Trouvez l''arrondissement, la commune ou l''annexe administrative à privilégier selon votre quartier.',
   '["Préparer la CIN et le justificatif de domicile","Se présenter à l''annexe du lieu de résidence","Récupérer l''attestation le jour même"]',
   true),
  ('acte-naissance', 'Acte de naissance', 'État civil',
   'Choisissez le circuit local ou le point de départ en ligne selon votre situation.',
   '["Option en ligne : demande via Watiqa","Option bureau : se présenter avec CIN et références de l''acte","Récupérer immédiatement ou sous 3–5 jours"]',
   true),
  ('legalisation-signature', 'Légalisation de signature', 'Attestations',
   'Identifiez le guichet local compétent et préparez le document à faire légaliser.',
   '["Préparer l''original du document et la CIN","Se présenter en personne (obligatoire)","Légalisation délivrée immédiatement"]',
   true)
on conflict (slug) do nothing;

-- ─── Offices ─────────────────────────────────────────────────────────────────
insert into offices (city_id, slug, name, district, office_type, address, maps_url, verification_date, is_published)
select c.id, o.slug, o.name, o.district, o.office_type, o.address, o.maps_url, o.vdate::date, true
from cities c
join (values
  ('casablanca', 'annexe-casablanca-centre',  'Annexe Administrative Casablanca Centre', 'Centre', 'annexe_administrative',
   'Boulevard Hassan II, Casablanca',
   'https://www.google.com/maps/search/?api=1&query=Boulevard+Hassan+II+Casablanca', '2026-01-15'),
  ('casablanca', 'hay-hassani-annexe',        'Annexe Administrative Hay Hassani',       'Hay Hassani', 'annexe_administrative',
   'Hay Hassani, Casablanca',
   'https://www.google.com/maps/search/?api=1&query=Hay+Hassani+Casablanca', '2026-01-15'),
  ('rabat',      'yacoub-el-mansour-annexe',  'Annexe Administrative Yacoub El Mansour', 'Yacoub El Mansour', 'annexe_administrative',
   'Yacoub El Mansour, Rabat',
   'https://www.google.com/maps/search/?api=1&query=Yacoub+El+Mansour+Rabat', '2026-01-15'),
  ('rabat',      'agdal-riyad-annexe',        'Annexe Administrative Agdal Riyad',       'Agdal Riyad', 'annexe_administrative',
   'Agdal Riyad, Rabat',
   'https://www.google.com/maps/search/?api=1&query=Agdal+Riyad+Rabat', '2026-01-15'),
  ('tanger',     'beni-makada-annexe',        'Annexe Administrative Beni Makada',       'Beni Makada', 'annexe_administrative',
   'Beni Makada, Tanger',
   'https://www.google.com/maps/search/?api=1&query=Beni+Makada+Tanger', '2026-01-15'),
  ('tanger',     'malabata-annexe',           'Annexe Administrative Malabata',          'Malabata', 'annexe_administrative',
   'Malabata, Tanger',
   'https://www.google.com/maps/search/?api=1&query=Malabata+Tanger', '2026-01-15')
) as o(city_slug, slug, name, district, office_type, address, maps_url, vdate)
on c.slug = o.city_slug
on conflict (slug) do nothing;

-- ─── Office–Service relations ─────────────────────────────────────────────────
insert into office_services (office_id, service_id, priority_rank)
select o.id, s.id, r.rank
from offices o
join services s on true
join (values
  ('annexe-casablanca-centre',  'passeport-marocain',      1),
  ('annexe-casablanca-centre',  'renouvellement-cnie',     2),
  ('annexe-casablanca-centre',  'legalisation-signature',  3),
  ('hay-hassani-annexe',        'attestation-residence',   1),
  ('hay-hassani-annexe',        'acte-naissance',          2),
  ('hay-hassani-annexe',        'legalisation-signature',  3),
  ('yacoub-el-mansour-annexe',  'passeport-marocain',      1),
  ('yacoub-el-mansour-annexe',  'attestation-residence',   2),
  ('yacoub-el-mansour-annexe',  'legalisation-signature',  3),
  ('agdal-riyad-annexe',        'renouvellement-cnie',     1),
  ('agdal-riyad-annexe',        'acte-naissance',          2),
  ('beni-makada-annexe',        'passeport-marocain',      1),
  ('beni-makada-annexe',        'attestation-residence',   2),
  ('beni-makada-annexe',        'legalisation-signature',  3),
  ('malabata-annexe',           'renouvellement-cnie',     1),
  ('malabata-annexe',           'acte-naissance',          2)
) as r(office_slug, service_slug, rank)
on o.slug = r.office_slug and s.slug = r.service_slug
on conflict do nothing;

-- ─── City-service detail data (15 rows) ──────────────────────────────────────
insert into city_services (city_id, service_id, summary, required_docs, fees_note, delay_note, online_links, fallback_note, verification_date, is_published)
select c.id, s.id, cs.summary, cs.required_docs::jsonb, cs.fees_note, cs.delay_note, cs.online_links::jsonb, cs.fallback_note, cs.vdate::date, true
from cities c
join services s on true
join (values
  -- Casablanca
  ('casablanca','passeport-marocain',
   'Dépôt à l''annexe de proximité après achat de l''e-timbre en ligne.',
   '["CIN ou titre de séjour valide","2 photos 3,5×4,5 cm fond blanc","E-timbre 300 MAD adulte / 100 MAD enfant (timbre.ma)","Formulaire de demande rempli et signé","Acte de naissance ou livret de famille","Ancien passeport si renouvellement"]',
   '300 MAD adulte · 100 MAD enfant. Uniquement via e-timbre (timbre.ma).',
   '4 à 6 semaines. Aucune option express en guichet standard.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"},{"label":"Formulaire officiel","url":"https://passeport.ma"}]',
   'Arrivez avant 8h30 en semaine. Retrait au même bureau après SMS de notification.',
   '2026-01-15'),
  ('casablanca','renouvellement-cnie',
   'Dépôt à l''annexe administrative locale sur présentation de l''ancienne CNIE.',
   '["Ancienne CNIE (même expirée)","2 photos 3,5×4,5 cm fond blanc","E-timbre 100 MAD (timbre.ma)","Acte de naissance si première demande ou perte","Déclaration de perte si perte"]',
   '100 MAD via e-timbre (timbre.ma).',
   '2 à 3 semaines. Retrait sur présentation du reçu de dépôt.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"}]',
   'En cas de perte, prévoir une déclaration de perte auprès de la police avant le dépôt.',
   '2026-01-20'),
  ('casablanca','attestation-residence',
   'Délivrée le jour même à l''annexe du lieu de résidence.',
   '["CIN valide ou titre de séjour","Justificatif de domicile récent : facture, quittance ou contrat de bail (moins de 3 mois)"]',
   'Gratuit.',
   'Délivrée le jour même. Délai possible de 24h selon affluence.',
   '[]',
   'Adressez-vous à l''annexe du lieu exact de résidence. Présence physique obligatoire.',
   '2026-01-18'),
  ('casablanca','acte-naissance',
   'Copie disponible sur place ou via Watiqa en ligne.',
   '["CIN valide ou titre de séjour","Numéro et année de l''acte (si disponible)","Nom complet + date et lieu de naissance","Noms complets des deux parents"]',
   'Gratuit. Légalisation en sus : 20 MAD.',
   'Immédiat sur place. Postal : 3–5 jours. Watiqa : 5–7 jours.',
   '[{"label":"Demande en ligne (Watiqa)","url":"https://watiqa.ma"}]',
   'Pour copies légalisées ou actes anciens, s''adresser au tribunal de première instance.',
   '2026-01-12'),
  ('casablanca','legalisation-signature',
   'Légalisation immédiate en annexe, présence du signataire obligatoire.',
   '["CIN ou passeport valide du signataire","Document original à légaliser","Présence physique obligatoire du signataire"]',
   'Gratuit.',
   'Immédiat, délivré dans la même visite.',
   '[]',
   'Légalisation impossible par procuration. Le signataire doit être présent en personne.',
   '2026-01-22'),
  -- Rabat
  ('rabat','passeport-marocain',
   'Dépôt à l''annexe de proximité après achat de l''e-timbre en ligne.',
   '["CIN ou titre de séjour valide","2 photos 3,5×4,5 cm fond blanc","E-timbre 300 MAD adulte / 100 MAD enfant (timbre.ma)","Formulaire de demande rempli et signé","Acte de naissance ou livret de famille","Ancien passeport si renouvellement"]',
   '300 MAD adulte · 100 MAD enfant. Uniquement via e-timbre (timbre.ma).',
   '4 à 6 semaines. Aucune option express en guichet standard.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"},{"label":"Formulaire officiel","url":"https://passeport.ma"}]',
   'Arrivez avant 8h30. L''annexe Yacoub El Mansour est généralement moins fréquentée que les guichets centraux.',
   '2026-01-15'),
  ('rabat','renouvellement-cnie',
   'Dépôt à l''annexe Agdal-Riyad pour les résidents de ce secteur.',
   '["Ancienne CNIE (même expirée)","2 photos 3,5×4,5 cm fond blanc","E-timbre 100 MAD (timbre.ma)","Acte de naissance si première demande ou perte","Déclaration de perte si perte"]',
   '100 MAD via e-timbre (timbre.ma).',
   '2 à 3 semaines. Retrait sur présentation du reçu de dépôt.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"}]',
   'En cas de perte, prévoir une déclaration auprès des services de police ou gendarmerie de Rabat.',
   '2026-01-20'),
  ('rabat','attestation-residence',
   'Délivrée le jour même à l''annexe du quartier de résidence.',
   '["CIN valide ou titre de séjour","Justificatif de domicile récent : facture, quittance ou contrat de bail (moins de 3 mois)"]',
   'Gratuit.',
   'Délivrée le jour même dans la plupart des annexes de Rabat.',
   '[]',
   'Pour Agdal-Riyad, l''annexe éponyme est la référence locale.',
   '2026-01-18'),
  ('rabat','acte-naissance',
   'Copie disponible sur place à l''état civil ou via Watiqa.',
   '["CIN valide ou titre de séjour","Numéro et année de l''acte (si disponible)","Nom complet + date et lieu de naissance","Noms complets des deux parents"]',
   'Gratuit. Légalisation en sus : 20 MAD.',
   'Immédiat sur place. Postal : 3–5 jours. Watiqa : 5–7 jours.',
   '[{"label":"Demande en ligne (Watiqa)","url":"https://watiqa.ma"}]',
   'Pour actes anciens ou copies légalisées, s''adresser au tribunal de première instance de Rabat.',
   '2026-01-12'),
  ('rabat','legalisation-signature',
   'Légalisation immédiate en annexe, présence du signataire obligatoire.',
   '["CIN ou passeport valide du signataire","Document original à légaliser","Présence physique obligatoire du signataire"]',
   'Gratuit.',
   'Immédiat, délivré dans la même visite.',
   '[]',
   'Présence du signataire obligatoire avec pièce d''identité valide. Aucune procuration acceptée.',
   '2026-01-22'),
  -- Tanger
  ('tanger','passeport-marocain',
   'Dépôt à l''annexe Beni Makada ou Malabata selon le secteur de résidence.',
   '["CIN ou titre de séjour valide","2 photos 3,5×4,5 cm fond blanc","E-timbre 300 MAD adulte / 100 MAD enfant (timbre.ma)","Formulaire de demande rempli et signé","Acte de naissance ou livret de famille","Ancien passeport si renouvellement"]',
   '300 MAD adulte · 100 MAD enfant. Uniquement via e-timbre (timbre.ma).',
   '4 à 6 semaines. Aucune option express en guichet standard.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"},{"label":"Formulaire officiel","url":"https://passeport.ma"}]',
   'L''annexe Beni Makada couvre le nord de la ville. Retrait au même bureau après notification SMS.',
   '2026-01-15'),
  ('tanger','renouvellement-cnie',
   'Dépôt à l''annexe Malabata pour les résidents du secteur Est.',
   '["Ancienne CNIE (même expirée)","2 photos 3,5×4,5 cm fond blanc","E-timbre 100 MAD (timbre.ma)","Acte de naissance si première demande ou perte","Déclaration de perte si perte"]',
   '100 MAD via e-timbre (timbre.ma).',
   '2 à 3 semaines. Retrait sur présentation du reçu de dépôt.',
   '[{"label":"Acheter l''e-timbre","url":"https://timbre.ma"}]',
   'L''annexe Malabata couvre le secteur Est. Déclaration de perte requise auprès de la police en cas de perte.',
   '2026-01-20'),
  ('tanger','attestation-residence',
   'Délivrée le jour même à l''annexe Beni Makada ou Malabata selon le quartier.',
   '["CIN valide ou titre de séjour","Justificatif de domicile récent : facture, quittance ou contrat de bail (moins de 3 mois)"]',
   'Gratuit.',
   'Délivrée le jour même dans la plupart des annexes de Tanger.',
   '[]',
   'Les deux annexes (Beni Makada / Malabata) couvrent des secteurs distincts. Choisissez selon votre lieu de résidence.',
   '2026-01-18'),
  ('tanger','acte-naissance',
   'Copie disponible sur place ou via Watiqa en ligne.',
   '["CIN valide ou titre de séjour","Numéro et année de l''acte (si disponible)","Nom complet + date et lieu de naissance","Noms complets des deux parents"]',
   'Gratuit. Légalisation en sus : 20 MAD.',
   'Immédiat sur place. Postal : 3–5 jours. Watiqa : 5–7 jours.',
   '[{"label":"Demande en ligne (Watiqa)","url":"https://watiqa.ma"}]',
   'Pour actes anciens ou copies légalisées, s''adresser au tribunal de première instance de Tanger.',
   '2026-01-12'),
  ('tanger','legalisation-signature',
   'Légalisation immédiate en annexe, présence du signataire obligatoire.',
   '["CIN ou passeport valide du signataire","Document original à légaliser","Présence physique obligatoire du signataire"]',
   'Gratuit.',
   'Immédiat, délivré dans la même visite.',
   '[]',
   'Le signataire doit se présenter en personne avec sa pièce d''identité. Aucune procuration acceptée.',
   '2026-01-22')
) as cs(city_slug, service_slug, summary, required_docs, fees_note, delay_note, online_links, fallback_note, vdate)
on c.slug = cs.city_slug and s.slug = cs.service_slug
on conflict (city_id, service_id) do nothing;
