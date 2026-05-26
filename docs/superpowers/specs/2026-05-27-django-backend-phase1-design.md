# M. M. Attarwala — Django Backend Phase 1 Design

**Date:** 2026-05-27  
**Scope:** Phase 1 — Foundation & Project Setup  
**Status:** Approved

---

## 1. Project Context

**Brand:** M. M. Attarwala — Luxury custom attar/fragrance brand, Vadodara  
**Type:** Luxury fragrance consultation platform (NOT a standard e-commerce store)  
**Frontend:** React + Vite + Tailwind CSS v4 + Framer Motion + GSAP (complete)  
**Backend:** Django + DRF — being built phase-by-phase

### What customers do
- Browse products
- Submit custom fragrance requests
- Contact via WhatsApp

### What customers do NOT have
- Accounts / login
- Cart
- Checkout
- Payment

### Who has accounts
- Admins only (Super Admin + Staff Admin)

---

## 2. Full Project Scope (all phases)

| Phase | Feature |
|---|---|
| **1** | Foundation: Django setup, MySQL, DRF, Unfold admin, folder structure |
| **2** | Admin Authentication System (JWT, roles, protected APIs) |
| **3** | Product Management System (products, categories, notes, SEO) |
| **4** | Custom Fragrance Request System (heart of the business) |
| **5** | WhatsApp Integration System |
| **6** | Inquiry & Lead Management CRM |
| **7** | CMS Management System (dynamic homepage/about/contact content) |
| **8** | Media Management System (images, banners, gallery) |
| **9** | Analytics Dashboard |
| **10** | Product Search & Filtering + Inventory/Availability |

---

## 3. Phase 1 — Foundation

### Goal
Working Django server connected to MySQL with all apps scaffolded, Unfold admin running, Swagger docs available, and `.env`-based config.

### Stack (Phase 1)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Django 5.x | Stable LTS-track |
| API | Django REST Framework | Industry standard |
| DB Driver | mysqlclient | Native MySQL, best performance |
| Auth (prep) | djangorestframework-simplejwt | JWT for Phase 2 admin auth |
| Admin skin | django-unfold | Modern Tailwind-based, matches luxury aesthetic |
| API docs | drf-spectacular | OpenAPI 3 + Swagger UI |
| Env config | python-decouple | `.env` loading with type casting |
| CORS | django-cors-headers | React frontend on different port |
| Images | Pillow | Required for ImageField |

### Database

| Field | Value |
|---|---|
| Engine | MySQL |
| Name | `perfume` |
| User | `root` |
| Password | (empty) |
| Host | `localhost` |
| Port | `3306` |

---

## 4. Folder Structure (Phase 1 output)

```
backend/
├── AGENT.md                    # AI project memory — updated every phase
├── manage.py
├── .env                        # secrets, never committed
├── .gitignore
│
├── requirements/
│   ├── base.txt                # all shared dependencies
│   ├── dev.txt                 # dev-only (extends base)
│   └── prod.txt                # prod-only (extends base)
│
├── config/                     # Django project package
│   ├── __init__.py
│   ├── urls.py                 # root URL conf
│   ├── wsgi.py
│   ├── asgi.py
│   └── settings/
│       ├── __init__.py
│       ├── base.py             # MySQL, INSTALLED_APPS, DRF, JWT, Unfold, CORS
│       ├── dev.py              # DEBUG=True, verbose logging
│       └── prod.py             # security headers, ALLOWED_HOSTS
│
├── apps/                       # all business apps live here
│   ├── __init__.py
│   ├── authentication/         # Phase 2
│   ├── products/               # Phase 3
│   ├── collections/            # Phase 3
│   ├── fragrance_builder/      # Phase 4
│   ├── inquiries/              # Phase 6
│   ├── whatsapp/               # Phase 5
│   ├── cms/                    # Phase 7
│   ├── analytics/              # Phase 9
│   ├── inventory/              # Phase 10
│   ├── media_manager/          # Phase 8
│   └── dashboard/              # Phase 9
│
├── media/                      # uploaded files (gitignored)
└── static/                     # collected static files
```

---

## 5. Settings Architecture

Three-file settings split loaded via `DJANGO_ENV` env var:

```
DJANGO_ENV=development  →  config/settings/dev.py  (imports base)
DJANGO_ENV=production   →  config/settings/prod.py (imports base)
```

`base.py` holds:
- `DATABASES` (MySQL via decouple)
- `INSTALLED_APPS` (Django core + DRF + Unfold + CORS + spectacular + all `apps.*`)
- `REST_FRAMEWORK` config (JWT default auth, pagination)
- `SIMPLE_JWT` config (access/refresh token lifetimes)
- `UNFOLD` config (admin branding)
- `SPECTACULAR_SETTINGS` (API title, version)
- `CORS_ALLOWED_ORIGINS` (localhost:5173 for dev)
- `MEDIA_ROOT` / `MEDIA_URL`
- `STATIC_ROOT` / `STATIC_URL`

---

## 6. Environment Variables (.env)

```
DJANGO_ENV=development
SECRET_KEY=<generate with get_random_secret_key()>
DB_NAME=perfume
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

## 7. API URL Structure

```
/admin/                         → Unfold admin panel
/api/v1/                        → all REST API endpoints (future phases)
/api/schema/                    → OpenAPI schema (JSON)
/api/schema/swagger-ui/         → Swagger UI
/api/schema/redoc/              → ReDoc
```

---

## 8. App Scaffolding (Phase 1)

Each app under `apps/` gets the standard Django scaffold only:

```
apps/<appname>/
├── __init__.py
├── admin.py
├── apps.py
├── migrations/
│   └── __init__.py
├── models.py
├── serializers.py      # empty, added for structure
├── views.py
└── urls.py             # empty, added for structure
```

No models written in Phase 1. Structure only.

---

## 9. AGENT.md (Phase 1 version)

Documents:
- Project overview + brand context
- Tech stack with versions
- Environment variable reference
- Setup commands (fresh clone → running server)
- App map (which app owns which domain)
- Phase roadmap (1–10)
- Django admin URL + credentials note

---

## 10. Deliverables — End of Phase 1

| Check | Item |
|---|---|
| ✓ | `python manage.py migrate` runs clean (MySQL system tables) |
| ✓ | `python manage.py createsuperuser` works |
| ✓ | `python manage.py runserver` → server at `localhost:8000` |
| ✓ | `/admin/` → Unfold admin panel loads |
| ✓ | `/api/schema/swagger-ui/` → Swagger UI loads |
| ✓ | All 11 apps present under `apps/` |
| ✓ | `.env` config drives all secrets |
| ✓ | `AGENT.md` written in `backend/` |

---

## 11. What Phase 1 Does NOT Include

- No models (except Django's built-in)
- No custom admin registration
- No JWT endpoints
- No business logic
- No API endpoints
- No Cloudinary
- No Celery/Redis

---

## 12. Out of Scope (future phases)

- Customer authentication
- Customer dashboard
- Cart / checkout
- Payment gateway (Razorpay)
- Shipping
- Subscription
