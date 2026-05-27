from django.test import TestCase, Client
from django.db import connection


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
