import os
import sys
import flask_sqlalchemy
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
os.environ.setdefault('DATABASE_URL', 'sqlite:///:memory:')

# Prevent database initialization during import
flask_sqlalchemy.SQLAlchemy.create_all = lambda self, bind=None, app=None: None
from backend.app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_health_check(client):
    response = client.get('/test')
    assert response.status_code == 200
