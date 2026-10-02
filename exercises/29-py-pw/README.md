# pytest-playwright: búsqueda

**Bloque:** python · **Nivel:** Pytest

Con pytest-playwright (fixture page), escribe un test que busque 'laptop' y verifique que hay al menos un resultado y que el título contiene 'laptop'. Usa expect de playwright.sync_api.

> **Interview prompt:** Write a pytest-playwright test using the page fixture and web-first assertions.

### Qué debe incluir tu solución

1. Usar la fixture page de pytest-playwright.
2. Buscar "laptop" en el searchbox y presionar Enter.
3. expect(...).to_be_visible() en el primer resultado que contiene "laptop".
4. expect(page).to_have_title(...) con regex que ignore mayúsculas.

<details><summary>Pista: guía paso a paso</summary>

from playwright.sync_api import Page, expect; expect(page.get_by_role('listitem').first).to_be_visible()

1. Recibe page: Page como parámetro del test (fixture de pytest-playwright).
2. Navega con page.goto("/").
3. Llena el buscador con get_by_role("searchbox") y presiona Enter.
4. Valida con expect(locator).to_be_visible() y expect(page).to_have_title(re.compile(...)).

</details>

**Follow-up:** How do you run it in parallel across browsers? (pytest -n auto --browser chromium --browser firefox)

## Python

### Documentación para estudiar

- [`Pytest plugin`](https://playwright.dev/python/docs/test-runners) — Fixture page, --browser y opciones.
- [`Locators (Python)`](https://playwright.dev/python/docs/locators) — get_by_role, filter.
- [`Assertions (Python)`](https://playwright.dev/python/docs/test-assertions) — expect(...).to_be_visible().

### Plantilla

```python
from playwright.sync_api import Page, expect


def test_search_laptop(page: Page):
    # your code
    pass

```

<details><summary>Solución de referencia</summary>

```python
def test_search_laptop(page: Page):
    page.goto('/')
    page.get_by_role('searchbox', name='Search').fill('laptop')
    page.keyboard.press('Enter')
    results = page.get_by_role('listitem').filter(has_text='laptop')
    expect(results.first).to_be_visible()
    expect(page).to_have_title(re.compile('laptop', re.I))
```

</details>
