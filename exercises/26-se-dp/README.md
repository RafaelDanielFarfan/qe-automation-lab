# TestNG: DataProvider, groups y retry

**Bloque:** selenium · **Nivel:** TestNG

Escribe una clase de test con @BeforeMethod/@AfterMethod usando DriverFactory, un @DataProvider con 3 casos de búsqueda, groups = {"regression"} y un IRetryAnalyzer que reintente 1 vez.

> **Interview prompt:** Write a TestNG test class with a data provider, groups, lifecycle hooks and a retry analyzer.

### Qué debe incluir tu solución

1. @BeforeMethod / @AfterMethod con alwaysRun = true usando DriverFactory.
2. @DataProvider con 3 filas { query, hasResults }.
3. @Test con dataProvider, groups = {"regression"} y retryAnalyzer.
4. Clase RetryOnce que reintenta una sola vez.

<details><summary>Pista: guía paso a paso</summary>

implements IRetryAnalyzer { public boolean retry(ITestResult r) { ... } }

1. @BeforeMethod(alwaysRun = true): DriverFactory.init(...); @AfterMethod: DriverFactory.quit().
2. @DataProvider(name = "queries") devuelve Object[][] con 3 filas.
3. @Test(dataProvider = "queries", groups = {"regression"}, retryAnalyzer = RetryOnce.class).
4. RetryOnce implementa IRetryAnalyzer con un contador que permite 1 reintento.

</details>

**Follow-up:** Why should retries be tracked and reported instead of silently hiding failures?

## Java

### Documentación para estudiar

- [`TestNG: annotations`](https://testng.org/#_annotations) — Ciclo de vida de los tests.
- [`TestNG: DataProvider`](https://testng.org/#_parameters_with_dataproviders) — Tests parametrizados.
- [`TestNG: retry`](https://testng.org/#_rerunning_failed_tests) — IRetryAnalyzer.

### Plantilla

```java
import org.testng.*;
import org.testng.annotations.*;

public class SearchTest {

    // @BeforeMethod / @AfterMethod

    // @DataProvider

    // @Test(dataProvider = ..., groups = ..., retryAnalyzer = ...)
}

class RetryOnce implements IRetryAnalyzer {
    // your code
}
```

<details><summary>Solución de referencia</summary>

```java
public class SearchTest {
    @BeforeMethod(alwaysRun = true)
    public void setUp() { DriverFactory.init(System.getProperty("browser", "chrome")); }

    @AfterMethod(alwaysRun = true)
    public void tearDown() { DriverFactory.quit(); }

    @DataProvider(name = "queries", parallel = true)
    public Object[][] queries() {
        return new Object[][] { {"laptop", true}, {"phone", true}, {"zzzz", false} };
    }

    @Test(dataProvider = "queries", groups = {"regression"}, retryAnalyzer = RetryOnce.class)
    public void search(String q, boolean hasResults) {
        SearchPage page = new SearchPage(DriverFactory.get()).open().search(q);
        Assert.assertEquals(page.hasResults(), hasResults);
    }
}

class RetryOnce implements IRetryAnalyzer {
    private int count = 0;
    public boolean retry(ITestResult result) { return count++ < 1; }
}
```

</details>
