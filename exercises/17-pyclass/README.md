# Clase TestRun con excepciones

**Bloque:** python · **Nivel:** Media

Crea la clase TestRun con add(name, status). status solo puede ser 'passed', 'failed' o 'skipped'; si no, lanza ValueError. Añade el método failed_tests() que devuelve los nombres fallidos en orden.

> **Interview prompt:** Create a TestRun class with add(name, status) that raises ValueError for invalid statuses, and failed_tests() returning failed test names.

### Ejemplo 1

**Entrada**

```
run = TestRun()
run.add("login", "passed")
run.add("cart", "failed")
run.add("pay", "failed")
run.failed_tests()
```

**Salida esperada**

```
["cart", "pay"]
```

### Ejemplo 2

**Entrada**

```
TestRun().add("x", "broken")
```

**Salida esperada**

```
lanza ValueError
```

"broken" no es un estado válido.

### Ejemplo 3

**Entrada**

```
TestRun().failed_tests()
```

**Salida esperada**

```
[]
```

### Reglas y casos borde

- Estados válidos: passed, failed, skipped.
- failed_tests() conserva el orden en que se agregaron.

<details><summary>Pista: guía paso a paso</summary>

Guarda una lista de tuplas. Valida con un set de estados permitidos.

1. En __init__ crea una lista vacía para guardar los resultados.
2. En add: si status no está en VALID, lanza ValueError; si es válido, guarda (name, status).
3. En failed_tests: devuelve los nombres cuyo status sea "failed", en orden.

</details>

**Follow-up:** How would you make TestRun iterable? (__iter__) What about __len__?

## Python

### Documentación para estudiar

- [`Clases`](https://docs.python.org/es/3/tutorial/classes.html) — __init__, self y atributos de clase.
- [`raise ValueError`](https://docs.python.org/es/3/library/exceptions.html#ValueError) — Error para valores inválidos.
- [`List comprehensions`](https://docs.python.org/es/3/tutorial/datastructures.html#list-comprehensions) — Filtrar los fallidos.

### Plantilla

```python
class TestRun:
    VALID = {'passed', 'failed', 'skipped'}

    def __init__(self):
        pass

    def add(self, name, status):
        pass

    def failed_tests(self):
        pass


run = TestRun()
run.add('login', 'passed')
run.add('cart', 'failed')
print(run.failed_tests())
```

### Tests

- `build().failed_tests()` → `['cart','pay']`
- `bad()` → `'ValueError'`
- `TestRun().failed_tests()` → `[]`

<details><summary>Solución de referencia</summary>

```python
class TestRun:
    VALID = {'passed', 'failed', 'skipped'}

    def __init__(self):
        self._results = []

    def add(self, name, status):
        if status not in self.VALID:
            raise ValueError(f'Invalid status: {status}')
        self._results.append((name, status))

    def failed_tests(self):
        return [n for n, s in self._results if s == 'failed']
```

</details>
