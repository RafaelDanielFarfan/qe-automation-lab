# conftest.py: fixtures y parametrize

**Bloque:** python · **Nivel:** Pytest

Escribe un conftest.py con una fixture api_client de scope session (yield + cierre) y un test parametrizado que valide GET /users/{id} para 3 ids con su status esperado (200, 200, 404). Marca el test como @pytest.mark.smoke.

> **Interview prompt:** Write a session-scoped API client fixture in conftest.py and a parametrized smoke test using it.

### Qué debe incluir tu solución

1. Fixture api_client con scope="session", usando requests.Session, yield y close().
2. Test con @pytest.mark.parametrize para (1, 200), (2, 200) y (999, 404), con ids legibles.
3. Marcado con @pytest.mark.smoke.

<details><summary>Pista: guía paso a paso</summary>

requests.Session() dentro de la fixture; @pytest.mark.parametrize("user_id, status", [...]).

1. En conftest.py decora una función con @pytest.fixture(scope="session").
2. Crea requests.Session(), configura headers y haz yield de la sesión.
3. Después del yield, cierra la sesión.
4. En el test usa @pytest.mark.parametrize("user_id, status", [...]) y pide api_client como parámetro.

</details>

**Follow-up:** Explain fixture scopes and when session scope is dangerous.

## Python

### Documentación para estudiar

- [`Fixtures`](https://docs.pytest.org/en/stable/how-to/fixtures.html) — scope, yield y conftest.py.
- [`Parametrize`](https://docs.pytest.org/en/stable/how-to/parametrize.html) — Varios casos con un solo test.
- [`Markers`](https://docs.pytest.org/en/stable/how-to/mark.html) — @pytest.mark.smoke.
- [`requests.Session`](https://requests.readthedocs.io/en/latest/user/advanced/#session-objects) — Reutilizar conexión y headers.

### Plantilla

```python
# conftest.py
import pytest
import requests

BASE_URL = 'https://api.example.com'

# fixture here


# test_users.py
# parametrized test here

```

<details><summary>Solución de referencia</summary>

```python
# conftest.py
@pytest.fixture(scope='session')
def api_client():
    s = requests.Session()
    s.headers.update({'Authorization': 'Bearer ' + os.environ['API_TOKEN']})
    s.base_url = BASE_URL
    yield s
    s.close()

# test_users.py
@pytest.mark.smoke
@pytest.mark.parametrize('user_id, status', [(1, 200), (2, 200), (999, 404)], ids=['u1', 'u2', 'missing'])
def test_get_user(api_client, user_id, status):
    r = api_client.get(f'{api_client.base_url}/users/{user_id}', timeout=10)
    assert r.status_code == status
```

</details>
