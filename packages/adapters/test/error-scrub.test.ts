import { describe, expect, test } from "bun:test";
import { scrubLogLine, urlOrigin } from "../src/error-scrub";

describe("scrubLogLine", () => {
  test("masks emails, addresses and keys", () => {
    const line = scrubLogLine(
      "from someone@example.com at 203.0.113.7 and 2001:db8::1 with sk-test-0000000000000000000000000000fake",
    );
    expect(line).not.toContain("someone@example.com");
    expect(line).not.toContain("203.0.113.7");
    expect(line).not.toContain("2001:db8::1");
    expect(line).not.toContain("sk-test-0000000000000000000000000000fake");
  });

  test("keeps a URL's origin only", () => {
    expect(scrubLogLine("GET https://chat.example.com/org/abc/wiki/secret-page?token=x failed")).toBe(
      "GET https://chat.example.com/… failed",
    );
    expect(scrubLogLine("open http://localhost:3000")).toBe("open http://localhost:3000");
  });

  test("home folders become ~", () => {
    expect(scrubLogLine("C:\\Users\\someone\\.agentes-runner\\logs\\runner.log")).toBe(
      "~\\.agentes-runner\\logs\\runner.log",
    );
    expect(scrubLogLine("/Users/someone/.agentes-runner/config.json")).toBe("~/.agentes-runner/config.json");
    expect(scrubLogLine("/home/someone/x")).toBe("~/x");
  });

  test("known values become their labels", () => {
    expect(scrubLogLine("Machine Studio Box connected", [["Studio Box", "computer"]])).toBe(
      "Machine [computer] connected",
    );
  });

  test("cuts long lines and is stable", () => {
    expect(scrubLogLine("x".repeat(5000)).length).toBeLessThanOrEqual(1000);
    const once = scrubLogLine("https://chat.example.com/a/b someone@example.com /Users/someone/x", [
      ["chat.example.com", "server"],
    ]);
    expect(scrubLogLine(once, [["chat.example.com", "server"]])).toBe(once);
  });

  test("urlOrigin", () => {
    expect(urlOrigin("https://example.com/a?b")).toBe("https://example.com");
    expect(urlOrigin("not a url")).toBeNull();
  });
});
