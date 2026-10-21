import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const base = process.env.PORTFOLIO_TEST_URL || "http://localhost:3000";

function entries(file, names) {
  const source = ts.createSourceFile(file, readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const result = [];
  function visit(node) {
    if (ts.isVariableDeclaration(node) && names.includes(node.name.getText(source)) && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      for (const item of node.initializer.elements) {
        result.push(Object.fromEntries(item.properties.filter(ts.isPropertyAssignment).map(property => [property.name.getText(source).replaceAll('"', ''), ts.isStringLiteral(property.initializer) ? property.initializer.text : undefined])));
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.ok(result.length, `Expected collection data in ${file}`);
  return result;
}

async function page(path) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
}

function sectionLinks(html, id, pattern) {
  const section = html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))?.[0];
  assert.ok(section, `Missing ${id} section`);
  return [...section.matchAll(/href="([^"]+)"/g)].map(match => match[1]).filter(href => pattern.test(href));
}

test("homepage limits preserve collection order and full pages include every item", async () => {
  const home = await page("/");
  const posts = entries("lib/blog-data.ts", ["blogPosts"]).sort((a, b) => b.date.localeCompare(a.date));
  const collections = [
    { route: "/projects", id: "projects", limit: 4, label: "View all projects", pattern: /^https:\/\/github.com\//, expected: entries("components/Projects.tsx", ["projects", "additionalProjects"]).map(item => item.githubLink) },
    { route: "/opensource", id: "contributions", limit: 4, label: "View all contributions", pattern: /\/pull\//, expected: entries("components/openSourceContributions.tsx", ["contributions"]).map(item => item.pullRequestLink) },
    { route: "/blog", id: "blog", limit: 3, label: "View all blogs", pattern: /^\/blog\//, expected: posts.map(item => `/blog/${item.slug}`) },
  ];
  assert.doesNotMatch(home, /aria-label="Home"/);
  for (const collection of collections) {
    assert.deepEqual(sectionLinks(home, collection.id, collection.pattern), collection.expected.slice(0, collection.limit));
    assert.ok(home.includes(`href="${collection.route}"`) && home.includes(collection.label));
    const full = await page(collection.route);
    assert.deepEqual(sectionLinks(full, collection.id, collection.pattern), collection.expected);
    const homeLink = full.match(/<a\b[^>]*aria-label="Home"[^>]*>/)?.[0];
    assert.ok(homeLink?.includes('href="/"'), `Missing Home link on ${collection.route}`);
    assert.doesNotMatch(full, /aria-label="Homepage sections"/);
  }
  for (const post of posts) {
    const article = await page(`/blog/${post.slug}`);
    assert.match(article, /href="\/blog"[^>]*>← All posts/);
  }
});
