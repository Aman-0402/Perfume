from .base import *

# Use SQLite for test runs to avoid MariaDB 10.4 vs Django 5.1 version conflict
# Django 5.1 requires MariaDB >= 10.5; production DB is MariaDB 10.4.32
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'test_db.sqlite3',
    }
}

# Disable debug toolbar for tests
INSTALLED_APPS = [app for app in INSTALLED_APPS if app != 'debug_toolbar']
MIDDLEWARE = [m for m in MIDDLEWARE if 'debug_toolbar' not in m]
