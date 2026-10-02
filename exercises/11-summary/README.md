# Resumen de una ejecución de tests

**Bloque:** coding · **Nivel:** Media

Recibes resultados {name, status, duration}. Devuelve {total, passed, failed, skipped, passRate} donde passRate es el % de passed sobre los ejecutados (sin skipped), redondeado a 1 decimal.

> **Interview prompt:** Given test results {name, status, duration}, return {total, passed, failed, skipped, passRate}. passRate = passed / (passed + failed) * 100, rounded to 1 decimal.

### Ejemplo 1

**Entrada**

```
results = [
  { name: "login",  status: "passed",  duration: 1200 },
  { name: "cart",   status: "failed",  duration: 3400 },
  { name: "search", status: "passed",  duration: 800 },
  { name: "export", status: "skipped", duration: 0 }
]
```

**Salida esperada**

```
{ total: 4, passed: 2, failed: 1, skipped: 1, passRate: 66.7 }
```

passRate = 2 / (2 + 1) × 100 = 66.666… → 66.7. Los skipped no cuentan.

### Ejemplo 2

**Entrada**

```
results = []
```

**Salida esperada**

```
{ total: 0, passed: 0, failed: 0, skipped: 0, passRate: 0 }
```

Sin tests ejecutados, passRate es 0 (no dividas entre 0).

### Reglas y casos borde

- status solo puede ser "passed", "failed" o "skipped".
- passRate redondeado a 1 decimal.
- En Python las claves son strings: "total", "passed", …, "passRate".

<details><summary>Pista: guía paso a paso</summary>

reduce / un loop con contadores. Cuidado con la división entre 0.

1. Inicia contadores: total = cantidad de resultados, passed = failed = skipped = 0.
2. Recorre los resultados y suma 1 al contador según status.
3. Calcula executed = passed + failed (los skipped no cuentan).
4. Si executed > 0, passRate = passed / executed × 100 redondeado a 1 decimal; si no, 0.
5. Devuelve el objeto / mapa con las 5 claves.

</details>

**Follow-up:** How would you also return the 3 slowest tests?

## Java

### Documentación para estudiar

- [`record`](https://docs.oracle.com/en/java/javase/21/language/records.html) — TestResult ya está definido como record.
- [`Collectors.groupingBy() + counting()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html) — Contar por status con Streams.
- [`Math.round()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html) — Math.round(x * 10) / 10.0 para 1 decimal.

### Plantilla

```java
import java.util.*;

public class Main {
    record TestResult(String name, String status, long duration) {}

    public static Map<String, Object> summarize(List<TestResult> results) {
        // your code
        return new LinkedHashMap<>();
    }

    public static void main(String[] args) {
        List<TestResult> run = List.of(
            new TestResult("login", "passed", 1200),
            new TestResult("cart", "failed", 3400),
            new TestResult("search", "passed", 800),
            new TestResult("export", "skipped", 0));
        System.out.println(summarize(run));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static Map<String, Object> summarize(List<TestResult> results) {
    Map<String, Long> by = results.stream()
        .collect(Collectors.groupingBy(TestResult::status, Collectors.counting()));
    long p = by.getOrDefault("passed", 0L), f = by.getOrDefault("failed", 0L);
    Map<String, Object> s = new LinkedHashMap<>();
    s.put("total", results.size());
    s.put("passed", p); s.put("failed", f);
    s.put("skipped", by.getOrDefault("skipped", 0L));
    s.put("passRate", p + f == 0 ? 0.0 : Math.round(p * 1000.0 / (p + f)) / 10.0);
    return s;
}
```

</details>

## Python

### Documentación para estudiar

- [`round()`](https://docs.python.org/es/3/library/functions.html#round) — round(x, 1)
- [`dict`](https://docs.python.org/es/3/library/stdtypes.html#mapping-types-dict) — Acceder con r["status"].

### Plantilla

```python
def summarize(results):
    # results: list of dicts {'name', 'status', 'duration'}
    pass

run = [
    {'name': 'login', 'status': 'passed', 'duration': 1200},
    {'name': 'cart', 'status': 'failed', 'duration': 3400},
]
print(summarize(run))
```

### Tests

- `summarize(RUN)` → `{'total':4,'passed':2,'failed':1,'skipped':1,'passRate':66.7}`
- `summarize([])` → `{'total':0,'passed':0,'failed':0,'skipped':0,'passRate':0}`

<details><summary>Solución de referencia</summary>

```python
def summarize(results):
    s = {'total': len(results), 'passed': 0, 'failed': 0, 'skipped': 0}
    for r in results:
        s[r['status']] += 1
    executed = s['passed'] + s['failed']
    s['passRate'] = round(s['passed'] / executed * 100, 1) if executed else 0
    return s
```

</details>

## TypeScript

### Documentación para estudiar

- [`Array.prototype.reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — Acumular contadores.
- [`Math.round()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/round) — Math.round(x * 10) / 10 para 1 decimal.
- [`Interfaces y literal types`](https://www.typescriptlang.org/docs/handbook/2/objects.html) — Status = "passed" | "failed" | "skipped".
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
type Status = 'passed' | 'failed' | 'skipped';
interface TestResult { name: string; status: Status; duration: number }
interface Summary { total: number; passed: number; failed: number; skipped: number; passRate: number }

function summarize(results: TestResult[]): Summary {
  // your code
}

console.log(summarize([
  { name: 'login', status: 'passed', duration: 1200 },
  { name: 'cart', status: 'failed', duration: 3400 },
]));
```

<details><summary>Solución de referencia</summary>

```ts
function summarize(results: TestResult[]): Summary {
  const s = { total: results.length, passed: 0, failed: 0, skipped: 0, passRate: 0 };
  for (const r of results) s[r.status]++;
  const executed = s.passed + s.failed;
  s.passRate = executed ? Math.round((s.passed / executed) * 1000) / 10 : 0;
  return s;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Array.prototype.reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — Acumular contadores.
- [`Math.round()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/round) — Math.round(x * 10) / 10 para 1 decimal.

### Plantilla

```js
function summarize(results) {
  // your code
}

const run = [
  { name: 'login', status: 'passed', duration: 1200 },
  { name: 'cart', status: 'failed', duration: 3400 },
  { name: 'search', status: 'passed', duration: 800 },
  { name: 'export', status: 'skipped', duration: 0 },
];
console.log(summarize(run));
```

### Tests

- `summarize(RUN)` → `{total:4,passed:2,failed:1,skipped:1,passRate:66.7}`
- `summarize([])` → `{total:0,passed:0,failed:0,skipped:0,passRate:0}`
- `summarize([{name:'a',status:'skipped',duration:0}])` → `{total:1,passed:0,failed:0,skipped:1,passRate:0}`
