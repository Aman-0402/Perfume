# Django Backend Phase 1 — Foundation & Project Setup

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working Django 5.x server connected to MySQL with all 11 app shells scaffolded, Unfold admin running, Swagger UI available, and `.env`-driven config — zero business logic, clean foundation for Phase 2+.

**Architecture:** Domain-split Django apps under `apps/`, three-file settings split (`base`/`dev`/`prod`) loaded via `DJANGO_ENV` env var, API versioned under `/api/v1/`. All secrets via `python-decouple` from `.env`.

**Tech Stack:** Python 3.12 · Django 5.x · djangorestframework · mysqlclient · djangorestframework-simplejwt · django-unfold · drf-spectacular · python-decouple · django-cors-headers · Pillow

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `backend/requirements/base.txt` | Create | All shared dependencies |
| `backend/requirements/dev.txt` | Create | Dev-only deps (extends base) |
| `backend/requirements/prod.txt` | Create | Prod-only deps (extends base) |
| `backend/.env` | Create | Local secrets (gitignored) |
| `backend/.env.example` | Create | Committed template |
| `backend/.gitignore` | Create | Exclude venv, .env, media, __pycache__ |
| `backend/manage.py` | Modify | Point to `config.settings.dev` |
| `backend/config/__init__.py` | Create | Package marker |
| `backend/config/urls.py` | Create | Root URL conf — admin + swagger + api/v1/ |
| `backend/config/wsgi.py` | Create | WSGI entry point |
| `backend/config/asgi.py` | Create | ASGI entry point |
| `backend/config/settings/__init__.py` | Create | Package marker |
| `backend/config/settings/base.py` | Create | MySQL, installed apps, DRF, JWT, Unfold, CORS, Spectacular |
| `backend/config/settings/dev.py` | Create | DEBUG=True, verbose logging |
| `backend/config/settings/prod.py` | Create | Security headers, allowed hosts |
| `backend/apps/__init__.py` | Create | Package marker |
| `backend/apps/authentication/` | Scaffold | Admin auth (Phase 2) |
| `backend/apps/products/` | Scaffold | Product catalog (Phase 3) |
| `backend/apps/collections/` | Scaffold | Collections (Phase 3) |
| `backend/apps/fragrance_builder/` | Scaffold | Custom fragrance requests (Phase 4) |
| `backend/apps/inquiries/` | Scaffold | CRM / lead management (Phase 6) |
| `backend/apps/whatsapp/` | Scaffold | WhatsApp integration (Phase 5) |
| `backend/apps/cms/` | Scaffold | Dynamic content management (Phase 7) |
| `backend/apps/analytics/` | Scaffold | Dashboard analytics (Phase 9) |
| `backend/apps/inventory/` | Scaffold | Availability / stock (Phase 10) |
| `backend/apps/media_manager/` | Scaffold | Media uploads (Phase 8) |
| `backend/apps/dashboard/` | Scaffold | Admin dashboard API (Phase 9) |
| `backend/media/.gitkeep` | Create | Uploaded files directory |
| `backend/static/.gitkeep` | Create | Collected static directory |
| `backend/tests/__init__.py` | Create | Test package |
| `backend/tests/test_setup.py` | Create | DB connection + admin + swagger smoke tests |
| `backend/AGENT.md` | Create | AI project memory |

---

## Task 1: Create virtual environment and requirements files

**Files:**
- Create: `backend/requirements/base.txt`
- Create: `backend/requirements/dev.txt`
- Create: `backend/requirements/prod.txt`

- [ ] **Step 1: Open terminal, navigate to backend directory**

```powershell
cd d:\code\GITHUB\Perfume\backend
```

- [ ] **Step 2: Create virtual environment**

```powershell
python -m venv venv
```

- [ ] **Step 3: Activate virtual environment**

```powershell
.\venv\Scripts\Activate.ps1
```

Expected: prompt shows `(venv)` prefix. If PowerShell blocks execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

- [ ] **Step 4: Create requirements directory**

```powershell
mkdir requirements
```

- [ ] **Step 5: Create `requirements/base.txt`**

```
Django==5.1.4
djangorestframework==3.15.2
mysqlclient==2.2.4
djangorestframework-simplejwt==5.3.1
django-unfold==0.41.0
drf-spectacular==0.27.2
python-decouple==3.8
django-cors-headers==4.4.0
Pillow==11.0.0
```

- [ ] **Step 6: Create `requirements/dev.txt`**

```
-r base.txt
django-debug-toolbar==4.4.6
```

- [ ] **Step 7: Create `requirements/prod.txt`**

```
-r base.txt
gunicorn==23.0.0
```

- [ ] **Step 8: Install dev dependencies**

```powershell
pip install -r requirements/dev.txt
```

Expected: All packages install without errors. `mysqlclient` requires MySQL client libraries. If it fails on Windows, run:
```powershell
pip install mysqlclient --find-links https://www.lfd.uci.edu/~gohlke/pythonlibs/
```
Or install MySQL Connector/C from https://dev.mysql.com/downloads/connector/c/ then retry.

- [ ] **Step 9: Verify Django installed**

```powershell
python -m django --version
```

Expected output: `5.1.4`

---

## Task 2: Create Django project scaffold

**Files:**
- Create: `backend/manage.py` (via startproject, then modified)
- Create: `backend/config/__init__.py`
- Create: `backend/config/urls.py` (via startproject, then replaced)
- Create: `backend/config/wsgi.py` (via startproject, then modified)
- Create: `backend/config/asgi.py` (via startproject, then modified)

- [ ] **Step 1: Run startproject inside backend directory**

```powershell
django-admin startproject config .
```

This creates `manage.py` and `config/` with `settings.py`, `urls.py`, `wsgi.py`, `asgi.py`.

- [ ] **Step 2: Create settings package directory**

```powershell
mkdir config\settings
```

- [ ] **Step 3: Create `config/settings/__init__.py`**

Write this exact content:

```python
```

(Empty file — package marker only)

- [ ] **Step 4: Delete the generated `config/settings.py`**

```powershell
Remove-Item config\settings.py
```

- [ ] **Step 5: Update `manage.py` to use split settings**

Replace the entire content of `manage.py` with:

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
```

- [ ] **Step 6: Update `config/wsgi.py`**

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
application = get_wsgi_application()
```

- [ ] **Step 7: Update `config/asgi.py`**

```python
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
application = get_asgi_application()
```

---

## Task 3: Create .env, .env.example, and .gitignore

**Files:**
- Create: `backend/.env`
- Create: `backend/.env.example`
- Create: `backend/.gitignore`

- [ ] **Step 1: Generate a secret key**

```powershell
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output for use in the next step.

- [ ] **Step 2: Create `backend/.env`**

Replace `<paste-generated-key-here>` with the key from Step 1:

```
DJANGO_ENV=development
SECRET_KEY=<paste-generated-key-here>

DB_NAME=perfume
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306

ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

DEBUG=True
```

- [ ] **Step 3: Create `backend/.env.example`**

```
DJANGO_ENV=development
SECRET_KEY=your-secret-key-here

DB_NAME=perfume
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306

ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

DEBUG=True
```

- [ ] **Step 4: Create `backend/.gitignore`**

```
# Python
__pycache__/
*.py[cod]
*.pyo
*.pyd
.Python
*.so

# Virtual environment
venv/
env/
ENV/

# Django
*.log
local_settings.py
db.sqlite3
media/
staticfiles/

# Environment variables
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/
*.egg-info/
```

- [ ] **Step 5: Create empty placeholder files for media and static**

```powershell
mkdir media
mkdir static
New-Item media\.gitkeep -ItemType File
New-Item static\.gitkeep -ItemType File
```

---

## Task 4: Write `config/settings/base.py`

**Files:**
- Create: `backend/config/settings/base.py`

- [ ] **Step 1: Create `config/settings/base.py` with full content**

```python
from pathlib import Path
from datetime import timedelta
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())

# ── Application definition ──────────────────────────────────────────────────

DJANGO_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    'unfold.contrib.inlines',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'drf_spectacular',
]

LOCAL_APPS = [
    'apps.authentication',
    'apps.products',
    'apps.collections',
    'apps.fragrance_builder',
    'apps.inquiries',
    'apps.whatsapp',
    'apps.cms',
    'apps.analytics',
    'apps.inventory',
    'apps.media_manager',
    'apps.dashboard',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ── Database ─────────────────────────────────────────────────────────────────

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME', default='perfume'),
        'USER': config('DB_USER', default='root'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# ── Password validation ───────────────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ── Internationalization ──────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ── Static & Media ────────────────────────────────────────────────────────────

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── Django REST Framework ─────────────────────────────────────────────────────

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# ── JWT Configuration ─────────────────────────────────────────────────────────

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}

# ── CORS ──────────────────────────────────────────────────────────────────────

CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173',
    cast=Csv(),
)
CORS_ALLOW_CREDENTIALS = True

# ── Swagger / OpenAPI ─────────────────────────────────────────────────────────

SPECTACULAR_SETTINGS = {
    'TITLE': 'M. M. Attarwala API',
    'DESCRIPTION': 'Luxury fragrance consultation platform — admin API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
}

# ── Unfold Admin ──────────────────────────────────────────────────────────────

UNFOLD = {
    'SITE_TITLE': 'M. M. Attarwala',
    'SITE_HEADER': 'M. M. Attarwala Admin',
    'SITE_SUBHEADER': 'Luxury Fragrance Management',
    'SITE_URL': '/',
    'SHOW_HISTORY': True,
    'SHOW_VIEW_ON_SITE': True,
}
```

- [ ] **Step 2: Verify no syntax errors**

```powershell
python -c "import config.settings.base"
```

Expected: no output (silent success). If errors appear, fix them before continuing.

---

## Task 5: Write `config/settings/dev.py` and `config/settings/prod.py`

**Files:**
- Create: `backend/config/settings/dev.py`
- Create: `backend/config/settings/prod.py`

- [ ] **Step 1: Create `config/settings/dev.py`**

```python
from .base import *

DEBUG = True

INSTALLED_APPS += ['debug_toolbar']

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

INTERNAL_IPS = ['127.0.0.1']

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}
```

- [ ] **Step 2: Create `config/settings/prod.py`**

```python
from .base import *
from decouple import config

DEBUG = False

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## Task 6: Write `config/urls.py`

**Files:**
- Modify: `backend/config/urls.py`

- [ ] **Step 1: Replace `config/urls.py` with full content**

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # OpenAPI schema + docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Versioned API root — app routes added here in Phase 2+
    path('api/v1/', include('config.api_urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

- [ ] **Step 2: Create `config/api_urls.py`** (empty versioned router — populated Phase 2+)

```python
from django.urls import path

# API v1 routes — populated in Phase 2+
urlpatterns = []
```

---

## Task 7: Scaffold all 11 apps under `apps/`

**Files:**
- Create: `backend/apps/__init__.py`
- Create: `backend/apps/authentication/` through `backend/apps/dashboard/` (11 apps)

- [ ] **Step 1: Create `apps/` package**

```powershell
mkdir apps
New-Item apps\__init__.py -ItemType File
```

- [ ] **Step 2: Scaffold all 11 apps**

Run each command. They must be run from `backend/` with venv active:

```powershell
python manage.py startapp authentication apps/authentication
python manage.py startapp products apps/products
python manage.py startapp collections apps/collections
python manage.py startapp fragrance_builder apps/fragrance_builder
python manage.py startapp inquiries apps/inquiries
python manage.py startapp whatsapp apps/whatsapp
python manage.py startapp cms apps/cms
python manage.py startapp analytics apps/analytics
python manage.py startapp inventory apps/inventory
python manage.py startapp media_manager apps/media_manager
python manage.py startapp dashboard apps/dashboard
```

- [ ] **Step 3: Fix `name` in every app's `apps.py`**

`startapp` defaults `name` to the short app name. Must be the full dotted path. Edit each file:

`apps/authentication/apps.py`:
```python
from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.authentication'
```

`apps/products/apps.py`:
```python
from django.apps import AppConfig

class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.products'
```

`apps/collections/apps.py`:
```python
from django.apps import AppConfig

class CollectionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.collections'
```

`apps/fragrance_builder/apps.py`:
```python
from django.apps import AppConfig

class FragranceBuilderConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.fragrance_builder'
```

`apps/inquiries/apps.py`:
```python
from django.apps import AppConfig

class InquiriesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.inquiries'
```

`apps/whatsapp/apps.py`:
```python
from django.apps import AppConfig

class WhatsappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.whatsapp'
```

`apps/cms/apps.py`:
```python
from django.apps import AppConfig

class CmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.cms'
```

`apps/analytics/apps.py`:
```python
from django.apps import AppConfig

class AnalyticsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.analytics'
```

`apps/inventory/apps.py`:
```python
from django.apps import AppConfig

class InventoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.inventory'
```

`apps/media_manager/apps.py`:
```python
from django.apps import AppConfig

class MediaManagerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.media_manager'
```

`apps/dashboard/apps.py`:
```python
from django.apps import AppConfig

class DashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.dashboard'
```

- [ ] **Step 4: Add `urls.py` and `serializers.py` to each app**

For each of the 11 apps, create two empty files. Run in PowerShell:

```powershell
$apps = @('authentication','products','collections','fragrance_builder','inquiries','whatsapp','cms','analytics','inventory','media_manager','dashboard')
foreach ($app in $apps) {
    New-Item "apps\$app\urls.py" -ItemType File -Force
    New-Item "apps\$app\serializers.py" -ItemType File -Force
}
```

- [ ] **Step 5: Run Django system check**

```powershell
python manage.py check
```

Expected: `System check identified no issues (0 silenced).`

If you see `No module named 'apps.X'` errors, verify the `name` field in each `apps.py` matches exactly as written in Step 3.

---

## Task 8: Write and run setup verification tests

**Files:**
- Create: `backend/tests/__init__.py`
- Create: `backend/tests/test_setup.py`

- [ ] **Step 1: Create tests package**

```powershell
mkdir tests
New-Item tests\__init__.py -ItemType File
```

- [ ] **Step 2: Create `tests/test_setup.py`**

```python
from django.test import TestCase, Client
from django.db import connection
from django.urls import reverse


class DatabaseConnectionTest(TestCase):
    def test_mysql_connection_is_live(self):
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        self.assertEqual(result[0], 1)

    def test_database_engine_is_mysql(self):
        engine = connection.settings_dict['ENGINE']
        self.assertIn('mysql', engine)


class AdminPanelTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_admin_login_page_loads(self):
        response = self.client.get('/admin/login/')
        self.assertEqual(response.status_code, 200)

    def test_admin_redirects_unauthenticated(self):
        response = self.client.get('/admin/')
        # Should redirect to login, not 500
        self.assertIn(response.status_code, [200, 301, 302])


class SwaggerDocsTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_openapi_schema_endpoint(self):
        response = self.client.get('/api/schema/')
        self.assertEqual(response.status_code, 200)

    def test_swagger_ui_loads(self):
        response = self.client.get('/api/schema/swagger-ui/')
        self.assertEqual(response.status_code, 200)

    def test_redoc_loads(self):
        response = self.client.get('/api/schema/redoc/')
        self.assertEqual(response.status_code, 200)


class AllAppsLoadedTest(TestCase):
    def test_all_local_apps_importable(self):
        import apps.authentication
        import apps.products
        import apps.collections
        import apps.fragrance_builder
        import apps.inquiries
        import apps.whatsapp
        import apps.cms
        import apps.analytics
        import apps.inventory
        import apps.media_manager
        import apps.dashboard
```

- [ ] **Step 3: Run the tests (expect failures — DB not migrated yet)**

```powershell
python manage.py test tests --verbosity=2
```

`DatabaseConnectionTest` and `AdminPanelTest` will FAIL because migrations haven't run yet. `AllAppsLoadedTest` should PASS. Note which pass/fail — proceed to Task 9.

---

## Task 9: Run migrations and verify server

**No new files.**

- [ ] **Step 1: Run migrations**

```powershell
python manage.py migrate
```

Expected output ends with:
```
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
  Applying token_blacklist.0001_initial... OK
```

If MySQL connection fails: verify MySQL is running (`net start mysql` in PowerShell as admin), and the `perfume` database exists (`mysql -u root -e "CREATE DATABASE IF NOT EXISTS perfume CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`).

- [ ] **Step 2: Create superuser**

```powershell
python manage.py createsuperuser
```

Enter username, email, password when prompted. Note the credentials.

- [ ] **Step 3: Run tests again — all should pass now**

```powershell
python manage.py test tests --verbosity=2
```

Expected: `Ran 9 tests in X.XXXs — OK`

- [ ] **Step 4: Start dev server**

```powershell
python manage.py runserver
```

- [ ] **Step 5: Verify all endpoints manually**

Open browser and confirm:
- `http://localhost:8000/admin/` → Unfold admin login page loads (dark/luxury theme)
- `http://localhost:8000/api/schema/swagger-ui/` → Swagger UI loads
- `http://localhost:8000/api/schema/redoc/` → ReDoc loads

- [ ] **Step 6: Stop server (`Ctrl+C`)**

---

## Task 10: Write `backend/AGENT.md`

**Files:**
- Create: `backend/AGENT.md`

- [ ] **Step 1: Create `backend/AGENT.md`**

```markdown
# AGENT.md — M. M. Attarwala Backend

> Master reference for AI agents working on this backend. Updated after every phase.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Brand | M. M. Attarwala |
| Type | Luxury fragrance consultation platform |
| Frontend | React + Vite (complete, at `/frontend`) |
| Backend | Django 5.x + DRF (this directory) |
| Platform | Admin-only — no customer accounts |

### What customers do
- Browse products (read-only API)
- Submit custom fragrance requests
- Contact via WhatsApp

### What admins do
- Manage all content via `/admin/` and dashboard APIs
- View/manage inquiries and fragrance requests
- Update products, CMS content, media

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Django | 5.1.x |
| API | Django REST Framework | 3.15.x |
| DB Driver | mysqlclient | 2.2.x |
| Auth | djangorestframework-simplejwt | 5.3.x |
| Admin skin | django-unfold | 0.41.x |
| API docs | drf-spectacular | 0.27.x |
| Env config | python-decouple | 3.8 |
| CORS | django-cors-headers | 4.4.x |
| Images | Pillow | 11.x |

---

## 3. Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DJANGO_ENV` | `development` or `production` | `development` |
| `SECRET_KEY` | Django secret key | — |
| `DB_NAME` | MySQL database name | `perfume` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | (empty) |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `ALLOWED_HOSTS` | Comma-separated hosts | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins | `http://localhost:5173` |
| `DEBUG` | Debug flag | `True` |

---

## 4. Setup Commands (fresh clone)

```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

pip install -r requirements/dev.txt

# Create .env from .env.example and fill in SECRET_KEY
copy .env.example .env

# Ensure MySQL is running and 'perfume' DB exists
mysql -u root -e "CREATE DATABASE IF NOT EXISTS perfume CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## 5. App Map

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

## 6. URL Structure

| URL | Purpose |
|---|---|
| `/admin/` | Unfold admin panel |
| `/api/v1/` | All REST API endpoints |
| `/api/schema/` | OpenAPI schema (JSON) |
| `/api/schema/swagger-ui/` | Swagger UI |
| `/api/schema/redoc/` | ReDoc |

---

## 7. Phase Roadmap

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

## 8. Features NOT in scope

- Customer authentication / accounts
- Cart / checkout
- Payment gateway
- Shipping
- Subscription
- Customer dashboard

---

## 9. Key Architecture Decisions

- **No customer accounts:** Platform is admin-only. Public APIs are read-only.
- **Settings split:** `base.py` + `dev.py` + `prod.py`. Load via `DJANGO_ENV`.
- **Apps under `apps/`:** All business logic in `apps.<name>`. Dotted path in `AppConfig.name`.
- **API versioning:** All endpoints under `/api/v1/`. Version in URL, not header.
- **JWT auth:** Admin JWT only — no session auth for API. Unfold admin still uses session.
- **Token blacklist:** Enabled for logout and refresh rotation.
- **utf8mb4:** MySQL charset for full Unicode + emoji support.
- **TIME_ZONE:** `Asia/Kolkata` (IST) — brand is in Vadodara.
```

---

## Task 11: Commit Phase 1

- [ ] **Step 1: Stage all files**

```powershell
cd d:\code\GITHUB\Perfume
git add backend/
git add docs/
```

- [ ] **Step 2: Verify staged files look right**

```powershell
git status
```

Confirm no `.env` or `venv/` appears in staged files. If they do: `git reset HEAD backend/.env` and verify `.gitignore` is correct.

- [ ] **Step 3: Commit**

```powershell
git commit -m "feat(backend): Phase 1 — Django foundation, MySQL, DRF, Unfold, 11 apps scaffolded"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Virtual environment setup
- ✅ Dependency installation (base/dev/prod split)
- ✅ MySQL configuration (utf8mb4, decouple-driven)
- ✅ Settings split (base/dev/prod)
- ✅ DRF configured with JWT default auth
- ✅ Unfold admin wired (before django.contrib.admin)
- ✅ drf-spectacular Swagger UI at `/api/schema/swagger-ui/`
- ✅ django-cors-headers configured
- ✅ All 11 apps scaffolded with correct dotted `name`
- ✅ `.gitignore` excludes venv, .env, media
- ✅ `.env` + `.env.example`
- ✅ `AGENT.md` written
- ✅ API versioned at `/api/v1/`
- ✅ TIME_ZONE = Asia/Kolkata
- ✅ Token blacklist app included (needed for Phase 2 JWT logout)
- ✅ Verification tests cover DB, admin, swagger, all apps importable

**No placeholders, no TBDs, no "similar to above" shortcuts.**
```
