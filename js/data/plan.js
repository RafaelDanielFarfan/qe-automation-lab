// ================= DATA =================
const REQS = [
  {k:"pw", label:"Playwright", phases:[2,5]},
  {k:"js", label:"JavaScript / TypeScript / Python", phases:[1,4]},
  {k:"java", label:"Java y Selenium", phases:[1,3]}
];

const GAPS = [
  {t:"Entrevista en inglés", d:"La parte técnica suele hacerse en inglés. Todas las preguntas y la simulación están en inglés para entrenar vocabulario técnico."},
  {t:"Java: Generics, Optional, StringBuilder", d:"Preguntas clásicas: String vs StringBuilder, inmutabilidad, overloading vs overriding, abstract class vs interface, static."},
  {t:"Playwright moderno", d:"expect.soft, expect.poll / toPass, test.step, anotaciones (skip/fixme/slow), sharding, UI mode, codegen, toHaveScreenshot, globalSetup."},
  {t:"Selenium 4", d:"Selenium Manager, relative locators, Shadow DOM, CDP/BiDi. TestNG: DataProvider, listeners, groups, testng.xml."},
  {t:"API testing en Java", d:"REST Assured es muy común en proyectos Java/Selenium: given/when/then, validación de status, body y JSON schema."},
  {t:"BDD con Cucumber", d:"Gherkin, step definitions y hooks. Muchos equipos lo usan junto a Selenium o Playwright."},
  {t:"Diseño de casos de prueba", d:"Particiones de equivalencia, valores límite, tablas de decisión, pirámide y shift-left. Lo preguntan aunque el rol sea de automatización."},
  {t:"HTTP y SQL básicos", d:"Métodos, status codes, headers, auth (Bearer, OAuth), y consultas SQL simples para validar datos de prueba."},
  {t:"Historias STAR", d:"Para el bloque behavioral: 4-5 historias preparadas (flaky suite, framework desde cero, conflicto con dev, mentoría, migración)."},
  {t:"Ejercicios estilo live coding", d:"Strings, frecuencias, duplicados, two-sum, agrupar resultados de tests y parsear logs. Patrones que se repiten en entrevistas QA."}
];

const PHASES = [
 {n:1, title:"Coding & Programming", prio:"Alta", hours:"10–12 h", tag:"coding",
  goal:"Resolver ejercicios en vivo sin bloquearte, en Java, Python y TypeScript/JavaScript.",
  groups:[
   {name:"Java", topics:["Arrays","Strings","Collections","HashMap, HashSet, List","Loops","OOP","Exceptions","Streams","Lambdas","Interfaces","equals() / hashCode()","+Generics","+Optional","+String vs StringBuilder","+Overloading vs overriding","+Abstract class vs interface","+Comparator / Comparable"]},
   {name:"Python", topics:["Lists / dicts / sets","Functions","List comprehensions","OOP","Exceptions","+*args / **kwargs","+Decorators (concepto)"]},
   {name:"JavaScript / TypeScript", topics:["let / const","Functions y arrow functions","Arrays / objects","map, filter, reduce","Destructuring","Spread operator","Promises","async / await","TS types / interfaces","Classes","Modules","+Union types y generics en TS","+== vs ===, truthy/falsy"]},
   {name:"Algoritmia básica", topics:["+Big-O (O(n) vs O(n²))","+Frecuencias con mapas","+Two pointers","+Ordenar con comparador"]}
  ],
  lessons:[
   {t:"Patrón: contar con un mapa", p:"La mitad de los ejercicios de entrevista se resuelven contando ocurrencias en un HashMap / dict / Map en una sola pasada: O(n).", code:"// Java\nMap<Character,Integer> freq = new HashMap<>();\nfor (char c : s.toCharArray())\n    freq.merge(c, 1, Integer::sum);\n\n# Python\nfrom collections import Counter\nfreq = Counter(s)\n\n// TypeScript\nconst freq = new Map<string, number>();\nfor (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);", tip:"Di en voz alta la complejidad: “one pass, O(n) time, O(k) space”."},
   {t:"No mutar la entrada", p:"Si el enunciado dice “without modifying the original”, crea una colección nueva. En Java los arrays son referencias; en JS, sort() y reverse() mutan.", code:"// JS: copia antes de ordenar\nconst sorted = [...nums].sort((a, b) => a - b);\n\n// Java\nint[] copy = Arrays.copyOf(nums, nums.length);\nList<Integer> evens = Arrays.stream(nums)\n    .filter(n -> n % 2 == 0).boxed().toList();", tip:"Preguntas de seguimiento típicas: ¿y si el array tiene null? ¿y números negativos?"},
   {t:"equals() y hashCode()", p:"Si dos objetos son iguales según equals(), deben tener el mismo hashCode(). Si no, HashSet/HashMap no los encuentran.", code:"@Override public boolean equals(Object o) {\n  if (this == o) return true;\n  if (!(o instanceof User u)) return false;\n  return email.equals(u.email);\n}\n@Override public int hashCode() {\n  return Objects.hash(email);\n}", tip:"Desde Java 16 un record genera equals/hashCode/toString automáticamente."},
   {t:"async / await y Promises", p:"Playwright es todo asíncrono: cada acción devuelve una Promise. Olvidar un await es la causa #1 de tests inestables en TS.", code:"async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {\n  let lastError: unknown;\n  for (let i = 0; i < attempts; i++) {\n    try { return await fn(); }\n    catch (e) { lastError = e; }\n  }\n  throw lastError;\n}", tip:"Promise.all ejecuta en paralelo; un for con await ejecuta en serie."}
  ]},
 {n:2, title:"Playwright", prio:"Muy alta", hours:"16–20 h", tag:"playwright",
  goal:"Dominar la herramienta principal de la oferta: arquitectura, locators, fixtures, API, framework y debugging.",
  groups:[
   {name:"Core", topics:["Browser, BrowserContext, Page","Locators","Auto-waiting","Web-first assertions","getByRole / getByText / getByTestId","CSS / XPath","Elementos dinámicos","Frames","Dialogs","Downloads / uploads","Múltiples tabs y popups","+getByLabel / getByPlaceholder","+Locator chaining y filter()"]},
   {name:"Arquitectura", topics:["Context isolation","Projects","Workers y paralelismo","Retries","Timeouts","Trace Viewer","Screenshots / videos","Reporters","+Sharding (--shard)","+UI mode y codegen"]},
   {name:"Fixtures", topics:["Built-in fixtures","Custom fixtures (test.extend)","Scope test vs worker","Setup / teardown","Fixture de autenticación","Fixture de API"]},
   {name:"API y avanzado", topics:["APIRequestContext","UI + API combinados","Datos de prueba vía API","storageState","Network interception (page.route)","Mocking","Flaky tests","+expect.soft","+expect.poll / toPass","+test.step y anotaciones","+toHaveScreenshot (visual)","+globalSetup / dependencies"]}
  ],
  lessons:[
   {t:"Browser → Context → Page", p:"Browser es el proceso. Un BrowserContext es un perfil aislado (cookies, storage), barato de crear: Playwright crea uno nuevo por test. Page es una pestaña dentro del contexto.", code:"const browser = await chromium.launch();\nconst context = await browser.newContext({ storageState: 'auth.json' });\nconst page = await context.newPage();", tip:"Respuesta clave: el aislamiento por contexto permite paralelismo sin que los tests compartan sesión."},
   {t:"Locators y auto-waiting", p:"Los locators son lazy: se resuelven en cada acción. Playwright espera a que el elemento sea visible, estable, habilitado y reciba eventos antes de actuar.", code:"await page.getByRole('button', { name: 'Sign in' }).click();\nawait page.getByLabel('Email').fill('qa@test.com');\nawait expect(page.getByRole('alert')).toHaveText(/invalid/i);\n\n// filtrar dentro de una lista\nawait page.getByRole('listitem')\n  .filter({ hasText: 'Order #42' })\n  .getByRole('button', { name: 'Cancel' }).click();", tip:"Prioridad de locators: role > label > placeholder > text > test-id > CSS/XPath."},
   {t:"Custom fixtures", p:"Las fixtures encapsulan setup/teardown y se inyectan por nombre. Son la alternativa a los beforeEach y la forma idiomática de entregar Page Objects.", code:"type Fixtures = { loginPage: LoginPage; api: ApiClient };\n\nexport const test = base.extend<Fixtures>({\n  loginPage: async ({ page }, use) => {\n    await use(new LoginPage(page));\n  },\n  api: async ({ request }, use) => {\n    await use(new ApiClient(request));\n  },\n});", tip:"Todo lo que va antes de use() es setup; lo que va después es teardown."},
   {t:"Mocking de red", p:"page.route intercepta peticiones: puedes devolver datos falsos, simular errores 500 o abortar recursos para aislar la UI del backend.", code:"await page.route('**/api/products', route =>\n  route.fulfill({ status: 200, json: [] })\n);\nawait page.goto('/products');\nawait expect(page.getByText('No products yet')).toBeVisible();", tip:"Combínalo con route.continue() para modificar requests reales."},
   {t:"Autenticación con storageState", p:"Haz login una vez (proyecto setup o globalSetup), guarda cookies y localStorage, y reutilízalo en todos los tests.", code:"// auth.setup.ts\nsetup('authenticate', async ({ page }) => {\n  await page.goto('/login');\n  // ... login\n  await page.context().storageState({ path: '.auth/user.json' });\n});\n\n// playwright.config.ts\nprojects: [\n  { name: 'setup', testMatch: /.*\\.setup\\.ts/ },\n  { name: 'chromium', dependencies: ['setup'],\n    use: { storageState: '.auth/user.json' } },\n]", tip:"Mejor aún: autentícate vía API en el setup, es más rápido que por UI."}
  ]},
 {n:3, title:"Selenium + Java", prio:"Alta", hours:"10–12 h", tag:"selenium",
  goal:"Explicar y construir un framework Selenium + TestNG escalable, y defender decisiones frente a Playwright.",
  groups:[
   {name:"Selenium", topics:["WebDriver architecture (W3C)","Locators","Explicit waits","Implicit waits","Fluent waits","Elementos dinámicos","StaleElementReferenceException","Frames","Windows / tabs","Alerts","Actions","JavaScriptExecutor","+Selenium Manager","+Relative locators","+Shadow DOM","+CDP / BiDi"]},
   {name:"Framework", topics:["POM","BasePage","DriverFactory","Configuration","TestNG","Parallel execution","ThreadLocal","Data-driven (DataProvider)","Maven","Allure","+TestNG listeners y groups","+REST Assured","+Cucumber / Gherkin"]},
   {name:"Escenarios senior", topics:["Flaky tests","Selenium Grid","Test isolation","Escalabilidad del framework","Debugging de fallos"]}
  ],
  lessons:[
   {t:"Explicit wait correcto", p:"No mezcles implicit y explicit waits: los tiempos se suman de forma impredecible. Usa explicit waits con ExpectedConditions.", code:"WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nWebElement btn = wait.until(\n    ExpectedConditions.elementToBeClickable(By.id(\"submit\")));\nbtn.click();", tip:"Thread.sleep en una entrevista senior es una bandera roja."},
   {t:"DriverFactory con ThreadLocal", p:"Para ejecutar en paralelo con TestNG cada hilo necesita su propio WebDriver. ThreadLocal guarda una instancia por hilo.", code:"public final class DriverFactory {\n  private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();\n  public static WebDriver get() { return DRIVER.get(); }\n  public static void init(String browser) {\n    DRIVER.set(\"firefox\".equals(browser)\n        ? new FirefoxDriver() : new ChromeDriver());\n  }\n  public static void quit() {\n    if (DRIVER.get() != null) { DRIVER.get().quit(); DRIVER.remove(); }\n  }\n}", tip:"Olvidar remove() provoca fugas de memoria en pools de hilos."},
   {t:"StaleElementReferenceException", p:"Ocurre cuando el DOM se re-renderiza y la referencia guardada ya no existe. Solución: volver a localizar el elemento justo antes de usarlo o esperar con refreshed().", code:"wait.until(ExpectedConditions.refreshed(\n    ExpectedConditions.elementToBeClickable(locator))).click();", tip:"En Playwright no existe este problema porque los locators son lazy."},
   {t:"TestNG DataProvider", p:"Ejecuta el mismo test con varios sets de datos. parallel = true lo reparte entre hilos.", code:"@DataProvider(name = \"logins\", parallel = true)\npublic Object[][] logins() {\n  return new Object[][] {\n    {\"valid@test.com\", \"Pass123!\", true},\n    {\"valid@test.com\", \"wrong\", false},\n  };\n}\n@Test(dataProvider = \"logins\")\npublic void login(String user, String pass, boolean ok) { ... }", tip:"Menciona que los datos pueden venir de JSON/CSV/Excel para escalar."}
  ]},
 {n:4, title:"Python + Pytest", prio:"Alta", hours:"6–8 h", tag:"python",
  goal:"Explicar y usar Python con pytest al nivel de un framework de automatización, sin convertirlo en un curso de Python.",
  groups:[
   {name:"Python", topics:["Functions","OOP","Lists","Dictionaries","Sets","Comprehensions","Exceptions"]},
   {name:"Pytest", topics:["Fixtures","Parametrization","Markers","Assertions","conftest.py","Parallel execution (pytest-xdist)","+Fixture scopes","+pytest-playwright","+requests para API"]}
  ],
  lessons:[
   {t:"Fixtures con yield", p:"Lo que va antes del yield es setup; lo de después, teardown. El scope controla cuánto vive: function, class, module, session.", code:"import pytest\n\n@pytest.fixture(scope=\"session\")\ndef api_client():\n    client = ApiClient(base_url=BASE_URL)\n    client.login()\n    yield client\n    client.logout()", tip:"Las fixtures en conftest.py están disponibles sin importarlas."},
   {t:"Parametrize", p:"Un test, varios casos. Cada combinación aparece como test independiente en el reporte.", code:"@pytest.mark.parametrize(\"email, valid\", [\n    (\"qa@test.com\", True),\n    (\"no-at-sign\", False),\n    (\"\", False),\n])\ndef test_email_validation(email, valid):\n    assert is_valid_email(email) is valid", tip:"Usa ids= para nombres legibles en el reporte."},
   {t:"Markers y paralelismo", p:"Los markers etiquetan tests (smoke, regression). pytest-xdist reparte entre procesos.", code:"@pytest.mark.smoke\ndef test_home_loads(page): ...\n\n# terminal\npytest -m smoke -n 4 --reruns 1", tip:"Registra los markers en pytest.ini para evitar warnings."}
  ]},
 {n:5, title:"Arquitectura de frameworks", prio:"Muy alta", hours:"8–10 h", tag:"framework",
  goal:"Diseñar un framework desde cero y defender cada decisión: capas, fixtures vs POM, datos, configuración, escalado.",
  groups:[
   {name:"Diseño", topics:["Capas: tests / framework / config","POM vs fixtures","Gestión de test data","Configuración por entorno","Secrets","Utilities","Reporting","Tags y organización","+Builder / Factory para datos","+Principios SOLID y DRY en tests","+Logging"]},
   {name:"Decisiones senior", topics:["Escalar a 1.000+ tests","Ejecución en paralelo","Manejo de autenticación","Reducir flakiness","Integración en CI/CD","+Contract testing (concepto)"]}
  ],
  lessons:[
   {t:"Estructura de referencia", p:"Separa lo que cambia por motivos distintos: tests (qué se prueba), framework (cómo se interactúa) y config (dónde se ejecuta).", code:"tests/\n  ui/checkout.spec.ts\n  api/orders.spec.ts\nsrc/\n  pages/        # Page Objects (solo interacción)\n  fixtures/     # test.extend: pages, api, auth\n  api/          # clientes REST tipados\n  data/         # builders y factories\nconfig/\n  env/dev.json  qa.json  staging.json\nplaywright.config.ts\n.github/workflows/e2e.yml", tip:"Los Page Objects no deben contener asserts de negocio; los tests sí."},
   {t:"¿Fixture o Page Object?", p:"El Page Object encapsula una pantalla. La fixture decide cómo y cuándo se crea, y prepara el estado (login, datos). Lógica de setup en el Page Object lo acopla a un flujo concreto.", code:"// test limpio: el estado lo prepara la fixture\ntest('user can cancel order', async ({ ordersPage, seededOrder }) => {\n  await ordersPage.open();\n  await ordersPage.cancel(seededOrder.id);\n  await expect(ordersPage.status(seededOrder.id)).toHaveText('Cancelled');\n});", tip:"Frase útil: “Page Objects model the UI; fixtures model the test's preconditions.”"}
  ]},
 {n:6, title:"QA Fundamentals", prio:"Media", hours:"4–5 h", tag:"fundamentals",
  goal:"Hablar con criterio de estrategia, tipos de prueba y defectos, no solo de herramientas.",
  groups:[
   {name:"Testing", topics:["Smoke","Regression","Sanity","E2E","Integration","Functional","API testing","Exploratory","+Contract / performance (concepto)"]},
   {name:"Defectos", topics:["Severity","Priority","Reproducibility","Root cause","Bug lifecycle"]},
   {name:"Estrategia", topics:["Qué automatizar","Qué no automatizar","Test pyramid","UI vs API","Estabilidad","Mantenibilidad","Cobertura","+Equivalence partitioning","+Boundary value analysis","+Shift-left","+Agile / Scrum: rol de QA"]}
  ],
  lessons:[
   {t:"Pirámide de pruebas", p:"Muchos unit tests, bastantes de API/integración, pocos E2E de UI. La UI es la capa más lenta y frágil.", code:"        /  E2E UI  \\      pocos, flujos críticos\n       /  API / Integ \\    reglas de negocio\n      /     Unit       \\   la mayoría, rápidos", tip:"Si un caso puede validarse por API, no lo hagas por UI."},
   {t:"Severity vs Priority", p:"Severity = impacto técnico. Priority = urgencia de negocio. Un typo en el logo de la home: severity baja, priority alta.", code:"Crash en un reporte mensual poco usado → High severity / Low priority\nLogo mal escrito en la home           → Low severity / High priority", tip:"Tener los dos ejemplos listos en inglés."}
  ]},
 {n:7, title:"CI/CD + Git", prio:"Alta", hours:"4–6 h", tag:"cicd",
  goal:"Explicar con seguridad cómo vive tu framework en un pipeline.",
  groups:[
   {name:"Git", topics:["Branches","Pull requests","Merge vs rebase","GitHub / GitLab"]},
   {name:"Pipelines", topics:["Jenkins / GitHub Actions","Docker (conceptos)","Variables de entorno","Secrets","Ejecución de tests en pipelines","Paralelismo","Reports","Artifacts","+Sharding en matrix","+Quality gates","+Nightly vs PR suites"]}
  ],
  lessons:[
   {t:"Playwright en GitHub Actions con sharding", p:"Una matrix reparte la suite entre máquinas; cada shard sube su reporte como artifact.", code:"jobs:\n  e2e:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix: { shard: [1, 2, 3, 4] }\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npx playwright test --shard=${{ matrix.shard }}/4\n        env:\n          BASE_URL: ${{ vars.QA_URL }}\n          API_TOKEN: ${{ secrets.API_TOKEN }}\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: report-${{ matrix.shard }}\n          path: playwright-report/", tip:"Smoke en cada PR, regresión completa nightly."}
  ]},
 {n:8, title:"Escenarios senior", prio:"Muy alta", hours:"6–8 h", tag:"senior",
  goal:"Demostrar experiencia: diagnosticar, priorizar y proponer, no solo recitar conceptos.",
  groups:[
   {name:"Escenarios", topics:["Suite de 4 h → reducir tiempo","Falla en CI, pasa en local","Migración Selenium → Playwright","Framework desde cero","“Ese test flaky, bórralo”","+Mentoría y code review de tests","+Métricas: flakiness rate, MTTR, coverage"]},
   {name:"Behavioral", topics:["+Historias STAR preparadas","+Conflicto con un developer","+Proyecto del que estás orgullosa","+Decisión técnica que salió mal"]}
  ],
  lessons:[
   {t:"Estructura para responder escenarios", p:"Usa siempre el mismo esqueleto: aclarar, medir, diagnosticar, actuar, prevenir. Muestra que priorizas con datos.", code:"1. Clarify   – ¿qué cambió? ¿desde cuándo? ¿qué entorno?\n2. Measure   – traces, logs, tasa de fallo por test\n3. Diagnose  – timing, datos compartidos, entorno, orden\n4. Act       – fix concreto, no solo retries\n5. Prevent   – quarantine, alertas, guideline en code review", tip:"Cierra con un ejemplo real tuyo: “In my last project we…”"}
  ]},
 {n:9, title:"Mock interview", prio:"Final", hours:"2–3 sesiones", tag:"mock",
  goal:"Simulación completa por rondas con feedback, en inglés.",
  groups:[{name:"Rondas", topics:["Introducción / experiencia","Coding","Playwright","Java / Selenium","Python","Arquitectura","Escenarios QA","CI/CD","Behavioral"]}],
  lessons:[
   {t:"Pitch de 90 segundos", p:"Prepara una presentación en inglés: años, dominios, stack, un logro medible y por qué te interesa el puesto.", code:"I'm a QA Automation Engineer with X years of experience,\nmostly in [domain]. I've built UI and API frameworks with\nPlaywright + TypeScript and Selenium + Java, integrated them\ninto GitHub Actions, and reduced our regression time from\n4 hours to 35 minutes by moving setup to the API and sharding.", tip:"Practícalo en voz alta en la pestaña Entrevista."}
  ]}
];
