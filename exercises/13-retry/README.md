# Retry asíncrono

**Bloque:** coding · **Nivel:** Media

Implementa retry(fn, attempts): ejecuta fn (async) hasta que tenga éxito o se agoten los intentos; si todos fallan, lanza el último error. Helper disponible en los tests: flaky(n) falla n veces y luego devuelve 'ok'.

> **Interview prompt:** Implement retry(fn, attempts) that awaits fn until it succeeds or attempts run out, then rethrows the last error.

### Ejemplo 1

**Entrada**

```
fn falla 2 veces y luego devuelve "ok"; attempts = 3
```

**Salida esperada**

```
"ok"
```

Intento 1 falla, intento 2 falla, intento 3 devuelve "ok".

### Ejemplo 2

**Entrada**

```
fn falla siempre; attempts = 2
```

**Salida esperada**

```
lanza el error del 2.º intento ("fail 2")
```

Se agotaron los intentos: se relanza el último error, no el primero.

### Reglas y casos borde

- Llama a fn como máximo attempts veces.
- Si un intento tiene éxito, devuelve su resultado de inmediato.
- En JS/TS fn es async: usa await.
- En los tests, flaky(n) crea una función que falla n veces y luego devuelve "ok".

<details><summary>Pista: guía paso a paso</summary>

for + try/catch + await. Guarda el último error.

1. Declara una variable lastError fuera del loop.
2. Haz un loop de 0 a attempts - 1.
3. Dentro, en un try: llama (y en JS/TS espera con await) a fn y devuelve su resultado.
4. En el catch: guarda el error en lastError y deja que el loop continúe.
5. Al salir del loop, lanza lastError (throw / raise).

</details>

**Follow-up:** Why are blind retries dangerous in a test framework? When are they acceptable?

## Java

### Documentación para estudiar

- [`Supplier<T>`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Supplier.html) — fn.get() ejecuta la función.
- [`try / catch`](https://docs.oracle.com/javase/tutorial/essential/exceptions/try.html) — Capturar RuntimeException.
- [`Generics <T>`](https://docs.oracle.com/javase/tutorial/java/generics/methods.html) — Métodos genéricos.

### Plantilla

```java
import java.util.function.Supplier;

public class Main {
    public static <T> T retry(Supplier<T> fn, int attempts) {
        // your code
        return null;
    }

    public static void main(String[] args) {
        int[] calls = {0};
        String r = retry(() -> {
            if (++calls[0] < 3) throw new RuntimeException("boom");
            return "ok";
        }, 3);
        System.out.println(r + " after " + calls[0] + " calls");
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static <T> T retry(Supplier<T> fn, int attempts) {
    RuntimeException last = null;
    for (int i = 0; i < attempts; i++) {
        try { return fn.get(); }
        catch (RuntimeException e) { last = e; }
    }
    throw last;
}
```

</details>

## Python

### Documentación para estudiar

- [`try / except`](https://docs.python.org/es/3/tutorial/errors.html#handling-exceptions) — Capturar Exception.
- [`raise`](https://docs.python.org/es/3/tutorial/errors.html#raising-exceptions) — Relanzar el último error.

### Plantilla

```python
def retry(fn, attempts=3):
    # call fn() until it succeeds; re-raise the last exception
    pass

def make_flaky(n):
    state = {'calls': 0}
    def fn():
        state['calls'] += 1
        if state['calls'] <= n:
            raise ValueError('fail ' + str(state['calls']))
        return 'ok'
    return fn

print(retry(make_flaky(2), 3))
```

### Tests

- `retry(flaky(2),3)` → `'ok'`
- `err_msg(lambda: retry(flaky(5),2))` → `'fail 2'`

<details><summary>Solución de referencia</summary>

```python
def retry(fn, attempts=3):
    last = None
    for _ in range(attempts):
        try:
            return fn()
        except Exception as e:
            last = e
    raise last
```

</details>

## TypeScript

### Documentación para estudiar

- [`async / await`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) — Esperar una Promise dentro de try/catch.
- [`try...catch`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try...catch) — Capturar el error de un await.
- [`throw`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/throw) — Relanzar el último error.
- [`Generics`](https://www.typescriptlang.org/docs/handbook/2/generics.html) — retry<T>(fn: () => Promise<T>): Promise<T>
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  // your code
}

```

<details><summary>Solución de referencia</summary>

```ts
async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) { last = e; }
  }
  throw last;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`async / await`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) — Esperar una Promise dentro de try/catch.
- [`try...catch`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try...catch) — Capturar el error de un await.
- [`throw`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/throw) — Relanzar el último error.

### Plantilla

```js
async function retry(fn, attempts = 3) {
  // your code
}

// try it
let calls = 0;
retry(async () => { if (++calls < 3) throw new Error('boom'); return 'ok'; }, 3)
  .then(r => console.log(r, 'after', calls, 'calls'));
```

### Tests

- `await retry(flaky(2),3)` → `'ok'`
- `await retry(flaky(0),1)` → `'ok'`
- `await retry(flaky(5),2).then(()=>'no error',e=>e.message)` → `'fail 2'`
