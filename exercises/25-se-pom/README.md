# BasePage + LoginPage

**Bloque:** selenium · **Nivel:** Framework

Crea BasePage con WebDriverWait y helpers click(By) y type(By, text) con explicit waits. Luego LoginPage extends BasePage con login(user, pass) que devuelve DashboardPage.

> **Interview prompt:** Create a BasePage with explicit-wait helpers and a fluent LoginPage that returns the next page object.

### Qué debe incluir tu solución

1. BasePage abstracta con WebDriver y WebDriverWait (10 s).
2. click(By) espera elementToBeClickable; type(By, text) espera visibilidad, limpia y escribe.
3. LoginPage con locators By privados.
4. login(user, pass) devuelve un DashboardPage (POM fluido).

<details><summary>Pista: guía paso a paso</summary>

wait.until(ExpectedConditions.elementToBeClickable(by)).click();

1. En el constructor de BasePage guarda el driver y crea new WebDriverWait(driver, Duration.ofSeconds(10)).
2. click: wait.until(ExpectedConditions.elementToBeClickable(locator)).click().
3. type: espera visibilityOfElementLocated, luego clear() y sendKeys().
4. LoginPage usa type y click y devuelve new DashboardPage(driver).

</details>

**Follow-up:** Why return the next Page Object from an action (fluent POM)?

## Java

### Documentación para estudiar

- [`Waits`](https://www.selenium.dev/documentation/webdriver/waits/) — Explicit waits y ExpectedConditions.
- [`Page Object Models`](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/) — Guía oficial de Selenium.
- [`Locators (By)`](https://www.selenium.dev/documentation/webdriver/elements/locators/) — By.id, By.cssSelector…

### Plantilla

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public abstract class BasePage {
    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        // your code
    }

    protected void click(By locator) {}
    protected void type(By locator, String text) {}
}

class LoginPage extends BasePage {
    // locators

    LoginPage(WebDriver driver) { super(driver); }

    public DashboardPage login(String user, String pass) {
        return null;
    }
}
```

<details><summary>Solución de referencia</summary>

```java
protected BasePage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
}
protected void click(By locator) {
    wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
}
protected void type(By locator, String text) {
    WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    el.clear();
    el.sendKeys(text);
}

// LoginPage
private final By email = By.id("email");
private final By password = By.id("password");
private final By submit = By.cssSelector("button[type='submit']");

public DashboardPage login(String user, String pass) {
    type(email, user);
    type(password, pass);
    click(submit);
    return new DashboardPage(driver);
}
```

</details>
