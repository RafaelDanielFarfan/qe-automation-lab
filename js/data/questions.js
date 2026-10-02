// ================= INTERVIEW QUESTIONS =================
// round: intro | coding | playwright | selenium | python | framework | qa | cicd | senior | behavioral
const QUESTIONS = [
 {r:"intro", q:"Tell me about yourself and your experience in test automation.", k:["90-second pitch: years, domains, stack","One measurable achievement (time saved, coverage, flakiness reduced)","UI + API + CI experience","Why this role"]},
 {r:"intro", q:"Describe the most complex automation framework you have worked on.", k:["Context: product, team size, number of tests","Architecture: layers, patterns, tools","Your specific contribution","Result with numbers and what you'd improve"]},

 {r:"coding", q:"What's the difference between == and === in JavaScript?", k:["== does type coercion, === compares type and value","'5' == 5 is true, '5' === 5 is false","Always use === in tests and code"]},
 {r:"coding", q:"String vs StringBuilder in Java. When do you use each?", k:["String is immutable: every concatenation creates a new object","StringBuilder is mutable, O(n) appends in loops","StringBuffer is the synchronized (thread-safe) version"]},
 {r:"coding", q:"Explain equals() and hashCode() contract.", k:["Equal objects must have equal hash codes","Overriding equals without hashCode breaks HashMap/HashSet","Use the same fields in both; records do it automatically"]},
 {r:"coding", q:"Abstract class vs interface in Java?", k:["Interface: contract, multiple inheritance, default methods since Java 8","Abstract class: shared state and constructors, single inheritance","Example: BasePage as abstract class, Reportable as interface"]},
 {r:"coding", q:"What is the difference between a Promise and async/await?", k:["async/await is syntax over Promises","await pauses the async function until the Promise settles","Error handling with try/catch instead of .catch()","Promise.all for parallel work"]},
 {r:"coding", q:"What does a HashMap do internally and what is its lookup complexity?", k:["Buckets indexed by hashCode","Average O(1) get/put, worst case O(log n) (tree bins in Java 8+)","Collisions handled with linked lists / trees"]},

 {r:"playwright", q:"Explain the difference between Browser, BrowserContext and Page.", k:["Browser = browser process","Context = isolated session (cookies, storage), cheap, one per test","Page = a tab inside a context","Isolation enables safe parallelism"]},
 {r:"playwright", q:"How does auto-waiting work in Playwright?", k:["Actionability checks: attached, visible, stable, enabled, receives events","Locators are lazy and re-resolved on every action","Web-first assertions retry until timeout","Removes the need for sleeps"]},
 {r:"playwright", q:"Which locator strategy do you prefer and why?", k:["getByRole first: mirrors how users and assistive tech see the page","Then label, placeholder, text, test-id","CSS/XPath as last resort: coupled to DOM structure","Chaining and filter() for lists"]},
 {r:"playwright", q:"What are fixtures and why use them instead of beforeEach?", k:["Dependency injection by name, created on demand","Setup and teardown in one place around use()","Composable and reusable across files","Scopes: test and worker"]},
 {r:"playwright", q:"How do you handle authentication in a Playwright suite?", k:["Login once in a setup project or globalSetup","Save storageState and reuse it per project","Prefer API login for speed","Different storageState files per role"]},
 {r:"playwright", q:"How do you debug a test that fails only in CI?", k:["trace: 'on-first-retry' and open it in Trace Viewer","Screenshots and video on failure","Compare env: viewport, timezone, data, network speed, headless","Run locally with CI flags; check for test interdependence"]},
 {r:"playwright", q:"How do you mock network requests in Playwright?", k:["page.route with route.fulfill / continue / abort","Register before navigation","Use cases: edge states, third-party services, error codes","HAR recording for complex flows"]},
 {r:"playwright", q:"How do workers, projects and sharding relate?", k:["Workers: parallel processes on one machine","Projects: configurations (browsers, devices, roles)","Sharding: split the suite across machines (--shard=1/4)","fullyParallel to parallelize inside files"]},
 {r:"playwright", q:"What is expect.soft and when would you use it?", k:["Doesn't stop the test on failure, reports at the end","Useful for checking many fields of a page","Don't use it for preconditions"]},

 {r:"selenium", q:"Explain implicit, explicit and fluent waits.", k:["Implicit: global wait for element lookup","Explicit: WebDriverWait + ExpectedConditions for a specific condition","Fluent: explicit with custom polling and ignored exceptions","Don't mix implicit and explicit"]},
 {r:"selenium", q:"What causes StaleElementReferenceException and how do you fix it?", k:["Element reference no longer attached to the DOM (re-render)","Re-locate right before interacting","ExpectedConditions.refreshed or retry wrapper","Page Objects should store By, not WebElement"]},
 {r:"selenium", q:"How do you run Selenium tests in parallel safely?", k:["TestNG parallel methods/classes + thread-count","ThreadLocal WebDriver per thread","No shared static state; isolated test data","Selenium Grid or cloud providers to scale"]},
 {r:"selenium", q:"What's new in Selenium 4?", k:["W3C protocol by default","Selenium Manager handles drivers","Relative locators","CDP / BiDi access, new window/tab API"]},
 {r:"selenium", q:"Selenium vs Playwright: what would you consider in a migration?", k:["Team skills and language","Browser coverage needs (Safari/WebKit, legacy)","Auto-waiting, tracing, API testing built in","Incremental migration: new tests in Playwright, critical ones first","Cost of rewriting vs maintenance savings"]},

 {r:"python", q:"Explain pytest fixtures and their scopes.", k:["Functions decorated with @pytest.fixture, injected by name","yield separates setup and teardown","Scopes: function, class, module, package, session","Shared via conftest.py"]},
 {r:"python", q:"How do you parametrize tests in pytest?", k:["@pytest.mark.parametrize with argnames and values","ids for readable reports","Can stack decorators for combinations","Fixtures can be parametrized too (params=)"]},
 {r:"python", q:"List vs tuple vs set vs dict?", k:["List: ordered, mutable","Tuple: ordered, immutable, hashable","Set: unique, unordered, O(1) membership","Dict: key-value, insertion ordered since 3.7"]},

 {r:"framework", q:"How would you design an automation framework from scratch?", k:["Understand product, team and constraints first","Layers: tests, framework (pages/fixtures/api clients), config","Test data strategy and environment config","Reporting, CI integration, coding guidelines","Start small with smoke, iterate"]},
 {r:"framework", q:"Why fixtures instead of putting setup logic in the Page Object?", k:["Page Objects model the UI; fixtures model preconditions","Keeps pages reusable across flows","Teardown guaranteed by the fixture","Easier composition (auth + data + page)"]},
 {r:"framework", q:"How would you scale your framework to 1,000+ tests?", k:["Parallelism and sharding","Move setup to API, keep UI tests for critical flows","Tags: smoke / regression / per feature","Independent tests with isolated data","Ownership, code review and flakiness tracking"]},
 {r:"framework", q:"How do you manage test data?", k:["Create via API per test (builders/factories)","Unique data (timestamps, UUIDs) to avoid collisions","Cleanup in teardown","Avoid shared mutable accounts; separate read-only reference data"]},
 {r:"framework", q:"How do you handle secrets and environments?", k:["Env variables and .env files never committed","CI secrets store (GitHub secrets, Vault)","Config file per environment selected by ENV variable","Mask secrets in logs and reports"]},

 {r:"qa", q:"What should and shouldn't be automated?", k:["Automate: repetitive, stable, high-risk, regression, data-driven","Don't: one-offs, highly volatile UI, UX/visual judgment, exploratory","Consider ROI and maintenance cost"]},
 {r:"qa", q:"Explain the test pyramid.", k:["Many unit tests, fewer integration/API, few E2E UI","Lower layers are faster and more stable","Push checks down when possible","Ice-cream cone anti-pattern"]},
 {r:"qa", q:"Severity vs priority, with an example.", k:["Severity: technical impact","Priority: business urgency","Logo typo: low severity, high priority","Rare crash in admin report: high severity, low priority"]},
 {r:"qa", q:"Smoke vs sanity vs regression testing?", k:["Smoke: build is stable enough to test, broad and shallow","Sanity: narrow check after a specific fix","Regression: existing functionality still works after changes"]},
 {r:"qa", q:"What test design techniques do you use?", k:["Equivalence partitioning","Boundary value analysis","Decision tables","State transition","Pairwise for combinations"]},

 {r:"cicd", q:"How would you integrate your Playwright framework into a CI/CD pipeline?", k:["Trigger: PR (smoke) and nightly (full regression)","Install deps + browsers, cache node_modules","Secrets via CI store, BASE_URL by environment","Sharding with matrix, retries in CI","Publish HTML/JUnit reports as artifacts, notify team","Quality gate blocks merge on failure"]},
 {r:"cicd", q:"Merge vs rebase?", k:["Merge preserves history with a merge commit","Rebase rewrites commits onto the new base, linear history","Never rebase shared/public branches"]},
 {r:"cicd", q:"Why run tests in Docker?", k:["Same environment locally and in CI","Official Playwright image with browsers and deps","Reproducible failures, version pinning"]},

 {r:"senior", q:"Your regression suite has 2,000 tests and takes 4 hours. What would you do?", k:["Measure: slowest tests, setup time, failures","Parallelize and shard","Move setup and some checks to API","Remove duplicates, tier suites (smoke on PR, full nightly)","Target and track a time budget"]},
 {r:"senior", q:"Tests randomly fail in CI but pass locally. How do you investigate?", k:["Collect traces, logs, failure rate per test","Environment differences: resources, timing, data, parallel workers","Check shared state and test order dependence","Fix root cause, quarantine meanwhile, don't just add retries"]},
 {r:"senior", q:"A developer says a flaky test should simply be deleted. What do you do?", k:["Understand what risk the test covers","Check if flakiness is in test, environment or product (could be a real race condition)","Quarantine with a ticket and owner instead of deleting","Agree on a flakiness policy with the team"]},
 {r:"senior", q:"How do you measure the success of an automation effort?", k:["Execution time and feedback speed","Flakiness rate and maintenance effort","Escaped defects / bugs caught before release","Coverage of critical flows, not % of test cases"]},

 {r:"behavioral", q:"Tell me about a conflict with a developer and how you solved it.", k:["STAR: Situation, Task, Action, Result","Focus on data and shared goals, not blame","What you learned"]},
 {r:"behavioral", q:"Tell me about a time you improved a process.", k:["Clear before/after with numbers","Your initiative and how you got buy-in","Long-term impact"]},
 {r:"behavioral", q:"How do you mentor junior QA engineers?", k:["Pairing and code reviews with clear guidelines","Small ownership tasks with feedback","Documentation and examples in the framework"]}
];

const ROUNDS = [
 {k:"intro", label:"Intro"},{k:"coding", label:"Coding"},{k:"playwright", label:"Playwright"},{k:"selenium", label:"Java / Selenium"},
 {k:"python", label:"Python"},{k:"framework", label:"Arquitectura"},{k:"qa", label:"QA scenarios"},{k:"cicd", label:"CI/CD"},
 {k:"senior", label:"Senior"},{k:"behavioral", label:"Behavioral"}
];
