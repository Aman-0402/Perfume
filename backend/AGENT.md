# AGENT.md — M. M. Attarwala Backend

> Master reference for AI agents working on this backend. Updated after every phase.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Brand | M. M. Attarwala |
| Type | Luxury fragrance consultation platform |
| Frontend | React + Vite (complete, at `/frontend`) |
| Backend | Django 4.2 LTS + DRF (this directory) |
| Platform | Admin-only — no customer accounts |

### What customers do
- Browse products (read-only API)
- Submit custom fragrance requests
- Contact via WhatsApp

### What customers do NOT have
- Accounts / login
- Cart / checkout
- Payment

### Who has accounts
- Admins only (Super Admin + Staff Admin)

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Django LTS | 4.2.21 |
| API | Django REST Framework | 3.15.2 |
| DB Driver | mysqlclient | 2.2.4 |
| Auth | djangorestframework-simplejwt | 5.3.1 |
| Admin skin | django-unfold | 0.41.0 |
| API docs | drf-spectacular | 0.27.2 |
| Env config | python-decouple | 3.8 |
| CORS | django-cors-headers | 4.4.0 |
| Images | Pillow | 11.0.0 |

### Key Decision: Django 4.2 LTS (not 5.x)

Django 5.1 requires MariaDB 10.5+. The development machine runs MariaDB 10.4.32.
Django 4.2 is the LTS release — fully supported until April 2026, supports MariaDB 10.4+.

---

## 3. Database

| Field | Value |
|---|---|
| Engine | MariaDB 10.4.32 |
| Name | `perfume` |
| User | `root` |
| Password | (empty) |
| Host | `localhost` |
| Port | `3306` |
| Charset | `utf8mb4` |
| sql_mode | `STRICT_TRANS_TABLES` |

---

## 4. Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DJANGO_ENV` | `development` or `production` | `development` |
| `SECRET_KEY` | Django secret key | (required) |
| `DB_NAME` | MySQL/MariaDB database name | `perfume` |
| `DB_USER` | DB username | `root` |
| `DB_PASSWORD` | DB password | (empty) |
| `DB_HOST` | DB host | `localhost` |
| `DB_PORT` | DB port | `3306` |
| `ALLOWED_HOSTS` | Comma-separated hosts | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins | `http://localhost:5173` |
| `DEBUG` | Debug flag | `False` |

---

## 5. Setup Commands (fresh clone)

```powershell
cd backend

# Create and activate virtualenv (Windows)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements/dev.txt

# Create .env from template
Copy-Item .env.example .env
# Edit .env: add SECRET_KEY (generate with python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")

# Ensure MariaDB is running and 'perfume' DB exists
mysql -u root -e "CREATE DATABASE IF NOT EXISTS perfume CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run dev server
python manage.py runserver
```

---

## 6. Project Structure

```
backend/
├── AGENT.md                    # This file — AI project memory
├── manage.py
├── .env                        # Local secrets (gitignored)
├── .env.example                # Template (committed)
├── .gitignore
│
├── requirements/
│   ├── base.txt                # Shared dependencies
│   ├── dev.txt                 # Dev-only (debug toolbar)
│   └── prod.txt                # Prod-only (gunicorn)
│
├── config/
│   ├── __init__.py
│   ├── urls.py                 # Root URL conf
│   ├── api_urls.py             # /api/v1/ router (populated Phase 2+)
│   ├── wsgi.py
│   ├── asgi.py
│   └── settings/
│       ├── __init__.py
│       ├── base.py             # All shared settings
│       ├── dev.py              # DEBUG=True, debug toolbar, SQL logging
│       ├── prod.py             # Security headers
│       └── test.py             # Test overrides (created by test runner)
│
├── apps/
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
├── tests/
│   ├── __init__.py
│   └── test_setup.py           # Phase 1 smoke tests (8/8 passing)
│
├── media/                      # Uploaded files (gitignored)
└── static/                     # Static source files
```

---

## 7. URL Structure

| URL | Purpose |
|---|---|
| `/admin/` | Unfold admin panel |
| `/api/v1/` | All REST API endpoints (Phase 2+) |
| `/api/schema/` | OpenAPI schema (JSON) |
| `/api/schema/swagger-ui/` | Swagger UI |
| `/api/schema/redoc/` | ReDoc |
| `/__debug__/` | Django Debug Toolbar (dev only) |

---

## 8. App Map

| App | Domain | Phase |
|---|---|---|
| `apps.authentication` | Admin JWT auth, roles, password reset | 2 |
| `apps.products` | Product catalog, categories, notes, SEO | 3 |
| `apps.collections` | Product collections / groupings | 3 |
| `apps.fragrance_builder` | Custom fragrance requests (core feature) | 4 |
| `apps.whatsapp` | WhatsApp link generation, message formatting | 5 |
| `apps.inquiries` | Contact + lead management CRM | 6 |
| `apps.cms` | Dynamic homepage/about/contact content | 7 |
| `apps.media_manager` | Image uploads, banners, gallery | 8 |
| `apps.analytics` | Dashboard stats, popular notes, conversions | 9 |
| `apps.inventory` | Stock status, availability, hidden products | 10 |
| `apps.dashboard` | Admin dashboard aggregated API | 9 |

---

## 9. Phase Roadmap

| Phase | Feature | Status |
|---|---|---|
| 1 | Foundation: setup, MySQL, DRF, Unfold, all apps scaffolded | ✅ Complete |
| 2 | Admin Authentication (JWT, roles, Super Admin / Staff) | 🔲 Pending |
| 3 | Product Management (CRUD, categories, notes, SEO) | 🔲 Pending |
| 4 | Custom Fragrance Request System | 🔲 Pending |
| 5 | WhatsApp Integration | 🔲 Pending |
| 6 | Inquiry & Lead Management CRM | 🔲 Pending |
| 7 | CMS Management System | 🔲 Pending |
| 8 | Media Management System | 🔲 Pending |
| 9 | Analytics Dashboard | 🔲 Pending |
| 10 | Product Search & Filtering + Inventory | 🔲 Pending |

---

## 10. Key Architecture Decisions

| Decision | Reason |
|---|---|
| Django 4.2 LTS (not 5.x) | MariaDB 10.4.32 on dev machine — Django 5.x requires 10.5+ |
| No customer accounts | Platform is admin-only. Public APIs are read-only |
| Settings split (base/dev/prod) | Clean separation — never debug toolbar or SQL logging in prod |
| Apps under `apps/` | All business logic namespaced. `AppConfig.name = 'apps.<name>'` |
| API versioning at `/api/v1/` | URL-based versioning — clear and cache-friendly |
| JWT auth for API | Admin sessions use Django session; API uses Bearer JWT |
| Token blacklist enabled | Needed for proper JWT logout and refresh rotation |
| utf8mb4 charset | Full Unicode including Arabic script (brand uses Arabic names) |
| TIME_ZONE = Asia/Kolkata | Brand is in Vadodara, India (IST = UTC+5:30) |
| CORS_ALLOW_CREDENTIALS = True | Frontend needs to send cookies with JWT refresh requests |

---

## 11. Features NOT in scope

- Customer authentication / accounts
- Cart / checkout
- Payment gateway (Razorpay planned, not yet)
- Shipping
- Subscription
- Customer dashboard

---

## 12. Phase 1 Verification

All 8 smoke tests passing:

```
test_admin_login_page_loads ........... OK
test_admin_redirects_unauthenticated .. OK
test_all_local_apps_importable ........ OK
test_database_engine_is_mysql ......... OK
test_mysql_connection_is_live ......... OK
test_openapi_schema_endpoint .......... OK
test_redoc_loads ...................... OK
test_swagger_ui_loads ................. OK

Ran 8 tests in 0.074s — OK
```

Run with: `python manage.py test tests --verbosity=2`
