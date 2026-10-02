# DriverFactory thread-safe

**Bloque:** selenium · **Nivel:** Framework

Implementa DriverFactory con ThreadLocal<WebDriver>, init(browser) para chrome/firefox (headless si CI=true), get() y quit() que libere el ThreadLocal.

> **Interview prompt:** Implement a thread-safe DriverFactory using ThreadLocal for parallel TestNG execution.

### Qué debe incluir tu solución

1. Un ThreadLocal<WebDriver> privado y estático.
2. init("chrome" | "firefox"), headless cuando la variable de entorno CI = true.
3. get() devuelve el driver del hilo actual.
4. quit() cierra el navegador y llama a remove().

<details><summary>Pista: guía paso a paso</summary>

ChromeOptions().addArguments("--headless=new"). DRIVER.remove() en quit.

1. Declara private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();
2. En init crea ChromeDriver o FirefoxDriver con sus Options (headless si CI) y guárdalo con DRIVER.set().
3. get() devuelve DRIVER.get().
4. quit() cierra el navegador y llama DRIVER.remove().

</details>

**Follow-up:** What breaks if you use a static WebDriver with parallel="methods"?

## Java

### Documentación para estudiar

- [`ThreadLocal`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ThreadLocal.html) — Una variable distinta por hilo.
- [`Browser options`](https://www.selenium.dev/documentation/webdriver/drivers/options/) — ChromeOptions, FirefoxOptions y headless.
- [`switch expressions`](https://docs.oracle.com/en/java/javase/21/language/switch-expressions-and-statements.html) — Elegir el navegador con yield.

### Plantilla

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.firefox.*;

public final class DriverFactory {

    private DriverFactory() {}

    public static void init(String browser) {
        // your code
    }

    public static WebDriver get() {
        return null;
    }

    public static void quit() {
        // your code
    }
}
```

<details><summary>Solución de referencia</summary>

```java
private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();
private static final boolean CI = Boolean.parseBoolean(System.getenv().getOrDefault("CI", "false"));

public static void init(String browser) {
    WebDriver d = switch (browser.toLowerCase()) {
        case "firefox" -> {
            FirefoxOptions o = new FirefoxOptions();
            if (CI) o.addArguments("-headless");
            yield new FirefoxDriver(o);
        }
        default -> {
            ChromeOptions o = new ChromeOptions();
            if (CI) o.addArguments("--headless=new");
            yield new ChromeDriver(o);
        }
    };
    DRIVER.set(d);
}
public static WebDriver get() { return DRIVER.get(); }
public static void quit() {
    WebDriver d = DRIVER.get();
    if (d != null) { d.quit(); DRIVER.remove(); }
}
```

</details>
